// Cria as instâncias de form e saídas
frm = document.querySelector('form');
ValorPagar = document.querySelector('#outValorPagar');

// Cria o Listener e a função de cálculo e saída
frm.addEventListener('submit', (calculaValorPagar) => {
  const vl15min = Number(frm.inVl15min.value);
  const tempo = Number(frm.inTempo.value);
  const fracoes = Math.ceil(tempo / 15);
  const totalPagar = (vl15min * fracoes).toFixed(2);

  ValorPagar.innerText = `Valor a Pagar R$ ${totalPagar}`;

  calculaValorPagar.preventDefault();
})