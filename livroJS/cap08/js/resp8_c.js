const frm = document.querySelector('form')
const inValor = document.querySelector('#inValor')
const labelConvenio = document.querySelector('.labelConvenio')
const inConvenio = document.querySelector('#inConvenio')
const rbSim = document.querySelector('#rbSim')
const rbNao = document.querySelector('#rbNao')
const outResp = document.querySelector('#outResp')

frm.rbSim.addEventListener('click', () =>{
  labelConvenio.className = 'exibe'
  inConvenio.className = 'exibe'
})

frm.rbNao.addEventListener('click', () =>{
  labelConvenio.className = 'oculta'
  inConvenio.className = 'oculta'
})

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const valor = Number(inValor.value)
  if(rbSim.checked){
    const num = inConvenio.selectIndex
    const convenio = inConvenio.options[num].text
  } else {
    const convenio = 'Sem Convênio'
  }
  const desconto = calcularDesconto(valor, convenio)
  const pagar = valor - desconto

  outResp.innerText = `Desconto: R$ ${desconto}\nA pagar: ${pagar}`
})

function calcularDesconto(valor, convenio) {
  const percentual = convenio == 'Sem convênio' ? 10 : convenio == 'Amigo dos Animais' ? 20 : 50
  const desconto = valor * percentual / 100
  return desconto
}