const frm = document.querySelector('form')
const inClube = document.getElementById('inClube')
const resultado = document.getElementById('resultado')
const tabela = document.querySelector('table')
const btnMostrarTabela = document.getElementById('btnMostrarTabela')
const btnNovosClubes = document.getElementById('btnNovosClubes')

frm.addEventListener('submit', (e) => {
  e.preventDefault()
  const clube = inClube.value
  const nomeClube = document.createTextNode(clube)
  const h5 = document.createElement('h5')
  h5.style.textAlign = 'right'
  h5.appendChild(nomeClube)
  resultado.appendChild(h5)
  inClube.value = ''
  inClube.focus()
})

btnMostrarTabela.addEventListener('click', () => {
  const clubes = document.querySelectorAll('h5')
  if (clubes.length % 2 != 0) {
    alert(`Estão cadastrados somente ${clubes.length} clubes. É necessário que o número de clubes cadastrados seja par.`)
    inClube.focus()
    return
  } else {
      for(let i = 0; i < clubes.length; i++){
        if (i % 2 == 0){
          // cria a linha e as colunas na tabela
          const linha = tabela.insertRow(-1)
          var col1 = linha.insertCell(0)
          var col2 = linha.insertCell(1)
          var col3 = linha.insertCell(2)
          // insere o clube na 1ª coluna e o 'x' na 2ª coluna da tabela
          col1.innerText = clubes[i].innerText
          col2.innerText = 'x'
        } else {
          // insere o clube na 3ª coluna da tabela
          col3.innerText = clubes[i].innerText
        }
      }
  }
  btnAdicionar.disabled = true
  btnMostrarTabela.disabled = true
})

btnNovosClubes.addEventListener('click', () => {
  window.location.reload()
})