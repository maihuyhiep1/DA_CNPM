const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

// Admin routes
router.put('/assign-moderator/:id', isAuthenticated, isAdmin, adminController.assignModerator);
router.put('/remove-moderator/:id', isAuthenticated, isAdmin, adminController.removeModerator);
router.get('/moderators', isAuthenticated, isAdmin, adminController.getAllModerators);

module.exports = router;
