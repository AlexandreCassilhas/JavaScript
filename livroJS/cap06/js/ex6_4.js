// Instancia os elementos do DOM e o array 'criancas'
const frm = document.querySelector('form')
const entNome = document.querySelector('#inNome')
const entIdade = document.querySelector('#inIdade')
const resp = document.querySelector('#outResp')
const criancas = []

// Cria o listener do botão 'adicionar'
frm.addEventListener('submit', (e)=> {
  e.preventDefault()
  const nome = entNome.value;
  const idade = Number(entIdade.value);
  criancas.push({nome, idade}) // inclui as info no array
  // Limpa os campos e seta focus
  frm.reset() // Limpa os campos do formulário
  entNome.focus()
  // Dispara o click do botão 'Listar Todos'
  frm.btnListarTodos.dispatchEvent(new Event('click'))
})

// Cria o listener do botão 'Listar Todos'
frm.btnListarTodos.addEventListener('click', (listarTodos) =>{
  if(criancas.length == 0){
    alert('Não há crianças cadastradas.')
  }
  // Varre o array alimentando e formatando a lista
  let listaCriancas = ''
  criancas.forEach((crianca, i) =>{
    listaCriancas = listaCriancas + `${crianca.nome.padEnd(30)} -   ${crianca.idade} anos \n`
  })
  // Encaminha ao DOM a lista formatada
  resp.innerText = `Lista de Crianças:\n${'='.repeat(41)}\n` + listaCriancas
})
 // Cria o listener do botão 'Resumir por Idade'
 frm.btnResumirIdade.addEventListener('click', (resumirIdade) =>{
  if(criancas.length == 0) {
    alert('Não há crianças cadastradas.')
  }
  // Cria um novo array com as crianças ordenadas por idade
  const criancasOrdenadas = criancas.slice().sort((a,b)=> a.idade - b.idade)
  // Inicializa as variáveis usadas no processamento
  const titulo = `Dados Consolidado de Crianças:\n${'='.repeat(40)}\n`
  let resumo = ''
  let nomesCriancas = []
  let aux = criancasOrdenadas[0].idade
  // Varre o novo array comparando as idades e criando um array de nomes por idade
  for(let i = 0; i < criancasOrdenadas.length; i++){
    const nomeCrianca = criancasOrdenadas[i].nome
    const idadeCrianca = criancasOrdenadas[i].idade
    if(idadeCrianca == aux){
      nomesCriancas.push(nomeCrianca) //inclui a criança se for mesma idade
    } else {
      let percentualCriancas = ((nomesCriancas.length / criancasOrdenadas.length) * 100)
      resumo = resumo + `${aux} ano(s): ${nomesCriancas.length} criança(s) - ${percentualCriancas.toFixed(2)}%\n${nomesCriancas.join(', ')}\n`
      // Zera o array e o percentual 
      percentualCriancas = 0
      nomesCriancas = []
      aux = idadeCrianca // atualiza a variável auxiliar com a nova idade
      nomesCriancas.push(nomeCrianca)
    }
  }
  // acrescenta na saída os dados consolidados da última idade
  let percentualCriancas = ((nomesCriancas.length / criancasOrdenadas.length) * 100)
  resumo = resumo + `${aux} ano(s): ${nomesCriancas.length} criança(s) - ${percentualCriancas.toFixed(2)}%\n${nomesCriancas.join(', ')}\n`
  // Encaminha ao DOM a resposta consolidada
  resp.innerText = titulo + resumo

 })