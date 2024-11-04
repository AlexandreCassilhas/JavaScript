const prompt = require('prompt-sync')()
console.log('Informe o aluno e nota e, quando terminar, digite "Fim"')
const alunos = []
do{
  const nome = prompt('Digite o nome do Aluno:')
  if (nome == 'Fim'){
    break
  }
  const nota = Number(prompt('Digite a Nota:'))
  alunos.push({nome, nota})
  console.log('Aluno Cadastrado com sucesso!')
}while(true)
let listaAlunos = ''
let listaMaioresNotas = ''
const maiorNota = alunos.reduce((a, b) => Math.max(a, b.nota), 0)
console.log(`A maior nota da turma foi: ${maiorNota}`)
if (maiorNota < 7){
  console.log('Nenhum aluno atingiu a nota mínima.')
}
for(aluno of alunos){
  listaAlunos += `${aluno.nome.padEnd(20)} | Nota: ${aluno.nota.toFixed(2)}\n`

  if(Number(aluno.nota) >= 7){
    listaMaioresNotas += `${aluno.nome.padEnd(20)} | ${aluno.nota.toFixed(2)}\n`
  }
}
console.log(`\nLista de Alunos:\n${'-'.repeat(21)}+${'-'.repeat(13)}\n${listaAlunos}${'-'.repeat(21)}+${'-'.repeat(13)}`)
console.log(`\nLista de Alunos com notas >= 7.00:\n${'-'.repeat(21)}+${'-'.repeat(13)}\n${listaMaioresNotas}${'-'.repeat(21)}+${'-'.repeat(13)}`)

