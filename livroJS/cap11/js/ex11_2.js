const frm = document.querySelector('form')
const divPalco = document.getElementById('divPalco')

const POLTRONAS = 324  // const com o nº de poltronas do teatro
const {reservadas} = carregarReservadasOcupadas()
const {ocupadas} = carregarReservadasOcupadas()

window.addEventListener('load', () =>{
  // loop para montar as poltronas
  for(let i = 1; i<= POLTRONAS; i++){
    const figure = document.createElement('figure') //cria a tag 'figure'
    const imgStatus = document.createElement('img') // cria a tag 'img'

    // se a poltrona consta em ocupadas, img ocupada. 
    // Senão, se consta em reservadas, img reservada, senão img disponível
    imgStatus.src = ocupadas.includes(i.toString()) ? 'img/ocupada.png' :
      reservadas.includes(i.toString()) ? 'img/reservada.png'
      : 'img/disponivel.png'

    imgStatus.className = 'poltrona' // classe com a dimensão da img (não implementado)
    const figureCap = document.createElement('figcaption') // cria figcaption

    // quantidade de zeros antes do nº da poltrona
    const zeros = i < 10 ? '00' : i < 100 ? '0' : ''

    const num = document.createTextNode(`[${zeros}${i}]`) // cria texto do nº da poltrona

    figureCap.appendChild(num)
    figure.appendChild(imgStatus)
    figure.appendChild(figureCap)

    // se i % 12 == 0, é o corredor -> define quantas cadeiras para o corredor (50px)
    if(i % 12 == 0){
      figure.style.marginRight = '50px' // corredor (i % 24 == 12)
    }

    divPalco.appendChild(figure) // insere a figura na divPalco

    // se i % 36 == 0, termina a fileira (pula linha) -> define quantas cadeiras por fileira
    if(i % 36 == 0) {
      divPalco.appendChild(document.createElement('br'))
    }
  }
})

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  // recupera o nº digitado no input do DOM
  const poltrona = frm.inPoltrona.value
  reservaPoltrona(poltrona) // função para checar poltrona
})

function reservaPoltrona(poltrona){
  // realiza as checagens necessárias para a validação
  if(Number(poltrona) > POLTRONAS || poltrona < 1){
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
  // checa se há poltronas reservadas
  if(reservadas.length == 0){
    alert('Não há poltronas reservadas!')
    frm.inPoltrona.focus()
    return
  }

  // loop decrescente pois as reservas vão sendo removidas a cada alteração da imagem
  for(let i = reservadas.length - 1; i >= 0; i--){
    ocupadas.push(reservadas[i])

    const imgPoltrona = divPalco.querySelectorAll('img')[reservadas[i] - 1] // captura img da poltrona
    imgPoltrona.src = 'img/ocupada.png' // altera a imagem para ocupada

    reservadas.pop() // remove o número da poltrona do array
  }
  
  // recriando a localStorage 'Reservadas'
  localStorage.removeItem('storageReservadas')
  
  /*
  for(let i = 0; i < reservadas.length; i++){
    if(i < reservadas.length - 1){
      localStorage.setItem('storageReservadas', reservadas[i] + ',')
    } else {
      localStorage.setItem('storageReservadas', reservadas[i])
    }
  }
  */

  // Carregando uma localStorage a partir de um array utilizando join. Faz o mesmo que o código acima
  localStorage.setItem('storageReservadas', reservadas.join(','))
  localStorage.setItem('storageOcupadas', ocupadas.join(','))
})

function carregarReservadasOcupadas() {
  //operador ternário. Se houver dados em localStorage, faz um split e atribui a um array
  const reservadas = localStorage.getItem('storageReservadas') 
    ? localStorage.getItem('storageReservadas').split(',')
    : []
  const ocupadas = localStorage.getItem('storageOcupadas') 
    ? localStorage.getItem('storageOcupadas').split(',') 
    : []
  
  return {reservadas, ocupadas}
}