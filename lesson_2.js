let a = parseInt(prompt("Введите число a"));
let b = parseInt(prompt("Введите число b"));
let res;

if (a >= 0 && b >=0) { // 1. если a и b положительные, вывести их разность;
    res = a - b;
    alert(`a и b положительные, их разность: ${res}`);
} else if (a < 0 && b < 0){  // 2. если а и b отрицательные, вывести их произведение;
    res = a * b;
    alert(`а и b отрицательные, их произведение: ${res}`);
} else if ((a >= 0 && b < 0) || (b >= 0 && a < 0)) { // 3. если а и b разных знаков, вывести их сумму;
    res = a + b;
    alert(`а и b разных знаков, их сумма: ${res}`);
}

// 4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
for (let a = 6; a <= 15; a++) {
    console.log(a);
}

// 5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
function sum(a, b){
    return a + b;
}
function subtraction(a, b){
    return a - b;
}
function multiplication(a, b){
    return a * b;
}
function division(a, b) {
    return a / b;
}

// 6. Реализовать функцию с тремя параметрами:
function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case '+':
            return sum(arg1, arg2);
        case '-':
            return subtraction(arg1, arg2);
        case '*':
            return multiplication(arg1, arg2);
        case '/':
            return division(arg1, arg2);
        default:
            return false;
    }
}

console.log(mathOperation(2, 5, '/'))

// 7. *Сравнить null и 0. Попробуйте объяснить результат.
if (null == 0) { // >= true!!!!
    console.log('null равен 0');
} else {
    console.log('null не равен 0'); // Правильный ответ
}

if (null == undefined) {
    console.log('null равен undefined'); // Правильный ответ
} else {
    console.log('null не равен undefined');
}
console.log(typeof null); // object
console.log(typeof 0);    // number

// 8. *С помощью рекурсии организовать функцию возведения числа в степень.
function power(val, pow) {
    if (pow == 0) {
        return 1;
    }
    return val*power(val, pow-1);
}
console.log(power(2, 5));