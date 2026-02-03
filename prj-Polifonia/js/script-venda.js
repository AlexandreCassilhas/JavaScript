let cartItems = [];
let salesHistory = JSON.parse(localStorage.getItem('polifonia_sales')) || [];

// Carregar histórico ao iniciar
window.onload = renderHistory;

function updatePrice() {
    const productSelect = document.getElementById('product');
    const priceInput = document.getElementById('price');
    priceInput.value = productSelect.value !== "0" ? productSelect.value : "";
}

function addToCart() {
    const productSelect = document.getElementById('product');
    const productName = productSelect.options[productSelect.selectedIndex].getAttribute('data-name');
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const discount = parseFloat(document.getElementById('discount').value) || 0;

    if (!productName || isNaN(price)) {
        alert("Selecione um produto válido!");
        return;
    }

    const subtotal = (price * quantity) - discount;
    cartItems.push({ id: Date.now(), name: productName, qty: quantity, total: subtotal });
    renderCart();
    resetFields();
}

function renderCart() {
    const cartBody = document.getElementById('cart-body');
    const grandTotalDisplay = document.getElementById('grand-total');
    const globalDiscount = parseFloat(document.getElementById('globalDiscount').value) || 0;
    
    cartBody.innerHTML = "";
    let totalItens = 0;

    cartItems.forEach(item => {
        totalItens += item.total;
        cartBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}x</td>
                <td>R$ ${item.total.toFixed(2)}</td>
                <td><button class="btn-remove" onclick="removeItem(${item.id})">✕</button></td>
            </tr>
        `;
    });

    const totalFinal = Math.max(0, totalItens - globalDiscount);
    grandTotalDisplay.innerText = totalFinal.toFixed(2).replace('.', ',');
}

// ... (Manter variáveis iniciais e funções de carrinho) ...

function finishSale() {
    const buyer = document.getElementById('buyerName').value;
    const payment = document.querySelector('input[name="payment"]:checked');
    const total = document.getElementById('grand-total').innerText;

    if (cartItems.length === 0) return alert("Carrinho vazio!");
    if (!payment) return alert("Selecione o pagamento!");

    const agora = new Date();
    
    const sale = {
        id: Date.now(),
        fullDate: agora.toLocaleString(), // Para exibição no recibo
        simpleDate: agora.toISOString().split('T')[0], // Formato AAAA-MM-DD para o filtro
        buyer: buyer,
        items: [...cartItems],
        payment: payment.value,
        total: total
    };

    salesHistory.push(sale);
    localStorage.setItem('polifonia_sales', JSON.stringify(salesHistory));
    
    showReceipt(buyer, payment.value, total);
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('sales-history-list');
    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterDate = document.getElementById('filterDate').value;

    historyList.innerHTML = "";

    // Filtra o histórico baseado nos inputs
    const filteredSales = salesHistory.filter(sale => {
        const matchesName = sale.buyer.toLowerCase().includes(filterName);
        const matchesDate = filterDate === "" || sale.simpleDate === filterDate;
        return matchesName && matchesDate;
    });

    if (filteredSales.length === 0) {
        historyList.innerHTML = "<p style='color:#8b949e; font-size:0.8rem;'>Nenhuma venda encontrada.</p>";
        return;
    }

    filteredSales.slice().reverse().forEach(sale => {
        historyList.innerHTML += `
            <div class="sale-card">
                <p><small>${sale.fullDate}</small></p>
                <p><strong>Cliente:</strong> ${sale.buyer}</p>
                <p><strong>Itens:</strong> ${sale.items.map(i => i.name).join(', ')}</p>
                <p class="sale-total">Total: R$ ${sale.total} (${sale.payment})</p>
            </div>
        `;
    });
}

function resetFilters() {
    document.getElementById('filterName').value = "";
    document.getElementById('filterDate').value = "";
    renderHistory();
}

function clearHistory() {
    if(confirm("Deseja apagar todo o histórico de vendas?")) {
        salesHistory = [];
        localStorage.removeItem('polifonia_sales');
        renderHistory();
    }
}

// ... (Manter funções showReceipt, sendWhatsApp, closeModal, removeItem e resetFields) ...

function removeItem(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    renderCart();
}

function resetFields() {
    document.getElementById('product').value = "0";
    document.getElementById('price').value = "";
    document.getElementById('quantity').value = "1";
    document.getElementById('discount').value = "0";
    document.getElementById('globalDiscount').value = "0";
}

function showReceipt(buyer, payment, total) {
    const details = document.getElementById('receipt-details');
    let itemsList = "";

    cartItems.forEach(item => {
        itemsList += `<div>${item.qty}x ${item.name} - R$ ${item.total.toFixed(2)}</div>`;
    });

    details.innerHTML = `
        <p><strong>Cliente:</strong> ${buyer}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
        <hr style="border: 0.5px dashed #ccc; margin: 10px 0;">
        ${itemsList}
        <hr style="border: 0.5px dashed #ccc; margin: 10px 0;">
        <p><strong>Pagamento:</strong> ${payment.toUpperCase()}</p>
        <p style="font-size: 1.2rem;"><strong>TOTAL: R$ ${total}</strong></p>
    `;

    document.getElementById('receipt-modal').style.display = 'flex';
}

function sendWhatsApp() {
    const buyer = document.getElementById('buyerName').value;
    const total = document.getElementById('grand-total').innerText;
    
    let text = `*POLIFONIA - RECIBO DE VENDA*\n\n`;
    text += `*Cliente:* ${buyer}\n`;
    text += `*Data:* ${new Date().toLocaleDateString()}\n`;
    text += `---------------------------\n`;
    
    cartItems.forEach(item => {
        text += `${item.qty}x ${item.name} - R$ ${item.total.toFixed(2)}\n`;
    });
    
    text += `---------------------------\n`;
    text += `*TOTAL: R$ ${total}*\n\n`;
    text += `Nos siga no Instagram: @polifonia.rio \n`
    text += `https://www.instagram.com/polifonia.rio/ \n\n`
    text += `Obrigado pela preferência!`;

    // Codifica o texto para URL
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
}

function closeModal() {
    document.getElementById('receipt-modal').style.display = 'none';
    // Limpa o carrinho para a próxima venda
    cartItems = [];
    document.getElementById('buyerName').value = "Comprador";
    renderCart();
    resetFields();
}


// 1. Atualizar a função renderHistory para incluir o botão de Editar
function renderHistory() {
    const historyList = document.getElementById('sales-history-list');
    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterDate = document.getElementById('filterDate').value;
    const summaryCount = document.getElementById('summary-count');
    const summaryTotal = document.getElementById('summary-total');

    historyList.innerHTML = "";

    const filteredSales = salesHistory.filter(sale => {
        const matchesName = sale.buyer.toLowerCase().includes(filterName);
        const matchesDate = filterDate === "" || sale.simpleDate === filterDate;
        return matchesName && matchesDate;
    });

    let totalAcumulado = 0;
    filteredSales.forEach(sale => {
        const valorNumerico = parseFloat(sale.total.replace(',', '.'));
        totalAcumulado += valorNumerico;
    });

    summaryCount.innerText = filteredSales.length;
    summaryTotal.innerText = `R$ ${totalAcumulado.toFixed(2).replace('.', ',')}`;

    if (filteredSales.length === 0) {
        historyList.innerHTML = "<p style='color:#8b949e; text-align:center;'>Nenhum registo.</p>";
        return;
    }

    filteredSales.slice().reverse().forEach(sale => {
        historyList.innerHTML += `
            <div class="sale-card">
                <p><small>${sale.fullDate}</small></p>
                <p><strong>Cliente:</strong> ${sale.buyer}</p>
                <p><strong>Itens:</strong> ${sale.items.map(i => i.name).join(', ')}</p>
                <p class="sale-total">Total: R$ ${sale.total} (${sale.payment})</p>
                <div class="sale-actions">
                    <button class="btn-edit" onclick="openEditModal(${sale.id})">✎ Editar</button>
                    <button class="btn-remove" onclick="removeSale(${sale.id})">✕ Remover</button>
                </div>
            </div>
        `;
    });
}

// 2. Função para abrir o modal de edição carregando os dados
function openEditModal(id) {
    const sale = salesHistory.find(s => s.id === id);
    if (!sale) return;

    document.getElementById('edit-sale-id').value = id;
    document.getElementById('edit-buyer-name').value = sale.buyer;
    document.getElementById('edit-total-value').value = sale.total.replace(',', '.');

    document.getElementById('edit-modal').style.display = 'flex';
}

// 3. Função para salvar as alterações
function saveEdit() {
    const id = parseInt(document.getElementById('edit-sale-id').value);
    const newName = document.getElementById('edit-buyer-name').value;
    const newTotal = parseFloat(document.getElementById('edit-total-value').value);

    if (!newName || isNaN(newTotal)) {
        alert("Preencha os campos corretamente!");
        return;
    }

    // Localizar a venda no array original e atualizar
    const index = salesHistory.findIndex(s => s.id === id);
    if (index !== -1) {
        salesHistory[index].buyer = newName;
        salesHistory[index].total = newTotal.toFixed(2).replace('.', ',');
        
        localStorage.setItem('polifonia_sales', JSON.stringify(salesHistory));
        closeEditModal();
        renderHistory();
    }
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function removeSale(id) {
    if (confirm("Tem certeza que deseja apagar esta venda permanentemente?")) {
        salesHistory = salesHistory.filter(s => s.id !== id);
        localStorage.setItem('polifonia_sales', JSON.stringify(salesHistory));
        renderHistory();
    }
}

function exportToCSV() {
    if (salesHistory.length === 0) return alert("Não há dados para exportar.");

    // Cabeçalho do arquivo
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Data;Cliente;Itens;Pagamento;Total\n";

    // Linhas de dados
    salesHistory.forEach(sale => {
        const itensString = sale.items.map(i => `${i.qty}x ${i.name}`).join(" | ");
        const row = `${sale.fullDate};${sale.buyer};${itensString};${sale.payment};${sale.total}`;
        csvContent += row + "\n";
    });

    // Criar link invisível para download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Relatorio_Vendas_Polifonia_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);

    link.click(); // Dispara o download
    document.body.removeChild(link);
}


// Variáveis para guardar as instâncias dos gráficos
let todayChartInstance = null;
let periodChartInstance = null;

// Chamar esta função sempre que uma venda for concluída ou o histórico mudar
function renderAnalytics() {
    renderTodayChart();
    renderPeriodChart();
}

// 1. Gráfico de Vendas por Hora (Hoje)
function renderTodayChart() {
    const ctx = document.getElementById('todayChart').getContext('2d');
    const hoje = new Date().toISOString().split('T')[0];
    
    // Inicializar array de 24 horas com zeros
    const hoursData = Array(24).fill(0);
    const labels = Array.from({length: 24}, (_, i) => `${i}h`);

    // Filtrar vendas de hoje e somar por hora
    salesHistory.filter(s => s.simpleDate === hoje).forEach(sale => {
        // Extrair a hora da string fullDate (ex: "03/02/2026 14:30:00")
        const hora = parseInt(sale.fullDate.split(' ')[1].split(':')[0]);
        hoursData[hora] += parseFloat(sale.total.replace(',', '.'));
    });

    if (todayChartInstance) todayChartInstance.destroy();

    todayChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total R$',
                data: hoursData,
                borderColor: '#8b1a1a',
                backgroundColor: 'rgba(139, 26, 26, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
}

// 2. Gráfico de Vendas por Período
function renderPeriodChart() {
    const ctx = document.getElementById('periodChart').getContext('2d');
    const start = document.getElementById('chartStart').value;
    const end = document.getElementById('chartEnd').value;

    // Filtrar por intervalo
    const filteredSales = salesHistory.filter(s => {
        if (!start || !end) return true;
        return s.simpleDate >= start && s.simpleDate <= end;
    });

    // Agrupar totais por data
    const totalsByDate = {};
    filteredSales.forEach(sale => {
        totalsByDate[sale.simpleDate] = (totalsByDate[sale.simpleDate] || 0) + parseFloat(sale.total.replace(',', '.'));
    });

    const labels = Object.keys(totalsByDate).sort();
    const dataValues = labels.map(date => totalsByDate[date]);

    if (periodChartInstance) periodChartInstance.destroy();

    periodChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.map(d => d.split('-').reverse().slice(0,2).join('/')), // Formata para DD/MM
            datasets: [{
                label: 'Vendas por Dia',
                data: dataValues,
                backgroundColor: '#1f6feb'
            }]
        },
        options: { responsive: true }
    });
}

// Atualizar o window.onload para incluir os analytics
window.onload = () => {
    renderHistory();
    renderAnalytics();
};