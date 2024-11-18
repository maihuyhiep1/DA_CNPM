const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const checkDeletePermission = require('../middlewares/checkDeletePermission');
const upload = require('../middlewares/upload');

// Route upload hình ảnh
router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Không có hình ảnh nào được tải lên' });
    }

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`; // Đường dẫn đầy đủ của ảnh
    res.status(200).json({ message: 'Tải lên thành công', imageUrl });
});

// Route xem bài viết
router.get('/posts', postController.getAllPosts);               // Lấy danh sách bài viết
router.get('/posts/:postId', postController.getPostById);       // Lấy bài viết theo ID

// Các route yêu cầu xác thực token
router.post('/posts',authenticateToken,   upload.array('images', 10), postController.createPost); // Tạo bài viết (có hỗ trợ upload nhiều ảnh)
router.put('/posts/:postId', authenticateToken, upload.array('images', 10), postController.updatePost); // Cập nhật bài viết (có hỗ trợ upload nhiều ảnh)
router.delete('/posts/:postId', authenticateToken, checkDeletePermission, postController.deletePost); // Xóa bài viết
router.post('/posts/:postId/like', authenticateToken, postController.likePost);  // Thích bài viết

module.exports = router;
