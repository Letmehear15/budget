let start = document.querySelector('.start'),
    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthsavingsValue = document.querySelector('.monthsavings-value'),
    yearsavingsValue = document.querySelector('.yearsavings-value'),
    inputs = document.querySelectorAll('.expenses-item'),
    
    count = document.querySelector('.count-budget-btn'),
    admit = document.querySelector('.optionalexpenses-btn'),
    admitExpenses = document.querySelector('.expenses-item-btn'),
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkbox = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');


let money, time;

start.addEventListener('click', () => {
    money = +prompt('Ваш бюджет на месяц?');
    time = prompt('Введите дату в формате YYYY-MM-DD');

    while(isNaN(money) && money != ' ' && (typeof(money) != null) ) {
        money = +prompt('Ваш бюджет на месяц?');  
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = appData.budget;

    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    admitExpenses.disabled = false;
    admit.disabled = false;
    count.disabled = false;    
})

admitExpenses.addEventListener('click', () => {
    let sum = 0;

    for(let i = 0; i < inputs.length; i++) {
        let a = inputs[i].value,
            b = inputs[++i].value;

        if(typeof(a) === 'string' && a != '' && (typeof(a) != null) && (typeof(b) != null) && b != '' && a.length <= 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else i--;
    }
    expensesValue.textContent = +sum;
})

admit.addEventListener('click', () => {
    for(let i = 0; i < optionalexpensesItem.length; i++) {
        let optExpenses = optionalexpensesItem[i].value;
        appData.optionalExpenses[i+1] = optExpenses; 

        optionalExpensesValue.textContent += optExpenses + ' ';
    }
})

count.addEventListener('click', () => {
    if(money != undefined) {
        let val = +expensesValue.textContent;

        appData.budgetPerDay = ( (appData.budget - val) / 30 ).toFixed();
        dayBudgetValue.textContent = appData.budgetPerDay;
    
        if(appData.budgetPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.budgetPerDay > 100 && appData.budgetPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.budgetPerDay > 3000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } else dayBudgetValue.textContent = 'Произошла ошибка'; 
})   

chooseIncome.addEventListener('input', () => {
    incomeValue.textContent = chooseIncome.value;
})

checkbox.addEventListener('input', () => {
    if(!appData.savings) {
        appData.savings = true;
    } else appData.savings = false;
})

chooseSum.addEventListener('input', () => {
    if(appData.savings) {
        let save = chooseSum.value,
            percent = choosePercent.value;

        appData.monthIncome = save * percent / 100 / 12;
        appData.yearIncome = save * percent / 100 ;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    } else {
        monthsavingsValue.textContent = '';
        yearsavingsValue.textContent = '';
    }
})

choosePercent.addEventListener('input', () => {
    if(appData.savings) {
        let save = chooseSum.value,
            percent = choosePercent.value;

        appData.monthIncome = save * percent / 100 / 12;
        appData.yearIncome = save * percent / 100 ;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
})

let appData = {
    budget: money,
    timeData: time,
    expenses:{},
    optionalExpenses:{},
    income: [],
    savings: false,
};


