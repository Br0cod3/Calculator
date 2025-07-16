let lowerDisplay = document.querySelector(".lower");
let upperDisplay = document.querySelector(".upper");
let ac = document.querySelector("#ac");
let clr = document.querySelector("#clr");
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
  add: (a, b) => Math.ceil((a + b) * 1e6) / 1e6,
  subtract: (a, b) => Math.ceil((a - b) * 1e6) / 1e6,
  multiply: (a, b) => Math.ceil((a * b) * 1e6) / 1e6,
  divide: (a, b) => (b === 0 ? undefinedOpr() : Math.ceil((a / b) * 1e6) / 1e6),
};

function updateDisplay(value) {
  calculatorState.currentValue += value.textContent;
  onePeriodPerNum();
}

function setOperation(operation) {
  if (calculatorState.currentValue === "") return {};
  if (signs.some((sgn) => lowerDisplay.textContent.includes(sgn)))
    calculateResult();
  calculatorState.operator = operation.textContent;
  calculatorState.previousValue = calculatorState.currentValue;
  calculatorState.currentValue = "";
  logDisplay();
}

function logDisplay() {
  if (calculatorState.operator === "") {
    lowerDisplay.textContent = calculatorState.currentValue;
  } else if (
    calculatorState.previousValue !== "" &&
    signs.includes(calculatorState.operator)
  ) {
    lowerDisplay.textContent =
      calculatorState.previousValue +
      calculatorState.operator +
      calculatorState.currentValue;
  } else if (signs.includes(calculatorState.operator)) {
    lowerDisplay.textContent =
      calculatorState.previousValue + calculatorState.operator;
  }
}

function removeLastDigit() {
  lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
  if (signs.some((sgn) => lowerDisplay.textContent.includes(sgn))) {
    const numbers = lowerDisplay.textContent.split(/[-*+/]/);
    if (numbers.length > 1) {
      calculatorState.currentValue = numbers[1];
    } else {
      calculatorState.currentValue = ""
    }  
  } else {
    calculatorState.currentValue = lowerDisplay.textContent;
  }
}

function calculateResult() {
  let result;
  if (calculatorState.currentValue === "" || calculatorState.operator === "")
    return {};
  upperDisplay.textContent = lowerDisplay.textContent;
  if (calculatorState.operator === "+") {
    result = operations.add(
      parseFloat(calculatorState.previousValue),
      parseFloat(calculatorState.currentValue)
    );
  } else if (calculatorState.operator === "-") {
    result = operations.subtract(
      parseFloat(calculatorState.previousValue),
      parseFloat(calculatorState.currentValue)
    );
  } else if (calculatorState.operator === "*") {
    result = operations.multiply(
      parseFloat(calculatorState.previousValue),
      parseFloat(calculatorState.currentValue)
    );
  } else if (calculatorState.operator === "/") {
    result = operations.divide(
      parseFloat(calculatorState.previousValue),
      parseFloat(calculatorState.currentValue)
    );
  }
  
  lowerDisplay.textContent = result;
  calculatorState.currentValue = result;
  calculatorState.previousValue = ""
  calculatorState.operator = ""
}

function clearDisplay() {
  lowerDisplay.textContent = "";
  upperDisplay.textContent = "";
  calculatorState.currentValue = "";
  calculatorState.previousValue = "";
  calculatorState.operator = "";
}

function undefinedOpr() {
  upperDisplay.textContent = "undefined.";
  setTimeout(clearDisplay, 1000);
}

function onePeriodPerNum() {
  const periodMatch = calculatorState.currentValue.match(/[.]/g);
  if (periodMatch === null) {
    logDisplay();
  } else {
    if (periodMatch.length > 1) {
      calculatorState.currentValue = calculatorState.currentValue.slice(0, -1);
      return {};
    } else {
      logDisplay();
    }
  }
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
clr.addEventListener("click", () => buttonActions.clear());
equal.addEventListener("click", () => buttonActions.equals());
const signs = ["+", "-", "*", "/"];
