const frm = document.querySelector('form')
const divMoedas = document.querySelector('#divMoedas')
const inSoma = document.querySelector('#inSoma')
const btnConfere = document.querySelector('#btnConfere')

window.addEventListener('load', () => {
  // gera números aleatórios entre 1 e 5 para cada moeda
  const num1_00 = Math.ceil(Math.random() * 5)
  const num0_50 = Math.ceil(Math.random() * 5)
  const num0_25 = Math.ceil(Math.random() * 5)
  const num0_10 = Math.ceil(Math.random() * 5)

  // define os textos alternativos das imagens
  const alt1_00 = "Moedas de 01 real"
  const alt0_50 = "Moedas de 50 centavos"
  const alt0_25 = "Moedas de 25 centavos"
  const alt0_10 = "Moedas de 10 centavos"

  // chama os métodos de criação das moedas
  criarMoedas(num1_00, '1_00.jpg', alt1_00, "moeda1-00")
  criarMoedas(num0_50, '0_50.jpg', alt0_50, "moeda0-50")
  criarMoedas(num0_25, '0_25.jpg', alt0_25, "moeda0-25")
  criarMoedas(num0_10, '0_10.jpg', alt0_10, "moeda0-10")
})

function criarMoedas(num, moeda, textoAlt, classe) {
  for(let i = 0; i < num; i++){
    const novaMoeda = document.createElement('img')
    novaMoeda.src = 'img/' + moeda
    novaMoeda.alt = textoAlt
    novaMoeda.width = 100
    novaMoeda.className = classe
    divMoedas.appendChild(novaMoeda)
  }
  const br = document.createElement('br')
  divMoedas.appendChild(br)
}

frm.addEventListener('submit', (e) => {
  e.preventDefault()
  const soma = Number(inSoma.value)
  const moedas = divMoedas.querySelectorAll('img') // obtém todas as moedas
  let totalMoedas = 0

  for(const moeda of moedas) {
    if(moeda.className == 'moeda1-00'){
      totalMoedas += 1
    } else if(moeda.className == 'moeda0-50'){
      totalMoedas += 0.50
    } else if(moeda.className == 'moeda0-25'){
      totalMoedas += 0.25
    } else if(moeda.className == 'moeda0-10'){
      totalMoedas += 0.10
    }
  }
  const div = document.createElement('div')
  const h3 = document.createElement('h3')

  let mensagem = ''
  if(soma == totalMoedas.toFixed(2)){
    div.className = 'alert alert-success'
    mensagem = 'Parabéns!! Você acertou!!!'
  } else {
    div.className = 'alert alert-danger'
    mensagem = `Ops. Você errou! A resposta correta é ${totalMoedas.toFixed(2)}`
  }
  const texto = document.createTextNode(mensagem)
  h3.appendChild(texto)
  div.appendChild(h3)
  divMoedas.appendChild(div)

  btnConfere.disabled = true // desabilita o botão 
})

frm.addEventListener('reset', ()=>{
  window.location.reload() // recarrega a página
})
