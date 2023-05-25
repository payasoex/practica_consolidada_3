const budgetInput = document.querySelector('#budget-input');
const budgetValue = document.querySelector('#budget-total');
const budgetExpenses = document.querySelector('#expenses-total');
const budgetBalance = document.querySelector('#balance');
const budgetBtn = document.querySelector('#budget-btn');

const expense = document.querySelector('#expense');
const expenseInput = document.querySelector('#expense-input');
const expenseBtn = document.querySelector('#expense-btn');

let budgetTotal = 0;
let expensesTotal = 0;
let balanceTotal = `$ ${budgetTotal - expensesTotal}`;

budgetExpenses.textContent = `$ ${expensesTotal}`;
budgetBalance.textContent = `$ ${balanceTotal}`;

    budgetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        budgetTotal = budgetInput.value;
        expensesTotal = parseInt(budgetExpenses.value);
        budgetValue.textContent = `$ ${budgetTotal}`;
        budgetBalance.textContent = balanceTotal;
        console.log(budgetTotal);
    });






