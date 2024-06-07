import { addToStorage, removeFromStorage, getStorage } from './localstorage.js';

// class ShoppingCart {

//     constructor(idOfCart) {
//         this.fragment = document.createDocumentFragment();
//         this.cart = document.querySelector(`#${idOfCart}`);
//         this.targetElement = this.cart.querySelector('.shopping-cart__list');
//         this.templateCart = document.querySelector('#shopping-cart-product').content.querySelector(`.shopping-cart__item`);
//         this.totalPrice = this.cart.querySelector('.shopping-cart__cost');
//         this.amountOfProduct = this.cart.querySelector('.shopping-cart__amount');
//         this.data = getStorage('cart');
//         this.uniqueProductIds = [...new Set(this.data.map(JSON.stringify))].map(JSON.parse).sort((a,b) => a.id - b.id);
//     };

//     sumTotalPrice = () => {
//         if(!this.data || this.data.length === 0) {
//             return;
//         }
//         return this.data
//             .map(el => Number(el.price))
//             .reduce((a, b) => a + b, 0);
//     };

//     sumTotalAmount = () => {
//         return this.data.reduce((acc,curr) => {
//             if(curr.id === product.id) {
//                 acc++;
//             }
//             return acc;
//         }, 0)
//     };

//     editCart = (operation = 'plus') => {
//         this.input = this.node.querySelector('.shopping-cart__count').value;
//         this.totalPrice = this.cart.querySelector('.shopping-cart__cost');
//         this.amountOfProduct = this.cart.querySelector('.shopping-cart__amount');

//         const newValue = operation === 'plus' ? 1 : -1;

//         if(Number(this.input) === 0 && operation === 'minus') {
//             return;
//         }

//         this.node.querySelector('.shopping-cart__count').value = Number(this.input) + newValue;
//         this.amountOfProduct.textContent = Number(this.amountOfProduct.textContent) + newValue;
//         this.cartCount.textContent = Number(this.cartCount.textContent) + newValue;
//         this.totalPrice.textContent = `${this.sumTotalPrice()} ₽`;
//     };

//     render = () => {
//         if(!this.data?.length) {
//             return;
//         }

//         this.targetElement.innerHTML = '';

//         this.uniqueProductIds.forEach(product => {
//             const node = this.templateCart.cloneNode(true);
//             node.dataset.productId = product.id
//             node.querySelector('.shopping-cart__image').src = product.image;
//             node.querySelector('.shopping-cart__name').textContent = product.name;
//             node.querySelector('.shopping-cart__count').value = this.sumTotalAmount(product, this.data);
//             node.querySelector('.shopping-cart__price').textContent = `${product.price} ₽`;

//             node.querySelector('.shopping-cart__minus').addEventListener('click', () => {
//                 removeFromStorage(product.id, 'cart');
//                 this.editCart('minus');
//             });

//             node.querySelector('.shopping-cart__plus').addEventListener('click', () => {
//                 addToStorage(product, 'cart');
//                 this.editCart('plus');
//             })

//             this.fragment.append(node);
//         })

//         this.targetElement.append(this.fragment);

//         this.totalPrice.textContent = `${this.sumTotalPrice()} ₽`;
//         this.amountOfProduct.textContent = this.data.length;
//         this.cartCount.textContent = this.data.length;
//     };
// }

// const cart = new ShoppingCart('shopping-cart');
// console.log(cart);

const blockMenu = document.querySelector('.header__shop-cart');
const cartCount = blockMenu.querySelector('.header__item-counter');

const costCart = () => {
    const cart = getStorage('cart');
    if (!cart || cart.length === 0) {
        return 0;
    }

    return cart
        .map(el => Number(el.price))
        .reduce((a, b) => a + b, 0);
};

const countProduct = (product, data) => {
    return data.reduce((acc,curr) => {
        if(curr.id === product.id) {
            acc++;
        }
        return acc;
    }, 0
)};

const editCart = (node, cart, operation = 'plus') => {
    const input = node.querySelector('.shopping-cart__count').value;
    const totalPrice = cart.querySelector('.shopping-cart__cost');
    const amountOfProduct = cart.querySelector('.shopping-cart__amount');

    const newValue = operation === 'plus' ? 1 : -1;

    if(Number(input) === 0 && operation === 'minus') {
        return;
    }
    
    node.querySelector('.shopping-cart__count').value = Number(input) + newValue;
    amountOfProduct.textContent = Number(amountOfProduct.textContent) + newValue;
    cartCount.textContent = Number(cartCount.textContent) + newValue;
    totalPrice.textContent = `${costCart()} ₽`;
};

const renderCart = () => {
    const data = getStorage('cart');

    if(!data?.length) {
        return;
    }

    const fragment = document.createDocumentFragment();
    const cart = document.querySelector('#shopping-cart');
    const targetElement = cart.querySelector('.shopping-cart__list');
    const templateCart = document.querySelector('#shopping-cart-product').content.querySelector(`.shopping-cart__item`);
    const totalPrice = cart.querySelector('.shopping-cart__cost');
    const amountOfProduct = cart.querySelector('.shopping-cart__amount');

    let uniqueProductIds = [...new Set(data.map(JSON.stringify))].map(JSON.parse).sort((a,b) => a.id - b.id);

    targetElement.innerHTML = '';

    uniqueProductIds.forEach(product => {
        const node = templateCart.cloneNode(true);

        node.dataset.productId = product.id
        node.querySelector('.shopping-cart__image').src = product.image;
        node.querySelector('.shopping-cart__name').textContent = product.name;
        node.querySelector('.shopping-cart__count').value = countProduct(product, data);
        node.querySelector('.shopping-cart__price').textContent = `${product.price} ₽`;
        node.querySelector('.shopping-cart__minus').addEventListener('click', () => {
            removeFromStorage(product.id, 'cart');
            editCart(node, cart, 'minus');
        });
        node.querySelector('.shopping-cart__plus').addEventListener('click', () => {
            addToStorage('cart', product);
            editCart(node, cart, 'plus');
        });
        
        fragment.append(node);
    });

    targetElement.append(fragment);

    totalPrice.textContent = `${costCart()} ₽`;
    amountOfProduct.textContent = data.length;
    cartCount.textContent = data.length;
};

renderCart();

export { renderCart };
