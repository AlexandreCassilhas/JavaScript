const prompt = require('prompt-sync')()

const formula = prompt('Digite a fórmula para validação:')

const tamanho = formula.length
let contAberto = 0
let contFechado = 0
for(let i = 0; i < tamanho; i++){
  if (formula[i] == '('){
    contAberto++
  }
  if (formula[i] == ')'){
    contFechado++
  }
  if (contAberto < contFechado){
    console.log(`Erro na fórmula`)
    break // interrompe se ) > (
  }
}
if (contAberto > contFechado){
  console.log(`Erro na fórmula`)
} else if (contAberto == contFechado){
  console.log(`Formula Ok`)
}
