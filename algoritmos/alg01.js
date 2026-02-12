const soImpar = (tam) => {
  var result = '';
  for(let cont = 1; cont <= tam; cont++){
    if(cont%2 != 0) {
        result += `Valor da Variável: ${cont} \n`;
    }
  }
  return result;
}

// -----------------------------------------------------------------------

const calculaMedia = (...notas) => {
  const tam = notas.length;
  let somaNotas = 0;
  for(let i = 0; i < tam; i++) {
    somaNotas += notas[i];
  }
  const media = somaNotas / tam;
  return media;
}

let paragrafo1 = document.getElementById('p01');
paragrafo1.innerText = soImpar(10);

let paragrafo2 = document.getElementById('p02');
var notas = [5, 8.5 , 8.5, 10, 6.5, 10];
paragrafo2.innerText = `A média das notas é: ${calculaMedia(...notas).toFixed(2)}`;

// --------------------------------------------------------------------------

const mostrarHora = () => {
  const data = new Date();
  const hora = data.getHours();
  const minutos = data.getMinutes();
  const segundos = data.getSeconds();
  const horario = `${hora} : ${minutos} : ${segundos}`;

  return horario;
}

let paragrafo3 = document.getElementById('p03');
paragrafo3.innerText = `O horário atual é: ${mostrarHora()}`;