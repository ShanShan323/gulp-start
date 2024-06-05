const overlay = document.querySelector('.overlay');

class Modal {
    constructor (idOfElement) {
        this.modalId = idOfElement;
        this.modal = document.querySelector(`#${this.modalId}`);
        this.modalClose = this.modal.querySelectorAll('.modal__close');
        this.modalContinue = this.modal.querySelectorAll('.modal__continue');
    }
    
    closeModal = () => {
        this.modal.classList.toggle('modal--hidden');
        overlay.classList.toggle('overlay--hidden');
        
        this.modalClose.forEach(modal => modal.removeEventListener('click', this.closeModal));
        this.modalContinue.forEach(modal => modal.removeEventListener('click', this.closeModal));
        overlay.removeEventListener('click', this.closeModal);
    };

    openModal () {
        this.modal.classList.toggle('modal--hidden');
        overlay.classList.toggle('overlay--hidden');

        this.modalClose.forEach(modal => modal.addEventListener('click', this.closeModal));
        this.modalContinue.forEach(modal => modal.addEventListener('click', this.closeModal));
        overlay.addEventListener('click', this.closeModal);
    };
}

export { Modal }