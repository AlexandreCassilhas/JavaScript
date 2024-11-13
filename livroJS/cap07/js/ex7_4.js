const frm = document.querySelector('form')
const inDominio = document.querySelector('#inDominio')
const inNome = document.querySelector('#inNome')
const outEmail = document.querySelector('#outEmail')

frm.addEventListener('submit', (geraEmail) =>{
  geraEmail.preventDefault()
  const nome = inNome.value.trim() // retira os espaços a esquerda e a direita
  const dominio = (inDominio.value.trim()).toLowerCase() // retira os espaços e coloca em minúscula

  // verifica se o nome digitado tem mais de uma palavra separada por espaço
  if(!nome.includes(' ')){ 
    alert('Por favor, entre com o nome completo.')
    return
  }
  const firstName = nome.substr(0, nome.indexOf(' ')).toLowerCase() // extrai da primeira posição até encontrar o primeiro espaço em branco
  const lastName = nome.substr(nome.lastIndexOf(' ') + 1).toLowerCase() // extrai da posição do último espaço em branco + 1 até o final da string
  const email = `${firstName}.${lastName}@${dominio}` // monta o email
  outEmail.innerText = email
})


