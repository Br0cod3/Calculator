let lowerDisplay = document.querySelector(".lower");
let upperDisplay = document.querySelector(".upper");
let ac = document.querySelector("#ac");
let clr = document.querySelector("#clr")
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
  add: (a, b) => Math.round(((a + b) * 100000000)/100000000),
  subtract: (a, b) => Math.round(((a - b) * 100000000)/100000000),
  multiply: (a, b) => Math.round(((a * b) * 100000000)/100000000),
  divide: (a, b) => (b === 0 ? undefinedOpr() : Math.round(((a / b) * 100000000)/100000000)),
};

function updateDisplay(value) {
  calculatorState.currentValue += value.textContent;
  logDisplay()
}

function setOperation(operation) {
  if (calculatorState.currentValue === "") return {};
  if (signs.some(sgn => lowerDisplay.textContent.includes(sgn))) calculateResult();
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

function removeLastDigit() {
  lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1)
   if (signs.some(sgn => lowerDisplay.textContent.includes(sgn))) {
      const numbers = lowerDisplay.textContent.split(/[-*+/]/)
      calculatorState.currentValue = numbers[1]
   };
}

function calculateResult() {
  if (calculatorState.currentValue === "" || calculatorState.operator === "") return {}
  upperDisplay.textContent = lowerDisplay.textContent
  if (calculatorState.operator === "+") {
    lowerDisplay.textContent = operations.add(parseFloat(calculatorState.previousValue), parseFloat(calculatorState.currentValue))
    calculatorState.currentValue = lowerDisplay.textContent
  } else if (calculatorState.operator === "-") {
    lowerDisplay.textContent = operations.subtract(parseFloat(calculatorState.previousValue), parseFloat(calculatorState.currentValue))
    calculatorState.currentValue = lowerDisplay.textContent
  } else if (calculatorState.operator === "*") {
    lowerDisplay.textContent = operations.multiply(parseFloat(calculatorState.previousValue), parseFloat(calculatorState.currentValue))
    calculatorState.currentValue = lowerDisplay.textContent
  } else if (calculatorState.operator === "/") {
    lowerDisplay.textContent = operations.divide(parseFloat(calculatorState.previousValue), parseFloat(calculatorState.currentValue))
    calculatorState.currentValue = lowerDisplay.textContent
  }
}

function clearDisplay() {
  lowerDisplay.textContent = "";
  upperDisplay.textContent = "";
  calculatorState.currentValue = "";
  calculatorState.previousValue = "";
  calculatorState.operator = "";
}

function undefinedOpr() {
  upperDisplay.textContent = "undefined."
  setTimeout(clearDisplay, 1000)
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
clr.addEventListener("click", () => buttonActions.clear())
equal.addEventListener("click", () => buttonActions.equals());
const signs = ["+", "-", "*", "/"]

