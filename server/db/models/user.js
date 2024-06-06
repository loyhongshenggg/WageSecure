'use strict';
const { DataTypes } = require('sequelize');
const { Sequelize, sequelize } = require('../../config/database');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError');

module.exports = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: { // 0 employee, 1 recruiter, 2 company
    type: DataTypes.ENUM('0', '1', '2')
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notNull: {
            msg: 'firstName cannot be null',
        },
        notEmpty: {
            msg: 'firstName cannot be empty',
        },
    },
},
lastName: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
      notNull: {
          msg: 'lastName cannot be null',
      },
      notEmpty: {
          msg: 'lastName cannot be empty',
      },
  },
},
email: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
      notNull: {
          msg: 'email cannot be null',
      },
      notEmpty: {
          msg: 'email cannot be empty',
      },
      isEmail: {
          msg: 'Invalid email id',
      },
  },
},
password: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
      notNull: {
          msg: 'password cannot be null',
      },
      notEmpty: {
          msg: 'password cannot be empty',
      },
  },
},
confirmPassword: {
  type: DataTypes.VIRTUAL,
  set(value) {
      if (this.password.length < 7) {
          throw new AppError(
              'Password length must be grater than 7',
              400
          );
      }
      if (value === this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashPassword);
      } else {
          throw new AppError(
              'Password and confirm password must be the same',
              400
          );
      }
  },
},
walletSeed: {
  type: DataTypes.STRING,
  allowNull: false,
},
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: { // for paranoid's soft delete to work
    type: DataTypes.DATE
  }
}, {
  freezeTableName: true,
  modelName: 'user',
  paranoid: true // actual data won't be deleted, only marked as deleted
});
