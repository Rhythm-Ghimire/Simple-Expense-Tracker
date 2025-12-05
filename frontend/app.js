document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseTableBody = document.querySelector('#expenseTable tbody');
    const totalDisplay = document.getElementById('total');

    function fetchExpenses() {
        fetch('/expenses')
            .then(response => response.json())
            .then(expenses => {
                expenseTableBody.innerHTML = ''; 
                expenses.forEach(expense => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${expense.name}</td>
                        <td>${expense.amount}</td>
                        <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
                    `;
                    expenseTableBody.appendChild(row);
                });
            });
        fetchTotalExpenses();
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;

        fetch('/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, amount }),
        })
        .then(() => {
            expenseForm.reset();
            fetchExpenses(); 
        });
    });

    expenseTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.getAttribute('data-id');

            fetch(`/expenses/${id}`, { method: 'DELETE' })
            .then(() => fetchExpenses()); 
        }
    });

    function fetchTotalExpenses() {
        fetch('/expenses/total')
            .then(response => response.json())
            .then(data => {
                totalDisplay.textContent = data.total.toFixed(2);
            });
    }

    fetchExpenses();
});
