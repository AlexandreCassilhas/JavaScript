const resp = document.querySelector('#outResp')
let numero
do {
  numero = Number(prompt('Digite um Número:'))
  
  if (numero == 0 || isNaN(numero)) {
    alert('Digite um número válido!')
  }
} while (numero == 0 || isNaN(numero))

let vLista = `Pares entre 1 e ${numero}: `

for(let i = 2; i <= numero; i = i + 2) {
  if (i < numero - 1) {
    vLista = vLista + `${i}, `
  } else {
    vLista = vLista + `${i}.`
  }
}
resp.innerText = vLista

