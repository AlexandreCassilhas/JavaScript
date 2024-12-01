const prompt = require('prompt-sync')()
// cria o array que receberá os objetos vinho
const vinhos = []
// Função para apresentar o título dos módulos
function titulo(texto){
  console.log()
  console.log(texto)
  console.log('='.repeat(55))
}

// Programa Principal - loop até escolher 5 para finalizar
do {
  // cria o menu
  titulo('================> Cadastro de Vinhos <=================')
  console.log('1. Inclusão de Vinhos')
  console.log('2. Listagem de Vinhos')
  console.log('3. Pesquisa por Tipo')
  console.log('4. Média e Destaques')
  console.log('5. Finalizar')
  const opcao = Number(prompt('Opção: '))
  // escolha com switch/case - return para finalizar
  switch(opcao){
    case 1: {
      incluir()
      break
    }
    case 2: {
      listar()
      break
    }
    case 3: {
      pesquisar()
      break
    }
    case 4: {
      calcularMedia()
      break
    }
    case 5: {
      finalizaPrograma()
      return
    }
    default: {
      mensagemErro()
      break
    }
  }

} while(true)
// insere os dados do vinho no array vinhos
function incluir(){
  titulo('================< Inclusão de Vinhos >================')
  const marca = prompt('Marca......:')
  const tipo = prompt('Tipo.......:')
  const preco = Number(prompt('Preço R$ :'))
  vinhos.push({marca, tipo, preco})
  console.log('Ok. Vinho Cadastrado com Sucesso!')
}
// apresenta os vinhos cadastrados no array vinhos
function listar(){
  titulo('============< Lista de Vinhos Cadastrados <============')
  console.log('|Marca...............|Tipo.................|Preço R$: |')
  console.log('+--------------------+---------------------+----------+')
  for(const vinho of vinhos){
    console.log(`|${vinho.marca.padEnd(20)}| ${vinho.tipo.padEnd(20)}| ${vinho.preco.toFixed(2).padStart(9)}|`)
  }
  console.log('+--------------------+---------------------+----------+')
}
// pesquisa por tipo varrendo o array e utilizando includes
function pesquisar(){
  titulo('============< Pesquisar por Tipo de Vinho <============')
  const pesq = prompt('Tipo: ')
  let contador = 0
  console.log('|Marca...............|Tipo.................|Preço R$: |')
  console.log('+--------------------+---------------------+----------+')
  for(const vinho of vinhos){
    if(vinho.tipo.toUpperCase().includes(pesq.toUpperCase())){
      console.log(`|${vinho.marca.padEnd(20)}| ${vinho.tipo.padEnd(20)}| ${vinho.preco.toFixed(2).padStart(9)}|`)
      contador++
    }
  } 
  console.log('+--------------------+---------------------+----------+')

  if(contador == 0){
    console.log('Não há vinhos cadastrados para esse tipo.')
  }
}
// calcula o mais barato e o mais caro utilizando o sort no array
function calcularMedia(){
  titulo('======< Média e Destaques do Cadastro de Vinhos >======')
  const num = vinhos.length
  if(num == 0){
    console.log('Não há vinhos cadastrados.')
    return
  }
  let total = 0
  for(const vinho of vinhos){
    total += vinho.preco
  }
  const media = total / num
  const vinhosOrdenados = [...vinhos]
  vinhosOrdenados.sort((a, b) => a.preco - b.preco)
  const menor = vinhosOrdenados[0]
  const maior = vinhosOrdenados[num - 1]

  console.log(`Preço médio dos vinhos: R$ ${media.toFixed(2)}`)
  console.log(`Menor Valor: R$ ${menor.preco.toFixed(2)} Marca: ${menor.marca}`)
  console.log(`Maior Valor: R$ ${maior.preco.toFixed(2)} - Marca: ${maior.marca}`)

}

function mensagemErro(){
  console.log('Opção Inválida. Por favor, escolha entre 1 e 5.')
}

function finalizaPrograma(){
  console.log('Fim das Atividades. Grato pela Escolha.')
}