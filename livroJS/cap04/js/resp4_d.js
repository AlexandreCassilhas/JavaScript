// Inicializando as instâncias
const frm = document.querySelector('form')
const lados = document.querySelector('#outLados')
const obs = document.querySelector('#outObs')
const tipo = document.querySelector('#outTipo')

frm.addEventListener('submit', (calculaTipoTriangulo) => {
  calculaTipoTriangulo.preventDefault()
  // capturando valores do form
  const vLadoA = Number(frm.inLadoA.value);
  const vLadoB = Number(frm.inLadoB.value);
  const vLadoC = Number(frm.inLadoC.value);
  // Inicializando as variáveis
  let vObs = 'Os lados podem formar um Triângulo'
  let vTipo = ''
  tipo.innerText = ''
  // Apresentando os valores digitados
  lados.innerText = `Lado A: ${vLadoA}\nLado B: ${vLadoB}\nLado C: ${vLadoC}`
  // Processando os valores
  if ((vLadoC > (vLadoA + vLadoB)) || (vLadoA > (vLadoB + vLadoC)) || (vLadoB > (vLadoA + vLadoC))) {
    vObs = 'Os lados não formam um triângulo'
  } else if ((vLadoA == vLadoB) && (vLadoB == vLadoC)) {
    vTipo = 'Equilátero'
  } else if (((vLadoA == vLadoB) && (vLadoB != vLadoC)) || ((vLadoA == vLadoC) && (vLadoC != vLadoB)) || ((vLadoB == vLadoC) && (vLadoC != vLadoA))) {
    vTipo = 'Isósceles'
  } else {
    vTipo = 'Escaleno'
  }
  // Apresentando os resultados
  obs.innerText = vObs
  if (vObs != 'Os lados não formam um triângulo') {
   tipo.innerText = `Tipo: ${vTipo}`
  }
})