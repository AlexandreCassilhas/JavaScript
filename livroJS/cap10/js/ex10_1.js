// Inicializando as variáveis do DOM
const frm = document.querySelector('form')
const divQuadro = document.querySelector('#divQuadro')

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const tarefa = frm.inTarefa.value
  // procedimento para criação de novo elemento e inserção dele em uma div
  const h5 = document.createElement('h5') // cria o elemento h5
  const texto = document.createTextNode(tarefa) // cria o texto
  h5.appendChild(texto) // insere o texto no elemento h5
  divQuadro.appendChild(h5) // insere o h5 no elemento dvQuadro

  frm.inTarefa.value = ''
  frm.inTarefa.focus()
})

frm.btnSelecionar.addEventListener('click', () => {
  // obtém todas as h5 da página e cria o array 'tarefas'
  const tarefas = document.querySelectorAll('h5')

  if(tarefas.length == 0) {
    alert('Não há tarefas para selecionar.')
    return
  }

  let aux = -1 // variável auxiliar para indicar linha selecionada

  // loop p/ checar qual tarefa está selecionada e mudar para normal
  for(let i = 0; i < tarefas.length; i++) {
    if(tarefas[i].className == 'tarefa-selecionada') {
      tarefas[i].className = 'tarefa-normal'
      aux = i // atribui a aux o índice da tarefa que estava selecionada
      break
    }
  }
  // se a linha selecionada é a última, volta para a primeira
  if(aux == tarefas.length - 1) {
    aux = -1
  }

  // muda o estilo da próxima linha
  tarefas[aux + 1].className = 'tarefa-selecionada' 
})

frm.btnRetirar.addEventListener('click', () =>{
  const tarefas = document.querySelectorAll('h5')
  let aux = -1

  tarefas.forEach((tarefa, i) => {
    if(tarefa.className == 'tarefa-selecionada'){
      aux = i
    }
  })

  if(aux == -1) { // se não selecionou nenhuma tarefa
    alert('Selecione uma tarefa para removê-la.')
    return
  }
  // Usa innerText pois o conteúdo do array é um elemento h5.
  if(confirm(`Deseja realmente excluir a tarefa ${tarefas[aux].innerText}?`)) {
    divQuadro.removeChild(tarefas[aux])
  }
})

frm.btnGravar.addEventListener('click', () =>{
  const tarefas = document.querySelectorAll('h5')

  if(tarefas.length == 0) {
    alert('Não há tarefas para serem salvas!')
    return
  }
  // Varre o array de tarefas e acumula na variável dados
  let dados = ''
  tarefas.forEach((tarefa, i) => {
    dados += tarefa.innerText + ',' 
  })

  // Grava na localStorage, excluindo a última ',' com slice
  localStorage.setItem('tarefasDia', dados.slice(0, -1))

  // Confere se a gravação foi bem sucedida
  if(localStorage.getItem('tarefasDia')){
    alert('Tarefas gravadas com sucesso!')
  }
})

// Checa se tem tarefas no localStorage e carrega na página
window.addEventListener('load', () => {
  if(localStorage.getItem('tarefasDia')){
    // cria um array com os itens armazenados no localStorage
    const dados = localStorage.getItem('tarefasDia').split(',')
    // varre o array criando o elemento h5, o textNode e adicionando na div
    dados.forEach((dado) =>{
      const h5 = document.createElement('h5')
      const texto = document.createTextNode(dado)
      h5.appendChild(texto)
      divQuadro.appendChild(h5)
    })
  }
})
