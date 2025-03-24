// Instanciando os elementos do DOM
const frm = document.querySelector('form')
const inCavalo = document.getElementById('inCavalo')
const inAposta = document.getElementById('inAposta')
const outCavalo = document.getElementById('outCavalo')
const outLista = document.getElementById('outLista')
const msgErro = document.getElementById('msgErro')
const btnApostar = document.getElementById('inApostar')
const btnResumo = document.getElementById('btnResumo')
const btnGanhador = document.getElementById('btnGanhador')
const btnNovo = document.getElementById('btnNovo')

// Criando a Constante 'CAVALOS'
const CAVALOS = ['Marujo', 'Tordilho', 'Belga', 'Twister', 'Jade', 'Lucky']


// Evento 'Adicionar' nova Aposta
frm.addEventListener('submit', (e) => {
  e.preventDefault()
  const numCavalo = Number(inCavalo.value)
  const vlAposta = Number(inAposta.value)
  if(confirm(`Confirma a aposta de R$ ${vlAposta.toFixed(2)} no Cavalo nº ${numCavalo} (${CAVALOS[numCavalo - 1]})`)){
    let novoCavalo = ''
    let novaAposta = ''
    // Persistindo a aposta em localStorage
    if(localStorage.getItem('storageAposta')){
      novoCavalo = localStorage.getItem('storageCavalo') + ',' + numCavalo
      novaAposta = localStorage.getItem('storageAposta') + ',' + vlAposta
    } else {
        novoCavalo = numCavalo
        novaAposta = vlAposta
    }
    localStorage.setItem('storageCavalo', novoCavalo)
    localStorage.setItem('storageAposta', novaAposta)
    frm.reset()
    inCavalo.focus()
  } else {
      inCavalo.focus()
      return
  }
  carregaLista()

})

// Evento quando 'inCavalo' perde o foco
inCavalo.addEventListener('blur', () =>{
  const tam = CAVALOS.length
  if(inCavalo.value == ''){
    outCavalo.innerText = ''
    return
  } else{
    const idCavalo = Number(inCavalo.value)
    if(validarCavalo(idCavalo, tam)){
      outCavalo.innerText = ''
      const mensagem =  `Número inválido! Escolha um número entre 1 e ${tam}`
      emiteErro(mensagem)
    } else {
      outCavalo.innerText = `${obterCavalo(idCavalo)} - Nº Apostas: ${contarApostas(idCavalo)} - Total: R$ ${totalizarApostas(idCavalo).toFixed(2)}`
    }
  }
 
})

function validarCavalo(idCavalo, tam){
  if(idCavalo > tam){
    return true
  }
}

function obterCavalo(idCavalo){
  const nomeCavalo = CAVALOS[idCavalo - 1]
  return nomeCavalo
}

function contarApostas(idCavalo){
  let contador = 0
  if(localStorage.getItem('storageCavalo')){
    const carregaCavalos = localStorage.getItem('storageCavalo').split(',')
    carregaCavalos.forEach((numCavalo) => {
      if(Number(numCavalo) == idCavalo){
        contador++
      }
    })
    return contador
  }
}

function totalizarApostas(idCavalo){
  let total = 0
  if(localStorage.getItem('storageAposta')){
    const carregaCavalos = localStorage.getItem('storageCavalo').split(',')
    const carregaApostas = localStorage.getItem('storageAposta').split(',')
    for(let i = 0; i < carregaCavalos.length; i++){
      const numCavalo = carregaCavalos[i]
      const totAposta = Number(carregaApostas[i])
      if(Number(numCavalo) == idCavalo){
        total += totAposta
      }
    }
  }
  return total
}

function totalizarApostasGeral(){
  let total = 0
  const carregaApostas = localStorage.getItem('storageAposta').split(',')
  const qtdeApostas = carregaApostas.length
  carregaApostas.forEach((aposta) => {
    total += Number(aposta)
  })
  return { total, qtdeApostas } // retornando 2 valores em uma função
}

function emiteErro(mensagem){
  const divErro = document.createElement('div')
  const h5 = document.createElement('h5')
  const textErro = document.createTextNode(mensagem)
  divErro.className = 'alert alert-danger'
  h5.appendChild(textErro)
  divErro.appendChild(h5)
  msgErro.appendChild(divErro)
  setTimeout(limpaDiv, 2000, h5, divErro) 
}

function limpaDiv(h5, divErro){
  h5.remove()
  divErro.remove()
  inCavalo.value = ''
  inCavalo.focus()
}

// Evento quando 'inCavalo' recebe foco
inCavalo.addEventListener('focus', () =>{
  inCavalo.value = ''
  outCavalo.innerText = ''
})

window.addEventListener('load', () =>{
  carregaLista()
})

function carregaLista(){
  if(localStorage.getItem('storageAposta')){
    const carregaCavalos = localStorage.getItem('storageCavalo').split(',')
    const carregaApostas = localStorage.getItem('storageAposta').split(',')
    let lista = `   Apostas Realizadas\n${'='.repeat(26)}\n`
    const tam = carregaApostas.length
    for(let i = 0; i < tam; i++){
      const cavalo = carregaCavalos[i]
      const vlAposta = carregaApostas[i]
      lista += `${obterCavalo(cavalo).padEnd(13)} - R$ ${Number(vlAposta).toFixed(2).padStart(7)}\n`
    }
    outLista.innerText = lista
  } else {
      return
    }
}

btnResumo.addEventListener('click', () => {
  const tam = CAVALOS.length
  let resumo = `      Resumo das Apostas Realizadas\n${'='.repeat(45)}\n`
  resumo += `${'Cavalo'.padEnd(12)}${'Qtde. Apostas'.padEnd(19)}${'Total Apostado'.padEnd(10)}\n`
  for(let i = 1; i <= tam; i++){
    resumo += `${obterCavalo(i).padEnd(8)} ${'.'.repeat(5)} ${contarApostas(i)} apostas ${'.'.repeat(9)} R$ ${Number(totalizarApostas(i)).toFixed(2).padStart(7)}\n`
  }
  outLista.innerText = resumo
})

btnGanhador.addEventListener('click', () => {
  const ganhador = Number(prompt('Digite o número do cavalo ganhador:'))
  const tam = CAVALOS.length
  let resumo = `Resultado Final do Páreo\n${'='.repeat(30)}\n`
  if(isNaN(ganhador) || validarCavalo(ganhador, tam)){
    alert(`Cavalo inválido! Digite um número entre 1 e ${tam}.`)
    btnGanhador.focus()
    return
  }
  const { total, qtdeApostas } = totalizarApostasGeral()
  resumo += `Valor total apostado: R$ ${total.toFixed(2)}\n`
  resumo += `Quantidade total de apostas: ${qtdeApostas}\n`
  resumo += `Quantidade total de cavalos no páreo: ${tam}\n`
  resumo += `Cavalo Vencedor: ${ganhador} - ${obterCavalo(ganhador)}\n`
  resumo += `Total de apostas no cavalo vencedor: ${contarApostas(ganhador)}\n`
  resumo += `Total apostado no cavalo vencedor: R$ ${totalizarApostas(ganhador).toFixed(2)}\n`

  outLista.innerText = resumo

  frm.btnApostar.disabled = true
  frm.btnGanhador.disabled = true
  frm.btnResumo.disabled = true
  btnNovo.focus()
})

btnNovo.addEventListener('click', () => {
  localStorage.removeItem('storageCavalo')
  localStorage.removeItem('storageAposta')
  window.location.reload()
})