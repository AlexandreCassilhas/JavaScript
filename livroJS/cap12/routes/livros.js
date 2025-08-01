const express = require('express')
const router = express.Router()

// Liberação do "Access-Control-Allow-Origin Policy"
// Políticas de Controle de Acesso (CORS)
const cors = require('cors')
router.use(cors())

// Importanto o submódulo "Op" para uso nas clausulas Where.
const { Op } = require('sequelize');
// Importando o model "Livros" para o arquivo de rotas
const { Livros, sequelize } = require('../models')
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
     /* where: {
         autor: { [Op.like]: '%M%'},
         anoPublicacao: {[Op.eq]: 2017}
        } 
     , */ order:[['titulo', 'ASC']]})
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
    console.log(novoLivro)
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

// Uso de outros métodos do Sequelize
router.get('/resumo', async(req, res) => {
  try {
    if(await Livros.count() > 0){
      // métodos Sequelize para contar, somar e extrair o maior e menor valor de um campo
      const totalLivros = await Livros.count()
      const somaPrecos = await Livros.sum('preco')
      const maiorPreco = await Livros.max('preco')
      const menorPreco = await Livros.min('preco')

      // método Sequelize para funções Agregadas (ex.: avg)
      const resultado = await Livros.findOne({attributes: [[sequelize.fn('AVG', sequelize.col('preco')), 'mediaPrecos']]})
      const mediaPrecos = resultado.dataValues.mediaPrecos

      res.status(200).json({totalLivros, somaPrecos, maiorPreco, menorPreco, mediaPrecos: mediaPrecos.toFixed(2)})
    } else {
      res.status(404).json({msg: 'Não há livros cadastrados!'})
    }
    
  } catch(error) {
      res.status(400).json({msg: error.message})
      return
  }
})

router.get('/resumo/grafico', async (req, res) => {
  try {
    if(await Livros.count() > 0) {
      const agrupadoAno = await Livros.findAll({attributes: [
        'anoPublicacao',
          [sequelize.fn('COUNT', sequelize.col('id')), 'totalLivros'],
          [sequelize.fn('SUM', sequelize.col('preco')), 'somaPrecos'],
          [sequelize.fn('MIN', sequelize.col('preco')), 'menorPreco'],
          [sequelize.fn('MAX', sequelize.col('preco')), 'maiorPreco'],
          [sequelize.fn('AVG', sequelize.col('preco')), 'mediaPrecos'],
       ]
        , group: ['anoPublicacao']
        , order: [['anoPublicacao', 'ASC']]
      })
      res.status(200).json({agrupadoAno})
    } else {
      res.status(404).json({msg: 'Não há livros cadastrados!'})
      return
    } 
    } catch (error) {
      res.status(400).json({msg: error.message})
      return
   } 
})

module.exports = router



