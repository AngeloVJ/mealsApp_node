const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Review,
        attributes: ['id', 'comment', 'rating'],
      },
    ],
  });

  if (!restaurant) {
    return next(new AppError(`Restaurant with id: ${id} not found`, 404));
  }

  req.restaurant = restaurant;
  next();
});
