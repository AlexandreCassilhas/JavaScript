const prompt = require('prompt-sync')()

const clientes = []
let listaClientes = ''
let listaMais = ''
let listaMenos = ''

console.log('Cadastre os clientes e digite "Fim" para encerrar.')
do{
  const nome = prompt('Digite o nome do cliente:')
  if(nome == 'Fim'){
    break
  }
  const idade = Number(prompt('Digite a idade do cliente:'))
  clientes.push({nome, idade})
  console.log('Cliente cadastrado com sucesso!')
}while(true)

clientes.forEach((cliente, i) =>{
  listaClientes += `${cliente.nome} - (idade: ${cliente.idade})\n`
})
console.log(`\nLista de Clientes:\n${'-'.repeat(17)}\n${listaClientes}`)

const menosSessenta = clientes.filter(cliente => cliente.idade < 60)
const maisSessenta = clientes.filter(cliente => cliente.idade >= 60)

menosSessenta.forEach((cliente, i) => {
    listaMenos = listaMenos + `${i + 1} - ${cliente.nome.padEnd(15)} (idade: ${cliente.idade} anos)\n`
})

maisSessenta.forEach((cliente, i) => {
    listaMais += `${i + 1} - ${cliente.nome.padEnd(15)} (idade: ${cliente.idade})\n`
})

console.log(`\nFila Preferencial:\n${'-'.repeat(17)}+${'-'.repeat(12)}\n${listaMais}`)

console.log(`\nFila Normal:\n${'-'.repeat(17)}+${'-'.repeat(12)}\n${listaMenos}`)