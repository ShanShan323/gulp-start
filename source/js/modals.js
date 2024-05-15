export const openModal = (modal) => {
    const modalCloseButton = modal.querySelector('.modal__close');
    const modalOverlay = document.querySelector('.overlay');
    modal.classList.remove('modal--hidden');
    modalOverlay.classList.add('overlay--showed');

    modalCloseButton.addEventListener('click', () => {
        closeModal(modal);
    });
};

export const closeModal = (modal) => {
    const modalOverlay = document.querySelector('.overlay');
    modal.classList.add('modal--hidden');
    modalOverlay.classList.remove('overlay--showed');
};
