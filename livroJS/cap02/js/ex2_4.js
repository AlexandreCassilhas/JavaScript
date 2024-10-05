const frm = document.querySelector('form');
const vlPagar = document.querySelector('#outValorPagar');

frm.addEventListener('submit', (e) => {
  // Recupera os dados do form
  const precoBuffet = parseFloat(frm.inBuffet.value);
  const consumoCliente = parseFloat(frm.inConsumo.value);

  // Realiza os cálculos 
  const precoGrama = precoBuffet / 1000;
  const precoTotal = consumoCliente * precoGrama;

  // Apresenta o resultado
  vlPagar.innerText = `Valor a Pagar: R$ ${precoTotal.toFixed(2)}`;

  e.preventDefault();
})