const prompt = require('prompt-sync')()

const qtdParcelas = Number(prompt('Digite a quantidade de parcelas?'))
const datasPgto = []
const data = new Date()
for(let i = 0; i < qtdParcelas; i++){
  data.setMonth(data.getMonth() + 1) // aqui adiciona 1 mês a cada loop
  const dia = data.getDate()
  const mes = data.getMonth() + 1 // aqui pega o mês correto (lembrando: 0 a 11)
  const ano = data.getFullYear()
  console.log(`${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`)
}
