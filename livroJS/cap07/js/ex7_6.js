const frm = document.querySelector('form')
const inSenha = document.querySelector('#inSenha')
const outResp = document.querySelector('#outResp')

frm.addEventListener('submit', (validarSenha) =>{
  validarSenha.preventDefault()
  const erros = []
  const senha = inSenha.value
  let mensagemErro = ''
  // checa se o tamanho da senha está entre 8 e 15 caracteres
  if (senha.length < 8 || senha.length > 15) {
    erros.push('- possuir entre 8 e 15 caracteres')
  }
  // checa de a senha possui pelo menos um número
  if (!senha.match(/[0-9]/g)) {
    erros.push('- possuir pelo menos um número')
  }
  // checa se a senha possui pelo menos uma letra minuscula
  if (senha.match(/[a-z]/g) == null) {
    erros.push('- possuir pelo menos uma letra minúscula')
  } 
  // checa se a senha possui pelo menos duas letras maiúsculas
  if (senha.match(/[A-Z]/g) == null || senha.match(/[A-Z]/g).length == 1) {
    erros.push('- possuir pelo menos duas letras maiúsculas')
  }
  // checa se a senha possui pelo menos um caracter especial
  if (!senha.match(/[\W|_]/g)) {
    erros.push('- possuir pelo menos um caracter especial')
  }
  // se o array de erros estiver zerado, valida a senha. Caso contrário, expõe os erros gravados no array.
  if (erros.length == 0) {
    outResp.innerText = 'Senha Validada com sucesso!'
  } else {
    for(erro of erros){
      mensagemErro += `${erro} \n`
    }
    outResp.innerText = `Falha na validação... A senha deve: \n${mensagemErro}\n`
  }
})

