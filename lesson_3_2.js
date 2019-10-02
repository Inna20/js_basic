// 2 и 3
let basket = [
    {name: 'Tovar1', price: 22},
    {name: 'Tovar2', price: 57},
    {name: 'Tovar3', price: 13},
    {name: 'Tovar4', price: 28}
]
console.log('Цена всех товаров:', countBasketPrice(basket));

function countBasketPrice(basket){
    let res = 0;
    for (const item of basket) {
        res += item.price;
    }
    return res;
}

// 4
console.log('Числа от 0 до 9:')
for(let i=0; i<=9; console.log(i), i++) {}


// 5 *Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
console.log('Пирамида:');
let val = '';
for (let i = 1; i<=20; i++){
    val += 'x';
    console.log(val);
}