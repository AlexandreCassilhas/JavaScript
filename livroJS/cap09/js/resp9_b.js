const frm = document.querySelector('form')
const btnLimpaLista = document.querySelector('#btnLimpaLista')
const outResp = document.querySelector('#outResp')

// Carrega página apresentando os produtos
window.addEventListener('load', apresentarProduto)

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const produto = frm.inProduto.value
  armazenarProduto(produto)
  apresentarProduto()
})

// Armazenando o produto em localStorage
function armazenarProduto(produto) {
  // Limpando e setando focus no campo
  frm.inProduto.value = ''
  frm.inProduto.focus()
  if(!localStorage.getItem('storageProduto')){
    localStorage.setItem('storageProduto', produto)
  } else {
    localStorage.setItem('storageProduto', localStorage.getItem('storageProduto') + ';' + produto)
  }
}

// Apresentando o produto no DOM
function apresentarProduto() {
  let listaProdutos = ''
  const produtos = localStorage.getItem('storageProduto').split(';')
  for(let produto of produtos){
    listaProdutos += `${produto}\n`
  }
  outResp.innerText = listaProdutos
}

function limpaLista() {
  if(confirm('Deseja realmente limpar a lista de compras semanal?')){
    localStorage.removeItem('storageProduto')
    alert('Lista de Compras semanal zerada!')
    outResp.innerText = ''
    return
  } else {
    return
  }

}

btnLimpaLista.addEventListener('click', limpaLista)



