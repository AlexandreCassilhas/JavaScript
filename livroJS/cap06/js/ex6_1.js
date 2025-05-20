// Instância dos elementos do DOM
const frm = document.querySelector('form')
const atendimento = document.querySelector('#outAtendimento')
const lista = document.querySelector('#outLista')
const atendidos = document.querySelector('#outAtendidos')
// Instância dos arrays e variáveis
const pacientes = []
const pacientesAtendidos = []
let listaPacientes = ''
let listaAtendidos = ''
// Cria o Listener para o input para evitar digitação de números
frm.inPaciente.addEventListener('keypress', (e) =>{
  const keyCode = (e.keyCode ? e.keyCode: e.wich)
  // keyCode entre 48 e 57 são os números
  if (keyCode > 47 && keyCode <58){
    e.preventDefault() //Não permite a digitação
  }
})
// Cria o Listener e a rotina para o botão de Adicionar
frm.addEventListener('submit', (adicionarPaciente) => {
  adicionarPaciente.preventDefault() // evita o reload do form
  const vPaciente = frm.inPaciente.value
  pacientes.push(vPaciente) // grava no array
  listaPacientes = ''
  // Varre o array e monta a lista de pacientes formatada com 1.<pax>
  pacientes.forEach((paciente, i) => {
    listaPacientes += `${i + 1}. ${paciente}\n`
  })
  // limpa o campo, seta foco e encaminha a lista de pacientes para o DOM
  frm.inPaciente.value = ''
  frm.inPaciente.focus()
  lista.innerText = listaPacientes
})
// Cria o Listener e a rotina para o botão de Urgência
frm.btnUrgencia.addEventListener('click', (adicionaUrgencia) => {
  // Checa as validações do form
  if(!frm.checkValidity()) { 
    alert('Por favor, digite o nome do Paciente.')
    frm.inPaciente.focus()
    return
  } else {
    const vPaciente = frm.inPaciente.value
    pacientes.unshift(vPaciente) // insere o paciente na 1ª posição do array
    listaPacientes = ''
    // Varre o array e monta a lista de pacientes formatada com 1.<pax>
    pacientes.forEach((paciente, i) => {
      listaPacientes += `${i + 1}. ${paciente}\n`
    })
    // limpa o campo, seta foco e encaminha a lista de pacientes para o DOM
    frm.inPaciente.value = ''
    frm.inPaciente.focus()
    lista.innerText = listaPacientes
  }
})
// Cria o Listener e a rotina para o botão de Atender
frm.btnAtender.addEventListener('click', (atenderPaciente) => {
  if (pacientes.length == 0) {
    alert('Ainda não há nenhum paciente na Lista de Atendimento.')
    frm.inPaciente.value = ''
    frm.inPaciente.focus()
  } else {
    const pacienteAtendimento = pacientes.shift() // retira o 1º do array
    pacientesAtendidos.unshift(pacienteAtendimento) // insere na 1ª posição do array
   
    atendimento.innerText = `Paciente em Atendimento: ${pacienteAtendimento}`
    listaPacientes = ''
    listaAtendidos = ''
    // Varre o array e monta a lista de pacientes formatada com 1.<pax>
    pacientes.forEach((paciente, i) => {
      listaPacientes = listaPacientes + `${i + 1}. ${paciente}\n`
    })
    // Verifica se o array já tem mais de um pax e varre o array descartando a 1ª posição, pois é o paciente em atendimento
    if (pacientesAtendidos.length > 1) {
      for(let i = 1; i < pacientesAtendidos.length; i++){
        listaAtendidos = listaAtendidos + `${pacientesAtendidos[i]} \n`
      }
    }
    // Varre o array e monta as duas listas. A Lista de Pacientes atendidos só é enviada ao DOM se o array tiver mais de um pax
    frm.inPaciente.value = ''
    frm.inPaciente.focus()
    lista.innerText = listaPacientes
    if (pacientesAtendidos.length > 1) {
      atendidos.innerText = `Lista de Pacientes Atendidos:\n${listaAtendidos}`
    }
  }
})