const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const checkDeletePermission = require('../middlewares/checkDeletePermission');

router.get('/posts', postController.getAllPosts);               // Xem toàn bộ bài viết
router.get('/posts/:postId', postController.getPostById);       // Xem bài viết theo ID

// Các route cần xác thực
router.post('/posts', authenticateToken, postController.createPost);        // Tạo bài viết
router.put('/posts/:postId', authenticateToken, postController.updatePost); // Cập nhật bài viết
router.delete('/posts/:postId', authenticateToken, checkDeletePermission, postController.deletePost); // Xóa bài viết
router.post('/posts/:postId/like', authenticateToken, postController.likePost);  // like bài viết
module.exports = router;
