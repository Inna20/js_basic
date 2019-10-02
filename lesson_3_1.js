/**
 * 1.  Алгоритм нахождения простых чисел от 0 до n "Решето Эратосфена"
 * Смысл 0 и 1 не простые, начинаем с 2, зачеркиваем все числа, кратные 2
 * Берем следующее незачеркнутое число - 3, зачеркивает все кратное 3,
 * следующее незачеркнутое 5, зачеркиваем все кратное 5
 * и т.д.
 * Чтобы ускоорить - зачеркиваем все что больше p**2 (текущее число в степени 2) т.к все что меньше - уже должно быть зачеркнуто
  */

let n = 100;
// Заполняем булевый массив с ключами от 0 до 100 - числа в диапазоне которых надо найти простые, заполненный значением true
let arr = Array.from({length: n+1}, (k) => true);

arr = getPlainElements(arr);
console.log('Промежуточная проверка:', arr);

res = getPlainKeys(arr);
console.log('Простые числа от 0 до 100: ', res);

function getPlainElements(arr) {
    // Сразу отбрасываем 0 и 1 - не простые
    let i = 2;
    while (i**2 <= n) {
        if (arr[i] === true) {
            let j = i ** 2;
            while (j <= n) {
                delete arr[j];
                j += i;
            }
        }
        i++;
    }
    return arr;
}

function getPlainKeys(arr) {
    let res = '';
    let i = 2; // Сразу отбрасываем 0 и 1 - не простые
    while (i < arr.length) {
        if (arr[i] === true) {
            res += res ? ', '+i : i;
        }
        i++;
    }
    return res;
}