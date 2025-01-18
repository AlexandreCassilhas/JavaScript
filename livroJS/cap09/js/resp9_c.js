// Inicializando as variáveis do DOM
const frm = document.querySelector('form')
const inServico = document.querySelector('#inServico')
const inVeiculo = document.querySelector('#inVeiculo')
const btnAdicionaServico = document.querySelector('#btnAdicionaServico')
const btnExecutaServico = document.querySelector('#btnExecutaServico')
const outListaServicos = document.querySelector('#outListaServicos')
const outEmExecucao = document.querySelector('#outEmExecucao')
const outExecutados = document.querySelector('#outExecutados')
// Mostrando a lista de serviços ao carregar a página
window.addEventListener('load', mostrarListaServicos())
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
  inServico.value = ''
  inVeiculo.value = ''
  inServico.focus()
  mostrarListaServicos()
}
// Função para mostrar a lista de serviços
function mostrarListaServicos(){
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
  let emExecucao = ''
  const titulo = `Serviço em Execução:\n`
  if(confirm('Confirma a execução do serviço?')){
    if(localStorage.getItem('storageServico')){
      const servicos = localStorage.getItem('storageServico').split(',')
      const veiculos = localStorage.getItem('storageVeiculo').split(',')
      const servicoExecutado = servicos[0]
      const veiculoExecutado = veiculos[0]
      // Removendo o primeiro item dos arrays servicos/veiculos e armazenando
      const servicoExecucao = servicos.shift()
      const veiculoExecucao = veiculos.shift()
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

      // Criando a Lista de Serviços Executados
      adicionarServicoExecutado(servicoExecutado, veiculoExecutado)
      mostrarListaServicoExecutado()
    } else {
      alert('Não há nenhum serviço adicionado!')
      return
    }
  }
  
}

function adicionarServicoExecutado(servicoExecutado, veiculoExecutado){
  if(servicoExecutado != null){
    if(!localStorage.getItem('storageServicoExecutado')){
      localStorage.setItem('storageServicoExecutado', servicoExecutado)
    } else {
      localStorage.setItem('storageServicoExecutado', localStorage.getItem('storageServicoExecutado' + ',' + servicoExecutado))
    }
    if(!localStorage.getItem('storageVeiculoExecutado')){
      localStorage.setItem('storageVeiculoExecutado', veiculoExecutado)
    } else {
      localStorage.setItem('storageVeiculoExecutado', localStorage.getItem('storageVeiculoExecutado' + ',' + veiculoExecutado))
    }
  } else {
    return
  }
}

function mostrarListaServicoExecutado(){
  let listaServicosExecutados = ''
  const servicosExecutados = localStorage.getItem('storageServicoExecutado').split(',')
  const tam = servicosExecutados.length
  for(let i = 0; i < tam; i++){
    listaServicosExecutados += `${servicosExecutados[i].padEnd(30)} - ${veiculoExecutado}\n`
  }
  outExecutados.innerText = listaServicosExecutados
}