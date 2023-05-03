const User = require('../models/user.model');
const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');

const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    message: 'The restaurant has been created',
    restaurant,
  });
});

exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Review,
        attributes: ['id', 'comment', 'rating'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: restaurant.length,
    restaurant,
  });
});

exports.findRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been updated',
    restaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been deleted',
  });
});

exports.createReviewRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const restaurantId = req.restaurant.id;
  const userId = req.sessionUser.id;

  const review = await Review.create({
    userId,
    comment,
    restaurantId,
    rating,
  });

  res.status(201).json({
    status: 'success',
    message: 'The review has been created',
    review,
  });
});

exports.updateReviewById = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({
    comment,
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The review has been updated',
    review,
  });
});

exports.deleteReviewById = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: 'deleted,' });

  res.status(200).json({
    status: 'success',
    message: 'The review has been deleted',
  });
});
