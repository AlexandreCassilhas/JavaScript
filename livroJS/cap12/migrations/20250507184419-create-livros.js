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
        allowNull: false,
      },
      autor: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      anoPublicacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1500,
          max: new Date().getFullYear(),
        }
      },
      preco: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0.00,
      },
      foto: {
        type: Sequelize.STRING(100),
        allowNull: true,
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