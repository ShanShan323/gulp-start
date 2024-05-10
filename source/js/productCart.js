import { addToStorage, removeFromStorage, getStorage } from './localstorage.js';
import { openModal, closeModal } from './modals.js';

const modalCart = document.querySelector('#modal_cart');
const modalCartError = document.querySelector('#modal_cart_error');
const blockMenu = document.querySelector('.header__shop-cart');
const cart = document.querySelector('.shopping-cart');
const cartList = cart.querySelector('.shopping-cart__list');
const cartOpenedButton = blockMenu.querySelector('.header__shop-link');
const cartCount = blockMenu.querySelector('.header__item-counter');
const costOfProduct = cart.querySelector('.shopping-cart__cost');
const countOfProduct = cart.querySelector('.shopping-cart__amount');
const cartProductTemplate = document.querySelector('#shopping-cart-product').content;

const removeProductFromCart = (productId) => {
    const node = cartList.querySelector(`[data-product-id="${productId}"]`);
    node.remove();
    cartCount.textContent = cartList.childElementCount;

    if(!cartList.childElementCount) {
        cart.classList.remove('user-menu__cart_active');
    }
    removeFromStorage(productId, 'cart');
};

const addProductToCart = (product, isClick = false) => {

    console.log(product);
    if(!product || (isClick && getStorage('cart')?.map(el => Number(el.id))?.includes(product.id))) {
        openModal(modalCartError);
        return;
    }

    const node = cartProductTemplate.querySelector('.shopping-cart__item').cloneNode(true);

    node.dataset.productId = product.id;
    // node.querySelector('.shopping-cart__link').href = product.link;
    node.querySelector('.shopping-cart__image').src = product.image;
    node.querySelector('.shopping-cart__name').textContent = product.name;
    node.querySelector('.shopping-cart__price').textContent = `${product.price} ₽`;

    // node.querySelector('.shopping-cart__delete').addEventListener('click', (event) => {
    //     removeProductFromCart(product.id);
    //     event.stopPropagation();
    // });

    if(isClick) {
        openModal(modalCart);
    }

    cartList.append(node);
    addToStorage(product, 'cart');
    cartCount.textContent = cartList.childElementCount;
    countOfProduct.textContent = `${cartList.childElementCount} шт.`
    costOfProduct.textContent = costOfCart();
};

const costOfCart = () => {
    return getStorage('cart')
        ?.map(el => Number(el.price))
        .reduce((a,b) => {return a+b}
        ,0
    );
};

const openCart = (event) => {
    event.preventDefault();

    if(!cartList.childElementCount) {
        return;
    }

    cart.classList.add('shopping-cart--showed');
    cart.querySelector('shopping-cart__close').addEventListener('click', closeCart);
};

const closeCart = (event) => {
    if(blockMenu.contains(event.target)) {
        return;
    }

    if(cart.classList.contains('shopping-cart--showed')) {
        event.preventDefault();
    }

    cart.classList.remove('shopping-cart--showed');
};

cartOpenedButton.addEventListener('click', openCart);

document.addEventListener('click', closeCart);

if(getStorage('cart')?.length) {
    getStorage('cart').forEach(product => {
        addProductToCart(product);
    });
    cartCount.textContent = cartList.childElementCount;
}

export { removeProductFromCart, addProductToCart };
