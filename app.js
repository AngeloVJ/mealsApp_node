const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// Routes
const userRouter = require('./routes/user.routes');
const restaurantRouter = require('./routes/restaurant.routes');
const mealRouter = require('./routes/meal.routes');
const orderRouter = require('./routes/order.routes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
