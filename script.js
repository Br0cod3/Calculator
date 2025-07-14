function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return b === 0 ? "undefined" : a / b;
}

function multiply(a, b) {
  return a * b;
}

function operate(a, b, operator) {
  return operator(a, b);
}

let buttons = document.querySelectorAll(".btn");
buttons.forEach((element) => {
  element.addEventListener("click", addToDisplay);
});

let operators = document.querySelectorAll(".opr");
operators.forEach((element) => {
  if (element.textContent !== "=") {
    element.addEventListener("click", addToDisplay);
  }
});

let equal = document.querySelector("#equals");
equal.addEventListener("click", func);
