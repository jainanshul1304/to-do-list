const { DataTypes } = require('sequelize');
const {sequelize}  =  require("../db/db");
const MailStatus = sequelize.define('MailStatus', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  recipient_mail_id: {
    type: DataTypes.STRING(320),
    allowNull: false
  },
  recipient_mail_subject: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  recipient_mail_text: {
    type: DataTypes.STRING(400),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("completed", "initialised", "failed"),  // Updated this field as `recipient_mail_status`
    allowNull: false
  }
}, {
  tableName: 'mailStatus', // Optional: define the actual table name if it's different from the default
  timestamps: false // Disables createdAt and updatedAt fields
});

module.exports = MailStatus;
