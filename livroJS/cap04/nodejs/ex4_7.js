// Usando a execução via prompt de Comando
const prompt = require('prompt-sync')()
// Entrada de Dados
const numPessoas = Number(prompt('Digite o nº de Pessoas: '))
const numPeixes = Number(prompt('Digite o nº de Peixes: '))
// Processamento
let valorPagar = 0
if (numPeixes <= numPessoas) {
  valorPagar = numPessoas * 20
} else {
  valorPagar = (numPessoas * 20) + ((numPeixes - numPessoas) * 12)
}
// Saída do Programa
console.log(`Nº de Pessoas: ${numPessoas}`)
console.log(`Nº de Peixes: ${numPeixes}`)
console.log(`Valor a Pagar R$: ${valorPagar.toFixed(2)}`)