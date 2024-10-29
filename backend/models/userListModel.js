const { DataTypes } = require('sequelize');
const {sequelize}  =  require("../db/db");
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(72),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(72),
    allowNull: false
  }
}, {
  tableName: 'UserList', 
  timestamps: false 
});

module.exports = User;
