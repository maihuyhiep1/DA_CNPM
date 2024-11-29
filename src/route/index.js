const router = require('express').Router();
const userRoutes = require('./userRoutes');
const googleAuthRoutes = require('./googleAuthRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const reportRoutes = require('./reportRoutes');

let initWebRoutes = (app) => {

  router.use('/api', userRoutes); // User routes
  router.use(googleAuthRoutes); // Google authentication routes
  router.use('/api/comments', commentRoutes); // Comment routes
  router.use('/api', postRoutes); // Post routes
  router.use('/api/reports/', reportRoutes); 

  return app.use("/", router);
};

module.exports = initWebRoutes;