const frm = document.querySelector('form')
const outResp = document.querySelector('#outResp')

const itens = []

// eventos que fazem a dinâmica das caixas de seleção
frm.rbPizza.addEventListener('click', () =>{
  frm.inBebida.className = 'oculta'
  frm.inPizza.className = 'exibe'
})

frm.rbBebida.addEventListener('click', () =>{
  frm.inBebida.className = 'exibe'
  frm.inPizza.className = 'oculta'
})

// evento que faz a dinâmica do placeholder
frm.inDetalhes.addEventListener('focus', () =>{
  if(frm.rbPizza.checked){
    const pizza = frm.inPizza.value
    // define o nº de sabores: media:2/grande:3/familia:4
    const numSabores = pizza == 'media' ? 2 : pizza == 'grande' ? 3 : 4
    // Envia a mensagem customizada para o placeholder do campo
    frm.inDetalhes.placeholder = `Até ${numSabores} sabores`
  }
})

// evento quando o campo perde o focus
frm.inDetalhes.addEventListener('blur', () =>{
  frm.inDetalhes.placeholder = '' // Limpa a mensagem do campo
})

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  let produto

  if(frm.rbPizza.checked){
    const num = frm.inPizza.selectedIndex // obtém o número do item selecionado
    produto = frm.inPizza.options[num].text // obtém o texto do item selecionado
  } else {
    const num = frm.inBebida.selectedIndex // obtém o número do item selecionado
    produto = frm.inBebida.options[num].text // obtém o texto do item selecionado
  }
  const detalhes = frm.inDetalhes.value
  itens.push(`${produto} (${detalhes})`) // insere o produto e os detalhes no array
  outResp.innerText = itens.join('\n') // apresenta os itens do array em cada linha
  // Limpa os campos do formulário
  frm.reset()
  // Força a execução do evento click no rbPizza
  frm.rbPizza.dispatchEvent(new Event('click'))
})