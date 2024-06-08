'use strict';
const { DataTypes } = require('sequelize');
const { Sequelize, sequelize } = require('../../config/database');


module.exports = sequelize.define('job', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: {
              msg: 'Job name cannot be null',
          },
          notEmpty: {
              msg: 'Job name cannot be empty',
          },
      },
    },
    jobDescription: DataTypes.STRING,
    jobStartDate: DataTypes.STRING,
    jobEndDate: DataTypes.STRING,
    employeesId: DataTypes.ARRAY(DataTypes.STRING),
    employerId: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          notNull: {
              msg: 'employerId cannot be null',
          },
          notEmpty: {
              msg: 'employerId cannot be empty',
          },
      },
    },
    deletedAt: DataTypes.DATE,
    isJobCompleted: DataTypes.BOOLEAN
  }, {
    paranoid: true,       // Enable soft deletes
    freezeTableName: true // Disable plural table name
  });

