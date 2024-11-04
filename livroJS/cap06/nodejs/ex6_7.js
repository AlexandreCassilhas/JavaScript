const prompt = require('prompt-sync')()

const saques = []
let listaValidos = []
let listaInvalidos = []

console.log(`\nLançamento dos saques. Digite 0 para sair.`)

do{
  const valor = Number(prompt('Digite o valor:'))
  if(valor == 0){
    break
  }
  if (valor % 10 == 0){
    console.log(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso!`)
  } else {
    console.log(`O valor de ${valor.toFixed(2)} não é múltiplo de 10. Saque Inválido`)
  }
  saques.push(valor)

}while(true)

const saquesValidos = saques.filter(valor => valor % 10 == 0)
const saquesInvalidos = saques.filter(valor => valor % 10 != 0)
const somaSaquesValidos = saquesValidos.reduce((total, valor) => total + valor, 0)

saquesValidos.forEach((saque, i) =>(
  listaValidos += `Saque ${i+1}: ${saque.toFixed(2)}\n`
))

saquesInvalidos.forEach((saque, i) =>(
  listaInvalidos += `Saque: ${saque.toFixed(2)}\n`
))

console.log(`\nLista de Saques Válidos:\n${'-'.repeat(15)}\n${listaValidos}`)
console.log(`Lista de Saques Inválidos:\n${'-'.repeat(15)}\n${listaInvalidos}`)
console.log(`\nA soma dos saques válidos é: R$ ${somaSaquesValidos.toFixed(2)}`)