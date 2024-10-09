const frm = document.querySelector('form')
const resp = document.querySelector('#outResp')

frm.addEventListener('submit', (verificaNum) => {

  verificaNum.preventDefault()

  const numero = Number(frm.inNumero.value)

  // Condição com o operador ternário
  const result = numero % 2 == 0 ? 'Par': 'Ímpar'

  resp.innerText = `O número ${numero} é ${result}`
})