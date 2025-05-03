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

app.post('/filmes', (req, res) => {
  const titulo = req.body.titulo
  const genero = req.body.genero
  // poderia ser const {titulo, genero} = req.body
  res.send(`Filme; ${titulo} - Gênero: ${genero}, recebido...`)
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${3001}`)
})