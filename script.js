const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentValue = "0";
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

// Update calculator display
function updateDisplay() {
    display.value = currentValue;
}

// Enter a number
function enterNumber(number) {
    if (currentValue === "Error" || shouldResetDisplay) {
        currentValue = number;
        shouldResetDisplay = false;
    } else if (currentValue === "0") {
        currentValue = number;
    } else if (currentValue.length < 15) {
        currentValue += number;
    }

    updateDisplay();
}

// Add decimal point
function enterDecimal() {
    if (currentValue === "Error" || shouldResetDisplay) {
        currentValue = "0.";
        shouldResetDisplay = false;
    } else if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}

// Calculate the result
function calculate(a, b, op) {
    switch (op) {
        case "+":
            return a + b;

        case "-":
            return a - b;

        case "*":
            return a * b;

        case "/":
            return b === 0 ? null : a / b;

        default:
            return b;
    }
}
