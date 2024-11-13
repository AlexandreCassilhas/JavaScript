const frm = document.querySelector('form')
const outResp = document.querySelector('.entre-letras')

frm.addEventListener('submit', (exibirDica) =>{
  exibirDica.preventDefault()
  const palavra = frm.inPalavra.value.toUpperCase()
  let resposta = ''

  for(const letra of palavra) {
    if(letra == palavra.charAt(0)){
      resposta += palavra.charAt(0)
    } else {
      resposta += '_'
    }
  }
outResp.innerText = resposta
frm.inPalavra.value = '*'.repeat(palavra.length)

})