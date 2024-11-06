const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');
const userController = require('../controllers/userController.js');
let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);

  // router.get('/Login', (req, res) => {
  //   return res.sendFile(path.join(__dirname, 'login.html'));
  // });

  // router.get('/Login', homeController.getLoginPage);
  
  router.post('/submit-login', homeController.postSignIn);


  // router.get('/Setup_iformation', (req, res) => {
  //   return res.send("Setup_iformation");
  // });

  router.post('/api/login', userController.handleLogin);

  router.post('/api/signin-send', userController.handleUserSignin_sentAuthCode);

  router.post('/api/signin-verify', userController.handleUserSignin_verifyAuthCode);


  return app.use("/", router);
};

// Use module.exports to export the function
module.exports = initWebRoutes;
