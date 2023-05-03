const express = require('express');
//controllers
const userController = require('./../controllers/user.controller');
//middlewares
const userMiddleware = require('./../middlewares/user.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const orderMiddleware = require('./../middlewares/order.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.signupUserValidation,
  userController.signup
);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  userController.login
);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .patch(
    userMiddleware.validExistUser,
    validationMiddleware.updateUserValidation,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validExistUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

router.get('/orders', userController.findOrdersUser);

router.get(
  '/orders/:id',
  orderMiddleware.validIfExistOrderUser,
  userController.findOrderUserById
);

module.exports = router;
