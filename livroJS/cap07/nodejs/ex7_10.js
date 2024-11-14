const prompt = require('prompt-sync')()

const linhas = Number(prompt('Digite quantas linhas você deseja a árvore:'))
console.log()
for(let i = 0; i < linhas; i++){
  console.log(`${'**'.repeat(i + 1).padStart(30 + i)}`)
}

console.log(`${'**'.padStart(30)}`)
console.log(`${'****'.padStart(31)}`)
