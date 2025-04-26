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
      col3.innerHTML = "<img class='icone exclui' src='./img/botao-excluir.png' alt='excluir' title='Excluir'>"
    }
  }
}
// evento de 'change' do checkbox
ckbMostrar.addEventListener('change', () => {
  ckbMostrar.checked ? montarTabela() : window.location.reload()
})

tabPalavras.addEventListener('click', (e) => {
  // identifica o ícone de exclusão da linha clicada
  if(e.target.classList.contains('exclui')) {
    // acessa o pai (table) do pai (tr) do elemento alvo (td), e obtém o texto do 1º filho (children[0])
    const palavra = e.target.parentElement.parentElement.children[0].innerText

    if(confirm(`Confirma a exclusão da palavra ${palavra}?`)){
      e.target.parentElement.parentElement.remove()
      // exclui os dois localStorages para recriá-los depois
      localStorage.removeItem('jogoPalavra')
      localStorage.removeItem('jogoDica')
      // cria dois arrays para receber os dados remanescentes da tabela
      const palavras = []
      const dicas = []
      // Obtém os dados da tabela
      for(let i = 1; i < tabPalavras.rows.length; i++){
        palavras.push(tabPalavras.rows[i].cells[0].innerText)
        dicas.push(tabPalavras.rows[i].cells[1].innerText)
      }
      // Recria os localStorages com o conteúdo da tabela
      localStorage.setItem('jogoPalavra', palavras.join(','))
      localStorage.setItem('jogoDica', dicas.join(','))
    }
  }
})
