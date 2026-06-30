const display = document.getElementById("display");

function appendToDisplay(value) {
    let current = display.value;

    if (current === "0" || current === "Syntax Error") {
        current = "";
    }

    // 2( -> 2*(
    if (
        value === "(" &&
        current.length > 0 &&
        /[0-9)]/.test(current[current.length - 1])
    ) {
        current += "*";
    }

    // )2 -> )*2
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

        // 2(3+4) -> 2*(3+4)
        expression = expression.replace(/(\d)\(/g, "$1*(");

        // (2+3)4 -> (2+3)*4
        expression = expression.replace(/\)(\d)/g, ")*$1");

        // (2+3)(4+5) -> (2+3)*(4+5)
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

// Keyboard Support
document.addEventListener("keydown", function (event) {

    const key = event.key;

    // Numbers
    if (/^[0-9]$/.test(key)) {
        appendToDisplay(key);
    }

    // Operators
    else if (["+", "-", "*", "/", ".", "(", ")"].includes(key)) {
        appendToDisplay(key);
    }

    // Enter => =
    else if (key === "Enter") {
        event.preventDefault();
        calculateResult();
    }

    // Backspace => CE
    else if (key === "Backspace") {
        event.preventDefault();
        clearLastElement();
    }

    // Escape => C
    else if (key === "Escape") {
        clearDisplay();
    }
});