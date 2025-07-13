function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b === 0) {
        return "undefined"
    } else {
        return a / b;
    }
}

function multiply(a, b) {
    return a * b;
}

function operate(a, b, operator) {
    return operator(a, b)
}

let buttons = document.querySelectorAll(".btn")
buttons.forEach(element => {
    element.addEventListener("click", alertt)
})

function alertt(element) {
    alert(element.target.textContent);
}

function addToDisplay(element) {
    const main = document.querySelector(".upper").textContent = ""
    const aux = document.querySelector(".lower").textContent = ""
}