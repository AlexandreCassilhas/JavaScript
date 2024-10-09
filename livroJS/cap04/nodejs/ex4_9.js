const prompt = require('prompt-sync')()

const numero = Number(prompt('Digite um número (centena):'))

if (numero < 100 || numero >= 1000){
  console.log('Erro... o número deve ser uma centena (entre 100 e 999')
  return
}

const alg1 = Math.floor(numero / 100)
const sobra = numero % 100
const alg2 = Math.floor(sobra / 10)
const alg3 = sobra % 10
console.log(`Sobra: ${sobra}`)
console.log(`Número Invertido: ${alg3}${alg2}${alg1}`)
