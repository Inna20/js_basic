'use strict';

const cart = {
    products: [],
    countItems: 0,
    totalPrice: 0,

    calc() {
        for (let productItem of this.products) {
            this.totalPrice += productItem.count*productItem.price;
            this.countItems += productItem.count;
        }
    },
    addProducts() {
        this.products = [
            {name: 'Товар_1', price: 22, count: 1},
            {name: 'Товар_2', price: 57, count: 2},
            {name: 'Товар_3', price: 13, count: 2},
            {name: 'Товар_4', price: 28, count: 1}
        ]
    },

    generate() {
        const cartList = document.getElementById('cart');

        if (this.products.length == 0) { // корзина пуста
            cartList.innerText = "Корзина пуста";
            return;
        }
        cartList.innerHTML = this.addFirstRow(); // innerHtml - удобно, чтобы все предварительно очистить

        for (let productItem of this.products) {
            let row = document.createElement('div');
            row.classList.add('cartRow');
            for (let key in productItem) {
                let item = document.createElement('div');
                item.style.width = '100px';
                item.textContent = productItem[key];
                row.appendChild(item);
            }
            cartList.appendChild(row);
        }
        this.calc();
        cartList.insertAdjacentHTML("beforeend", `В корзине: ${this.countItems} товаров на сумму ${this.totalPrice} рублей`);

        let rowsList = document.querySelectorAll('.cartRow');
        for (let i = 0; i < rowsList.length; i++) {
            rowsList[i].style.display = 'flex';
        }
    },

    addFirstRow() {
        return '<div class="cartRow" style="display: flex;">' +
            '<div style="width: 100px;">Название:</div>' +
            '<div style="width: 100px;">Цена:</div>' +
            '<div style="width: 100px;">Количество:</div></div>';
    }

}
// cart.generate(); // корзина пуста
cart.addProducts();
cart.generate();
