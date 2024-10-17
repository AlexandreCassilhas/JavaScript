const frm = document.querySelector('form')
const resp = document.querySelector('#outResp')

frm.addEventListener('submit', (criarListaDescendente) => {
  criarListaDescendente.preventDefault()

  const vNumero = Number(frm.inNumero.value)
  let resposta = ''
  for(let i = vNumero; i >= 1; i--){
    if (i > 1) {
      resposta = resposta + `${i}, `
    } else {
      resposta = resposta + `${i}.`
    }
   
  }
  if (vNumero > 1){
    resp.innerText = `Entre ${vNumero} e 1: ${resposta}`
  } else {
    resp.innerText = `Número digitado: ${vNumero}\nNão é possível fazer a sequência decrescente.`
  }
  
})