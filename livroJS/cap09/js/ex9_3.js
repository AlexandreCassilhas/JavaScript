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