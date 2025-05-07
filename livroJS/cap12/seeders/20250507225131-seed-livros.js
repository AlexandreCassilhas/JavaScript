'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Livros', [
        {
          titulo: 'Web Design Responsivo',
          autor: 'Mauricio Samy Silva',
          anoPublicacao: 2014,
           preco: 73,
           foto: 'https://s3.novatec.com.br/capas/9788575223925.jpg',
           createdAt: new Date(),
           updatedAt: new Date()
        },
        {
          titulo: 'Proteção Moderna de Dados',
          autor: 'W. Curtis Preston',
          anoPublicacao: 1490,
            preco: 97,
            foto: 'https://s3.novatec.com.br/capas/9788575223925.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
          titulo: 'SQL em 10 minutos por dia',
          autor: 'Ben Forta',
          anoPublicacao: 2021,
            preco: 79,
            foto: 'https://s3.novatec.com.br/capas/9788575223925.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
          titulo: 'CSS Grid Layout',
          autor: 'Mauricio Samy Silva',
          anoPublicacao: 2017,
            preco: 45,
            foto: 'https://s3.novatec.com.br/capas/9788575223925.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
          titulo: 'Python para Análise de Dados',
          autor: 'Wes McKinney',
          anoPublicacao: 2018,
            preco: 132,
            foto: 'https://s3.novatec.com.br/capas/9788575223925.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Livros', null, {});
  }
};
