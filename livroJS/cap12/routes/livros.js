const express = require('express')
const router = express.Router()

// Importanto o submódulo "Op" para uso nas clausulas Where.
const { Op } = require('sequelize');
// Importando o model "Livros" para o arquivo de rotas
const { Livros } = require('../models')
// const Livros = require('../models').Livros

// Informando que é uma app express 
// e que usará a notação JSON para troca de dados
const app = express();
app.use(express.json());

// método get utilizado para consultas
router.get('/', async (req, res) => {
  try {
    // retornado os registros em ordem crescente por titulo
    // com mais de uma clausula "where"
    const livros = await Livros.findAll({
      where: {
         autor: { [Op.like]: '%M%'},
         anoPublicacao: {[Op.eq]: 2017}
        }
     , order:[['titulo', 'ASC']]})
    res.status(200).json(livros)
    console.log(livros)
  } catch(error) {
    res.status(400).json({msg: error.message })
  }
})

//Criar um livro via API -> Faz um insert na tabela de Livros
router.post('/', async(req, res) => {
  try {
    const {titulo, autor, anoPublicacao, preco, foto} = req.body 
    if(!titulo || !autor || !anoPublicacao || !preco){
      res.status(400).json({msg: 'Enviar título, autor, ano de publicação e preço do livro!'})
      return
    }
    const novoLivro = await Livros.create(req.body);
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
})

// Atualizar um livro por ID -> Faz um update na tabela de Livros
router.put('/:id', async (req, res) => {
  try {
    const { titulo, autor, anoPublicacao, preco } = req.body
    const { id } = req.params

    // Atualiza os dados do livro com base no ID fornecido
    const [linhasAfetadas] = await Livros.update(
      { titulo, autor, anoPublicacao, preco },
      { where: { id } }
    )

    // Verifica se algum registro foi atualizado
    if (linhasAfetadas > 0) {
      res.status(200).json({ msg: 'Livro atualizado com sucesso!' })
    } else {
      res.status(404).json({ msg: 'Livro não encontrado!' })
    }
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
})
// Faz uma busca na tabela Livros, baseada no título ou no autor do livro
router.get('/buscar', async (req, res) => {
  try {
    const { titulo, autor } = req.query;

    // Consulta pelo título ou autor
    const livros = await Livros.findAll({
      where: {
        [Op.or]: [
          { titulo: { [Op.like]: `%${titulo}%` } },
          { autor: { [Op.like]: `%${autor}%` } }
        ]
      }
    });

    if (livros.length > 0) {
      res.status(200).json(livros)
    } else {
      res.status(404).json({ msg: 'Nenhum livro encontrado!' })
    }
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
});

// Rota para excluir um livro pelo ID -> delete from table
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const linhasAfetadas = await Livros.destroy({ where: { id } })

    if (linhasAfetadas > 0) {
      res.status(200).json({ msg: 'Livro excluído com sucesso!' })
    } else {
      res.status(404).json({ msg: 'Livro não encontrado!' })
    }
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
})


module.exports = router



