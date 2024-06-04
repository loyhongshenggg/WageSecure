const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('WageSecure', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres', // or 'postgres', 'sqlite', 'mariadb', 'mssql'
});

module.exports = {
  sequelize,
  Sequelize
};
