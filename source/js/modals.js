const overlay = document.querySelector('.overlay');
const buttonSubscribe = document.querySelector('.footer__button');
const modalSubscribe = document.querySelector('#modal_subscribe');



buttonSubscribe.addEventListener('click', (event) => openModal(modalSubscribe, event));

export const closeModal = () => {
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        if(!modal.classList.contains('modal--hidden')) {
            const modalClose = modal.querySelector('.modal__close');
            const modalContinue = modal.querySelector('.modal__continue');

            modal.classList.add('modal--hidden');
            modalContinue.removeEventListener('click', closeModal);
            modalClose.removeEventListener('click', closeModal);
        }
    });

    overlay.classList.add('overlay--hidden');
    overlay.removeEventListener('click', closeModal);
};

export const openModal = (modal, event) => {
    event.preventDefault();

    const modalClose = modal.querySelector('.modal__close');
    const modalContinue = modal.querySelector('.modal__continue');

    modal.classList.remove('modal--hidden');
    overlay.classList.remove('overlay--hidden');

    modalClose.addEventListener('click', closeModal);
    modalContinue.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
};



