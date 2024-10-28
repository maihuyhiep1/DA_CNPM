const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/posts', postController.createPost);       // Tạo bài viết
router.get('/posts', postController.getAllPosts);       // Xem toàn bộ bài viết
router.get('/posts/:postId', postController.getPostById); // Xem bài viết theo ID
router.put('/posts/:postId', postController.updatePost);  // Cập nhật bài viết
router.delete('/posts/:postId', postController.deletePost); // Xóa bài viết

module.exports = router;