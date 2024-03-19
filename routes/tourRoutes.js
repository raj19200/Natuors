const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourController.getTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTO('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;

// Middleware param
// router.param('id', tourController.checkID);
