const { Sequelize, DataTypes } = require('sequelize');

// Inicializando a conexão com SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../data/editora.db'
});

// Definição do modelo Livros
const Livro = sequelize.define('Livro', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anoPublicacao: {
        type: DataTypes.INTEGER
    }
});

// Sincronizar a base de dados e criar a tabela
async function criarBanco() {
    try {
        await sequelize.sync({ force: true });
        console.log('Banco de dados e tabela criados com sucesso!');
    } catch (error) {
        console.error('Erro ao criar o banco de dados:', error);
    } finally {
        await sequelize.close();
    }
}

criarBanco();