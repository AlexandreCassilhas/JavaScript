'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Livros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING(80),
        unique: true,
        allowNull: false,
        validate: {
        len: [3, 80] // O título deve ter entre 3 e 80 caracteres
      }
      },
      autor: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
        len: [3, 60] // O título deve ter entre 3 e 60 caracteres
      }
      },
      anoPublicacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1500,
          max: new Date().getFullYear()
        }
      },
      preco: {
        type: Sequelize.DECIMAL(9,2),
        allowNull: false,
        defaultValue: 0.00,
        validate: {
          min: 0 // O preço não pode ser negativo
        }
      },
      foto: {
        type: Sequelize.STRING(100),
        allowNull: true,
        validate: {
          isUrl: true // Verifica se é uma URL válida
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Livros');
  }
};