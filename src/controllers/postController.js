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
// Tạo bài đăng mới
exports.createPost = async (req, res) => {
    try {
        const author_id = req.user.id; // Lấy user ID từ session
        const { title, is_qna, content } = req.body;

        let avatarUrl = null;
        if (req.file) {
            avatarUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
        }

        // Xử lý nội dung và giữ đúng thứ tự
        const processedContent = [];
        let imageIndex = 0;

        // Đảm bảo `content` được parse đúng định dạng nếu cần
        const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

        for (const item of parsedContent) {
            if (item.type === 'text') {
                processedContent.push(item); // Giữ nguyên văn bản
            } else if (item.type === 'image' && req.files && req.files[imageIndex]) {
                const imageUrl = `http://localhost:${port}/uploads/${req.files[imageIndex].filename}`;
                processedContent.push({ type: 'image', value: imageUrl });
                await PostImage.create({ post_id: null, image_url: imageUrl });
                imageIndex++;
            }
        }

        // Nếu là QnA, giới hạn 500 chữ
        if (is_qna) {
            const totalText = processedContent
                .filter((item) => item.type === 'text')
                .map((item) => item.value)
                .join(' ')
                .slice(0, 500);

            // Chỉ giữ lại nội dung văn bản đã được giới hạn
            processedContent.forEach((item) => {
                if (item.type === 'text') {
                    item.value = totalText; // Cắt gọn nội dung
                }
            });
        }

        // Lưu bài viết vào cơ sở dữ liệu
        const newPost = await Post.create({
            title,
            author_id,
            avatar: avatarUrl,
            is_qna,
            content: JSON.stringify(processedContent), // Lưu chuỗi JSON
        });

        if (req.files) {
            await PostImage.update({ post_id: newPost.post_id }, { where: { post_id: null } });
        }

        res.status(201).json({ message: 'Tạo bài viết thành công', postId: newPost.post_id });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo bài đăng', error: err.message });
    }
};





// Cập nhật bài đăng


exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id; // Lấy userId từ session
        const allowedFields = ['title', 'content']; // Các trường cho phép cập nhật
        const updatedFields = {};

        // Tìm bài viết
        const post = await Post.findByPk(postId, {
            include: [PostImage], // Bao gồm hình ảnh liên kết (nếu cần)
        });
        if (!post) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng.' });
        }

        // Kiểm tra quyền cập nhật (chỉ tác giả bài viết mới được sửa)
        if (post.author_id !== userId) {
            return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa bài đăng này.' });
        }

        // Lọc các trường cho phép từ req.body
        for (const key of Object.keys(req.body)) {
            if (allowedFields.includes(key)) {
                updatedFields[key] = req.body[key];
            }
        }

        // Xử lý ảnh đại diện (avatar)
        if (req.file) {
            const avatarUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
            updatedFields.avatar = avatarUrl;
        }

        // Xử lý nội dung (nếu có hình ảnh)
        if (req.body.content) {
            const updatedContent = [];
            let imageIndex = 0;

            for (const item of JSON.parse(req.body.content)) {
                if (item.type === 'text') {
                    updatedContent.push(item);
                } else if (item.type === 'image' && req.files && req.files[imageIndex]) {
                    const imageUrl = `http://localhost:${port}/uploads/${req.files[imageIndex].filename}`;
                    updatedContent.push({ type: 'image', value: imageUrl });

                    // Lưu hình ảnh vào bảng PostImage
                    await PostImage.create({ post_id: postId, image_url: imageUrl });
                    imageIndex++;
                }
            }

            updatedFields.content = JSON.stringify(updatedContent);
        }

        // Thực hiện cập nhật bài viết
        const result = await Post.update(updatedFields, { where: { post_id: postId } });
        if (result[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật bài viết thành công.' });
    } catch (err) {
        console.error(err); // Log lỗi để kiểm tra
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
