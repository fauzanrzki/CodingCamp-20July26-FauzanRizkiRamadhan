// Data Storage
let transactions = [];
let chart = null;

// Category mapping for Indonesian display
const categoryLabels = {
    'Food': '🍔 Makanan',
    'Transport': '🚗 Transport',
    'Fun': '🎉 Hiburan'
};

// Load data from Local Storage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    renderTransactions();
    updateBalance();
    updateChart();
});

// Form submission handler
document.getElementById('transactionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const itemName = document.getElementById('itemName').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    
    // Validate all fields are filled
    if (!itemName || !amount || !category) {
        alert('Mohon isi semua field!');
        return;
    }
    
    // Validate amount is positive
    if (amount <= 0) {
        alert('Jumlah harus lebih dari 0!');
        return;
    }
    
    // Create transaction object
    const transaction = {
        id: Date.now(),
        name: itemName,
        amount: amount,
        category: category,
        date: new Date().toISOString()
    };
    
    // Add to transactions array
    transactions.push(transaction);
    
    // Save to Local Storage
    saveToLocalStorage();
    
    // Update UI
    renderTransactions();
    updateBalance();
    updateChart();
    
    // Reset form
    this.reset();
    
    // Show success feedback
    showNotification('Transaksi berhasil ditambahkan!');
});

// Render all transactions
function renderTransactions() {
    const transactionList = document.getElementById('transactionList');
    
    if (transactions.length === 0) {
        transactionList.innerHTML = '<p class="empty-state">Belum ada transaksi. Mulai tambahkan pengeluaran Anda!</p>';
        return;
    }
    
    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    transactionList.innerHTML = sortedTransactions.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-info">
                <div class="transaction-name">${transaction.name}</div>
                <span class="transaction-category ${transaction.category}">${categoryLabels[transaction.category]}</span>
            </div>
            <div class="transaction-details">
                <div class="transaction-amount">${formatCurrency(transaction.amount)}</div>
                <button class="btn-delete" onclick="deleteTransaction(${transaction.id})">Hapus</button>
            </div>
        </div>
    `).join('');
}

// Delete transaction
function deleteTransaction(id) {
    if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
        transactions = transactions.filter(t => t.id !== id);
        saveToLocalStorage();
        renderTransactions();
        updateBalance();
        updateChart();
        showNotification('Transaksi berhasil dihapus!');
    }
}

// Update total balance
function updateBalance() {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    document.getElementById('totalBalance').textContent = formatCurrency(total);
}

// Update Chart.js pie chart
function updateChart() {
    const canvas = document.getElementById('expenseChart');
    const noDataMessage = document.getElementById('noDataMessage');
    
    if (transactions.length === 0) {
        if (chart) {
            chart.destroy();
            chart = null;
        }
        canvas.style.display = 'none';
        noDataMessage.classList.add('show');
        return;
    }
    
    canvas.style.display = 'block';
    noDataMessage.classList.remove('show');
    
    // Calculate totals by category
    const categoryTotals = {
        'Food': 0,
        'Transport': 0,
        'Fun': 0
    };
    
    transactions.forEach(t => {
        categoryTotals[t.category] += t.amount;
    });
    
    // Filter out categories with zero amounts
    const labels = [];
    const data = [];
    const backgroundColors = [];
    const borderColors = [];
    
    const colorMap = {
        'Food': {
            bg: 'rgba(255, 206, 86, 0.8)',
            border: 'rgba(255, 206, 86, 1)'
        },
        'Transport': {
            bg: 'rgba(54, 162, 235, 0.8)',
            border: 'rgba(54, 162, 235, 1)'
        },
        'Fun': {
            bg: 'rgba(255, 99, 132, 0.8)',
            border: 'rgba(255, 99, 132, 1)'
        }
    };
    
    Object.keys(categoryTotals).forEach(category => {
        if (categoryTotals[category] > 0) {
            labels.push(categoryLabels[category]);
            data.push(categoryTotals[category]);
            backgroundColors.push(colorMap[category].bg);
            borderColors.push(colorMap[category].border);
        }
    });
    
    // Destroy existing chart if it exists
    if (chart) {
        chart.destroy();
    }
    
    // Create new chart
    const ctx = canvas.getContext('2d');
    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Format currency as Rupiah
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Save to Local Storage
function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Load from Local Storage
function loadFromLocalStorage() {
    const stored = localStorage.getItem('transactions');
    if (stored) {
        transactions = JSON.parse(stored);
    }
}

// Show notification (simple feedback)
function showNotification(message) {
    // Create a simple notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
