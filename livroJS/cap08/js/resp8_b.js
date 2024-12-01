const frm = document.querySelector('form')
const inNome = document.querySelector('#inNome')
const outResp = document.querySelector('#outResp')

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const nome = inNome.value.trim()

  const nomeValido = validarNome(nome)
  const sobrenome = obterSobrenome(nome)
  const quantVogais = contarVogais(nome)


  outResp.innerText = `Senha inicial: ${sobrenome}${quantVogais}`

})

function validarNome(nome){
  let contador = 0
  for(letra of nome){
    if(letra == ' '){
      contador++
    }
  }
  return contador >= 1 ? true : false 
}

function obterSobrenome(nome){
  const ultSpace = nome.lastIndexOf(' ')
  const sobrenome = nome.substr(ultSpace + 1)
  return sobrenome
}

function contarVogais(nome){
  const nomeMaiuscula = nome.toUpperCase()
  let contador = 0
  for (letra of nomeMaiuscula){
    if (letra == 'A' || letra == 'E' || letra == 'I' || letra == 'O' || letra == 'U'){
      contador++
    }
  }
  return contador
}

