const buttonOpenMenu = document.querySelector(`.header__open-menu`);
const buttonCloseMenu = document.querySelector(`.header__close-menu`);
const headerNav = document.querySelector(`.header__nav`);

buttonOpenMenu.addEventListener (`click`, () => {
    headerNav.classList.add(`header__nav--showed`);
    buttonCloseMenu.classList.remove(`header__close-menu--hidden`);
    buttonOpenMenu.classList.add(`header__open-menu--hidden`);
    buttonCloseMenu.addEventListener(`click`, closeMenu);
 });

const closeMenu = () => {
    headerNav.classList.remove(`header__nav--showed`);
    buttonCloseMenu.classList.add(`header__close-menu--hidden`);
    buttonOpenMenu.classList.remove(`header__open-menu--hidden`);
    buttonCloseMenu.removeEventListener(`click`, closeMenu);
};

const buttonAddItem = document.querySelectorAll(`.product__button`);
const buttonContinue = document.querySelector(`.modal__continue`);
const closeModal = document.querySelector(`.modal__close`);
const modal = document.querySelector(`.modal`);


buttonAddItem.forEach((button) => {
    button.addEventListener (`click`, () => {
        modal.classList.remove(`modal--hidden`);
        buttonContinue.addEventListener(`click`, closeModalWindow);
        closeModal.addEventListener(`click`, closeModalWindow);
    })
});

const closeModalWindow = () => {
    modal.classList.add(`modal--hidden`);
    buttonContinue.removeEventListener(`click`, closeModalWindow);
    closeModal.removeEventListener(`click`, closeModalWindow);
};

const buttonSubsription = document.querySelector(`.footer__button`);
const footerModal = document.querySelector(`.footer__sub-modal`);
const closeSubs = document.querySelector(`.footer__sub-modal > .modal__close`);

buttonSubsription.addEventListener(`click`, () => {
    footerModal.classList.remove(`modal--hidden`);
    closeSubs.addEventListener(`click`, closeSubModal);
});

const closeSubModal = () => {
    footerModal.classList.add(`modal--hidden`);
    closeSubs.removeEventListener(`click`, closeSubModal);
};

buttonSubsription.addEventListener( `click`, (event) => {
    event.preventDefault();
});