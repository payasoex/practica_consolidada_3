// elementos del DOM

const budgetInput = document.querySelector('#budget-input');
const budgetValue = document.querySelector('#budget-total');
const budgetExpenses = document.querySelector('#expenses-total');
const budgetBalance = document.querySelector('#balance');
const budgetBtn = document.querySelector('#budget-btn');

const expenseName = document.querySelector('#expense');
const expenseInput = document.querySelector('#expense-input');
const expenseBtn = document.querySelector('#expense-btn');

const expenseList = document.querySelector('#expense-list');
const deleteBtn = document.querySelector('#delete-btn');
const expenseValue = document.querySelector('#expense-value');


// variables

let budgetTotal = 0;
let expensesTotal = 0;
const expensesArr = [];


// funciones

const renderExpenses = (expensesArr) => {
    expensesArr.map(expense => {
        
        expenseList.innerHTML += `
            <tr>
                <td>${expense.name}</td>
                <td>$ <span id="expense-amount">${expense.amount}</span></td>
                <td><button id="delete-btn" class="btn btn-danger">X</button></td>
            </tr>
        `;
    });
};

const addExpense = () => {
    const expense = {
        name: expenseName.value,
        amount: expenseInput.value
    };
    expensesArr.push(expense);
    expenseList.innerHTML = '';
    renderExpenses(expensesArr);
    expensesTotal += parseInt(expenseInput.value);
    budgetExpenses.textContent = `$ ${expensesTotal}`;
    budgetBalance.textContent = `$ ${budgetTotal - expensesTotal}`;
};

const deleteExpense = (e) => {
    if (e.target.id === 'delete-btn') {
        const expenseAmount = e.target.parentElement.parentElement.querySelector('#expense-amount').textContent;
        expensesTotal -= parseInt(expenseAmount);
        budgetExpenses.textContent = `$ ${expensesTotal}`;
        budgetBalance.textContent = `$ ${budgetTotal - expensesTotal}`;
        e.target.parentElement.parentElement.remove();
    }
};

// eventos

budgetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (budgetInput.value > 0) {
        budgetTotal = budgetInput.value;
        budgetValue.textContent = `$ ${budgetTotal}`;
        budgetBalance.textContent = `$ ${budgetTotal - expensesTotal}`;
    } else {
        alert('El presupuesto debe ser un número mayor a 0');
        }
});


expenseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (expenseInput.value > 0) {
        addExpense();
    } else {
        alert('El gasto debe ser un número mayor a 0');
        }
    }
);

expenseList.addEventListener('click', (e) => {
    deleteExpense(e);
    } 
);