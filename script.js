let lowerDisplay = document.querySelector(".lower");
let upperDisplay = document.querySelector(".upper");
let ac = document.querySelector("#ac");
let buttons = document.querySelectorAll(".btn");
let operators = document.querySelectorAll(".opr");
let equal = document.querySelector("#equals");

const buttonActions = {
  digit: (value) => updateDisplay(value),
  operation: (opr) => setOperation(opr),
  equals: () => calculateResult(),
  clear: () => removeLastDigit(),
  AC: () => clearDisplay(),
};

const calculatorState = {
  currentValue: "",
  operator: "",
  previousValue: "",
};

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b === 0 ? "undefined" : a / b),
};

function updateDisplay(value) {
  calculatorState.currentValue += value.textContent;
  lowerDisplay.textContent = calculatorState.currentValue;
}

function setOperation(operation) {
  calculatorState.operator = operation;
  updateDisplay(calculatorState.operator)
}

function calculateResult() {}

function removeLastDigit() {}

function clearDisplay() {
  lowerDisplay.textContent = "";
  upperDisplay.textContent = "";
  calculatorState.currentValue = "";
  calculatorState.previousValue = "";
  calculatorState.operator = "";
}

buttons.forEach((element) => {
  element.addEventListener("click", () => buttonActions.digit(element));
});

operators.forEach((element) => {
  if (element.textContent !== "=") {
    element.addEventListener("click", () => buttonActions.operation(element));
  }
});

ac.addEventListener("click", () => buttonActions.AC());

equal.addEventListener("click", () => buttonActions.equals());
