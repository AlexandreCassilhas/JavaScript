let allTypes = [];
let allCaixa = [];
const hoje = new Date().toISOString().split('T')[0];

document.addEventListener('DOMContentLoaded', () => {
    // Carregar nome do usuário logado (padrão Polifonia)
    const userData = JSON.parse(localStorage.getItem('polifonia_user'));
    if (!userData) {
        window.location.href = 'login.html'
    } else {
        document.getElementById('userNameDisplay').innerText = userData.user;
    };

    loadTypes();
    loadCaixa();
});

// --- NAVEGAÇÃO DE ABAS ---
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(`tab-${tabName}`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// ==========================================
// GESTÃO DE TIPOS DE LANÇAMENTO
// ==========================================

async function loadTypes() {
    try {
        const res = await fetch('http://localhost:3000/fin-tipos');
        allTypes = await res.json();
        renderTypesTable();
        filterTypesByFluxo(); // Atualiza o select do outro modal
    } catch (e) { console.error("Erro ao carregar tipos:", e); }
}

function renderTypesTable() {
    const tbody = document.getElementById('tipos-body');
    tbody.innerHTML = allTypes.map(t => `
        <tr>
            <td>${t.descricao}</td>
            <td><span class="badge ${t.tipo === 'Entrada' ? 'badge-entrada' : 'badge-saida'}"> ${t.tipo}</span></td>
            <td>
                <button class="btn-edit" onclick="editTipo(${t.id})">✎</button>
                <button class="btn-delete" onclick="softDeleteTipo(${t.id}, '${t.descricao}')">✕</button>
            </td>
        </tr>
    `).join('');
}


function openTipoModal() {
    document.getElementById('formTipo').reset();
    document.getElementById('tipoId').value = "";
    document.getElementById('tipoModalTitle').innerText = "Novo Tipo de Lançamento";
    document.getElementById('modal-tipo').style.display = 'flex';
}

function editTipo(id) {
    const tipo = allTypes.find(t => t.id === id);
    if (!tipo) return;

    document.getElementById('tipoId').value = tipo.id;
    document.getElementById('tipoDesc').value = tipo.descricao;
    document.getElementById('tipoFluxo').value = tipo.tipo;
    document.getElementById('tipoModalTitle').innerText = "Editar Tipo";
    document.getElementById('modal-tipo').style.display = 'flex';
}

// Salvar Tipo (POST/PUT)
// --- CORREÇÃO DO FORMULÁRIO DE TIPOS ---
// Adicionamos o ".onsubmit" antes do sinal de "="
document.getElementById('formTipo').onsubmit = async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('tipoId').value;
    const payload = {
        descricao: document.getElementById('tipoDesc').value,
        tipo: document.getElementById('tipoFluxo').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/fin-tipos/${id}` : 'http://localhost:3000/fin-tipos';

    try {
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            closeModal('modal-tipo');
            loadTypes();
        } else {
            alert("Erro ao salvar o tipo de lançamento.");
        }
    } catch (err) {
        console.error("Erro na requisição:", err);
    }
};

// ==========================================
// GESTÃO DO LIVRO CAIXA
// ==========================================

async function loadCaixa() {
    try {
        const res = await fetch('http://localhost:3000/fin-caixa');
        allCaixa = await res.json();
        renderCaixaTable();
    } catch (e) { console.error("Erro ao carregar caixa:", e); }
}

function renderCaixaTable() {
    const tbody = document.getElementById('caixa-body');
    tbody.innerHTML = allCaixa.map(l => `
        <tr class="${l.tipo === 'Entrada' ? 'row-entrada' : 'row-saida'}">
            <td>${new Date(l.data_lancamento).toLocaleDateString('pt-BR')}</td>
            <td><strong>${l.tipo_nome}</strong></td>
            <td>${l.descricao || '-'}</td>
            <td class="valor-cell">R$ ${Number(l.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td>
                <button class="btn-edit" onclick="editCaixa(${l.id})">✎</button>
                <button class="btn-delete" onclick="softDeleteCaixa(${l.id})">✕</button>
            </td>
        </tr>
    `).join('');
}

function openCaixaModal() {
    document.getElementById('formCaixa').reset();
    document.getElementById('caixaId').value = "";
    document.getElementById('caixaData').value = hoje;
    document.getElementById('caixaModalTitle').innerText = "Novo Lançamento";
    filterTypesByFluxo(); // Garante que o select carregue as Entradas por padrão
    document.getElementById('modal-caixa').style.display = 'flex';
}

// Filtra o Select de Tipos baseado no Radio Button (Entrada/Saída)
function filterTypesByFluxo() {
    const selectedFluxo = document.querySelector('input[name="fluxo"]:checked').value;
    const select = document.getElementById('caixaTipoSelect');
    
    const filtered = allTypes.filter(t => t.tipo === selectedFluxo);
    select.innerHTML = filtered.map(t => `<option value="${t.id}">${t.descricao}</option>`).join('');
}

async function editCaixa(id) {
    const lanc = allCaixa.find(l => l.id === id);
    if (!lanc) return;

    document.getElementById('caixaId').value = lanc.id;
    document.getElementById('caixaDesc').value = lanc.descricao;
    document.getElementById('caixaValor').value = lanc.valor;
    document.getElementById('caixaData').value = lanc.data_lancamento.split('T')[0];
    
    // Seleciona o Radio Button correto
    document.querySelector(`input[name="fluxo"][value="${lanc.tipo}"]`).checked = true;
    
    // Atualiza o select de tipos e seleciona o ID correto
    filterTypesByFluxo();
    document.getElementById('caixaTipoSelect').value = lanc.id_tipo_lancamento;

    document.getElementById('caixaModalTitle').innerText = "Editar Lançamento";
    document.getElementById('modal-caixa').style.display = 'flex';
}

document.getElementById('formCaixa').onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('caixaId').value;
    const userData = JSON.parse(localStorage.getItem('polifonia_user'));

    const payload = {
        id_tipo_lancamento: document.getElementById('caixaTipoSelect').value,
        descricao: document.getElementById('caixaDesc').value,
        data_lancamento: document.getElementById('caixaData').value,
        valor: document.getElementById('caixaValor').value,
        id_usuario: userData.id || 1 // Fallback para segurança
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/fin-caixa/${id}` : 'http://localhost:3000/fin-caixa';

    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        closeModal('modal-caixa');
        loadCaixa();
    }
};

// Funções Utilitárias
function closeModal(modalId) { document.getElementById(modalId).style.display = 'none'; }

async function softDeleteTipo(id, nome) {
    if (!confirm(`Deseja remover o tipo "${nome}"?\nIsso não apagará os lançamentos já feitos.`)) return;
    await fetch(`http://localhost:3000/fin-tipos/${id}`, { method: 'DELETE' });
    loadTypes();
}

async function softDeleteCaixa(id) {
    if (!confirm("Deseja cancelar este lançamento do Livro Caixa?")) return;
    await fetch(`http://localhost:3000/fin-caixa/${id}`, { method: 'DELETE' });
    loadCaixa();
}