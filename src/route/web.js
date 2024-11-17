const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const googleAuthController = require('../controllers/googleAuthController.js');
const commentController = require('../controllers/commentController.js')
const passport = require("passport");
let initWebRoutes = (app) => {
require('dotenv').config()


  // Forget password
  router.post('/api/forgot-password/send', userController.forgotPassword_send);
  router.post('/api/forgot-password/verify',userController.forgotPassword_verify);

  // Routes for google authentication
  router.get('/login-success',googleAuthController.loginSuccess)
  router.get('/auth/google/callback', passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }), googleAuthController.callbackUser);
  router.get('/google/auth', passport.authenticate("google", { scope: ["profile", "email"] }));
  router.get('/logout', googleAuthController.userLogout);

  router.post('/api/login', userController.handleLogin);
  router.post('/api/signin-send', userController.handleUserSignin_sentAuthCode);
  router.post('/api/signin-verify', userController.handleUserSignin_verifyAuthCode);

  // Routes for comments
  router.post("/", commentController.create);
  router.put("/:id", commentController.update);
  router.delete("/:id", commentController.delete);
  router.get("/", commentController.findAll);
  router.get("/post/:id", commentController.findAllofPostId);


  return app.use("/", router);
};

// Use module.exports to export the function
module.exports = initWebRoutes;
