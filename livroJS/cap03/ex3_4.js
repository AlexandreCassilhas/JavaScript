// Utilizando a execução em formato de Linha de Comando
const prompt = require('prompt-sync')()

// Entrada de dados, processamento e saída
const peso = Number(prompt('Peso da Ração (kg): '))
const consumo = Number(prompt('Consumo Diário (gr): '))
const pesoGr = peso * 1000
const duracao = Math.floor(pesoGr/consumo)
const sobra = (pesoGr % consumo).toFixed(2)
console.log(`Duração: ${duracao}`)
console.log(`Sonbra: ${sobra} gr`)
