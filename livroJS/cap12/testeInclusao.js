const { sequelize, Livros } = require('./models');

async function criarLivro() {
  try {
    await sequelize.sync(); // Garante que o banco esteja sincronizado
    const novoLivro = await Livros.create({
      titulo: 'Dom Quixote',
      autor: 'Miguel de Cervantes',
      anoPublicacao: 1650,
      preco: 39.99,
      foto: 'dom-quixote.jpg'
    });

    console.log('Livro criado:', novoLivro.toJSON());
  } catch (error) {
    console.error('Erro ao criar livro:', error);
  } finally {
    await sequelize.close(); // Fecha a conexão após o teste
  }
}

criarLivro();