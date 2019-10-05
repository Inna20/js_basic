function numToObj(num) {
    if (Number.isNaN(num) || num > 999) {
        console.log('Введите корректное число от 0 до 999');
        return {};
    }

    let chars = []
    for (let i = 0; i < 3; i++) {
        chars.push(num % 10);
        num = Math.trunc(num / 10);
    }

    let res = {
        'единицы': chars[0],
        'десятки': chars[1],
        'сотни':   chars[2]
    }
    return res;
}

let n = parseInt(prompt("Введите число от 0 до 999"));
console.log(numToObj(n));
