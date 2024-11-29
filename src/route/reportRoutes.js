const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Routes
router.post('/', reportController.createReport);
router.get('/', reportController.getAllReports);
router.get('/status', reportController.getByStatus); 
// router.post('/:id/handle', reportController.handleReport); 
router.patch('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;
