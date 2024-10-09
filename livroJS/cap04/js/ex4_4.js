// Instância o form
const frm = document.querySelector('form');
const vFranca = document.querySelector('#outFranca');

frm.addEventListener('submit', (calculaFusoFranca) => {
  calculaFusoFranca.preventDefault();

  const vBrasil = Number(frm.inBrasil.value);
  const vFusoFranca = vBrasil + 5;
  let FusoFranca;
  if (vFusoFranca > 23.59) {
    FusoFranca = vFusoFranca - 24;
  } else {
    FusoFranca = vFusoFranca;
  }

  vFranca.innerText = `Hora na França: ${FusoFranca.toFixed(2)}`;
})