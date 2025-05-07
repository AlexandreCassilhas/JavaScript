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

// Sincronizar a tabela no banco de dados
async function criarTabela() {
    try {
        await Livro.sync(); // Apenas cria a tabela se ela ainda não existir
        console.log('Tabela "Livros" criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar a tabela:', error);
    } finally {
        await sequelize.close();
    }
}

criarTabela();