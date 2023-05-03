const User = require('../models/user.model');
const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');
const Order = require('../models/order.model');
const Meal = require('../models/meal.model');

const initModel = () => {
  //1 Restaurant <-----> N Meal
  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  Meal.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

  // 1 Meal <-----> 1 Order
  Meal.hasOne(Order, { foreignKey: 'mealId' });
  Order.belongsTo(Meal, { foreignKey: 'mealId' });

  // 1 User <-----> M Order
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  // 1 User <-----> M Review
  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User, { foreignKey: 'userId' });

  // 1 Restaurant <-----> M Review
  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
  Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
};

module.exports = initModel;
