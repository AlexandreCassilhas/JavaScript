const frm = document.querySelector('form')
const tabuada = document.querySelector('#outTabuada')

frm.addEventListener('submit', (calculaTabuada) => {
  calculaTabuada.preventDefault()

  let vTabuada = ''
  const vNumero = Number(frm.inNumero.value)
  for(let i=1; i <= 10; i++){
    vTabuada = vTabuada + `${vNumero} x ${i} = ${vNumero * i} \n` 
    
    // ou vTabuada = vTabuada + vNumero + ' x ' + i + ' = ' + vNumero * i + '\n'
  }
  tabuada.innerText = vTabuada
})