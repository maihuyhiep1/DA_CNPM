const Post = require('../models/index').Post;
const PostImage = require('../models/index').PostImage;
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
            attributes: ['post_id', 'title', 'avatar',], // Chỉ lấy các trường cần thiết từ bảng Post
            order: [['createdAt', 'DESC']] // Sắp xếp bài viết mới nhất
        });

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bài đăng', error: err.message });
    }
};

// Lấy bài đăng theo ID
exports.getPostById = async (req, res) => {
    try {
        const post_id = req.params.postId;
        const result = await Post.findByPk(post_id, {
            include: [
                { model: PostImage, as: 'images', attributes: ['image_url'] },
                

            ]
        });
        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy bài đăng', error: err.message });
    }
};

// Tạo bài đăng mới
exports.createPost = async (req, res) => {
    try {
        const { title, is_qna, content } = req.body;
        const author_id = req.user_id;

        let avatarUrl = null;
        if (req.file) {
            avatarUrl = `http://localhost:3000/uploads/${req.file.filename}`;
        }

        // Xử lý nội dung và giữ đúng thứ tự
        const processedContent = [];
        let imageIndex = 0;

        for (const item of content) {
            if (item.type === 'text') {
                processedContent.push(item); // Giữ nguyên văn bản
            } else if (item.type === 'image' && req.files && req.files[imageIndex]) {
                const imageUrl = `http://localhost:3000/uploads/${req.files[imageIndex].filename}`;
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
            processedContent.forEach((item) => {
                if (item.type === 'text') {
                    item.value = totalText; // Cắt gọn nội dung
                }
            });
        }

        const newPost = await Post.create({
            title,
            author_id,
            avatar: avatarUrl,
            is_qna,
            content: JSON.stringify(processedContent),
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
        const allowedFields = ['title', 'content']; // Không cho thay đổi `is_qna`
        const updatedFields = {};

        for (const key of Object.keys(req.body)) {
            if (allowedFields.includes(key)) {
                updatedFields[key] = req.body[key];
            }
        }

        if (req.file) {
            const avatarUrl = `http://localhost:3000/uploads/${req.file.filename}`;
            updatedFields.avatar = avatarUrl;
        }

        if (req.body.content) {
            const updatedContent = [];
            let imageIndex = 0;

            for (const item of req.body.content) {
                if (item.type === 'text') {
                    updatedContent.push(item);
                } else if (item.type === 'image' && req.files && req.files[imageIndex]) {
                    const imageUrl = `http://localhost:3000/uploads/${req.files[imageIndex].filename}`;
                    updatedContent.push({ type: 'image', value: imageUrl });
                    await PostImage.create({ post_id: postId, image_url: imageUrl });
                    imageIndex++;
                }
            }

            updatedFields.content = JSON.stringify(updatedContent);
        }

        const result = await Post.update(updatedFields, { where: { post_id: postId } });
        if (result[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng để cập nhật' });
        }

        res.status(200).json({ message: 'Cập nhật bài viết thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật bài đăng', error: err.message });
    }
};



// Xóa bài đăng
exports.deletePost = async (req, res) => {
    try {
        const post_id = req.params.postId;

        await PostImage.destroy({ where: { post_id } });
        const result = await Post.destroy({ where: { post_id } });

        if (result === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng để xóa' });
        }

        res.status(200).json({ message: 'Xóa bài đăng thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa bài đăng', error: err.message });
    }
};


const PostLike = require('../models/PostLike');
// Like bài đăng (toggle)
exports.likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.user_id;

        const existingLike = await PostLike.findOne({ where: { post_id: postId, user_id: userId } });
        if (!existingLike) {
            await PostLike.create({ post_id: postId, user_id: userId });
            await Post.increment('like_count', { where: { post_id: postId } });
            return res.json({ message: 'Đã like bài viết thành công!' });
        } else {
            await PostLike.destroy({ where: { post_id: postId, user_id: userId } });
            await Post.decrement('like_count', { where: { post_id: postId } });
            return res.json({ message: 'Đã bỏ like bài viết thành công!' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xử lý lượt thích', error: err.message });
    }
};