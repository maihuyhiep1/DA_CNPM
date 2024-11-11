const Post = require('../models/post');

// Lấy tất cả bài đăng
exports.getAllPosts = async (req, res) => {
    try {
        const results = await Post.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bài đăng', error: err.message });
    }
};

// Lấy bài đăng theo ID
exports.getPostById = async (req, res) => {
    try {
        const post_id = req.params.postId;
        const result = await Post.findByPk(post_id);
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
        const { title, avatar, is_qna, content } = req.body;
        const author_id = req.user_id; // Giả sử req.user_id đã được xác định từ middleware
        const result = await Post.create({
            title,
            author_id,
            avatar,
            is_qna,
            content
        });
        res.status(201).json({ message: 'Tạo bài viết thành công', postId: result.post_id });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo bài đăng', error: err.message });
    }
};

// Cập nhật bài đăng
exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const updatedFields = req.body;
        const author_id = req.user_id;

        const result = await Post.update(updatedFields, {
            where: {
                post_id: postId,
                author_id: author_id
            }
        });

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
        const result = await Post.destroy({
            where: { post_id: post_id }
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng để xóa' });
        }
        res.status(200).json({ message: 'Xóa bài đăng thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa bài đăng', error: err.message });
    }
};

// Like bài đăng (toggle)
exports.likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.user_id; // Giả sử có user_id từ token

        // Kiểm tra xem đã like hay chưa
        const existingLike = await Post.findOne({ where: { post_id: postId, user_id: userId } });

        if (!existingLike) {
            // Tăng like
            await Post.increment('like_count', { by: 1, where: { post_id: postId } });
            return res.json({ message: 'Đã like bài viết thành công!' });
        } else {
            // Giảm like
            await Post.decrement('like_count', { by: 1, where: { post_id: postId } });
            return res.json({ message: 'Đã bỏ like bài viết thành công!' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xử lý lượt thích', error: err.message });
    }
};
