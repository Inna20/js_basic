'use strict';

const cart = {
    cartContainer: null,
    dropButton: null,
    countItems: 0,
    totalPrice: 0,

    settings: {
        addButtonClass: 'add_button',
        cartContainerClass: 'cart_list',
    },
    products: [],

    addToCart(event) {
        if (!event.target.classList.contains(this.settings.addButtonClass))
            return;

        if (!this.inCart(event.target.dataset.id))
            this.addNewItem(event.target.dataset.id, event.target.dataset.name, event.target.dataset.price);

        this.render();
    },

    addNewItem(id, name, price) {
        this.products.push({
                id : id,
                name: name,
                price: price,
                count: 1
            });
    },

    inCart(id) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                this.products[i].count++;
                return true;
            }
        }
        return false;
    },

    render() {

        this.cartContainer = document.querySelector('.'+ this.settings.cartContainerClass);
        this.cartContainer.innerHTML = '';

        this.dropButton    = document.querySelector('.drop_button');

        if (this.products.length > 0) {
            this.cartContainer.insertAdjacentHTML('afterbegin',  `В корзине ${this.calcPrice().totalItems} товаров(а) стоимостью ${this.calcPrice().totalPrice}`);
            this.cartContainer.insertAdjacentHTML('afterbegin',  this.getCartList());
            this.cartContainer.insertAdjacentHTML('afterbegin',  this.addFirstRow());

            this.dropButton.classList.remove('hidden');

        } else {
            this.cartContainer.insertAdjacentHTML('afterbegin', '<h3>Корзина пуста</h3>');
            this.dropButton.classList.add('hidden');
        }
        this.dropButton.addEventListener('click', this.dropCart.bind(this));
    },
    calcPrice() {
        let res = {
            totalItems: 0,
            totalPrice: 0
        }
        for (let productItem of this.products) {
            res.totalPrice += productItem.count*productItem.price;
            res.totalItems += productItem.count;
        }
        return res;
    },
    dropCart() {
        this.products = [];
        this.render();
    },
    cartItem(id, name, price, count) {
        return `<div class="cart-product prod_row" data-id="${id}">
                    <div>${name}</div>
                    <div>${price}</div>
                    <div>${count}</div>
                </div>`;
    },
    getCartList(){
        let itemList = '';
        for (let productItem of this.products) {
            itemList += this.cartItem(productItem.id, productItem.name, productItem.price, productItem.count);
        }
        return itemList;
    },
    addFirstRow() {
        return '<h3>Корзина</h3><div class="prod_row">' +
            '<div>Название:</div>' +
            '<div>Цена:</div>' +
            '<div>Количество:</div></div>';
    }
};


const Catalog = {
    settings: {
        catalogContainerClass: 'product_list',
    },
    addButton: null,
    cart,

    products: [
        {id: 1, name: 'Товар_1', price: 22},
        {id: 2, name: 'Товар_2', price: 57},
        {id: 3, name: 'Товар_3', price: 13},
        {id: 4, name: 'Товар_4', price: 28},
    ],

    render(){
        const catalogContainer = document.querySelector('.' + this.settings.catalogContainerClass);

        catalogContainer.insertAdjacentHTML("afterbegin", this.getItemList());
        catalogContainer.insertAdjacentHTML("afterbegin", this.getFirstRow());

        catalogContainer.addEventListener('click', event => {
            cart.addToCart(event);
        });
        cart.render();
    },

    getItem(id, name, price) {
        return `<div class="prod_row">
                <div>${name}</div>
                <div>${price}</div>
                <div class="${cart.settings.addButtonClass}" data-id="${id}" data-name="${name}" data-price="${price}">Добавить в корзину</div>
            </div>`;
    },

    getItemList(){
        let itemList = '';
        for (let productItem of this.products) {
            itemList += this.getItem(productItem.id, productItem.name, productItem.price);
        }
        return itemList;
    },
    getFirstRow() {
        return `<h1>Каталог</h1>
            <div class="prod_row">
                <div>Название:</div>
                <div>Цена:</div>
            </div>`;
    }
};

window.addEventListener('load', () => Catalog.render());
