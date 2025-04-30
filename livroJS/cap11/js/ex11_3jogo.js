import { retiraEspacos } from "../../modules/minhasFuncoes"

const frm = document.querySelector('form')
const outPalavra = document.getElementById('outPalavra')
const outErros = document.getElementById('outErros')
const outDica = document.getElementById('outDicas')
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
  //palavraSorteada = palavras[numAleatorio].toUpperCase()
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

  outDica.innerText = '*' + dicaSorteada
  outErros.innerText += '*'

  const chances = Number(outChances.innerText) - 1
  outChances.innerText = chances

  trocarStatus(chances) // troca a imagem

  verificaFim() // verifica se atingiu o limite de chances

  frm.inLetra.focus()
})