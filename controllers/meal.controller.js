const Restaurant = require('../models/restaurant.model');
const Meal = require('../models/meal.model');

const catchAsync = require('../utils/catchAsync');

exports.createMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.restaurant;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({
    status: 'success',
    message: 'The Meal has been created',
    meal,
  });
});

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: meals.length,
    meals,
  });
});

exports.findMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: 'success',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;

  const { meal } = req;

  await meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'The meal has been updated',
    meal,
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'The meal has been deleted',
  });
});
