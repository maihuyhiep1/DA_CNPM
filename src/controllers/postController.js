const Post = require('../models/index').Post;
const PostLike = require('../models/index').PostLike;
const PostImage = require('../models/index').PostImage;
const {  User } = require('../models');
const { Op } = require('sequelize'); // Dùng để tạo các điều kiện lọc

exports.getPopularPosts = async (req, res) => {
    try {
        // Lấy khoảng thời gian (tuần hoặc tháng)
        const now = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7); // 7 ngày trước
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1); // 1 tháng trước

        // Chọn lọc theo tuần hoặc tháng (tùy thuộc vào yêu cầu)
        const filterByTime = req.query.time === 'month' ? lastMonth : lastWeek;

        // Lấy bài viết
        const results = await Post.findAll({
            where: {
                updatedAt: { [Op.gte]: filterByTime } // Bài viết được cập nhật trong khoảng thời gian
            },
            attributes: ['post_id', 'title', 'avatar', 'snippet', 'like_count'], // Chỉ lấy các trường cần thiết
            order: [['like_count', 'DESC']], // Sắp xếp theo lượt thích giảm dần
        });

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy bài viết phổ biến', error: err.message });
    }
};

// Lấy tất cả bài đăng
exports.getAllPosts = async (req, res) => {
    try {
        const results = await Post.findAll({
            attributes: ['post_id', 'title', 'avatar', 'createdAt'], // Giới hạn cột trả về
            include: [
                { model: User, as: 'author', attributes: ['id', 'name', 'avatar'] }, // Thêm tác giả bài viết
            ],
            order: [['createdAt', 'DESC']], // Sắp xếp bài viết mới nhất
        });

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bài đăng', error: err.message });
    }
};

// Lấy bài đăng theo ID
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.postId;

        const result = await Post.findByPk(postId, {

            include: [
               
                { model: User, as: 'author', attributes: ['id', 'name', 'avatar'] }, // Thông tin tác giả
            ],
        });

        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng.' });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy bài đăng.', error: err.message });
    }
};


// Tạo bài đăng mới
exports.createPost = async (req, res) => {
    try {
        const author_id = req.user.id; // Lấy user ID từ session
        const { title, is_qna, content } = req.body;

        if (!content || content.trim() === '') {
            return res.status(400).json({ message: 'Nội dung bài viết không được để trống.' });
        }

        // Giới hạn nội dung nếu là Q&A
        if (is_qna) {
            const textContent = content.replace(/<[^>]*>/g, ''); // Loại bỏ HTML
            if (textContent.split(' ').length > 500) {
                return res.status(400).json({ message: 'Nội dung Q&A không được vượt quá 500 từ.' });
            }
        }

        // Tạo bài viết
        const newPost = await Post.create({
            title,
            author_id,
            is_qna,
            content, // Lưu toàn bộ HTML (bao gồm cả thẻ <img>)
        });

        // Trích xuất URL ảnh từ nội dung bài viết
        const imageUrls = content.match(/<img[^>]+src="([^">]+)"/g)?.map((img) => {
            return img.match(/src="([^">]+)"/)[1];
        });

        // Lưu các ảnh vào bảng PostImage
        if (imageUrls && imageUrls.length > 0) {
            const postImages = imageUrls.map((url) => ({
                post_id: newPost.post_id,
                image_url: url,
            }));
            await PostImage.bulkCreate(postImages);
        }

        res.status(201).json({ message: 'Tạo bài viết thành công', postId: newPost.post_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi tạo bài đăng.', error: err.message });
    }
};


// Cập nhật bài đăng
exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id; // Lấy userId từ session
        const { title, content } = req.body;

        // Tìm bài viết
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng.' });
        }

        // Kiểm tra quyền chỉnh sửa
        if (post.author_id !== userId) {
            return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa bài đăng này.' });
        }

        // Nếu có nội dung mới, kiểm tra và cập nhật bảng PostImage
        if (content && content !== post.content) {
            const oldImages = post.content.match(/<img[^>]+src="([^">]+)"/g)?.map((img) => {
                return img.match(/src="([^">]+)"/)[1];
            });

            const newImages = content.match(/<img[^>]+src="([^">]+)"/g)?.map((img) => {
                return img.match(/src="([^">]+)"/)[1];
            });

            // Xóa ảnh cũ không còn được sử dụng
            if (oldImages) {
                for (const image of oldImages) {
                    if (!newImages || !newImages.includes(image)) {
                        // Xóa ảnh khỏi server
                        const filePath = path.join(__dirname, '../uploads', path.basename(image));
                        fs.unlink(filePath, (err) => {
                            if (err) console.error('Không thể xóa ảnh:', err.message);
                        });

                        // Xóa ảnh khỏi PostImage
                        await PostImage.destroy({ where: { post_id: postId, image_url: image } });
                    }
                }
            }

            // Thêm ảnh mới vào PostImage
            if (newImages) {
                const newImageRecords = newImages
                    .filter((url) => !oldImages || !oldImages.includes(url))
                    .map((url) => ({
                        post_id: postId,
                        image_url: url,
                    }));
                await PostImage.bulkCreate(newImageRecords);
            }
        }

        // Cập nhật bài viết
        await post.update({
            title: title || post.title,
            content: content || post.content,
        });

        res.status(200).json({ message: 'Cập nhật bài viết thành công.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi cập nhật bài đăng.', error: err.message });
    }
};





// Xóa bài đăng


exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Tìm bài viết
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết.' });
    }

    // Kiểm tra quyền
    if (post.author_id !== userId && !['admin', 'moderator'].includes(userRole)) {
      return res.status(403).json({ message: 'Bạn không có quyền xóa bài viết này.' });
    }

    // Xóa hình ảnh liên quan
    await PostImage.destroy({ where: { post_id: postId } });

    // Xóa bài viết
    await Post.destroy({ where: { post_id: postId } });

    res.status(200).json({ message: 'Xóa bài viết thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa bài viết.', error: error.message });
  }
};


// Like bài đăng (toggle)
exports.likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user?.id; // Lấy user_id từ thông tin user trong token

        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!userId) {
            return res.status(401).json({ message: 'Bạn cần đăng nhập để thực hiện hành động này.' });
        }

        // Kiểm tra xem người dùng đã like bài viết chưa
        const existingLike = await PostLike.findOne({ where: { post_id: postId, user_id: userId } });

        if (!existingLike) {
            // Nếu chưa like, tạo mới bản ghi và tăng like_count
            await PostLike.create({ post_id: postId, user_id: userId });
            await Post.increment('like_count', { where: { post_id: postId } });
            return res.status(200).json({ message: 'Đã like bài viết thành công!' });
        } else {
            // Nếu đã like, xóa bản ghi và giảm like_count
            await PostLike.destroy({ where: { post_id: postId, user_id: userId } });
            await Post.decrement('like_count', { where: { post_id: postId } });
            return res.status(200).json({ message: 'Đã bỏ like bài viết thành công!' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xử lý lượt thích', error: err.message });
    }
};
