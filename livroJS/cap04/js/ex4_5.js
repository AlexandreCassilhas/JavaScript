// Instancia o Form
const frm = document.querySelector('form')
// Instancia a saída
const vRaizQuadrada = document.querySelector('#outRaizQuadrada')

// Cria o Listener o processamento e a saída
frm.addEventListener('submit', (calculaRaizQuadrada) => {

  // Evita o reload do form
  calculaRaizQuadrada.preventDefault()

  const vNumero = Number(frm.inNumero.value)
  const vCalculo = Math.sqrt(vNumero)

  // Saída do prg
  if (Number.isInteger(vCalculo)) {
    vRaizQuadrada.innerText = `A Raiz Quadrada de ${vNumero} é\n ${vCalculo}`
  } else {
    vRaizQuadrada.innerText = `Não há raiz exata para o número ${vNumero}\nA raiz aproximada é ${vCalculo.toFixed(2)}`
  }
  // checa se a raiz quadrada é um número inteiro
})