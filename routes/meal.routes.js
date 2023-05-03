const express = require('express');
//controllers
const mealController = require('./../controllers/meal.controller');
//middlewares
const mealMiddleware = require('./../middlewares/meal.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const restaurantMiddleware = require('./../middlewares/restaurant.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');

const router = express.Router();

router.get('/', mealController.findAllMeals);

router.get('/:id', mealMiddleware.mealExist, mealController.findMealById);

router.use(authMiddleware.protect);

router.post(
  '/:id',
  restaurantMiddleware.restaurantExist,
  validationMiddleware.createUpdateMealsValidation,
  authMiddleware.restrictTo('admin'),
  mealController.createMeals
);

router.patch(
  '/:id',
  validationMiddleware.createUpdateMealsValidation,
  mealMiddleware.mealExist,
  authMiddleware.restrictTo('admin'),
  mealController.updateMeal
);

router.delete(
  '/:id',
  mealMiddleware.mealExist,
  authMiddleware.restrictTo('admin'),
  mealController.deleteMeal
);

module.exports = router;
