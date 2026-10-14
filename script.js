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
