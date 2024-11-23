const router = require('express').Router();
const userController = require('../controllers/userController');

// Forget password routes
router.post('/api/forgot-password/send', userController.forgotPassword_send);
router.post('/api/forgot-password/verify', userController.forgotPassword_verify);

// Login and sign-in routes
router.post('/api/login', userController.handleLogin);
router.post('/api/signin-send', userController.handleUserSignin_sentAuthCode);
router.post('/api/signin-verify', userController.handleUserSignin_verifyAuthCode);

module.exports = router;