import { retiraEspacos } from "../../minhasFuncoes"

const frm = document.querySelector('form')
const inPalavra = document.getElementById('inPalavra')
const inDica = document.getElementById('inDica')
const saida = document.getElementById('saida')

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const palavra = inPalavra.value
  const palavraLimpa = retiraEspacos(palavra)

  saida.innerText = palavraLimpa
})


