const { Sequelize } = require('sequelize');

const database = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Arquivo do banco SQLite
  logging: false // Desativa logs SQL no console
});

module.exports = database;