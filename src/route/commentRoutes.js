const router = require('express').Router();
const commentController = require('../controllers/commentController');

// Comment routes
router.post("/", commentController.create);
router.put("/:id", commentController.update);
router.delete("/:id", commentController.delete);
router.get("/", commentController.findAll);
router.get("/post/:id", commentController.findAllofPostId);

module.exports = router;