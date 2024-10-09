// Instancia Form
const frm = document.querySelector('form')
// Instancia Saídas
const resp1 = document.querySelector('#outNota100')
const resp2 = document.querySelector('#outNota50')
const resp3 = document.querySelector('#outNota10')
const resp4 = document.querySelector('#outResto')

// Cria Listener, Processamento e Saída
frm.addEventListener('submit', (calculaNotas) => {

  calculaNotas.preventDefault() // Evita o reload do form

  // Limpa os campos de Resposta
  resp1.innerText = '';
  resp2.innerText = '';
  resp3.innerText = '';

  const vSaque = Number(frm.inSaque.value) // captura o valor digitado

  // checa se o valor digitado para saque é válido
  if (vSaque % 10 != 0) {
    alert('Valor inválido para as notas disponíveis')
    frm.inSaque.focus()
    return
  }
  let resto = 0; // Inicializando a variável
  const notas100 = Math.floor(vSaque / 100)
  resto = vSaque % 100
  const notas50 = Math.floor(resto / 50)
  resto = resto % 50
  const notas10 = Math.floor(resto / 10)

  if (notas100 > 0) {
    resp1.innerText = `Qtde de Notas de 100: ${notas100}`
  }
  if (notas50 > 0) {
    resp2.innerText = `Quantidade de Notas de 50: ${notas50}`
  }
  if (notas10 > 0) {
    resp3.innerText = `Quantidade de Notas de 10: ${notas10}`
  }
})