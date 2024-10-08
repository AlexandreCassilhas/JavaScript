const prompt = require('prompt-sync')();
const num1 = Number(prompt('1º Número: '));
const num2 = Number(prompt('2º Número: '));
const soma = num1 + num2;
console.log(`A soma de ${num1} com ${num2} é igual a ${soma}`);