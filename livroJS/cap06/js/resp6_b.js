const frm = document.querySelector('form')
const entNumero = document.querySelector('#inNumero')
const saiResp = document.querySelector('#outResp')
const saiMsg = document.querySelector('#outMsg')

const numeros = []
entNumero.value = ''
entNumero.focus()

frm.addEventListener('submit', (adicionarNumero) =>{
  adicionarNumero.preventDefault()
  let listaNumeros = []
  const numero = Number(entNumero.value)
  if(numeros.includes(numero)){
    alert(`O número ${numero} já se encontra cadastrado.`)
    entNumero.value = ''
    entNumero.focus()
    
  } else {
    numeros.push(numero)
    entNumero.value = ''
    entNumero.focus()
  }
  numeros.forEach((numero, i) => {
    listaNumeros += ` ${numero} |`
  })
  saiResp.innerText = `Lista de Números:\n${'-'.repeat(30)}\n${listaNumeros}`
})

frm.btnVerificaOrdem.addEventListener('click', (verificaOrdem) =>{
  let status = 0
  let msg = ''
  let numAnt = 0
  numeros.forEach((numero, i) => {
    if (numAnt > numero){
      status = 1
      msg = 'Os números não estão ordenados.'
    }
    numAnt = numero
  })
  if(status == 0) {
    msg = 'Os números estão ordenados.'
  }
  saiMsg.innerText = msg
})