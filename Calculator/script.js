const display = document.getElementById("display");

function appendToDisplay(value) {
    let current = display.value;

    if (current === "0" || current === "Syntax Error") {
        current = "";
    }

    if (
        value === "(" &&
        current.length > 0 &&
        /[0-9)]/.test(current[current.length - 1])
    ) {
        current += "*";
    }

    if (
        current.length > 0 &&
        current[current.length - 1] === ")" &&
        /[0-9]/.test(value)
    ) {
        current += "*";
    }

    display.value = current + value;
}

function clearDisplay() {
    display.value = "0";
}

function clearLastElement() {
    if (display.value === "Syntax Error") {
        display.value = "0";
        return;
    }

    if (display.value.length <= 1) {
        display.value = "0";
        return;
    }

    display.value = display.value.slice(0, -1);

    if (display.value === "") {
        display.value = "0";
    }
}

function calculateResult() {
    try {
        let expression = display.value;

        expression = expression.replace(/(\d)\(/g, "$1*(");

        expression = expression.replace(/\)(\d)/g, ")*$1");

        expression = expression.replace(/\)\(/g, ")*(");

        const result = eval(expression);

        if (
            result === undefined ||
            Number.isNaN(result) ||
            !Number.isFinite(result)
        ) {
            display.value = "Infinity";
        } else {
            display.value = result;
        }

    } catch (Error) {
        display.value = "Syntax Error";
    }
}

document.addEventListener("keydown", function (event) {

    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        appendToDisplay(key);
    }

    else if (["+", "-", "*", "/", ".", "(", ")"].includes(key)) {
        appendToDisplay(key);
    }

    else if (key === "Enter") {
        event.preventDefault();
        calculateResult();
    }

    else if (key === "Backspace") {
        event.preventDefault();
        clearLastElement();
    }

    else if (key === "Escape") {
        clearDisplay();
    }
});
