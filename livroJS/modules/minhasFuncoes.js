/* 
  Arquivo contendo as funções desenvolvidas por mim
  Data Início: 24/04/2025
*/
// Retira os espaços de ambos os lados do texto e coloca tudo em maiúsculas
export function retiraEspacos(texto) {
  const semEspacos = (texto.trim()).toUpperCase()
  return semEspacos
}

// Função que insere um item em um dado localStorage.
export function insereLocalStorage(localStorageName, item) {
  if(localStorage.getItem(localStorageName)){
    localStorage.setItem(localStorageName, localStorage.getItem(localStorageName) + ',' + item)
  } else {
    localStorage.setItem(localStorageName, item)
  }
}

// Pesquisa item no localStorage
export function pesquisaLocalStorage(localStorageName, item) {
  let cadastrado = false
  if(localStorage.getItem(localStorageName)){
    const itens = localStorage.getItem(localStorageName).split(',')
    if(itens.includes(item)){
      cadastrado = true
    }
  }
  return cadastrado
}