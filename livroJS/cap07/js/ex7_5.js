const frm = document.querySelector('form')
const inDominio = document.querySelector('#inDominio')
const inNome = document.querySelector('#inNome')
const outEmail = document.querySelector('#outEmail')
frm.reset()

frm.addEventListener('submit', (geraEmail) =>{
  geraEmail.preventDefault()
  const nome = inNome.value.trim() // retira os espaços a esquerda e a direita
  const dominio = (inDominio.value.trim()).toLowerCase() // retira os espaços e coloca em minúscula

  // verifica se o nome digitado tem mais de uma palavra separada por espaço
  if(!nome.includes(' ')){ 
    alert('Por favor, entre com o nome completo.')
    frm.reset()
    return
  }
  let email = ''
  const partes = nome.split(' ') // cria um vetor com as palavras isoladas como elementos
  const numPalavras = partes.length // conta quantas palavas compõem o vetor
  for(let i = 0; i < numPalavras - 1; i++){
    email += (partes[i].charAt(0)).toLowerCase() 
    // Pega a 1ª Letra de cada palavra (exceto a última)
  }
  const lasName = partes[numPalavras - 1] // Pega a última palavra do vetor
  email += `${lasName.toLowerCase()}@${dominio}` 
  // adiciona a última palavra inteira ao email e põe em minúsculas
  outEmail.innerText = email
})


