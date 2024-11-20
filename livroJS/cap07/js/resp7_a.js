const frm = document.querySelector('form')
const inMensagem = document.querySelector('#inMensagem')
const inCripto = document.querySelector('#inCripto')
const outCripto = document.querySelector('#outCripto')

frm.addEventListener('submit', (criptografarMsg) =>{
  criptografarMsg.preventDefault()
  const mensagem = inMensagem.value
  const tamanho = mensagem.length
  let listaPares = ''
  let listaImpares = ''
  for(let i = 0; i < tamanho; i++){
    if (i % 2 != 0){
      listaPares += mensagem.substr(i, 1)
    } else if (i % 2 == 0){
      listaImpares += mensagem.substr(i, 1)
    }
  }
  inCripto.value = `${listaPares}${listaImpares}`
  outCripto.innerText = `${listaPares}${listaImpares}`
})

frm.btnDecripto.addEventListener('click', (decriptoMsg) =>{
  const Msg = inMensagem.value
  outCripto.innerText = `${Msg}`
})