// Instância dos elementos do DOM
const frm = document.querySelector('form')
const numero = document.querySelector('#inNumero')
const erros = document.querySelector('#outErros')
const chances = document.querySelector('#outChances')
const dicas = document.querySelector('#outDicas')
const btApostar = document.querySelector('#btnApostar')
const btJogarNovamente = document.querySelector('#btnJogarNovamente')
// Sorteia o número de 0 a 100 e inicializa as variáveis
const numSorteado = Math.floor((Math.random()*100) + 1)
const CHANCES = 10
const numErros = []
let qtdErros = 0
let qtdResta = CHANCES
let maiorMenor = ''
btApostar.className = 'exibe'
// Cria um Listener para o campo permitir apenas a digitação de números
numero.addEventListener('keypress', (e)=> {
  const keyCode = (e.keyCode ? e.keyCode: e.wich)
  if (keyCode < 48 && keyCode > 57) {
    e.preventDefault()
  }
})
// Cria o listener e a rotina para o botão 'Apostar'
frm.addEventListener('submit', (verificaAposta) => {
  verificaAposta.preventDefault()
  const vNumero = Number(numero.value)
  // Verifica se ainda resta pelo menos 1 chance
  if (qtdResta > 1) {
    // Verifica se o número já foi digitado
    if (numErros.includes(vNumero)) {
      alert(`Você já apostou o número ${vNumero}. Tente outro!`)
    } else if (vNumero == numSorteado) {
      dicas.innerText = `Parabéns, você acertou. O número sorteado foi o ${numSorteado}`
    } else {
      numErros.push(vNumero) // grava o número no array de erros
      qtdResta--
      qtdErros++
      if (vNumero < numSorteado) { // verifica se é maior ou menor que o sorteado
        maiorMenor = 'menor'
      } else {
        maiorMenor = 'maior'
      }
      erros.innerText = `Erros: ${qtdErros} - (${numErros.join(', ')})`
      chances.innerText = `Chances: ${qtdResta}`
      dicas.innerText = `O número digitado é ${maiorMenor} que o número sorteado`
    }} else {
      numErros.push(vNumero) //grava o nº digitado no array de erros
      qtdResta--
      qtdErros++
      alert('Suas Chances Acabaram!')
      chances.innerText = `Chances: 0`
      erros.innerText = `Erros: ${qtdErros} - (${numErros.join(', ')})`
      dicas.innerText = `Game Over!! Você perdeu! O número sorteado foi o ${numSorteado}.`
      // desabilita o campo 'numero' | oculta o botão 'apostar' | exibe o botão 'Jogar Novamente'
      numero.disabled = true
      btApostar.className = 'oculta'
      btJogarNovamente.className = 'exibe'
      }
    // Recarrega a página
    btJogarNovamente.addEventListener('click', (e) => {
      location.reload() // recarrega a página
    })
    numero.value = ''
    numero.focus()
})
