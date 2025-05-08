const express = require('express')
const router = express.Router()
const { Livros } = require('../models');

const app = express();
app.use(express.json());

// método get utilizado para consultas
router.get('/', async (req, res) => {
  try {
    const livros = await Livros.findAll()
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



