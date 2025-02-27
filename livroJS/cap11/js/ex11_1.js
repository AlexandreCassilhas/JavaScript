// Instanciando os elementos do DOM
const frm = document.querySelector('form')
const inCavalo = document.getElementById('inCavalo')
const inAposta = document.getElementById('inAposta')
const outCavalo = document.getElementById('outCavalo')
const outLista = document.getElementById('outLista')
const btnApostar = document.getElementById('inApostar')
const btnResumo = document.getElementById('btnResumo')
const btnGanhador = document.getElementById('btnGanhador')
const btnNovo = document.getElementById('btnNovo')
// Criando as constantes
const CAVALOS = ['Marujo', 'Tordilho', 'Belga', 'Twister', 'Jade', 'Lucky']
const apostas = []
let lista = `Apostas Realizadas\n${'='.repeat(25)}\n`
frm.addEventListener('submit', (e) => {
  e.preventDefault()
  const numCavalo = Number(inCavalo.value)
  const vlAposta = Number(inAposta.value)

  if(confirm(`Confirma a aposta de R$ ${vlAposta.toFixed(2)} no Cavalo nº ${numCavalo}`)){
    apostas.push({numCavalo, vlAposta})
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
  lista += `${CAVALOS[numCavalo - 1]} - R$ ${vlAposta.toFixed(2)}\n`
  outLista.innerText = lista

})

inCavalo.addEventListener('blur', () =>{
  const tam = CAVALOS.length
  const idCavalo = Number(inCavalo.value)
  if(!CAVALOS.includes(idCavalo)){
    outCavalo.innerText = `Número inválido! Escolha um número entre 1 e ${tam}`
    inCavalo.focus()
    return
  } else {
      outCavalo.innerText = CAVALOS[idCavalo] 
  }

})


