// Inicializar as variáveis principais
const frm = document.querySelector('form');
const medicamentoSaida = document.querySelector('#outMedicamento');
const promocaoSaida = document.querySelector('#outPromocao');

// Criando o Listener e a função de cálculo e apresentação
frm.addEventListener('submit', (calculaPromocao)=> {
  const medicamento = frm.inMedicamento.value;
  const preco = Number(frm.inPreco.value);
  const promocao = Math.floor(preco) * 2;

  medicamentoSaida.innerText = `Promoção de ${medicamento}`;
  promocaoSaida.innerText = `Leve 2 por apenas R$ ${promocao}`;

  calculaPromocao.preventDefault(); // Evita o reload do form
})