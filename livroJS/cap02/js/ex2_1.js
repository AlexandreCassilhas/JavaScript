// Cria as referências ao form e ao h3
const frm = document.querySelector('form');
const resp = document.querySelector('h3');

// Cria um ouvinte para o evento de click do botão submit
frm.addEventListener('submit', (e) => {
  const nome = frm.inNome.value;
  resp.innerText = `Olá ${nome}`;

  e.preventDefault() // evita o envio do form
})