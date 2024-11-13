const frm = document.querySelector('form')
const inPalavra = document.querySelector('#inPalavra')
const outResp = document.querySelector('#outResp')

frm.addEventListener('submit', (invertePalavra) =>{
  invertePalavra.preventDefault()
  let resp = ''
  const palavra = inPalavra.value.toLowerCase()
  for(let i = palavra.length - 1; i >= 0; i--){
    const letra = palavra.charAt(i)
    if(i == palavra.length - 1){
      resp += letra.toUpperCase()
    } else {
      resp += letra
    }
  }
  outResp.innerText = resp
})