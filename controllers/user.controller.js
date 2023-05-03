const User = require('../models/user.model');
const Restaurant = require('../models/restaurant.model');
const Meal = require('../models/meal.model');
const Order = require('../models/order.model');

const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'The user has been created succesfully!',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
  });
});

exports.findOrdersUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const order = await Order.findAll({
    where: {
      userId: sessionUser.id,
      status: 'active',
    },
    attributes: ['id', 'totalPrice', 'quantity', 'status'],
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

exports.findOrderUserById = catchAsync(async (req, res, next) => {
  const { order } = req;

  res.status(200).json({
    status: 'success',
    order,
  });
});
