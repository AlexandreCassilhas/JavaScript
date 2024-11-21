const frm = document.querySelector('form')
const inDtInfracao = document.querySelector('#inDtInfracao')
const inVlMulta = document.querySelector('#inVlMulta')
const outResp = document.querySelector('#outResp')

frm.addEventListener('submit', (calculaDtLimite) =>{
  calculaDtLimite.preventDefault()
  // recupera os dados do formulário
  const dtInfracao = inDtInfracao.value
  const vlMulta = Number(inVlMulta.value)
  // Cria as constantes para manipular data
  const hoje = new Date()
  const dtLimite = new Date()
  const dataInfracao = new Date()
  // obtendo os valores do campo "dtInfracao" e transformando em data
  const partes = dtInfracao.split('-')
  dataInfracao.setDate(partes[2])
  dataInfracao.setMonth(partes[1] - 1)
  dataInfracao.setFullYear(partes[0])
  // Acrescendo 90 dias a data da infração e atribuindo a dtLimite
  dtLimite.setDate(dataInfracao.getDate() + 30)
  // Calculando o desconto
  const multaDesconto = vlMulta - (vlMulta * 20 / 100)
  // Exibindo a resposta no DOM
  outResp.innerText = `Valor da Infração: R$ ${vlMulta.toFixed(2)}\nData da Infração: ${dataInfracao.getDate()}/${dataInfracao.getMonth() + 1}/${dataInfracao.getFullYear()}\nData Limite para o Pagamento: ${dtLimite.getDate()}/${dtLimite.getMonth() + 1}/${dtLimite.getFullYear()}\nValor com o desconto de 20%: R$ ${multaDesconto.toFixed(2)}`
})

frm.btnNovaInfracao.addEventListener('click', () =>{
  outResp.innerText = ''
  dtLimite = ''
  frm.reset()
  inDtInfracao.focus()
})