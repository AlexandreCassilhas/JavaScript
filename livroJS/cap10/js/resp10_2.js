const frm = document.querySelector('form')
const mainDiv = document.getElementById('mainDiv')
const inNome = document.getElementById('inNome')


frm.addEventListener('submit', (e) => {
  e.preventDefault()
  const nome = inNome.value
  const partesNome = nome.split(' ')
  criarDivResp()
  

  function criarDivResp() {
    const divResp = document.createElement('div')
    partesNome.forEach(nome => {
      const idCor = Math.ceil(Math.random() * 10)
      const h2Resp = document.createElement('h2')
      
      definirCor(idCor) // executa função (10 cores)

      const pedacoNome = document.createTextNode(nome)
      h2Resp.appendChild(pedacoNome)
      divResp.appendChild(h2Resp)
      mainDiv.appendChild(divResp)

      function definirCor(idCor) {
        switch (idCor) {
          case 1 : 
            h2Resp.style.color = 'purple'
            break 
          case 2 :
            h2Resp.style.color = 'yellow'
            break
          case 3 :
            h2Resp.style.color = 'brown'
            break
          case 4 : 
            h2Resp.style.color = 'green'
            break
          case 5 :
            h2Resp.style.color = 'blue'
            break
          case 6 :
            h2Resp.style.color = 'red'
            break    
          case 7 :
            h2Resp.style.color = 'grey'
            break
          case 8 :
            h2Resp.style.color = 'pink'
            break 
          case 9 :
            h2Resp.style.color = 'black' 
            break
          case 0 :
            h2Resp.style.color = 'light-blue'
            break
        }
      }
    })
  }
})