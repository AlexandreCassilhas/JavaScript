const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Olá... Bem vindo!')
})

app.get('/cap12', (req, res) => {
  res.send('<h2>Capítulo 12: Introdução ao Express. Após a falha e clone do repositório. Sucesso!!!</h2>')
})

// middleware informando que será utilizado o formato JSON para troca de informações
app.use(express.json())

const livrosRouter = require('./livros')

app.use('/livros', livrosRouter)




app.post('/filmes', (req, res) => {
  const titulo = req.body.titulo
  const genero = req.body.genero
  // poderia ser const {titulo, genero} = req.body
  res.send(`Filme: ${titulo} - Gênero: ${genero}, recebido...`)
})

// Exemplo de middleware que é executado sempre que uma determinada
// rota for solicitada. Como exemplo, um log de transações bancárias
function log(req, res, next) {
  console.log(`.............. Acessado em ${new Date()}`)
  next() // serve para acionar a rota que se pretende acessar
}

// Toda vez que a rota transfere for acionada, será disparada uma msg no prompt
// "app.use(log)" -> desta forma, todas as rotas abaixo passariam pelo middleware
// Não seria necessário colocá-lo na declaração de rota
app.get('/transfere', log, (req, res) => {
  res.send('Ok! Valor transferido com sucesso!')
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})