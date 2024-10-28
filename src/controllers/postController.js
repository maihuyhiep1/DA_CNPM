const Post = require('../models/Post');
const posts = [];  // Dữ liệu tạm thời cho các bài viết, sẽ được thay thế bằng cơ sở dữ liệu thực tế

// Tạo bài viết mới
const createPost = (req, res) => {
    const { title, avatar, isQnA, content } = req.body;
    const author_id = req.user ? req.user.user_id : 1; // Lấy user_id từ người dùng đã xác thực
// Gán tạm `author_id` bằng một số cố định để test (ví dụ: 1)

    if (isQnA && content.length > 500) {
        return res.status(400).json({ message: "Nội dung QnA không được vượt quá 500 ký tự" });
    }

    const newPost = new Post(title, author_id, avatar, isQnA, content);
    posts.push(newPost);

    res.status(201).json(newPost);
};

// Xem toàn bộ bài viết
const getAllPosts = (req, res) => {
    res.json(posts);
};

// Xem bài viết theo ID
const getPostById = (req, res) => {
    const { postId } = req.params;
    const post = posts.find((p) => p.post_Id === postId);

    if (!post) {
        return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    res.json(post);
};

// Cập nhật bài viết
const updatePost = (req, res) => {
    const { postId } = req.params;
    const { title, avatar, content } = req.body;
    const post = posts.find((p) => p.post_Id === postId);

    if (!post) {
        return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    post.title = title || post.title;
    post.avatar = avatar || post.avatar;
    post.content = content || post.content;

    res.json(post);
};

// Xóa bài viết
const deletePost = (req, res) => {
    const { postId } = req.params;
    const index = posts.findIndex((p) => p.post_Id === postId);

    if (index === -1) {
        return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    posts.splice(index, 1);
    res.json({ message: "Xóa bài viết thành công" });
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
