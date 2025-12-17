const ultimo = 10;
let paragrafo1 = document.getElementById('p01');
let paragrafo2 = document.getElementById('p02');

var result = '';

for (let i=1; i <= ultimo; i++){
  result += `Valor da Variável é: ${i}; \n`
}
paragrafo1.innerText = result;

let cont = 0;
var result2 = ''
while (cont <= 9) {
  cont++;
  // Pulando os números pares
  if (cont %2 == 0) {
    continue;
  }
  // Quebrando o while no 7
  if (cont == 7){
    break;
  }
  result2+= `Valor da Variável é: ${cont}; \n`
};
paragrafo2.innerText = result2;