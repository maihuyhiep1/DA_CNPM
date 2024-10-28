const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/api/posts', postController.createPost);       // Tạo bài viết
router.get('/api/posts', postController.getAllPosts);       // Xem toàn bộ bài viết
router.get('/api/posts/:postId', postController.getPostById); // Xem bài viết theo ID
router.put('/api/posts/:postId', postController.updatePost);  // Cập nhật bài viết
router.delete('/api/posts/:postId', postController.deletePost); // Xóa bài viết

module.exports = router;
