const frm = document.querySelector('form')
const atendimento = document.querySelector('#outAtendimento')
const lista = document.querySelector('#outLista')
const atendidos = document.querySelector('#outAtendidos')

const pacientes = []
let listaPacientes = ''
let listaAtendidos = ''

frm.addEventListener('submit', (adicionarPaciente) => {
  adicionarPaciente.preventDefault()
  const vPaciente = frm.inPaciente.value
  pacientes.push(vPaciente)
  listaPacientes = ''

  pacientes.forEach((paciente, i) => {
    listaPacientes += `${i + 1}. ${paciente}\n`
  })

  frm.inPaciente.value = ''
  frm.inPaciente.focus()
  lista.innerText = listaPacientes
})

frm.btnUrgencia.addEventListener('click', (adicionaUrgencia) => {
  if(!frm.checkValidity()) {
    alert('Por favor, digite o nome do Paciente.')
    frm.inPaciente.focus()
    return
  } else {
    const vPaciente = frm.inPaciente.value
    pacientes.unshift(vPaciente)
    listaPacientes = ''
  
    pacientes.forEach((paciente, i) => {
      listaPacientes += `${i + 1}. ${paciente}\n`
    })

    frm.inPaciente.value = ''
    frm.inPaciente.focus()
    lista.innerText = listaPacientes
  }
})

frm.btnAtender.addEventListener('click', (atenderPaciente) => {
  if (pacientes.length == 0) {
    alert('Ainda não há nenhum paciente na Lista de Atendimento.')
    frm.inPaciente.value = ''
    frm.inPaciente.focus()
  } else {
    const pacienteAtendimento = pacientes.shift()
    listaAtendidos = listaAtendidos + `${pacienteAtendimento}\n`
    atendimento.innerText = `Paciente em Atendimento: ${pacienteAtendimento}`
    listaPacientes = ''

    pacientes.forEach((paciente, i) => {
      listaPacientes = listaPacientes + `${i + 1}. ${paciente}\n`
    })

    frm.inPaciente.value = ''
    frm.inPaciente.focus()
    lista.innerText = listaPacientes
    atendidos.innerText = `Lista de Pacientes Atendidos:\n${listaAtendidos}`
  }
})