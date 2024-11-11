const frm = document.querySelector('form')
const entCandidato = document.querySelector('#inCandidato')
const entAcertos = document.querySelector('#inAcertos')
const saiResp = document.querySelector('#outResp')

entCandidato.value = ''
entCandidato.focus()
const candidatos = []

const acertosAprovacao = Number(prompt('Digite o número de acertos para aprovação:'))

frm.addEventListener('submit', (adicionarCandidato) =>{
  adicionarCandidato.preventDefault()
  const nome = entCandidato.value 
  const acertos = entAcertos.value
  candidatos.push({nome, acertos})

  frm.reset()
  entCandidato.focus()

  frm.btnListarTodos.dispatchEvent(new Event('click'))
})

frm.btnListarTodos.addEventListener('click', (listarTodos) => {
  let listaCandidatos = ''
  for(candidato of candidatos){
    listaCandidatos += `${candidato.nome} - ${candidato.acertos}\n` 
  }
  saiResp.innerText = `Lista de Candidatos:\n${'-'.repeat(30)}\n${listaCandidatos}`
})

frm.btnAprovados.addEventListener('click', (listarAprovados) =>{
  let listaAprovados = ''
  const aprovados = candidatos.filter((aux) => aux.acertos >= acertosAprovacao)
  aprovados.sort((a, b) => a.acertos - b.acertos).reverse()

  aprovados.forEach((aprovado, i) =>{
    listaAprovados += `${i+1} - ${aprovado.nome.padEnd(20)} - ${aprovado.acertos}\n`
  })
  saiResp.innerText = `Lista de Aprovados:\n${'-'.repeat(30)}\n${listaAprovados}`
})

