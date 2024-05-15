import { addToStorage, removeFromStorage, getStorage } from './localstorage.js';
import { openModal, closeModal } from './modals.js';

const modalCart = document.querySelector('#modal_cart');
const modalCartError = document.querySelector('#modal_cart_error');
const modalOverlay = document.querySelector('.overlay');
const blockMenu = document.querySelector('.header__shop-cart');
const cart = document.querySelector('.shopping-cart');
const cartList = cart.querySelector('.shopping-cart__list');
const cartOpenedButton = blockMenu.querySelector('.header__shop-link');
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

const editCart = (node, operation = 'plus', cart) => {
    const input = node.querySelector('.shopping-cart__count').value;
    const totalPrice = cart.querySelector('.shopping-cart__cost');
    const amountOfProduct = cart.querySelector('.shopping-cart__amount');

    if(operation === 'plus') {
        node.querySelector('.shopping-cart__count').value = Number(input) + 1;
        amountOfProduct.textContent = Number(amountOfProduct.textContent) + 1;
        cartCount.textContent = Number(cartCount.textContent) + 1;
        totalPrice.textContent = `${costCart()} ₽`;
    } else {
        if(Number(input) === 0) {
            return;
        } else {
            node.querySelector('.shopping-cart__count').value = Number(input) - 1;
            amountOfProduct.textContent = Number(amountOfProduct.textContent) - 1;
            cartCount.textContent = Number(cartCount.textContent) - 1;
            totalPrice.textContent = `${costCart()} ₽`;
        }
    }
};

const renderCart = () => {
    const data = getStorage('cart');

    if(!data?.length) {
        return;
    }

    const fragment = document.createDocumentFragment();
    const cart = document.querySelector('.shopping-cart');
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
            editCart(node, 'minus', cart);
        });
        node.querySelector('.shopping-cart__plus').addEventListener('click', () => {
            addToStorage('cart', product);
            editCart(node, 'plus', cart);
        });
        
        fragment.append(node);
    });


    targetElement.append(fragment);

    totalPrice.textContent = `${costCart()} ₽`;
    amountOfProduct.textContent = data.length;
    cartCount.textContent = data.length;
};

renderCart();

const removeProductFromCart = (productId) => {
    const node = cartList.querySelector(`[data-product-id="${productId}"]`);
    node.remove();
    cartCount.textContent = cartList.childElementCount;

    if(!cartList.childElementCount) {
        cart.classList.remove('user-menu__cart_active');
    }
    removeFromStorage(productId, 'cart');
};

const openCart = (event) => {
    event.preventDefault();

    if(!cartList.childElementCount) {
        return;
    }

    cart.classList.add('shopping-cart--showed');
    modalOverlay.classList.add('overlay--showed');
    cart.querySelector('.shopping-cart__close').addEventListener('click', closeCart);

    cart.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    document.addEventListener('click', closeCart);

};

const closeCart = (event) => {
    if(blockMenu.contains(event.target)) {
        return;
    }

    if(cart.classList.contains('shopping-cart--showed')) {
        event.preventDefault();
    }

    cart.classList.remove('shopping-cart--showed');
    modalOverlay.classList.remove('overlay--showed');
    document.removeEventListener('click', closeCart);
};

cartOpenedButton.addEventListener('click', openCart);

export { removeProductFromCart, renderCart };
