// Inicializando o form e as variáveis
const frm = document.querySelector('form')
const entClube = document.querySelector('#inClube')
const saiResp = document.querySelector('#outResp')
const clubes = []
let listaClubes = ''
entClube.focus()

frm.addEventListener('submit', (adicionaClube) => {
  adicionaClube.preventDefault()
  const clube = entClube.value
  clubes.push(clube)
  // alert(`O clube ${clube} foi cadastrado com sucesso!`)
  entClube.value = ''
  entClube.focus()
  frm.btnListarClubes.dispatchEvent(new Event('click'))
})

frm.btnListarClubes.addEventListener('click', (listarClubes) =>{
  if(clubes.length == 0){
    alert(`Não há nenhum clube cadastrado!`)
  }
  let listaClubes = ''
  for(clube of clubes){
    listaClubes += `- ${clube}\n`
    console.log(clube)
  }
  saiResp.innerText = `Lista de Clubes Cadastrados\n${'-'.repeat(30)}\n${listaClubes}`
})

frm.btnMostrarTabela.addEventListener('click', (mostrarTabela) =>{
  const tabela = []
  if(clubes.length % 2 != 0){
    alert(`Apenas ${clubes.length} clubes estão cadastrados. A quantidade de clubes tem que ser par para montar a tabela`)
    entClube.value = ''
    entClube.focus()
    exit
  }
  let tabelaJogos = []
  let iClubeA = 0
  let iClubeB = clubes.length - 1
  while(iClubeA < iClubeB){
    tabelaJogos += `${clubes[iClubeA]} x ${clubes[iClubeB]}\n`
    iClubeA += 1
    iClubeB -= 1
  }
  saiResp.innerText = `Tabela de Jogos:\n${'-'.repeat(35)}\n${tabelaJogos}`
})