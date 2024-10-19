const prompt = require('prompt-sync')()

const nomeProduto = prompt('Digite o nome do Produto:')
const numEtiquetas = Number(prompt('Quantas Etiquetas?'))

for (let i = 1; i <= numEtiquetas / 2; i++) {
  console.log(`${nomeProduto.padEnd(30)} ${nomeProduto.padEnd(30)}\n`)
}
if (numEtiquetas % 2 == 1){
  console.log(`${nomeProduto.padEnd(30)}`)
}