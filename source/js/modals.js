export const openModal = (modal) => {
    const modalCloseButton = modal.querySelector('.modal__close');
    modal.classList.remove('modal--hidden');

    modalCloseButton.addEventListener('click', () => {
        closeModal(modal);
    });
};

export const closeModal = (modal) => {
    modal.classList.add('modal--hidden');
};
