// Instanciando as variáveis do DOM
const frm = document.querySelector('form')
const inValor = document.querySelector('#inValor')
const labelConvenio = document.querySelector('.labelConvenio')
const inConvenio = document.querySelector('#inConvenio')
const rbSim = document.querySelector('#rbSim')
const rbNao = document.querySelector('#rbNao')
const outResp = document.querySelector('#outResp')
// Exibindo a caixa de seleção e o label
frm.rbSim.addEventListener('click', () =>{
  labelConvenio.className = 'exibe'
  inConvenio.className = 'exibe'
})
// Ocultando a caixa de seleção e o label
frm.rbNao.addEventListener('click', () =>{
  labelConvenio.className = 'oculta'
  inConvenio.className = 'oculta'
})
// Criando o listener do botão
frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  let convenio = ''
  const valor = Number(inValor.value)
  if(rbSim.checked){
    const num = inConvenio.selectedIndex
    convenio = inConvenio.options[num].text
  } else {
    convenio = 'Sem Convênio'
  }
  const desconto = calcularDesconto(valor, convenio)
  const pagar = valor - desconto
  // Apresentando o resultado no DOM
  outResp.innerText = `Valor Cheio: R$ ${valor}\nDesconto: R$ ${desconto.toFixed(2)}\nA pagar: R$ ${pagar.toFixed(2)}`
})
// Função para calcular o desconto pelo convênio
function calcularDesconto(valor, convenio) {
  const percentual = convenio == 'Sem Convênio' ? 10 : convenio == 'Amigo dos Animais' ? 20 : 50
  const desconto = valor * percentual / 100
  return desconto
}