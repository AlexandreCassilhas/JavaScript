// Instanciando o form
const frm = document.querySelector('form');
const media = document.querySelector('#outMedia');
const situacao = document.querySelector('#outSituacao');

// Criando o Listener e o processamento
frm.addEventListener('submit', (checaMedia) => {
  checaMedia.preventDefault();

  const vNome = frm.inNome.value;
  const n1 = Number(frm.inNota1.value);
  const n2 = Number(frm.inNota2.value);
  const vMedia = (n1 + n2) / 2;

  // Saídas
  media.innerText = `Aluno: ${vNome}\n1ª Nota: ${n1.toFixed(2)} | 2ª Nota: ${n2.toFixed(2)} | Média das Notas: ${vMedia.toFixed(2)}`;

  if (vMedia >= 7) {
    situacao.innerText = `Aluno Aprovado`;
    situacao.style.color = 'blue'; // altera cor da fonte (CSS)
  } else if (vMedia >= 5) {
    situacao.innerText = `Aluno em Prova Final`;
    situacao.style.color = 'green';
  } else {
    situacao.innerText = `Aluno Reprovado`;
    situacao.style.color = 'red';
  }
})

