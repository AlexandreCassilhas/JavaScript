import {retiraEspacos,
        insereLocalStorage, 
        pesquisaLocalStorage} 
from "../../modules/minhasFuncoes.js"

const frm = document.querySelector('form')
const inPalavra = document.getElementById('inPalavra')
const inDica = document.getElementById('inDica')
const saida = document.getElementById('saida')

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const palavra = inPalavra.value
  const dica = inDica.value
  const palavraLimpa = retiraEspacos(palavra) 
  let erro = false
  // checando se existe espaços
  if(palavraLimpa.includes(' ')){
    alert(`A palavra não pode conter espaços. Informe uma palavra válida!`)
    erro = true
    inPalavra.value = ''
    inPalavra.focus()
    return
  }
  // checa a presença de vírgulas na dica
  if(dica.includes(',')){
    alert('A dica não pode conter vírgulas. Informe uma dica válida!')
    erro = true
    inDica.focus()
    return
  }
  // Checa se palavra já se encontra cadastrada no localstorage
  if(pesquisaLocalStorage('jogoPalavra', palavraLimpa)){
    alert(`A palavra ${palavraLimpa} já se encontra cadastrada. Digite outra palavra!`)
    erro = true
    inPalavra.value = ''
    inPalavra.focus()
    return
  }
  // Realiza a inserção da palavra e da dica nos respectivos localStorages
  if(!erro){
    insereLocalStorage('jogoPalavra', palavraLimpa)
    insereLocalStorage('jogoDica', dica)
    alert (`Palavra ${palavraLimpa} cadastrada com sucesso!`)
    frm.reset()
    inPalavra.focus()
    return
  }
})


