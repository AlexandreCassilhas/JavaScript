const frm = document.querySelector('form')
const resp = document.querySelector('#outResp')

frm.addEventListener('submit', (verificaPrimo) => {
  verificaPrimo.preventDefault()
  const vNumero = frm.inNumero.value
  let contador = 0
  let divisores = ''
  for (let i = 1; i <= vNumero; i++) {
    if (vNumero % i == 0) {
      contador++
      divisores = divisores + ` ${i} `
    } else {
      continue
    }
  }
  if (contador > 2) {
    resp.innerText = `O número ${vNumero} não é primo.\nSeus divisores são: ${divisores}`
  }
  else {
    resp.innerText = `O número ${vNumero} é primo.\nSeus divisores são: ${divisores}`
  }

  frm.inNumero.value = ''
  frm.inNumero.focus()
})