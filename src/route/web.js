const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const userController = require('../controllers/userController.js');
const googleAuthController = require('../controllers/googleAuthController.js');
const passport = require("passport");
let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  // router.get('/Login', (req, res) => {
  //   return res.sendFile(path.join(__dirname, 'login.html'));
  // });



  // Routes for google authentication
  router.get('/login/success',googleAuthController.loginSuccess)
  router.get('/login/failed', googleAuthController.loginFailed)
  router.get('/auth/google/callback', passport.authenticate('google', { 
    failureRedirect: '/login/failed' 
  }), googleAuthController.callbackUser);
  router.get('/google/auth', passport.authenticate("google", { scope: ["profile", "email"] }));
  router.get('/logout', googleAuthController.userLogout);

  router.post('/api/login', userController.handleLogin);
  router.post('/api/signin-send', userController.handleUserSignin_sentAuthCode);
  router.post('/api/signin-verify', userController.handleUserSignin_verifyAuthCode);


  return app.use("/", router);
};

// Use module.exports to export the function
module.exports = initWebRoutes;
