import { Modal } from './modal.js';

const buttonSubscribe = document.querySelector('.footer__button');
const modalSubscribe = new Modal('modal_subscribe');
const buttonCart = document.querySelector('.header__shop-link');
const modalCart = new Modal('shopping-cart');

buttonCart.addEventListener('click', (event) => {
    event.preventDefault();
    modalCart.openModal();
});

buttonSubscribe.addEventListener('click', (event) => {
    event.preventDefault();
    modalSubscribe.openModal();
});
