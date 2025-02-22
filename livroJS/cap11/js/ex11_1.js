// Instanciando os elementos do DOM
const frm = document.querySelector('form')
const inCavalo = document.getElementById('inCavalo')
const inAposta = document.getElementById('inAposta')
const outCavalo = document.getElementById('outCavalo')
const btnApostar = document.getElementById('inApostar')
const btnResumo = document.getElementById('btnResumo')
const btnGanhador = document.getElementById('btnGanhador')
const btnNovo = document.getElementById('btnNovo')
// Criando as constantes
const CAVALOS = ['Marujo', 'Tordilho', 'Belga', 'Twister', 'Jade', 'Lucky']
const apostas = []

frm.addEventListener('submit', (e) => {
  e.preventDefault()
  const numCavalo = Number(inCavalo.value)
  const vlAposta = Number(inAposta.value)
  
  apostas.push({numCavalo, vlAposta})
  let novoCavalo = ''
  let novaAposta = ''

  if(localStorage.getItem('storageAposta')){
    novoCavalo = localStorage.getItem('storageCavalo') + ',' + numCavalo
    novaAposta = localStorage.getItem('storageAposta') + ',' + vlAposta
  } else {
      novoCavalo = numCavalo
      novaAposta = vlAposta
  }
  localStorage.setItem('storageCavalo', novoCavalo)
  localStorage.setItem('storageAposta', novaAposta)

  alert(`Aposta de R$ ${vlAposta.toFixed(2)} no Cavalo nº ${numCavalo}`)
  return
})


