'use strict'; 
// impõe regras mais rigorosas para a escrita de código. 
// Isso ajuda a evitar erros silenciosos e comportamentos inesperados

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
    titulo: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true, // Garante que não haja títulos duplicados
      validate: {
        len: [3, 80] // O título deve ter entre 3 e 80 caracteres
      }
    },
    autor: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [3, 60] // O nome do autor deve ter entre 3 e 60 caracteres
      }
    },
    anoPublicacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1500, // Ano mínimo permitido
        max: new Date().getFullYear() // Não pode ser maior que o ano atual
      }
    },
    preco: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
      validate: {
        min: 0 // O preço não pode ser negativo
      }
    },
    foto: {
      type: DataTypes.STRING(100),
      allowNull: true, // Foto é opcional
      validate: {
        isUrl: true // Verifica se é uma URL válida
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Livros',
  });
  return Livros;
};
