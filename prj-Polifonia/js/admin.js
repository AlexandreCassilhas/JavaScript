let allUsers = [];
let fotoBase64 = null;

document.addEventListener('DOMContentLoaded', loadUsers);

// Formata 11 dígitos para 000.000.000-00
function formatarCPF(cpf) {
    const limpo = cpf.replace(/[^\d]+/g, '');
    return limpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Formata 11 dígitos para (00) 00000-0000
function formatarCelular(celular) {
    const limpo = celular.replace(/[^\d]+/g, '');
    return limpo.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}


// 1. Carregar Usuários do Banco (Apenas indicativo_exclusao = FALSE)
async function loadUsers() {
    try {
        const res = await fetch('http://localhost:3000/usuarios');
        allUsers = await res.json();
        renderUsersTable();
    } catch (e) { console.error("Erro ao carregar equipe:", e); }
}

// 2. Renderizar Tabela com botões de Editar e o "X" de exclusão
function renderUsersTable() {
    const tbody = document.getElementById('users-body');
    tbody.innerHTML = "";

    allUsers.forEach(u => {
        const foto = u.foto_perfil || 'https://via.placeholder.com/40';
        
        tbody.innerHTML += `
            <tr>
                <td><img src="${foto}" style="width:40px; height:40px; border-radius:50%; object-fit:cover;"></td>
                <td>${u.nome}</td>
                <td><span class="badge">${u.nome_perfil}</span></td>
                <td>${formatarCPF(u.cpf)}</td>
                <td>
                    <button class="btn-edit" onclick="openEditUser(${u.id})">✎</button>
                    <button class="btn-delete-x" onclick="softDeleteUser(${u.id}, '${u.nome}')">✕</button>
                </td>
            </tr>
        `;
    });
}

// 3. Abrir Modal para Edição
function openEditUser(id) {
    const user = allUsers.find(u => u.id === id);
    if (!user) return;

    document.getElementById('modalTitle').innerText = "Editar Membro da Equipe";
    document.getElementById('userId').value = user.id;
    document.getElementById('regNome').value = user.nome;
    document.getElementById('regEmail').value = user.email;
    
    // --- APLICAÇÃO DAS MÁSCARAS NO PREENCHIMENTO ---
    document.getElementById('regCPF').value = formatarCPF(user.cpf);
    document.getElementById('regCelular').value = formatarCelular(user.celular);
    
    document.getElementById('regPerfil').value = user.perfil_id;
    
    // Configurações de senha para edição
    document.getElementById('senhaHelp').style.display = 'block';
    document.getElementById('regSenha').required = false;

    // Foto e Modal
    if (user.foto_perfil) {
        fotoBase64 = user.foto_perfil;
        const preview = document.getElementById('preview');
        preview.src = fotoBase64;
        preview.style.display = 'block';
    }

    document.getElementById('user-modal').style.display = 'flex';
}

// 4. Salvar Usuário (Unificado: POST ou PUT)
document.getElementById('formCadastro').onsubmit = async (e) => {
    e.preventDefault();
    
    const cpfOriginal = document.getElementById('regCPF').value;
    const cpfLimpo = cpfOriginal.replace(/[^\d]+/g, '');

    // 🛡️ VALIDAÇÃO DE SEGURANÇA
    if (!validarCPF(cpfLimpo)) {
        alert("⚠️ CPF Inválido! Por favor, verifique os números digitados.");
        document.getElementById('regCPF').focus();
        return; // Interrompe o envio
    }
    
    const id = document.getElementById('userId').value;

    // Pega dados do administrador logado para auditoria
    const adminData = JSON.parse(localStorage.getItem('polifonia_user'));

    const payload = {
        nome: document.getElementById('regNome').value,
        email: document.getElementById('regEmail').value,
        celular: document.getElementById('regCelular').value,
        cpf: cpfLimpo,
        senha: document.getElementById('regSenha').value,
        foto: fotoBase64,
        perfil_id: document.getElementById('regPerfil').value,
        solicitantePerfis: adminData.perfis
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/usuarios/${id}` : 'http://localhost:3000/usuarios';

    try {
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert(id ? "Usuário atualizado!" : "Usuário cadastrado!");
            closeUserModal();
            loadUsers();
        } else {
            const error = await res.json();
            alert(error.message || "Erro ao salvar.");
        }
    } catch (err) {
        alert("Erro de conexão com o servidor.");
    }
};





// 5. Soft Delete (Exclusão Lógica)
async function softDeleteUser(id, nome) {
    if (!confirm(`Deseja remover ${nome} da equipe?\nO acesso será revogado, mas o histórico será preservado.`)) return;

    const res = await fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' });
    if (res.ok) {
        alert("Usuário removido com sucesso!");
        loadUsers();
    }
}

// Funções Auxiliares (Modal e Imagem)
function openUserModal() {
    document.getElementById('formCadastro').reset();
    document.getElementById('userId').value = "";
    document.getElementById('modalTitle').innerText = "Cadastrar Novo Usuário";
    document.getElementById('preview').style.display = 'none';
    document.getElementById('senhaHelp').style.display = 'none';
    document.getElementById('regSenha').required = true;
    fotoBase64 = null;
    document.getElementById('user-modal').style.display = 'flex';
}

function closeUserModal() { document.getElementById('user-modal').style.display = 'none'; }

function validarImagem(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            fotoBase64 = e.target.result;
            const preview = document.getElementById('preview');
            preview.src = fotoBase64;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

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

