const overlay = document.querySelector('.overlay');

class Modal {
    constructor (idOfElement) {
        this.modal = document.querySelector(`#${idOfElement}`);
        this.modalClose = this.modal.querySelectorAll('.modal__close');
        this.modalContinue = this.modal.querySelectorAll('.modal__continue');
        this.closeModal = this.closeModal.bind(this);
    }
    
    closeModal () {
        overlay.classList.toggle('overlay--hidden');
        this.modal.classList.toggle('modal--hidden');
        
        overlay.removeEventListener('click', this.closeModal);
        this.modalClose.forEach(modal => modal.removeEventListener('click', this.closeModal));
        this.modalContinue.forEach(modal => modal.removeEventListener('click', this.closeModal));
    };

    openModal () {
        overlay.classList.toggle('overlay--hidden');
        this.modal.classList.toggle('modal--hidden');

        overlay.addEventListener('click', this.closeModal);
        this.modalClose.forEach(modal => modal.addEventListener('click', this.closeModal));
        this.modalContinue.forEach(modal => modal.addEventListener('click', this.closeModal));
    };
}

export { Modal }