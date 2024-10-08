// Cria a instância do form
const frm = document.querySelector('form')
// Cria a instância da saída
const outPesoIdeal = document.querySelector('h3')

frm.addEventListener('submit', (calculaPesoIdeal)=> {

  calculaPesoIdeal.preventDefault()

  const vNome = frm.inNome.value
  const vMasculino = frm.inMasculino.checked // Guarda na variável True or False
  const vAltura = Number(frm.inAltura.value)
  let vPesoIdeal

  if (vMasculino) {
    vPesoIdeal = 22 * (Math.pow(vAltura, 2)) // eleva a altura ao quadrado
  } else {
    vPesoIdeal = 21 * (Math.pow(vAltura, 2))
  }
  // Utilizando o Operador ternario
  const tPesoIdeal = vMasculino ? 22 * (Math.pow(vAltura, 2)) : 21 * (Math.pow(vAltura, 2));

  // Saída do Programa
  outPesoIdeal.innerText = `${vNome}: Seu Peso ideal é: ${tPesoIdeal.toFixed(2)}`
})

frm.addEventListener('reset', () => {
  outPesoIdeal.innerText = ''; // Limpa a msg de saída 
  frm.inNome.focus(); // seta o foco no campo nome
})