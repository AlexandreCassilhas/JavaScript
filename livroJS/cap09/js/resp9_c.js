// Inicializando as variáveis do DOM
const frm = document.querySelector('form')
const inServico = document.querySelector('#inServico')
const inVeiculo = document.querySelector('#inVeiculo')
const btnAdicionaServico = document.querySelector('#btnAdicionaServico')
const btnExecutaServico = document.querySelector('#btnExecutaServico')
const outListaServicos = document.querySelector('#outListaServicos')
const outEmExecucao = document.querySelector('#outEmExecucao')
const outExecutados = document.querySelector('#outExecutados')
let emExecucao = ''
const servicoExecutado = []
const veiculoExecutado = []
// Mostrando a lista de serviços ao carregar a página
if(localStorage.getItem('storageServico')){
  window.addEventListener('load', mostrarListaServicos())
}

// Listener para o botão "Adicionar Serviço"
frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const servico = inServico.value
  const veiculo = inVeiculo.value
  adicionarServico(servico, veiculo)
})
// Listener para o botão "Executar Serviço"
btnExecutaServico.addEventListener('click', () =>{
  executarServico()
})
// Função para adicionar o serviço
function adicionarServico(servico, veiculo) {
  if(confirm(`Confirma a inclusão do serviço ${servico}, a ser realizado no veículo ${veiculo}?`)){
    if(!localStorage.getItem('storageServico')){
      localStorage.setItem('storageServico', servico)
    } else {
      localStorage.setItem('storageServico', localStorage.getItem('storageServico') + ',' + servico)
    }
  } 
  if(!localStorage.getItem('storageVeiculo')) {
    localStorage.setItem('storageVeiculo', veiculo)
  } else {
    localStorage.setItem('storageVeiculo', localStorage.getItem('storageVeiculo') + ',' + veiculo)
  }
  mostrarListaServicos()
}
// Função para mostrar a lista de serviços
function mostrarListaServicos(){
  // limpando os campos e setando focus em serviço
  inServico.value = ''
  inVeiculo.value = ''
  inServico.focus()
  let listaServicos = ''
  const titulo = `Relação de Serviços: \n${'='.repeat(20)}\n`
  const servicos = localStorage.getItem('storageServico').split(',')
  const veiculos = localStorage.getItem('storageVeiculo').split(',')
  const tam = servicos.length
  for(let i = 0; i < tam; i++){
    listaServicos += `${servicos[i].padEnd(30)}  - ${veiculos[i]}\n`
  }
  outListaServicos.innerText = titulo + listaServicos
}
// Função para executar o serviço
function executarServico(){
  const titulo = `Serviço em Execução:\n${'='.repeat(20)}\n`
  if(confirm('Confirma a execução do serviço?')){
    if(localStorage.getItem('storageServico')){
      const servicos = localStorage.getItem('storageServico').split(',')
      const veiculos = localStorage.getItem('storageVeiculo').split(',')
      // Removendo o primeiro item dos arrays servicos/veiculos e armazenando
      const servicoExecucao = servicos.shift()
      const veiculoExecucao = veiculos.shift()
      // Carregando os arrays de serviço executado
      servicoExecutado.push(servicoExecucao)
      veiculoExecutado.push(veiculoExecucao)
      // Mostrando o serviço em execução no DOM
      emExecucao = `${servicoExecucao.padEnd(30)}  - ${veiculoExecucao}`
      outEmExecucao.innerText = titulo + emExecucao
      
      // Limpando as localStorages para recriá-los sem o primeiro item
      localStorage.removeItem('storageServico')
      localStorage.removeItem('storageVeiculo')
      // Recriando as localStorages sem o primeiro item
      localStorage.setItem('storageServico', servicos)
      localStorage.setItem('storageVeiculo', veiculos)
      mostrarListaServicos()
      mostrarListaServicoExecutado(servicoExecutado, veiculoExecutado)
    } else {
      alert('Não há nenhum serviço adicionado!')
      return
    }
  }
}

function mostrarListaServicoExecutado(servicoExecutado, veiculoExecutado){
  let listaServicosExecutados = ''
  const titulo = `Serviços Executados:\n${'='.repeat(20)}\n`
  // Loop para recuperar os serviços executados, exceto o último, pois ainda está em execução (length - 1).
  for(let i = 0; i < servicoExecutado.length - 1; i++){
    console.log(servicoExecutado.length)
    console.log(servicoExecutado[i] + veiculoExecutado[i])
    listaServicosExecutados = listaServicosExecutados + `${servicoExecutado[i]} - ${veiculoExecutado[i]}\n`
  }
  outExecutados.innerText = titulo + listaServicosExecutados
}