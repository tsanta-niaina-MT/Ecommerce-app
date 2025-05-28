const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = require('./product')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Product,
  Cart,
  Order,
  User,
};
