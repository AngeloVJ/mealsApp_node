const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Review = db.define('reviews', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled', 'deleted'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Review;
