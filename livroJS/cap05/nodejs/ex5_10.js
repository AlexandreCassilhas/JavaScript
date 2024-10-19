const prompt = require('prompt-sync')()
const valor = Number(prompt('Digite o valor do produto:'))
const numParcelas = Number(prompt('Digite o número de parcelas:'))
const valorParcela = Math.floor(valor / numParcelas)
const ultimaParcela = valorParcela + (valor - (valorParcela * numParcelas))

console.log(`Valor: R$ ${valor.toFixed(2)}`)
console.log(`Número de Parcelas: ${numParcelas}`)
for (let i = 1; i < numParcelas; i++) {
  console.log(`Parcela ${i} - R$ ${valorParcela.toFixed(2)}`)
}
console.log(`Parcela ${numParcelas} - R$ ${ultimaParcela.toFixed(2)}`)