
// Função para Máscara de CPF
function mascaraCPF(input) {
    let value = input.value;
    
    // 1. Remove tudo o que não é dígito
    value = value.replace(/\D/g, "");

    // 2. Aplica a formatação conforme o preenchimento
    // 000.000.000-00
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    input.value = value;
}

// Função para Máscara de Celular
function mascaraCelular(input) {
    let value = input.value;
    
    // 1. Remove tudo o que não é dígito
    value = value.replace(/\D/g, "");

    // 2. Aplica a formatação conforme o preenchimento
    // (00) 00000-0000
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");

    input.value = value;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove pontos e traços
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false; // Rejeita CPFs com números repetidos (ex: 111.111...)
    
    let soma = 0, resto;
    // Validação do 1º dígito
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    // Validação do 2º dígito
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

let fotoBase64 = "";

function validarImagem(input) {
    const file = input.files[0];
    if (!file) return;

    // 1. Validar tamanho (300kb = 307200 bytes)
    if (file.size > 307200) {
        alert("O arquivo é muito grande! Máximo de 300kb.");
        input.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // 2. Validar dimensões (400x400)
            if (this.width !== 400 || this.height !== 400) {
                alert("A imagem deve ter exatamente 400x400 pixels.");
                input.value = "";
                return;
            }
            document.getElementById('preview').src = e.target.result;
            document.getElementById('preview').style.display = 'block';
            fotoBase64 = e.target.result; // Salva para o envio
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

async function salvarUsuario() {

    // ... capturar valores ...
    const cpfFormatado = document.getElementById('regCPF').value;
    const celularFormatado = document.getElementById('regCelular').value;
    const email = document.getElementById('regEmail').value;
    
    // Validação de CPF
    if (!validarCPF(cpfFormatado)) return alert("CPF Inválido!");

    // Validação Simples de Email (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert("Formato de email inválido!");

    const payload = {
        nome: document.getElementById('regNome').value,
        email: email,
        celular: celularFormatado.replace(/\D/g, ''),
        cpf: cpfFormatado.replace(/[^\d]+/g, ''), // Envia apenas números
        senha: document.getElementById('regSenha').value,
        foto: fotoBase64,
        perfil_id: document.getElementById('regPerfil').value,
        solicitantePerfis: JSON.parse(localStorage.getItem('polifonia_user')).perfis
    };

    const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        window.location.reload();
    } else {
        const err = await response.json();
        alert("Erro: " + err.message);
    }
}