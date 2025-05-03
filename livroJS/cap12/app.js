const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Olá... Bem vindo!')
})

app.get('/cap12', (req, res) => {
  res.send('<h2>Capítulo 12: Introdução ao Express')
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${3001}`)
})