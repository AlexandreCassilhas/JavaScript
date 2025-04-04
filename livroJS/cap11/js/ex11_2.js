const frm = document.querySelector('form')
const divPalco = document.getElementById('divPalco')

const POLTRONAS = 240 // const com o nº de poltronas do teatro
let reservadas = []
let ocupadas = []

window.addEventListener('load', () =>{
  //operador ternário. Se houver dados em localStorage, faz um split e atribui a um array
  const StReservadas = localStorage.getItem('storageReservadas') 
    ? localStorage.getItem('storageReservadas').split(',')
    : []

  const StOcupadas = localStorage.getItem('storageOcupadas') 
    ? localStorage.getItem('storageOcupadas').split(',') 
    : []
  
  reservadas = StReservadas.slice()
  ocupadas = StOcupadas.slice()
  
    // loop para montar as poltronas
    for(let i = 1; i<= POLTRONAS; i++){
      const figure = document.createElement('figure') //cria a tag 'figure'
      const imgStatus = document.createElement('img') // cria a tag 'img'

      // se a poltrona consta em ocupadas, img ocupada. 
      // Senão, se consta em reservadas, img reservada, senão img disponível
      imgStatus.src = ocupadas.includes(i.toString()) ? 'img/ocupada.png' :
        reservadas.includes(i.toString()) ? 'img/reservada.png'
        : 'img/disponivel.png'

      imgStatus.className = 'poltrona' // classe com a dimensão da img
      const figureCap = document.createElement('figcaption') // cria figcaption

      // quantidade de zeros antes do nº da poltrona
      const zeros = i < 10 ? '00' : i < 100 ? '0' : ''

      const num = document.createTextNode(`[${zeros}${i}]`) // cria texto do nº da poltrona

      figureCap.appendChild(num)
      figure.appendChild(imgStatus)
      figure.appendChild(figureCap)

      // se i % 24 == 12, é o corredor -> define margem direita 60px
      if(i % 24 == 12){
        figure.style.marginRight = '60px'
      }

      divPalco.appendChild(figure) // insere a figura na divPalco

      // se i % 24 == 0 (usando o operador && para substituir o 'if')
      //(i % 24 == 0) && divPalco.appendChild(document.createElement('br'))

      if(i % 24 == 0) {
        divPalco.appendChild(document.createElement('br'))
      }
     }
})

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  // recupera o nº digitado no input do DOM
  const poltrona = Number(frm.inPoltrona.value)

  reservaPoltrona(poltrona) // função para checar poltrona
})

function reservaPoltrona(poltrona){

  // recupera as poltronas ocupadas e insere no array
  //const ocupadas = localStorage.getItem('storageOcupadas') 
   // ? localStorage.getItem('storageOcupadas').split(',')
  //  : []
  // realiza as checagens necessárias para a validação
  if(poltrona > POLTRONAS || poltrona < 1){
    alert(`A poltrona ${poltrona} é inválida! Digite um número entre 1 e ${POLTRONAS}.`)
    frm.inPoltrona.value = ''
    frm.inPoltrona.focus()
    return
  } else if(reservadas.includes(poltrona)){
    alert(`A poltrona ${poltrona} já está reservada! Escolha outro assento.`)
    frm.inPoltrona.value = ''
    frm.inPoltrona.focus()
    return 
  } else if(ocupadas.includes(poltrona)){
    alert(`A poltrona ${poltrona} já se encontra ocupada! Escolha outro assento.`)
    frm.inPoltrona.value = ''
    frm.inPoltrona.focus()
    return
  } else {  
    // captura a img da poltrona. (-1 pois inicia em 0)
    const imgPoltrona = divPalco.querySelectorAll('img')[poltrona - 1]
  
    imgPoltrona.src = 'img/reservada.png' // altera a imagem para reservada
  
    reservadas.push(poltrona) // insere o nº da poltrona no array 'reservadas'
  
    // inclui o nº da poltrona na localStorage 
    if(localStorage.getItem('storageReservadas')){
      localStorage.setItem('storageReservadas', localStorage.getItem('storageReservadas') + ',' + poltrona)
    } else {
      localStorage.setItem('storageReservadas', poltrona)
    }
    frm.inPoltrona.value = ''
    frm.inPoltrona.focus()
  }
}

frm.btnConfirmar.addEventListener('click', () =>{

  const StReservadas = localStorage.getItem('storageReservadas').split(',')

  // checa se há poltronas reservadas
  if(StReservadas.length == 0){
    alert('Não há poltronas reservadas!')
    frm.inPoltrona.focus()
    return
  }

  const StOcupadas = localStorage.getItem('storageOcupadas') 
    ? localStorage.getItem('storageOcupadas').split(',') 
    : []

  // loop decrescente pois as reservas vão sendo removidas a cada alteração da imagem
  for(let i = StReservadas.length - 1; i >= 0; i--){
    StOcupadas.push(reservadas[i])

    const imgPoltrona = divPalco.querySelectorAll('img')[StReservadas[i] - 1] // captura img da poltrona
    imgPoltrona.src = 'img/ocupada.png' // altera a imagem para ocupada

    StReservadas.pop() // remove o número da poltrona do array
  }
  
  // recriando a localStorage 'Reservadas'
  localStorage.removeItem('storageReservadas')
  for(let i = 0; i < StReservadas.length; i++){
    if(i < StReservadas.length - 1){
      localStorage.setItem('storageReservadas', StReservadas[i] + ',')
    } else {
      localStorage.setItem('storageReservadas', StReservadas[i])
    }

  }
  localStorage.setItem('storageOcupadas', StOcupadas.join(','))
})