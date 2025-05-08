'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Livros.init({
    titulo: DataTypes.STRING(80),
    autor: DataTypes.STRING(60),
    anoPublicacao: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL(9,2),
    foto: DataTypes.STRING(100),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

  }, {
    sequelize,
    modelName: 'Livros',
  });
  return Livros;
};
