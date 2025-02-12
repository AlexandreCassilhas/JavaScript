const frm = document.querySelector('form')
const mainDiv = document.querySelector('#mainDiv')
const btnNovasVelas = document.querySelector('#btnNovasvelas')
const inIdade = document.querySelector('#inIdade')

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const divIdade = document.createElement('div')
  mainDiv.appendChild(divIdade)
  const idade = Number(inIdade.value)
  const numerais = idade.toString()
  const tam = numerais.length
  let nomeImagem = ''
  let altImagem = ''
  let num = ''
  for(let i = 0; i < tam; i++) {
    num = numerais[i]
    switch (num) {
      case '0': 
        nomeImagem = 'zero.png'
        altImagem = 'zero'
        break
      case '1':
        nomeImagem = 'um.png'
        altImagem = 'um'
        break
      case '2':
        nomeImagem = 'dois.png'
        altImagem = 'dois'
        break
      case '3':
        nomeImagem = 'tres.png'
        altImagem = 'tres'
        break
      case '4':
        nomeImagem = 'quatro.png'
        altImagem = 'quatro'
        break
      case '5':
        nomeImagem = 'cinco.png'
        altImagem = 'cinco'
        break
      case '6': 
        nomeImagem = 'seis.png'
        altImagem = 'seis'
        break
      case '7':
        nomeImagem = 'sete.png'
        altImagem = 'sete'
        break
      case '8':
        nomeImagem = 'oito.png'
        altImagem = 'oito'
        break
      case '9':
        nomeImagem = 'nove.png'
        altImagem = 'nove'
        break
  }
    criarNumeral(nomeImagem, altImagem)
  };

  function criarNumeral(nomeimagem, altImagem) {
    const img = document.createElement('img')
    img.src = 'img/numerais/' + nomeImagem
    img.alt = altImagem
    img.width = 100
    divIdade.appendChild(img)
  }

})