// Instância do form e saída
const frm = document.querySelector('form');
const vTaxaEntrega = document.querySelector('#outTaxaEntrega');

// Cria Listener 'submit'
frm.addEventListener('submit', (calculaTaxaEntrega) => {

  calculaTaxaEntrega.preventDefault();

  const vBairro = frm.inBairro.value;
  let taxaEntrega;

  switch(vBairro) {
    case "Barra da Tijuca":
      taxaEntrega = 5.00
      break
    case "Centro":
    case "Flamengo":
      taxaEntrega = 6.50
      break
    case "Botafogo":
    case "Largo do Machado":
      taxaEntrega = 7.00
      break
    case "Copacabana":
      taxaEntrega = 8.50
      break
    case "Ipanema":
      taxaEntrega = 8.00
      break
    case "Leblon":
      taxaEntrega = 9.50
      break
    default:
      taxaEntrega = 7.50
  }

  vTaxaEntrega.innerText = `A taxa de entrega para o bairro ${vBairro} é de R$ ${taxaEntrega.toFixed(2)}`;
})
