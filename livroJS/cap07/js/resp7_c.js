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

  // Cálculo da Data-Limite (90 dias da Data-Infração)
  const passados = hoje - dataInfracao
  const diasPassados = passados / 86400000
  const diasFaltam = 90 - diasPassados
  dtLimite.setDate(dtLimite.getDate() + diasFaltam)

  // Calculando o desconto
  const multaDesconto = vlMulta - (vlMulta * 20 / 100)
  // Exibindo a resposta no DOM
  const ddInf = dataInfracao.getDate().toString().padStart(2, '0')
  const mmInf = (dataInfracao.getMonth() + 1).toString().padStart(2, '0')
  const aaaaInf = dataInfracao.getFullYear().toString()
  const ddLim = dtLimite.getDate().toString().padStart(2, '0')
  const mmLim = (dtLimite.getMonth() + 1).toString().padStart(2, '0')
  const aaaaLim = dtLimite.getFullYear().toString()
  // Montando a apresentação no DOM
  outResp.innerText = `Valor da Infração: R$ ${vlMulta.toFixed(2)}\nData da Infração: ${ddInf}/${mmInf}/${aaaaInf}\nData Limite para o Pagamento: ${ddLim}/${mmLim}/${aaaaLim}\nValor com o desconto de 20%: R$ ${multaDesconto.toFixed(2)}`
})

frm.btnNovaInfracao.addEventListener('click', () =>{
  outResp.innerText = ''
  frm.reset()
  inDtInfracao.focus()
})