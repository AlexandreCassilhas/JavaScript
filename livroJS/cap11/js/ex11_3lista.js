const tabPalavras = document.querySelector('table') // cria referência a tabela
const ckbMostrar = document.getElementById('chbMostrar')

const montarTabela = () => {
  if(localStorage.getItem('jogoPalavra')){
    const palavras = localStorage.getItem('jogoPalavra').split(',')
    const dicas = localStorage.getItem('jogoDica').split(',')
  
    // Montando a tabela
    for(let i = 0; i < palavras.length; i++){
      // criando a linha e as 3 colunas
      const linha = tabPalavras.insertRow(-1)
      const col1 = linha.insertCell(0)
      const col2 = linha.insertCell(1)
      const col3 = linha.insertCell(2)
      // inserindo dados nas colunas
      col1.innerText = palavras[i]
      col2.innerText = dicas[i]
      col3.innerHTML = "<i class='exclui' title='Excluir'>&#10008;</i>"
    }
  }
}
// evento de 'change' do checkbox
ckbMostrar.addEventListener('change', () => {
  ckbMostrar.checked ? montarTabela() : window.location.reload()
})
