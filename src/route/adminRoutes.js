const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const postController = require('../controllers/postController');
// Admin routes
router.put('/assign-moderator/:id', isAuthenticated, isAdmin, adminController.assignModerator);
router.put('/remove-moderator/:id', isAuthenticated, isAdmin, adminController.removeModerator);
router.get('/moderators', isAuthenticated, isAdmin, adminController.getAllModerators);
router.delete('/posts/:postId', isAuthenticated, isAdmin, postController.deletePost);
router.get('/statistics', isAuthenticated, isAdmin, adminController.getStatistics);
module.exports = router;