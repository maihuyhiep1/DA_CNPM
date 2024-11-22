const router = require('express').Router();
const userRoutes = require('./userRoutes');
const googleAuthRoutes = require('./googleAuthRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');

let initWebRoutes = (app) => {

  router.use(userRoutes); // User routes
  router.use(googleAuthRoutes); // Google authentication routes
  router.use('/api/comments', commentRoutes); // Comment routes
  router.use('/api', postRoutes); // Post routes

  return app.use("/", router);
};

module.exports = initWebRoutes;