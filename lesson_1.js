// 1
let tC;
while (true) {
    tC = +prompt('Введите температуру по Цельсию');

    if (isNaN(tC)) {
        alert("Ошибка, введите число");
    } else
        break;
}
let tF = (9 / 5) * tC + 32;
alert(tF);

// 3
let name = "Василий";
let admin = name;
alert(admin);

// 4
alert(1000 + "108");