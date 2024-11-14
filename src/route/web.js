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
  router.get("/auth/session", (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({
        message: "User is logged in",
        user: req.user, // The user data is available in the session
      });
    } else {
      res.status(401).json({
        message: "User is not logged in",
      });
    }
  });

  router.get("/profile", (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user); // Send the user object (stored in session) to the frontend
    } else {
      res.status(401).json({ message: "User not authenticated" });
    }
  });

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
