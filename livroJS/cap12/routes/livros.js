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
    const livros = await Livros.findAll({
      where: {
        autor: { [Op.like]: '%Mi%'}
        }
     , order:[['titulo', 'ASC']]})
    res.status(200).json(livros)
    console.log(livros)
  } catch(error) {
    res.status(400).json({msg: error.message })
  }
})

//Criar um livro via API
router.post('/', async(req, res) => {
  try {
    const novoLivro = await Livros.create(req.body);
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router



