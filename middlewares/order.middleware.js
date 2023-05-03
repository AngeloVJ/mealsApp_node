const Order = require('../models/order.model');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistOrderUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const order = await Order.findOne({
    where: {
      id,
      userId: sessionUser.id,
      status: 'active',
    },
    //attributes: ['id', 'totalPrice', 'quantity', 'status'],
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
      },
    ],
  });

  if (!order) {
    return next(new AppError(`Order not found`, 404));
  }

  req.order = order;
  next();
});
