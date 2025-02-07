const frm = document.querySelector('form')
const divMoedas = document.querySelector('#divMoedas')

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
    novaMoeda.textoAlt = textoAlt
    novaMoeda.width = 100
    novaMoeda.className = classe
    divMoedas.appendChild(novaMoeda)
  }
  const br = document.createElement('br')
  divMoedas.appendChild(br)
}
