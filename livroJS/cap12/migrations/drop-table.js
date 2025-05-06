const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../data/editora.db'
});

async function excluirTabela() {
    const tabela = 'Livros'

    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.dropTable(`${tabela}`);

    console.log(`A tabela "${tabela}" foi excluída com sucesso!`);
}

excluirTabela();