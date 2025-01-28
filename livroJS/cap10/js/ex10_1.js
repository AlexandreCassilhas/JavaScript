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
  const tarefas = document.querySelectorAll('h5') // obtém todas as h5 da página

  if(tarefas.length == 0) {
    alert('Não há tarefas para selecionar.')
    return
  }

  let aux = -1 // variável para indicar linha selecionada

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

  tarefas[aux + 1].className = 'tarefa-selecionada' // muda o estilo da próxima linha
})