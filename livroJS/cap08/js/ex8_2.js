const frm = document.querySelector('form')
const inModelo = document.querySelector('#inModelo')
const inAno = document.querySelector('#inAno')
const inPreco = document.querySelector('#inPreco')
const outClassificacao = document.querySelector('#outClassificacao')
const outEntradaParcelas = document.querySelector('#outEntradaParcelas')
const hoje = new Date()
const anoAtual = hoje.getFullYear()

// Função para Retornar a classificação do veículo
const classificaCarro = (ano) => {
  const classifica = (ano == anoAtual) ? 'Novo': (ano >= (anoAtual - 2)) ? 'Seminovo': 'Usado'
  return classifica
}
// Função para Retornar o Valor de Entrada
const calculaEntrada = (preco, classificacao) => {
  const entrada = (classificacao == 'Novo') ? (preco * 0.5) : (preco * 0.3)
  return entrada
}
// Função para Retornar o Valor das Parcelas
const calculaParcelas = (preco, vlEntrada) => {
  const parcela = (preco - vlEntrada) / 10
  return parcela
}

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const modelo = inModelo.value
  const ano = Number(inAno.value)
  const preco = Number(inPreco.value)
  // Chamada das funções passando os parâmetros
  const classificacao = classificaCarro(ano)
  const vlEntrada = calculaEntrada(preco, classificacao)
  const vlParcela = calculaParcelas(preco, vlEntrada)
  // Saída e formatação do DOM
  outClassificacao.innerText = `Veículo: ${modelo} / Ano: ${ano}\nPreço: R$ ${preco.toFixed(2)} - Classificação: ${classificacao}`
  outEntradaParcelas.innerText = `Forma de Pagamento:\nEntrada: R$ ${vlEntrada.toFixed(2)} + 10 x R$ ${vlParcela.toFixed(2)}`
})