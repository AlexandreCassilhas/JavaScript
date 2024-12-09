const frm = document.querySelector('form')
const imClube = document.querySelector('#imgClube')
const dvTitulo = document.querySelector('#divTitulo')

const trocarClube = () => {
  let clube 
  if(frm.rbBrasil.checked) {
    clube = 'Brasil'
  } else if(frm.rbPelotas.checked) {
    clube = 'Pelotas'
  } else {
    clube = 'Farroupilha'
  }

  // define as classes de dvTitulo
  dvTitulo.className = `row cores-${clube}`

  // modifica a imagem de acordo com a seleção do clube
  imClube.src = `img/${clube.toLowerCase()}.png`
  imClube.className = 'img-fluid'
  imClube.alt = `Símbolo do ${clube}`

  // salva no navegador o clube do cliente
  localStorage.setItem('clube', clube)
}

// associa ao evento change de cada botão
frm.rbBrasil.addEventListener('change', trocarClube)
frm.rbPelotas.addEventListener('change', trocarClube)
frm.rbFarroupilha.addEventListener('change', trocarClube)

const verificarClube = () => {
  if(localStorage.getItem('clube')){
    const clube = localStorage.getItem('clube')

    if(clube == 'Brasil') {
      frm.rbBrasil.checked = true
    } else if(clube == 'Pelotas') {
      frm.rbPelotas.checked = true
    } else {
      frm.rbFarroupilha.checked = true
    }
    trocarClube()
  }
}

// ao carregar a página, checa se cliente já selecionou clube anteriormente
window.addEventListener('load', verificarClube)