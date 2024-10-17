alert('Digite 0 quando quiser sair do programa!')
let resultado
do {
  const numero = Number(prompt('Digite um número'))
  if (numero == 0 || isNaN(numero)) {
    const sair = confirm('Confirma a saída?')
    if (sair){
      resultado = 'Você saiu do programa! Bye Bye!'
      break
    } else {
      continue
    }
  }
  if (numero % 2 == 0) {
    resultado = numero * 2
    alert(`O número ${numero} é par. O dobro é ${resultado}`)
  } else {
    resultado = numero * 3
    alert(`O número ${numero} é ímpar. O triplo é ${resultado}`)
  }
}while(true)
alert(resultado)
