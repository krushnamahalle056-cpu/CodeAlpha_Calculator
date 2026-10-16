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

// Format the result
function formatResult(number) {
    if (!Number.isFinite(number)) {
        return "Error";
    }

    return String(Number(number.toPrecision(12)));
}

// Choose an operator
function chooseOperator(nextOperator) {
    if (currentValue === "Error") {
        return;
    }

    if (operator && !shouldResetDisplay) {
        performCalculation();

        if (currentValue === "Error") {
            return;
        }
    }

    previousValue = Number(currentValue);
    operator = nextOperator;
    shouldResetDisplay = true;
}

// Perform calculation
function performCalculation() {
    if (operator === null || previousValue === null) {
        return;
    }

    const a = previousValue;
    const b = Number(currentValue);
    const result = calculate(a, b, operator);

    if (result === null) {
        currentValue = "Error";
    } else {
        currentValue = formatResult(result);
    }

    previousValue = null;
    operator = null;
    shouldResetDisplay = true;

    updateDisplay();
}

// Clear everything
function clearCalculator() {
    currentValue = "0";
    previousValue = null;
    operator = null;
    shouldResetDisplay = false;

    updateDisplay();
}

// Delete last digit
function deleteDigit() {
    if (currentValue === "Error" || shouldResetDisplay) {
        currentValue = "0";
        shouldResetDisplay = false;
    } else if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);

        if (currentValue === "-") {
            currentValue = "0";
        }
    } else {
        currentValue = "0";
    }

    updateDisplay();
}

// Convert to percentage
function calculatePercentage() {
    if (currentValue === "Error") {
        return;
    }

    currentValue = formatResult(Number(currentValue) / 100);
    shouldResetDisplay = true;

    updateDisplay();
}

// Change positive/negative sign
function changeSign() {
    if (currentValue === "Error" || Number(currentValue) === 0) {
        return;
    }

    currentValue = currentValue.startsWith("-")
        ? currentValue.slice(1)
        : "-" + currentValue;

    updateDisplay();
}
