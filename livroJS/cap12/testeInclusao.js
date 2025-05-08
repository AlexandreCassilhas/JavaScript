const { sequelize, Livros } = require('./models');

async function criarLivro() {
  try {
    await sequelize.sync(); // Garante que o banco esteja sincronizado
    const novoLivro = await Livros.create({
      titulo: 'Teste Livro',
      autor: 'Autor Teste',
      anoPublicacao: 2020,
      preco: 19.99,
      foto: 'teste.jpg'
    });

    console.log('Livro criado:', novoLivro.toJSON());
  } catch (error) {
    console.error('Erro ao criar livro:', error);
  } finally {
    await sequelize.close(); // Fecha a conexão após o teste
  }
}

criarLivro();