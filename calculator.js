//Creating HTML Part

const container = document.createElement('div');
document.body.append(container);
container.className = "calculator";
const form = document.createElement('form')
container.append(form);
form.action = "#";
form.name = "forms";
const divClass = ["calculator_display1", "calculator_display", "calculator_display2", "calculator_buttons"];
divClass.forEach((e) => {
    const div = document.createElement("div");
    div.className = e;
    form.append(div);
})
const calculator_buttons = document.querySelector(".calculator_buttons");
const classNames = ["plus", "minus", "times", "divide", "mod", "equal", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero", "decimal", "lastclear", "clear"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operators = ["+", "-", "&times;", "&divide;", "%"]
const equalto = ["="];
const lastclear = ["C"]
const clears = ["AC"]
const dataset = operators.concat(equalto, numbers, lastclear, clears);
console.log(dataset)
classNames.forEach((e, i) => {
    const buttons = document.createElement("button");
    buttons.className = e;
    buttons.innerHTML = dataset[i];
    calculator_buttons.append(buttons);

})
const buttons = document.querySelectorAll("button");
buttons.forEach((e) => {
    if (numbers.includes(e.innerText)) {
        e.dataset.type = "number"
    } else if (operators.includes(e.innerText)) {
        e.dataset.type = "operator"
    } else if (equalto.includes(e.innerText)) {
        e.dataset.type = "equal"
    } else if (lastclear.includes(e.innerText)) {
        e.dataset.type = "lastclear";
    } else if (clears.includes(e.innerText)) {
        e.dataset.type = "clear";
    } else {
        e.dataset.type = "operator"
    }
})

// // Getting Element in DOM
const display = document.querySelector('.calculator_display');
const display2 = document.querySelector('.calculator_display2');
const display1 = document.querySelector('.calculator_display1');
display1.innerHTML = "0";
const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator_buttons');
const number = keys.querySelectorAll('[data-type="number"]');
const operator = keys.querySelectorAll('[data-type="operator"]');
const equal = keys.querySelector('[data-type="equal"]');
const clearAll = keys.querySelector('[data-type="clear"]');
const clear = keys.querySelector('[data-type="lastclear"]');
const brace = keys.querySelector('[data-type = "brace"]')
const times = keys.querySelector(".times")
const divides = keys.querySelector(".divide")
let { prevExp } = calculator.dataset;
prevExp = " "

let firstNum = "";
let secondNum = "";
let result = "";
let operation = "";
let flag = false;

// Number Input 

number.forEach(numbers => {
    numbers.addEventListener('click', (event) => {
        if (event.target.innerText === '.' && !flag) {
            flag = true;
        } else if (event.target.innerText === '.' && flag) {
            return;
        } else if (prevExp === "equal" || prevExp === "clear") {
            secondNum = ""
        }
        secondNum += event.target.innerText;
        display.innerText = secondNum;
        prevExp = event.target.dataset.type;
    })
})

// Operator Input 

operator.forEach(operators => {
    operators.addEventListener('click', (event) => {
        if (!secondNum) return result;
        flag = false;
        const action = event.target.className;
        const operationName = event.target.innerText;
        if (secondNum && operation && firstNum) {
            mathOperation();
        } else {
            result = parseFloat(secondNum);
        }
        cleardis(operationName);
        operation = action;
    })
})

function cleardis(name = " ") {
    firstNum += secondNum + " " + name + " ";
    display1.innerText = firstNum;
    display.innerText = "";
    secondNum = "";
    display2.innerText = result;
}
// Calculation Part

function mathOperation() {
    switch (operation) {
        case 'times':
            result = parseFloat(result) * parseFloat(secondNum);
            break;
        case 'plus':
            result = parseFloat(result) + parseFloat(secondNum);
            break;
        case 'minus':
            result = parseFloat(result) - parseFloat(secondNum);
            break;
        case 'divide':
            result = parseFloat(result) / parseFloat(secondNum);
            break;
        case 'mod':
            result = parseFloat(result) % parseFloat(secondNum);
            break;
    }
}

// Equal Operation
equal.addEventListener('click', (event) => {
    if (!firstNum || !secondNum) return;
    flag = false;
    mathOperation();
    cleardis();
    display.innerText = result;
    display2.innerText = " ";
    secondNum = result;
    firstNum = "";
    prevExp = event.target.dataset.type;
});

// Clear All Operation
clearAll.addEventListener('click', (event) => {
    display.innerText = "0";
    display2.innerText = "";
    display1.innerText = "0";
    firstNum = "";
    secondNum = "";
    prevExp = event.target.dataset.type;
    result = "";
});

// Clear Display Operation
clear.addEventListener('click', (event) => {
    display.innerText = "";
    secondNum = "";
});

//Keyboard Connection

window.addEventListener('keydown', (event) => {

    number.forEach(button => {
        if (button.innerText === event.key) {
            button.click();

        }
    })
    operator.forEach(button => {
        if (button.innerText === event.key) {
            button.click();
        }
    })
    if (event.key === "*") times.click();
    else if (event.key === "/") divides.click();
    else if (event.key == "Enter" || event.key === "=") equal.click();
    else if (event.key == "Backspace") clearAll.click();
    console.log(event.key)
})