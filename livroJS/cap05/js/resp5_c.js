const frm = document.querySelector('form')
const divisores = document.querySelector('#outDivisores')
const resposta = document.querySelector('#outResposta')

frm.addEventListener('submit', (verificaPerfeito) => {
  verificaPerfeito.preventDefault()
  const numero = frm.inNumero.value
  let acumulaDivisores = ''
  let somaDivisores = 0
  for (let i = 1; i <= numero / 2; i++) {
    if (numero % i == 0) { 
      acumulaDivisores = acumulaDivisores + `${i} - `
      somaDivisores = somaDivisores + i
    } else {
      continue
    }
  }
  divisores.innerText = `Os divisores do número ${numero} são:\n${acumulaDivisores}${numero} \n \nA Soma dos divisores, exceto o ${numero} é ${somaDivisores}\n`

  if (numero == somaDivisores) {
    resposta.innerText = `O número ${numero} é um número perfeito`
  } else {
    resposta.innerText = `O número ${numero} não é um número perfeito`
  }
})