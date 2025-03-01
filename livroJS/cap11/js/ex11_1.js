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

inCavalo.addEventListener('blur', () =>{
  const tam = CAVALOS.length
  const idCavalo = Number(inCavalo.value)
  if(idCavalo > tam){
      outCavalo.innerText = ''
    const mensagem =  `Número inválido! Escolha um número entre 1 e ${tam}`
    emiteErro(mensagem)
  } else {
      outCavalo.innerText = CAVALOS[idCavalo - 1]
  }
})

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

window.addEventListener('load', () =>{
  carregaLista()
})

function carregaLista(){
  if(localStorage.getItem('storageAposta')){
    const carregaCavalos = localStorage.getItem('storageCavalo').split(',')
    const carregaApostas = localStorage.getItem('storageAposta').split(',')
    let lista = `Apostas Realizadas\n${'='.repeat(25)}\n`
    const tam = carregaApostas.length
    for(let i = 0; i < tam; i++){
      const cavalo = carregaCavalos[i]
      const vlAposta = carregaApostas[i]
      lista += `${CAVALOS[cavalo - 1]} - R$ ${Number(vlAposta).toFixed(2)}\n`
    }
    outLista.innerText = lista
  } else {
      return
    }
}