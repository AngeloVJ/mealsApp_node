const express = require('express');
//controllers
const restaurantController = require('./../controllers/restaurant.controller');
//middlewares
const restaurantMiddleware = require('./../middlewares/restaurant.middleware');
const reviewMiddleware = require('./../middlewares/review.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.get('/', restaurantController.findAllRestaurants);

router.get(
  '/:id',
  restaurantMiddleware.restaurantExist,
  restaurantController.findRestaurantById
);

router.use(authMiddleware.protect);

router.post(
  '/',
  validationMiddleware.createRestaurantValidation,
  restaurantController.createRestaurant
);

router.patch(
  '/:id',
  validationMiddleware.updateRestaurantValidation,
  restaurantMiddleware.restaurantExist,
  authMiddleware.restrictTo('admin'),
  restaurantController.updateRestaurant
);

router.patch(
  '/:id',
  restaurantMiddleware.restaurantExist,
  authMiddleware.restrictTo('admin'),
  restaurantController.deleteRestaurant
);

//Review
router.post(
  '/reviews/:id',
  validationMiddleware.createUpdateReviewValidation,
  restaurantMiddleware.restaurantExist,
  restaurantController.createReviewRestaurant
);

router.patch(
  '/reviews/:restaurantId/:id',
  validationMiddleware.createUpdateReviewValidation,
  reviewMiddleware.reviewExist,
  restaurantController.updateReviewById
);

router.delete(
  '/reviews/:restaurantId/:id',
  reviewMiddleware.reviewExist,
  restaurantController.deleteReviewById
);

module.exports = router;
