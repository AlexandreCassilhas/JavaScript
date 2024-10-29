// Instância dos objetos do Formulário
const frm = document.querySelector('form')
const entModelo = document.querySelector('#inModelo')
const entPreco = document.querySelector('#inPreco')
const retorno = document.querySelector('#outRetorno')
// Cria o array para receber os carros
const carros = []
// Cria o listener do botão 
frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const modelo = entModelo.value
  const preco = Number(entPreco.value)
  // Faz o push das info para o array, limpa os campos e foca no campo modelo
  carros.push({modelo, preco})
  entModelo.value = ''
  entPreco.value = ''
  entModelo.focus()
  // Dispara automaticamente um evento de click no botão "Listar Todos"
  frm.btnListarTodos.dispatchEvent(new Event('click'))
})
// Cria o listener do botão
frm.btnListarTodos.addEventListener('click', (listarTodos) => {
  if(carros.length == 0) {
    alert('Não há carros na Lista.')
    return
  }
  // cria uma constante já formatada  com os carros cadastrados em 'carros'
  const lista = carros.reduce((acumulador, carro) => acumulador + `${carro.modelo.padEnd(25)} - R$ ${carro.preco.toFixed(2)}\n`, '' )
  // envia para o DOM a lista já formatada
  retorno.innerText = `Lista dos Carros Cadastrados:\n${'-'.repeat(40)}\n${lista}`
})
// Cria o listener do botão
frm.btnListarPrecos.addEventListener('click', (listarPrecos) => {
  const maximo = Number(prompt('Qual o valor máximo que o cliente deseja pagar?'))
  if (maximo == 0 || isNaN(maximo)) {
    return
  }
  // cria um vetor com os carros que possuem preco inferior ou = ao máximo
  const carrosFilter = carros.filter(carro => carro.preco <= maximo)
  if(carrosFilter.length == 0){
    alert('Não há carros com o preço igual ou inferior ao solicitado.')
    return
  }
  // Monta a lista já filtrada. Poderia ser feito com o método reduce()
  let lista = ''
  for(const carro of carrosFilter) {
    lista = lista + `${carro.modelo.padEnd(25)} - R$ ${carro.preco.toFixed(2)}\n`
  }
  retorno.innerText = `Carros até R$ ${maximo.toFixed(2)}:\n${'-'.repeat(40)}\n${lista}`
})
// Cria o listener do botão
frm.btnSimularPromo.addEventListener('click', (simularPromo) => {
  const desconto = Number(prompt('Qual o percentual de desconto:'))
  if (desconto == 0 || isNaN(desconto)) {
    return
  }
  const carrosDesconto = carros.map(aux =>({
    modelo: aux.modelo,
    preco: aux.preco - (aux.preco * desconto / 100)
  }))
  const lista = carrosDesconto.reduce((acumulador, carro) => acumulador + `- ${carro.modelo.padEnd(25)} - R$ ${carro.preco.toFixed(2)}\n`, '')

  retorno.innerText = `Carros com desconto de ${desconto}%:\n${'-'.repeat(40)}\n${lista}`
})