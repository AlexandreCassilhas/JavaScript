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