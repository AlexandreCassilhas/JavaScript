const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Importar modelos
const Livros = require('./livros')(sequelize, DataTypes);

// Sincronizar modelos com o banco (apenas para desenvolvimento)
sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar:', err));

module.exports = { sequelize, Livros };