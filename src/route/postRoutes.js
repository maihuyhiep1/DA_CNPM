const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();
const upload = require('../middlewares/upload');
const { isAuthenticated }= require('../middlewares/auth');

// Route upload ảnh từ CKEditor
router.post(
    '/upload-image',
    isAuthenticated, // Xác thực nếu cần (hoặc bỏ nếu muốn cho phép tất cả)
    upload.single('upload'), // CKEditor gửi file dưới key "upload"
    (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: 'Không có tệp nào được tải lên.' });
            }

            // Tạo URL cho ảnh
            const imageUrl = `http://localhost:${process.env.PORT || 3000}/upload/${file.filename}`;

            // CKEditor yêu cầu trả về định dạng này
            res.status(201).json({
                uploaded: true,
                url: imageUrl,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ uploaded: false, error: err.message });
        }
    }
);

// Route xem bài viết
router.get('/users/:userId/posts', postController.getPostsByUser);
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
