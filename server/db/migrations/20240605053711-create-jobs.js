'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('job', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jobName: {
        type: Sequelize.STRING
      },
      jobDescription: {
        type: Sequelize.STRING
      },
      jobStartDate: {
        type: Sequelize.STRING
      },
      jobEndDate: {
        type: Sequelize.STRING
      },
      employeesId: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      employerId: {
        type: Sequelize.STRING
      },
      recruiterId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ratePerHour: {
        type: Sequelize.FLOAT,
      },
      hoursPerDay: {
        type: Sequelize.FLOAT,
      },
      recruiterCommission: {
        type: Sequelize.FLOAT
      },
      isJobCompleted: {
        type: Sequelize.BOOLEAN
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('job');
  }
};
