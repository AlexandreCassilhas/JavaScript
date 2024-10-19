const frm = document.querySelector('form')
const simbolos = document.querySelector('#outSimbolos')

frm.addEventListener('submit', (preencheEspaco) => {
  preencheEspaco.preventDefault()
  const vSimbolos = Number(frm.inNumSimbolos.value)
  let vPreenche = ''
  for (let i = 1; i <= vSimbolos; i++){
    if (i % 2 == 0) {
      vPreenche = vPreenche + '*'
    } else {
      vPreenche = vPreenche + '-'
    }
  }
  simbolos.innerText = vPreenche
})