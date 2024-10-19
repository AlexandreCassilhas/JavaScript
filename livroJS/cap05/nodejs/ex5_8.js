const prompt = require('prompt-sync')()
console.log('Programa Copas do Mundo. Digite 0 para sair.')
console.log('--------------------------------------------')
do {
  const ano = Number(prompt('Digite um ano:'))
  if (ano == 0) {
    break
  } else if (ano == 1942 || ano == 1946) {
    console.log(`O ano de ${ano} não foi ano de Copa do Mundo, devido a II Guerra Mundial.`)
  } else if (ano >= 1930 && ano % 4 == 2) {
    if (ano < 2024) {
      console.log(`O ano de ${ano} foi ano de Copa do Mundo`)
    } else {
      console.log (`O ano de ${ano} será ano de Copa do Mundo`)
    }
  } else {
    if (ano < 2024) {
      console.log(`O ano de ${ano} não foi ano de Copa do Mundo`)
    } else {
      console.log(`O ano de ${ano} não será ano de Copa do Mundo`)
    }
  }
} while(true)

