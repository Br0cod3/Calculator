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
  logDisplay()
}

function setOperation(operation) {
  if (calculatorState.currentValue === "") return {};
  calculatorState.operator = operation.textContent;
  calculatorState.previousValue = calculatorState.currentValue
  calculatorState.currentValue = ""
  logDisplay()
}

function logDisplay() {
  if (calculatorState.operator === "") {
    lowerDisplay.textContent = calculatorState.currentValue
  } 
  else if (calculatorState.previousValue !== "" && signs.includes(calculatorState.operator)) {
    lowerDisplay.textContent = calculatorState.previousValue + calculatorState.operator + calculatorState.currentValue
  }
  else if (signs.includes(calculatorState.operator)) {
    lowerDisplay.textContent = calculatorState.previousValue + calculatorState.operator
  } 
}

function removeLastDigit() {}

function calculateResult() {
  upperDisplay.textContent = lowerDisplay.textContent
}

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
const signs = ["+", "-", "*", "/"]

