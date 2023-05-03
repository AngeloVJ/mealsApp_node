const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.signupUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.updateUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  validFields,
];

exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
  body('rating').notEmpty().withMessage('Rating cannot be empty'),
  validFields,
];

exports.updateRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
  validFields,
];

exports.createUpdateReviewValidation = [
  body('comment').notEmpty().withMessage('Comment cannot be empty'),
  body('rating').notEmpty().withMessage('Rating cannot be empty'),
  validFields,
];

exports.createUpdateMealsValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price').notEmpty().withMessage('Price cannot be empty'),
  validFields,
];

exports.createOrderValidation = [
  body('quantity').notEmpty().withMessage('Quantity cannot be empty'),
  body('mealId').notEmpty().withMessage('MealId cannot be empty'),
  validFields,
];
