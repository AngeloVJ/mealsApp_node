const Order = require('../models/order.model');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError(`Meal ID: ${mealId} not found`, 404));
  }

  const order = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice: quantity * meal.price,
    quantity,
  });

  res.status(201).json({
    status: 'success',
    message: 'The Order has been created',
    order,
  });
});

exports.findAllOrdersUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const order = await Order.findAll({
    where: {
      userId: sessionUser.id,
      status: 'active',
    },
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

  res.status(200).json({
    status: 'success',
    results: order.length,
    order,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'The order has been updated',
    order,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'The order has been deleted',
  });
});
