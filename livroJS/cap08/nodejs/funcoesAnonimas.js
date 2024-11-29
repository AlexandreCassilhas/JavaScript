const prompt = require('prompt-sync')()

// Função Anônima
const mostraHora = () => {
  const data = new Date()
  const hora = data.getHours()
  const minutos = data.getMinutes()
  const segundos = data.getSeconds()
  console.log(`Atenção para o horário: ${hora}:${minutos}:${segundos}`)
}
// Faz uma chamada a função a cada 5000 milisegundos (5s)
setInterval(mostraHora, 5000)
