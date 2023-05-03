const Review = require('../models/review.model');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// exports.reviewExist = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const review = await Review.findOne({
//     where: {
//       id,
//       status: 'active',
//     },
//   });

//   if (!review) {
//     return next(new AppError(`Review with id: ${id} not found`, 404));
//   }

//   req.review = review;
//   next();
// });

exports.reviewExist = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const restaurantId = req.params.restaurantId;
  const userId = req.sessionUser.id;

  const review = await Review.findOne({
    where: {
      id,
      userId,
      restaurantId,
      status: 'active',
    },
  });

  if (!review) {
    return next(new AppError(`Review not found`, 404));
  }

  req.review = review;
  next();
});
