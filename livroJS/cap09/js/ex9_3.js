const frm = document.querySelector('form')
const outResp = document.querySelector('#outResp')

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const nomeApostador = frm.inNome.value
  const pesoMelancia = Number(frm.inPeso.value)

  if(checarPeso(pesoMelancia)){
    alert(`O peso de ${pesoMelancia} gr já foi escolhido. Escolha outro.`)
    frm.inPeso.focus()
    return
  }
  if(localStorage.getItem('jogoMelanciaNome')){
    const jogoMelanciaNome = localStorage.getItem('jogoMelanciaNome') + ';' + nomeApostador
    const jogoMelanciaPeso = localStorage.getItem('jogoMelanciaPeso') + ';' + pesoMelancia
    localStorage.setItem('jogoMelanciaNome', jogoMelanciaNome)
    localStorage.setItem('jogoMelanciaPeso', jogoMelanciaPeso)
  } else {
    localStorage.setItem('jogoMelanciaNome', nomeApostador)
    localStorage.setItem('jogoMelanciaPeso', pesoMelancia)
  }

  mostrarApostas()
  frm.reset()
  frm.inNome.focus()
})

// Função para verificar a existência de mesmo peso
const checarPeso = (pesoMelancia) => {
  if(localStorage.getItem('jogoMelanciaPeso')){
    const pesos = localStorage.getItem('jogoMelanciaPeso').split(';') // cria um vetor com todos os pesos separados por ;
    return pesos.includes(pesoMelancia.toString()) // retorna true or false
  } else {
    return false
  }
}

// Função para mostrar as apostas cadastradas no DOM
const mostrarApostas = () => {
  // Se não tiver nenhuma aposta cadastrada, limpa o DOM
  if(!localStorage.getItem('jogoMelanciaNome')){
    outResp.innerText = ''
    return
  }
  // Recupera os itens armazenados e transforma em arrays
  const nomes = localStorage.getItem('jogoMelanciaNome').split(';')
  const pesos = localStorage.getItem('jogoMelanciaPeso').split(';')
  let linhas = ''
  for(let i = 0; i < nomes.length; i++){
    linhas += `${nomes[i].padEnd(20)}  - ${pesos[i]} gr \n`
  }

  outResp.innerText = linhas
}
// Chama a função quando a página é carregada.
window.addEventListener('load', mostrarApostas())

frm.btVencedor.addEventListener('click', (e) =>{
  // Verifica se há apostas armazenadas
  if(!localStorage.getItem('jogoMelanciaNome')){
    alert(`Não há apostas cadastradas!`)
    return
  }
  // solicita que seja digitado o peso correto da melancia
  const pesoCorreto = Number(prompt('Digite o peso correto da melancia: '))
  if(pesoCorreto == 0 || isNaN(pesoCorreto)){
    alert('Digite um número superior a zero para o peso da melancia')
    return
  }
  // recupera os dados dos apostadores
  const nomes = localStorage.getItem('jogoMelanciaNome').split(';')
  const pesos = localStorage.getItem('jogoMelanciaPeso').split(';')

  let vencedorNome = nomes[0]
  let vencedorPeso = pesos[0]

  // Percorre as apostas em busca do vencedor
  for(let i = 1; i < nomes.length; i++){
    const difVencedor = Math.abs(vencedorPeso - pesoCorreto)
    const difAposta = Math.abs(Number(pesos[i]) - pesoCorreto)
    if(difAposta < difVencedor){
      vencedorNome = nomes[i]
      vencedorPeso = pesos[i]
    }
  }
  // Calcula a diferença entre o peso mais próximo e o peso Correto
  const diferenca = vencedorPeso == pesoCorreto ? 'Acertou na Mosca!': `A diferença foi de ${Math.abs(vencedorPeso - pesoCorreto)} gr`

  // Monta a mensagem de saída, mostrando o resultado da aposta
  let mensagem = `Resultado da Aposta do Peso da Melancia: \n`
  mensagem += `Peso correto da melancia: ${pesoCorreto} gr\n`
  mensagem += `Vencedor: ${vencedorNome}\n`
  mensagem += `Peso apostado: ${vencedorPeso} gr\n`
  mensagem += diferenca

  alert(mensagem)
})
// Evento click para limpar os dois localStorages
frm.btLimpar.addEventListener('click', (e) =>{
  if(confirm('Confirma a exclusão de todas as apostas')){
    localStorage.removeItem('jogoMelanciaNome')
    localStorage.removeItem('jogoMelanciaPeso')
    mostrarApostas()
  }
})
