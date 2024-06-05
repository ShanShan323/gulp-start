import { addToStorage, removeFromStorage, getStorage } from './localstorage.js';

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
