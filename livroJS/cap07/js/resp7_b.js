const frm = document.querySelector('form')
const inFrase = document.querySelector('#inFrase')
const outResp = document.querySelector('#outResp')

frm.addEventListener('submit', (verificaPolindromo) =>{
  verificaPolindromo.preventDefault()

  const frase = inFrase.value
  // substitui todos os espaços por ''
  const vFrase = frase.replace(/ /g, '').toUpperCase()
  let inverso = ''
  for(let i = frase.length; i >= 0; i--){
    inverso += frase.charAt(i) // Obtém cada caracter conforme posição
  }
  // substitui todos os espaços por ''
  const vInverso = inverso.replace(/ /g, '').toUpperCase() 
  if(vFrase == vInverso){
    outResp.innerText = `Frase: ${vFrase} e Inverso: ${vInverso}\nSÃO POLÍNDROMOS.`
  } else {
    outResp.innerText = `Frase: ${vFrase} e Inverso: ${vInverso}\nNÃO SÃO POLÍNDROMOS.`
  }

})