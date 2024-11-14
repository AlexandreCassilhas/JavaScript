// Instanciando as variáveis dos elementos do DOM
const frm = document.querySelector('form')
const inDtVencimento = document.querySelector('#inDtVencimento')
const inVlConta = document.querySelector('#inVlConta')
const outVlMulta = document.querySelector('#outVlMulta')
const outVlJuros = document.querySelector('#outVlJuros')
const outTotalPagar = document.querySelector('#outTotalPagar')
const outResp = document.querySelector('#outResp')
// Instanciando as Taxas Fixas nas constantes
const TX_MULTA = 2 / 100
const TX_JUROS = 0.33 / 100

frm.addEventListener('submit', (calcularMulta) =>{
  calcularMulta.preventDefault()
  outResp.innerText = ''
  const dtVencimento = inDtVencimento.value
  const vlConta = Number(inVlConta.value)
  const hoje = new Date() // criando o objeto Date em 'hoje'
  const vencimento = new Date() // criando o objeto Date em 'vencimento'

  // Divide a string dt em três partes (aaaa-mm-dd)
  const partes = dtVencimento.split('-') 
  vencimento.setDate(Number(partes[2])) // seta o dia
  vencimento.setMonth(Number(partes[1]) - 1) //seta o mês (0-JAN 1-FEV...11-DEZ)
  vencimento.setFullYear(Number(partes[0])) // seta o ano
  outResp.innerText = vencimento
  const atraso = hoje - vencimento // calcula o atraso subtraindo o hoje do vencimento
  let multa = 0
  let juros = 0
  // Se houver atraso, realiza os cálculos da multa e juros
  if (atraso > 0){
    const dias = atraso / 86400000 // Calcula a quantidade de dias
    multa = vlConta * TX_MULTA // calcula a multa baseada na taxa
    juros = vlConta * TX_JUROS * dias // calcula os juros baseados na tx e nos dias
    // outResp.innerText = `Conta paga com ${dias} de atraso.`
  }
  const total = vlConta + multa + juros
  outVlMulta.value = multa.toFixed(2)
  outVlJuros.value = juros.toFixed(2)
  outTotalPagar.value = total.toFixed(2)
})

frm.btnNovaConta.addEventListener('click', (e) =>{
  frm.reset()
  inDtVencimento.focus()
  outResp.innerText = ''
})