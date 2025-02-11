const frm = document.querySelector('form')
const tbFilmes = document.querySelector('table')

frm.addEventListener('submit', (e) => {
  e.preventDefault()
  const titulo = frm.inTitulo.value
  const genero = frm.inGenero.value

  inserirLinha(titulo, genero)
  gravarFilme(titulo, genero)

  frm.reset()
  frm.inTitulo.focus()
})

// Uma forma de criar uma função é fazê-la uma constante
const inserirLinha = (titulo, genero) => {
  const linha = tbFilmes.insertRow(-1) // insere a linha no final da tabela
  const colTitulo = linha.insertCell(0) // cria a coluna colTitulo
  const colGenero = linha.insertCell(1) // cria a coluna colGenero
  const colAcoes = linha.insertCell(2) // cria a coluna colAcoes

  colTitulo.innerText = titulo // atribui o título extraído do form à coluna
  colGenero.innerText = genero // atribui o gênero extraído do form à coluna
  colAcoes.innerHTML = "<i class='exclui' title='Excluir'>&#10008</i>"
}

const gravarFilme = (titulo, genero) => {
  if(localStorage.getItem('filmesTitulo')) {
    const filmesTitulo = localStorage.getItem('filmesTitulo') + ',' + titulo
    const filmesGenero = localStorage.getItem('filmesGenero') + ',' + genero
    localStorage.setItem('filmesTitulo', filmesTitulo)
    localStorage.setItem('filmesGenero', filmesGenero)
  } else {
    localStorage.setItem('filmesTitulo', titulo)
    localStorage.setItem('filmesGenero', genero)
  }
}

window.addEventListener('load', () =>{
  // Verifica se já há filmes cadastrados na localStorage
  if(localStorage.getItem('filmesTitulo')){
    const titulos = localStorage.getItem('filmesTitulo').split(',')
    const generos = localStorage.getItem('filmesGenero').split(',')
    //Roda um laço para inserir as linhas com os dados recuperados na localStorage
    for(let i = 0; i < titulos.length; i++){
      inserirLinha(titulos[i], generos[i])
    }
  }
})

tbFilmes.addEventListener('click', (e) => {
  // se a classe do elemento clicado contém 'exclui'
  if(e.target.className.includes('exclui')){
    // acessa o pai (tr) do pai (td) do elemento e obtém o texto do 1º filho (children[0])
    const titulo = e.target.parentElement.parentElement.children[0].innerText

    if(confirm(`Confirma a exclusão do filme ${titulo}?`)){
      // remove a linha da tabela correspondente ao símbolo clicado
      e.target.parentElement.parentElement.remove()
      // exclusão dos localStorages
      localStorage.removeItem('filmesTitulo')
      localStorage.removeItem('filmesGenero')

      // salva novamente os filmes (se existir), acessando o conteúdo da tabela
      for(let i = 0; i < tbFilmes.rows.length; i++) {
        // obtém o conteúdo da tabela
        const auxTitulo = tbFilmes.rows[i].cells[0].innerText
        const auxGenero = tbFilmes.rows[i].cells[1].innerText
        gravarFilme(auxTitulo, auxGenero)
        frm.inTitulo.focus()
      }
    }
  }
})