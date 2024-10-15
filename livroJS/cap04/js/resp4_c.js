const frm = document.querySelector('form')
const tempo = document.querySelector('#outTempo')
const troco = document.querySelector('#outTroco')

frm.addEventListener('submit', (calculaValor) => {
  calculaValor.preventDefault()

  const vlEntrada = frm.inValor.value
  const vTempo = vlEntrada < 1 ? 0 : vlEntrada >= 1 && vlEntrada < 1.75 ? 30 :  vlEntrada >= 1.75 && vlEntrada < 3 ? 60 : 120
  const vlTroco = vTempo == 0 ? 0 : vTempo == 30 ? vlEntrada - 1 : vTempo == 60 ? vlEntrada - 1.75 : vlEntrada - 3

  if (vTempo == 0) {
    alert('Valor Insuficiente')
  } else {
   tempo.innerText = `Tempo: ${vTempo}`
   if (vlTroco == 0) {
    troco.innerText = ''
   } else {
    troco.innerText = `Troco R$: ${vlTroco.toFixed(2)}`
   }
  }
})