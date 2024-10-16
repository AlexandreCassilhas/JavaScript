const frm = document.querySelector('form')
const resp = document.querySelector('#outResp')

frm.addEventListener('submit', (verificaVelocidade) => {
  verificaVelocidade.preventDefault()
  const velPermitida = Number(frm.inVelocidadePermitida.value)
  const velCondutor = Number(frm.inVelocidadeCondutor.value)

  const situacao = velCondutor > (velPermitida + velPermitida * 0.20) ? 'Multa Grave' : velCondutor > velPermitida && velCondutor <= (velPermitida + velPermitida * 0.20) ? 'Multa Leve' : 'Sem Multa'

  resp.innerText = `Velocidade Permitida: ${velPermitida}\nVelocidade do Condutor: ${velCondutor}\nSituação: ${situacao} `
})