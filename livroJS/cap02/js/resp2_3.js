// Cria instâncias de form e saídas
const frm = document.querySelector('form');
const produto = document.querySelector('#outProduto');
const promocao = document.querySelector('#outPromocao');

// Cria o Listener e a função de cálculo e apresentação
frm.addEventListener('submit', (calculaPromocao) => {
  const vPromocao = frm.inProduto.value;
  const vPreco = Number(frm.inPreco.value);
  const produtoDesconto = vPreco * 0.50;
  const vCalcPromocao = (vPreco * 2) + produtoDesconto;

  produto.innerText = `${vPromocao} - Promoção: Leve 3 por R$ ${vCalcPromocao.toFixed(2)}`;
  promocao.innerText = `O 3º Produto custa apenas R$ ${produtoDesconto.toFixed(2)}`;

  calculaPromocao.preventDefault();
} )