const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../data/editora.db'
});

async function alterarTabela() {
    const tabela = 'Livros'

    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.addColumn(`${tabela}`, 'preco', {
        type: Sequelize.FLOAT,
        allowNull: true
    });

    console.log(`Coluna "preco" adicionada à tabela "${tabela}".`);
}

alterarTabela();