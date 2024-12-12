const imClube = document.querySelector('#imgClube')
const dvTitulo = document.querySelector('#divTitulo')

const trocarClube = () => {
  const clubes = ['Brasil', 'Pelotas', 'Farroupilha', 'Vasco']
  
  let selecao

  // Percorre os inRadios para verificar qual está checked
  for(let i = 0; i < inRadios.length; i++){
    if(inRadios[i].checked) {
      selecao = i
      break
    }
  }

  if(selecao <= 3){
    dvTitulo.className = `row cores-${clubes[selecao]}`
    imClube.src = `img/${clubes[selecao].toLowerCase()}.png`
    imClube.className = `img-fluid`
    imClube.alt = `Símbolo do ${clubes[selecao]}`
    localStorage.setItem('clube', clubes[selecao])
  } else {
    dvTitulo.className = 'row'
    imClube.className = 'd-none'
    imClube.alt = ''
    localStorage.removeItem('clube')
  }
}

// associa ao evento change de cada botão
const inRadios = document.querySelectorAll('input')

for(const inRadio of inRadios){
  inRadio.addEventListener('change', trocarClube)
}


const verificarClube = () => {
  if(localStorage.getItem('clube')){
    const clube = localStorage.getItem('clube')

    if(clube == 'Brasil') {
      inRadios[0].checked = true
    } else if(clube == 'Pelotas') {
      inRadios[1].checked = true
    } else if(clube == 'Farroupilha') {
      inRadios[2].checked = true
    } else {
      inRadios[3].checked = true
    }
    trocarClube()
  }
}

// ao carregar a página, checa se cliente já selecionou clube anteriormente
window.addEventListener('load', verificarClube)