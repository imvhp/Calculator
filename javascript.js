let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener('DOMContentLoaded', function(){

    let percent = document.querySelector('.percent');
    let clear = document.querySelector('.clear');
    let remove = document.querySelector('.removeDigit');
    let decimal = document.querySelector('.decimal');
    let sign = document.querySelector('.sign');
    let equal = document.querySelector('.equal');

    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');

    let previousScreen = document.querySelector('.previousScreen');
    let currentScreen = document.querySelector('.currentScreen');

    numbers.forEach((number) => number.addEventListener("click", function(e){ 
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener('click', function(e){
        handleOperator(e.target.textContent);
        previousScreen.textContent = previousValue + ' ' + operator;
        currentScreen.textContent = currentValue;
    }))

    percent.addEventListener('click', function() {
        percentage();
        currentScreen.textContent = currentValue;
    })

    clear.addEventListener('click', function() {
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    })

    remove.addEventListener('click', function() {
        currentValue = currentValue.slice(0,-1);
        currentScreen.textContent = currentValue;
    })

    sign.addEventListener('click', function(){
        if (currentValue.charAt(0) === '-'){
            currentValue = currentValue.slice(1)
        }    
        else {
            currentValue = '-' + currentValue;
        }
        currentScreen.textContent = currentValue;

    })

    decimal.addEventListener('click', function() {
        if (!currentValue.includes('.')){
            currentValue += '.';
        };
        currentScreen.textContent = currentValue;
    })

    equal.addEventListener('click', function() {
        operate();
        previousScreen.textContent = '';
        currentScreen.textContent = previousValue;
    })

})

function handleNumber (num) {
    currentValue += num;
}
function handleOperator (op) {
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function percentage() {
    currentValue = Number(currentValue);
    currentValue /= 100;
}

function operate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operator === '+'){
        previousValue += currentValue;
    }
    else if (operator === '-'){
        previousValue -= currentValue;
    }
    else if (operator === '*'){
        previousValue *= currentValue;
        previousValue = Math.round(previousValue*100000) / 100000;
    }
    else if (operator === '/'){
        if (currentValue === 0){
            previousValue = 'Cannot divide by zero';
        }
        else{
            previousValue /= currentValue;
            previousValue = Math.round(previousValue*100000) / 100000;
        }
    }
}