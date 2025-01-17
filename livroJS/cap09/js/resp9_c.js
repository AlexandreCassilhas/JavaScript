// Inicializando as variáveis do DOM
const frm = document.querySelector('form')
const inServico = document.querySelector('#inServico')
const inVeiculo = document.querySelector('#inVeiculo')
const btnAdicionaServico = document.querySelector('#btnAdicionaServico')
const btnExecutaServico = document.querySelector('#btnExecutaServico')
const outListaServicos = document.querySelector('#outListaServicos')
const outEmExecucao = document.querySelector('#outEmExecucao')

window.addEventListener('load', mostrarListaServicos())

frm.addEventListener('submit', (e) =>{
  e.preventDefault()
  const servico = inServico.value
  const veiculo = inVeiculo.value
  adicionarServico(servico, veiculo)
})

btnExecutaServico.addEventListener('click', () =>{
  executarServico()
})

function adicionarServico(servico, veiculo) {
  if(confirm(`Confirma a inclusão do serviço ${servico}, a ser realizado no veículo ${veiculo}?`)){
    if(!localStorage.getItem('storageServico')){
      localStorage.setItem('storageServico', servico)
    } else {
      localStorage.setItem('storageServico', localStorage.getItem('storageServico') + ';' + servico)
    }
    alert('Serviço adicionado com sucesso.')
  } 
  if(!localStorage.getItem('storageVeiculo')) {
    localStorage.setItem('storageVeiculo', veiculo)
  } else {
    localStorage.setItem('storageVeiculo', localStorage.getItem('storageVeiculo') + ';' + veiculo)
  }
  inServico.value = ''
  inVeiculo.value = ''
  inServico.focus()
  mostrarListaServicos()
}

function mostrarListaServicos(){
  let listaServicos = ''
  const titulo = `Relação de Serviços: \n${'='.repeat(20)}\n`
  const servicos = localStorage.getItem('storageServico').split(';')
  const veiculos = localStorage.getItem('storageVeiculo').split(';')
  const tam = servicos.length
  for(let i = 0; i < tam; i++){
    listaServicos += `${servicos[i].padEnd(30)}  - ${veiculos[i]}\n`
  }
  outListaServicos.innerText = titulo + listaServicos
}

function executarServico(){
  let servicoExecucao = ''
  const titulo = `Serviço em Execução:\n`
  if(confirm('Confirma a execução do serviço?')){
    if(localStorage.getItem('storageServico')){
      const servicos = localStorage.getItem('storageServico').split(';')
      const veiculos = localStorage.getItem('storageVeiculo').split(';')
      const tam = servicos.length
      for(let i = 0; i < tam; i++){
        if(i == 0){
          servicoExecucao = `${servicos[i].padEnd(30)}  - ${veiculos[i]}`
        }
      }
     outEmExecucao.innerText = titulo + servicoExecucao
    }
  }
  
}