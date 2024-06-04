'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const { sequelize } = require('../../config/database');



module.exports = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userType: { // 0 employee, 1 recruiter, 2 company
    type: Sequelize.ENUM('0', '1', '2')
  },
  firstname: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt: { // for paranoid's soft delete to work
    type: Sequelize.DATE
  }
}, {
  freezeTableName: true,
  modelName: 'user',
  paranoid: true // actual data won't be deleted, only marked as deleted
}

)