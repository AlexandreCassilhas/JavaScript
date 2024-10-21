const frm = document.querySelector('form')
const previsao = document.querySelector('#outPrevisao')

frm.addEventListener('submit', (calcularPrevisao) => {
  calcularPrevisao.preventDefault()

  const qtdChinchilas = Number(frm.inNumChinchilas.value);
  const anos = Number(frm.inAnos.value)
  let acumulaChinchilas = qtdChinchilas
  let listaAnos = `1º Ano: ${qtdChinchilas} Chinchilas\n`
  for (let i = 2; i <= anos; i++) {
    acumulaChinchilas = acumulaChinchilas * 3
    listaAnos = listaAnos + `${i}º Ano: ${acumulaChinchilas} Chinchilas\n`
  }
  previsao.innerText = `${listaAnos}`
})