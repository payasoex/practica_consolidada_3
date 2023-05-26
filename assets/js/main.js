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

const clearBtn = document.querySelector('#clear-btn');

// variables

let budgetTotal = localStorage.getItem('budget') || 0;
let expensesTotal = localStorage.getItem('expensesTotal') || 0;
let expensesArr = JSON.parse(localStorage.getItem('expenses')) || [];
console.log(expensesArr);

// funciones

function inicialize() {
    budgetValue.textContent = `$ ${budgetTotal}`;
    budgetExpenses.textContent = `$ ${expensesTotal}`;
    budgetBalance.textContent = `$ ${budgetTotal - expensesTotal}`;
    renderExpenses(expensesArr);
    console.log(localStorage.getItem('expenseTotal'));
}

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

// const addExpense = () => {
//     const expense = {
//         name: expenseName.value,
//         amount: expenseInput.value
//     };
//     expensesArr.push(expense);
//     localStorage.setItem('expenses', JSON.stringify(expensesArr));// al local storage
//     console.log(localStorage.getItem('expenses')) 
//     expenseList.innerHTML = '';
//     renderExpenses(expensesArr);
//     expensesTotal += parseInt(expenseInput.value);
//     budgetExpenses.textContent = `$ ${expensesTotal}`;
//     budgetBalance.textContent = `$ ${budgetTotal - expensesTotal}`;
// };

const addExpense = () => {
    const expense = {
        name: expenseName.value,
        amount: expenseInput.value
    };
    expensesArr.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expensesArr));
    localStorage.setItem('expensesTotal', expensesTotal);
    console.log(localStorage.getItem('expensesTotal'))
    expenseList.innerHTML = '';
    renderExpenses(expensesArr);
    expensesTotal += parseInt(expenseInput.value);
    budgetExpenses.textContent = `$ ${expensesTotal}`;
    budgetBalance.textContent = `$ ${budgetTotal - expensesTotal}`;
};


// const deleteExpense = (e) => {
//     if (e.target.id === 'delete-btn') {
//         const expenseAmount = e.target.parentElement.parentElement.querySelector('#expense-amount').textContent;
//         expensesTotal -= parseInt(expenseAmount);
//         budgetExpenses.textContent = `$ ${expensesTotal}`;
//         budgetBalance.textContent = `$ ${budgetTotal - expensesTotal}`;
//         e.target.parentElement.parentElement.remove();
//         localStorage.setItem('expenses', JSON.stringify(expensesArr));
//     }
// };

const deleteExpense = (e) => {
    const expenseAmount = e.target.parentElement.parentElement.querySelector('#expense-amount').textContent;
    const expenseName = e.target.parentElement.parentElement.querySelector('td').textContent;
    if (e.target.id === 'delete-btn') {
        expensesTotal -= parseInt(expenseAmount);
        budgetExpenses.textContent = `$ ${expensesTotal}`;
        budgetBalance.textContent = `$ ${budgetTotal - expensesTotal}`;
        e.target.parentElement.parentElement.remove();
        expensesArr = expensesArr.filter(expense => expense.name !== expenseName);
        localStorage.setItem('expenses', JSON.stringify(expensesArr));
        localStorage.setItem('expensesTotal', expensesTotal)
    }
};

const clearBudgetAndExpenses = () => {
    localStorage.removeItem('budget');
    localStorage.removeItem('expenses');
    localStorage.removeItem('expensesTotal');
};

// eventos

budgetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (budgetInput.value > 0 && budgetInput.value !== '') {
        budgetTotal = budgetInput.value;
        budgetValue.textContent = `$ ${budgetTotal}`;
        budgetBalance.textContent = `$ ${budgetTotal - expensesTotal}`;
        localStorage.setItem('budget', budgetTotal);
        console.log(localStorage.getItem('budget'));
    } else {
        alert('El presupuesto debe ser un número mayor a 0');
    }
});


expenseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (expenseName.value !== '' && expenseInput.value > 0) {
        addExpense();
    } else {
        alert('Debes ingresar el nombre del gasto y el gasto debe ser un número mayor a 0');
    }
});

expenseList.addEventListener('click', (e) => {
    deleteExpense(e);
});

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearBudgetAndExpenses();
    budgetTotal = 0;
    expensesTotal = 0;
    budgetValue.textContent = `$ ${budgetTotal}`;
    budgetExpenses.textContent = `$ ${expensesTotal}`;
    budgetBalance.textContent = `$ ${budgetTotal - expensesTotal}`;
    expenseList.innerHTML = '';
    expensesArr = [];
});

// inicializar
inicialize();