const frm = document.querySelector('form')
const inNome = document.querySelector('#inNome')
const inIdade = document.querySelector('#inIdade')
const outResp = document.querySelector('#outResp')

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const nome = inNome.value
  const idade = Number(inIdade.value)

  const tracos = retornarTracos(nome)
  const categoria = retornaCategoria(idade)

  outResp.innerText = `${nome}\n${tracos}\nCategoria: ${categoria}`
})

function retornarTracos(nome){
  let tracos = ''
  for(const letra of nome){
    tracos += letra == ' ' ? ' ' : '-'
  }
  return tracos
}

function retornaCategoria(idade){
  const categoria = idade <= 12 ? 'Infantil' : idade >= 13 && idade <= 18 ? 'Juvenil' : 'Adulto'
  return categoria
}