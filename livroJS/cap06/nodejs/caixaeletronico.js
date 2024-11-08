// Carregando o module "prompt"
const prompt = require('prompt-sync')()

// Inicializando os arrays e variáveis
const tipoCedulas = []
let listaCedulas = ''
let listsCedulasOrdenadas = ''
let totalCaixa = 0
const saques = []

// Mensagens de inicialização do Caixa Eletrônico
console.log(`\n\n`)
console.log(`Inicializando o Terminal...\n`)
console.log(`Entre com os tipos de cédulas que o terminal poderá operar. Ao terminar, digite 0:\n\n`)

// Const criada para ser inserida no array e fazer a contagem total dos saques
const contadorCedulas = 0 
// Entrada dos tipos de cédulas que estarão disponíveis para saque
do{
  const cedula = Number(prompt('Digite o valor da cédula: '))
  if(cedula == 0){
    break
  }
  const qtdeCedula = Number(prompt(`Digite a quantidade de cédulas de R$ ${cedula.toFixed(2)}: `))
  console.log(`Cédula de R$ ${cedula.toFixed(2)} cadastrada com sucesso!`)
  tipoCedulas.push({cedula, qtdeCedula, contadorCedulas})
}while(true)

// Ordenação decrescente das cédulas no array, visando a ordem de dispensação das cédulas
tipoCedulas.sort(function(a, b){
  return a.cedula < b.cedula ? -1 : a.cedula > b.cedula ? 1 : 0
})
const vDescrescente = tipoCedulas.reverse()

// Cria um array cópia de outro array *** NÃO USADO - apenas para conhecer a sintaxe ***
const arrayTeste = vDescrescente.map(aux => ({cedulaTipo: aux.cedula, cedulaQtd: aux.qtdeCedula, cedulaCont: aux.contadorCedulas}))


// Apresentando a Lista de Cédulas Cadastradas e o total em caixa no terminal
for(tipoCedula of vDescrescente){
  totalCaixa += tipoCedula.cedula * tipoCedula.qtdeCedula
  listaCedulas += `R$ ${tipoCedula.cedula.toFixed(2).padEnd(8)} | ${tipoCedula.qtdeCedula} unidades\n`
}
console.log(`\nLista de Cédulas Cadastradas:\n${'-'.repeat(30)}\n${listaCedulas}\n`)
console.log(`Total em Caixa: R$ ${totalCaixa.toFixed(2)}\n`)

// Informando a maior e a menor cédula disponivel. *******
const maiorCedula = Math.max(...vDescrescente.map(({cedula}) => cedula))
const menorCedula = Math.min(...vDescrescente.map(({cedula}) => cedula))
console.log(`A maior cédula disponível é de R$ ${maiorCedula.toFixed(2)}`)
console.log(`A menor cédula disponível é de R$ ${menorCedula.toFixed(2)}`)

// Informando que o terminal já está pronto para os saques.
console.log(`\nTerminal já está pronto para a realização de saques.\n`)
console.log(`Entre com os saques e digite 0 para encerrar:\n`)

// Realização dos saques
const contagemTotalCedulas = []
do{
  const valorSaque = Number(prompt('Digite o valor do saque: '))
  // Digite 0 para sair da função saque
  if(valorSaque == 0){
    break
  }
  // Erro se o valor do saque for menor que a menor cédula disponível
  if(valorSaque < menorCedula){
    console.log(`Valor incompatível com as cédulas disponíveis no terminal.`)
    continue
  }
  // Inicializa as variáveis para o processo de saque
  let processaSaque = valorSaque // variável que será decrementada a cada cédula
  let cedula = 0 // receberá o tipo de cédula do loop while
  let contaCedulas = 0 // contará o nº de cédulas por tipo
  const saqueConsolidado = [] // array que armazenará o saque consolidado
  // Se o valor informado for compatível com o valor em caixa, executa o processamento do saque
  if(totalCaixa >= processaSaque){
    // Executa um loop por todas as cédulas cadastradas, em ordem decrescente, com suas quantidades
    for(let i = 0; i < vDescrescente.length; i++){
      // Enquanto o valor do saque for menor que o total em caixa && valor do saque >= Cédula[i] && Qtde.Cédula[i] > contagem desta Cédula no saque && Qtde.Cédula[i] > Contador Total de Cédulas[i]
      while(totalCaixa >= processaSaque && processaSaque >= vDescrescente[i].cedula && vDescrescente[i].qtdeCedula > contaCedulas && vDescrescente[i].qtdeCedula > vDescrescente[i].contadorCedulas){
        cedula = vDescrescente[i].cedula
        processaSaque = processaSaque - vDescrescente[i].cedula
        contaCedulas = contaCedulas + 1
        vDescrescente[i].contadorCedulas += 1
        totalCaixa -= cedula
        if(processaSaque == 0){
          break
        }
      }
  
      if(contaCedulas > 0){
        saqueConsolidado.push({cedula, contaCedulas})
        contagemTotalCedulas.push({cedula, contaCedulas})
      }
  
      contaCedulas = 0 // zera o contador para ser utilizado por outra cédula no mesmo saque
      // Se atingiu o valor total do saque, sai do loop
      if(processaSaque == 0){
        break
      }
    }
  }
  // Ao sair do loop, se não zerou o saque é porque houve incompatibilidade e apresenta erro. Senão, apresenta os dados do saque consolidados
  if(processaSaque != 0){
    console.log(`Valor incompatível com as cédulas disponíveis no terminal.\n`)
    } else {
      console.log(`\nForam utilizadas as seguintes cédulas para o saque:\n`)
      for(saque of saqueConsolidado){
        console.log(`R$ ${saque.cedula.toFixed(2)} - ${saque.contaCedulas} unidade(s).`)
      }
      console.log(`${'-'.repeat(40)}\n`)
    }
   
}while(true)
// Apresenta o total de cédulas utilizadas em ordem de execução dos saques.
console.log(`\nTotal de Cédulas utilizadas nos saques:`)
for(contagem of contagemTotalCedulas){
    console.log(`R$ ${contagem.cedula.toFixed(2)} - ${contagem.contaCedulas} unidade(s).\n${'.'.repeat(40)}`)
  }
console.log(`${'-'.repeat(40)}\n`)
