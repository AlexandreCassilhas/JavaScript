// Instanciando o form
const frm = document.querySelector('form')
const listaContas = document.querySelector('#outListaContas')
const totalizaContas = document.querySelector('#outTotalizaContas')

// Inicializando as variáveis globais
let vListaContas = ''
let vNumeroContas = 0
let vValorTotal = 0

frm.addEventListener('submit', (registraTotalizaContas) => {
  // Evita o reload do form
  registraTotalizaContas.preventDefault()
  // capturando o conteúdo digitado nos campos
  const vDescricaoConta = frm.inDescricaoConta.value
  const vValorPagar = Number(frm.inValorPagar.value)
  // Processamento dos dados
  vNumeroContas++
  vValorTotal = vValorTotal + vValorPagar
  vListaContas = vListaContas + `${vDescricaoConta} - R$ ${vValorPagar.toFixed(2)} \n`
  // Exibindo os resultados
  listaContas.innerText = `${vListaContas} \n-----------------------------------`
  totalizaContas.innerText = `${vNumeroContas} Contas - Total: R$ ${vValorTotal.toFixed(2)}`
  // Limpando os campos e focando no campo descrição
  frm.inDescricaoConta.value = ''
  frm.inValorPagar.value = ''
  frm.inDescricaoConta.focus()
})