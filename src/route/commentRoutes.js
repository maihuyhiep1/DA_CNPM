const router = require('express').Router();
const commentController = require('../controllers/commentController');

// Comment routes
router.post("/post/:postId", commentController.create); // Thêm comment vào bài viết
router.put("/:id", commentController.update); // Cập nhật comment
router.delete("/:id", commentController.delete); // Xóa comment
router.get("/", commentController.findAll); // Lấy tất cả comment
router.get("/post/:id", commentController.findAllofPostId); // Lấy tất cả comment của bài viết

module.exports = router;