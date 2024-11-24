const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();
const upload = require('../middlewares/upload');
const isAuthenticated = require('../middlewares/auth');

// Route upload hình ảnh

// Route xem bài viết
router.get('/posts', postController.getAllPosts);               // Lấy danh sách bài viết
router.get('/posts/:postId', postController.getPostById);       // Lấy bài viết theo ID
router.get('/posts/popular', postController.getPopularPosts);
// Các route yêu cầu xác thực session
router.post(
    '/posts',
    isAuthenticated,
    upload.fields([
        { name: 'avatar', maxCount: 1 }, // Avatar chỉ 1 ảnh
        { name: 'images', maxCount: 10 } // Ảnh nội dung
    ]),
    postController.createPost
);

// Route cập nhật bài viết (avatar và nội dung)
router.put(
    '/posts/:postId',
    isAuthenticated,
    upload.fields([
        { name: 'avatar', maxCount: 1 }, // Avatar chỉ 1 ảnh
        { name: 'images', maxCount: 10 } // Ảnh nội dung
    ]), 
    postController.updatePost
);

router.delete('/posts/:postId', isAuthenticated, postController.deletePost); // Xóa bài viết
router.post('/posts/:postId/like', isAuthenticated,  postController.likePost);  // Thích bài viết

module.exports = router;