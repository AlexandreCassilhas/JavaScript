// Executando via Linha de Comando
const prompt = require('prompt-sync')()
// Entrada de Dados
const valorCompra = Number(prompt('Digite o valor da Compra: '))
// Processamento
let numParcelas = 0
let valorParcelas = 0
const numDivs = Math.floor(valorCompra / 20)
if (numDivs == 0) {
  numParcelas = 1
} else if (numDivs > 6) {
  numParcelas = 6
} else {
  numParcelas = numDivs
}
valorParcelas = valorCompra / numParcelas
// Saída do programa
console.log (`Valor da Compra R$: ${valorCompra.toFixed(2)}`)
console.log(`Quantidade de Parcelas: ${numParcelas}`)
console.log(`Valor da Parcela R$: ${valorParcelas.toFixed(2)}`)