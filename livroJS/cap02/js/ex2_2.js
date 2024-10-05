const frm = document.querySelector('form');
const titFilme = document.querySelector('h2');
const duracaoFilme = document.querySelector('h3');

// Cria o Ouvinte para a ação do submit
frm.addEventListener('submit', (e) => {
  const tituloDigitado = frm.inTitulo.value;
  const duracaoDigitado = Number(frm.inDuracao.value);

  // calcula as horas e minutos
  const horas = Math.floor(duracaoDigitado / 60);
  const min = duracaoDigitado % 60;

  // Mostra nas tags h2 e h3 as respostas digitadas
  titFilme.innerText = 'Filme: ' + tituloDigitado;
  duracaoFilme.innerText = `Duração: ${horas} hora(s) e ${min} minutos`;
  
  e.preventDefault(); // evite o reload do form
})