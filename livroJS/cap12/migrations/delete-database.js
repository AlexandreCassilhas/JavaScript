const fs = require('fs');

// Caminho do banco de dados SQLite
const databasePath = '../data/editora.db';

// Função para excluir o banco de dados
fs.unlink(databasePath, (err) => {
    if (err) {
        console.error('Erro ao excluir o banco de dados:', err);
    } else {
        console.log('Banco de dados excluído com sucesso!');
    }
});