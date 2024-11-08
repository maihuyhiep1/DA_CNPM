const Post = require('../models/Post');

// Lấy tất cả bài đăng
exports.getAllPosts = async (req, res) => {
    try {
        const results = await Post.getAllPosts();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bài đăng' });
    }
};

// Lấy bài đăng theo ID
exports.getPostById = async (req, res) => {
    try {
        const post_id = req.params.postId;
        const result = await Post.getPostById(post_id);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
        }
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy bài đăng' });
    }
};

// Tạo bài đăng mới
exports.createPost = async (req, res) => {
    try {
        const { title, avatar, is_qna, content } = req.body;
        const author_id = req.user_id;
        const result = await Post.createPost(title, author_id, avatar, is_qna, content);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo bài đăng' });
    }
};

// Cập nhật bài đăng
exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const updatedFields = req.body;
        const author_id = req.user_id;
        const result = await Post.updatePost(postId, author_id, updatedFields);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật bài đăng' });
    }
};

// Xóa bài đăng
exports.deletePost = async (req, res) => {
    try {
        const post_id = req.params.postId;
        const result = await Post.deletePost(post_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng để xóa' });
        }
        res.status(200).json({ message: 'Xóa bài đăng thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa bài đăng' });
    }
};

// Like bài đăng
exports.likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.user_id;
        const result = await Post.toggleLikePost(userId, postId);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xử lý lượt thích' });
    }
};
