const { Sequelize } = require('sequelize');

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './data/editora.db', // Arquivo do banco SQLite
  logging: false // Desativa logs SQL no console
});

module.exports = database;

// database.sqlite