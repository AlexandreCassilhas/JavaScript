// Utilizando o formato de programa em Linha de Comando
const prompt = require('prompt-sync')()

// Entrada de Dados
const salario = Number(prompt('Digite o Salário: '))
const tempo = Number(prompt('Digite o tempo de serviço: '))
const quadrienios = Math.floor(tempo/4)
const salarioFinal = salario + (salario * quadrienios)/100
console.log(`Quadriênios: ${quadrienios}`)
console.log(`Salário Final: R$ ${salarioFinal.toFixed(2)}`)
