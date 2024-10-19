const frm = document.querySelector('form')
const frutas = document.querySelector('#outFrutas')

frm.addEventListener('submit', (repeteFrutas) => {
  repeteFrutas.preventDefault()
  let sequencia = ''
  const fruta = frm.inFruta.value
  const vezes = frm.inVezes.value
  for (let i = 1; i <= vezes; i++) {
    sequencia = sequencia + fruta + ' * '
  }
  frutas.innerText = sequencia
})