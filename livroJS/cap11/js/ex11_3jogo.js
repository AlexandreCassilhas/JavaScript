import {retiraEspacos} from "../../modules/minhasFuncoes.js"

const frm = document.querySelector('form')
const outPalavra = document.getElementById('outPalavra')
const outErros = document.getElementById('outErros')
const outDica = document.getElementById('outDica')
const outChances = document.getElementById('outChances')
const outMensagemFinal = document.getElementById('outMensagemFinal')
const imgStatus = document.querySelector('img')

let palavraSorteada 
let dicaSorteada

window.addEventListener('load', () => {
  // se não há palavras cadastradas
  if(!localStorage.getItem('jogoPalavra')){
    alert('Cadastre palavras para jogar!')
    frm.inLetra.disabled = true
    frm.btnJogar.disabled = true
    frm.btnVerDica.disabled = true
  }
  // obtém conteúdo do localStorage e cria o vetor
  const palavras = localStorage.getItem('jogoPalavra').split(',')
  const dicas = localStorage.getItem('jogoDica').split(',')

  const tam = palavras.length

  // gera número entre 0 e tam-1 e arredonda para baixo
  const numAleatorio = Math.floor(Math.random() * tam)

  // obtém palavra sorteada em letras maiúsculas e a dica
  palavraSorteada = retiraEspacos(palavras[numAleatorio])
  dicaSorteada = dicas[numAleatorio]
  let novaPalavra = '' // Para montar palavra exibida

  // loop para exibir a letra inicial e as demais ocorrências dessa letra na palavra
  for(const letra of palavraSorteada){
    // se igual a letra inicial, acrescenta na exibição
    if(letra == palavraSorteada.charAt(0)){
      novaPalavra += palavraSorteada.charAt(0)
    } else {
      novaPalavra += '_' // senão, acrescenta "_"
 
    }
  }
  outPalavra.innerText = novaPalavra // exibe a nova palavra
})

frm.btnVerDica.addEventListener('click', () => {
  // verifica se o botão já foi clicado anteriormente
  if(outErros.innerText.includes('*')){
    alert('Você já solicitou a dica.')
    frm.inLetra.focus()
    return
  }
  outDica.innerText = ' * ' + dicaSorteada
  outErros.innerText += '*'

  const chances = Number(outChances.innerText) - 1
  outChances.innerText = chances

  trocarStatus(chances) // troca a imagem

  verificaFim() // verifica se atingiu o limite de chances

  frm.inLetra.focus()
})

function trocarStatus(num) {
  if(num > 0) {
    imgStatus.src = `img/status${num}.jpg`
  }
}

frm.addEventListener('submit', (e) => {
  e.preventDefault()

  const letra = frm.inLetra.value.toUpperCase()

  let erros = outErros.innerText
  let palavra = outPalavra.innerText

  // verifica se a letra já consta em erros ou na palavra
  if(erros.includes(letra) || palavra.includes(letra)){
  alert(`Você já apostou na letra ${letra}! Tente novamente.`)
  frm.inLetra.value = ''
  frm.inLetra.focus()
  return
  }
  // se letra consta em palavrasorteada
  if(palavraSorteada.includes(letra)){
    let novaPalavra = '' // para compor nova palavra

    // loop para montar palavra a ser exibida
    for(let i = 0; i < palavraSorteada.length; i++){
      if(palavraSorteada.charAt(i) == letra){
        novaPalavra += letra
      } else {
        novaPalavra += palavra.charAt(i) // senão, apresenta o caracter '_'
      }
    }
    outPalavra.innerText = novaPalavra
  } else {
    outErros.innerText += letra 
    const chances = Number(outChances.innerText) - 1 // diminui o número de chances
    outChances.innerText = chances

    trocarStatus(chances)
  }

  verificaFim() // verifica se já ganhou ou perdeu
  frm.inLetra.value = ''
  frm.inLetra.focus()
})

function verificaFim() {
  const chances = Number(outChances.innerText)

  if(chances == 0) {
    outMensagemFinal.className = 'display-3 text-danger'
    outMensagemFinal.innerText = `Ah.. a palavra é ${palavraSorteada}. Você perdeu!`
    concluirJogo()
  } else if(outPalavra.innerText == palavraSorteada){
      outMensagemFinal.className = 'display text-primary'
      outMensagemFinal.innerText = `Parabéns!! Você ganhou!`
      trocarStatus(4)
      concluirJogo()
  }
}

function concluirJogo() {
  outDica.innerText = ' * Clique no botão "Iniciar Jogo" para jogar novamente.'
  frm.inLetra.disabled = true
  frm.btnJogar.disabled = true
  frm.btnVerDica.disabled = true
}