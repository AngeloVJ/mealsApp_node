const express = require('express');
//controllers
const orderController = require('./../controllers/order.controller');
//middlewares
const orderMiddleware = require('./../middlewares/order.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post(
  '/',
  validationMiddleware.createOrderValidation,
  orderController.createOrder
);

router.get('/me', orderController.findAllOrdersUser);

router.patch(
  '/:id',
  orderMiddleware.validIfExistOrderUser,
  orderController.updateOrder
);

module.exports = router;
