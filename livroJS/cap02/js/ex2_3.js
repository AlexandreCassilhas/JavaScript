// Inicializando as principais variáveis
const frm = document.querySelector('form');
const nomeVeiculo = document.querySelector('#outVeiculo');
const vlEntrada = document.querySelector('#outEntrada');
const numParcelas = document.querySelector('#out12x');

frm.addEventListener('submit', (e) => {
  const veiculo = frm.inVeiculo.value;
  const preco = Number(frm.inPreco.value);

  // Cálculos das Formas de Pagamento
  const entrada = preco * 0.5;
  const parcelas = (preco - entrada) / 12;

  // Apresentando os resultados
  nomeVeiculo.innerText = `Promoção: ${veiculo}`;
  vlEntrada.innerText = `Entrada de: R$ ${entrada.toFixed(2)}`;
  numParcelas.innerText = `+ 12x de ${parcelas.toFixed(2)}`;

  e.preventDefault();
})
