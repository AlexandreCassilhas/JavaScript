const { sequelize, Livros } = require('./models');

async function criarLivro() {
  try {
    await sequelize.sync(); // Garante que o banco esteja sincronizado
    const novoLivro = await Livros.create({
      titulo: 'Livro Teste 2017',
      autor: 'Autor Teste 2017',
      anoPublicacao: 2017,
      preco: 55.00,
      foto: 'teste2017.jpg'
    });

    console.log('Livro criado:', novoLivro.toJSON());
  } catch (error) {
    console.error('Erro ao criar livro:', error);
  } finally {
    await sequelize.close(); // Fecha a conexão após o teste
  }
}

criarLivro();