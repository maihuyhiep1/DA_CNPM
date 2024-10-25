const Post = require('../models/post');

exports.getAllPosts = (req, res) => {
    Post.getAllPosts((err, results) => {
        if (err) {
            res.status(500).json({ error: 'Lỗi khi lấy dữ liệu bài đăng' });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getPostById = (req, res) => {
    const postId = req.params.id;
    Post.getPostById(postId, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Lỗi khi lấy dữ liệu bài đăng' });
        } else if (result.length === 0) {
            res.status(404).json({ error: 'Không tìm thấy bài đăng' });
        } else {
            res.status(200).json(result[0]);
        }
    });
};

exports.createPost = (req, res) => {
    const newPost = req.body;
    Post.createPost(newPost, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Lỗi khi tạo bài đăng' });
        } else {
            res.status(201).json({ message: 'Bài đăng đã được tạo thành công', postId: result.insertId });
        }
    });
};

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    Post.deletePost(postId, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Lỗi khi xóa bài đăng' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Không tìm thấy bài đăng' });
        } else {
            res.status(200).json({ message: 'Bài đăng đã được xóa thành công' });
        }
    });
};
