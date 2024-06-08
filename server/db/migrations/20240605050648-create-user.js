'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userType: { // 0 employee, 1 recruiter, 2 company
        type: Sequelize.ENUM('0', '1', '2')
      },
      firstName: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Add this line to ensure uniqueness
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
        type: Sequelize.STRING,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};
