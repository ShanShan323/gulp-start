
class Modal {
    static _overlay = document.querySelector('.overlay');
    static _modals = document.querySelectorAll('.modal');
    
    constructor (idOfElement) {
        this._modal = document.querySelector(idOfElement);
        this._modalClose = this._modal.querySelectorAll('.modal__close');
        this._modalContinue = this._modal.querySelectorAll('.modal__continue');
    }
    
    static closeModal () {
        Modal._modals.forEach(modal => {
            if (modal.classList.contains('modal--hidden')) {
                return
            }
            modal.classList.add('modal--hidden');
        })
        Modal._overlay.classList.toggle('overlay--hidden');
    };

    openModal () {
        this._modal.classList.toggle('modal--hidden');
        Modal._overlay.classList.toggle('overlay--hidden');

        Modal._overlay.addEventListener('click', Modal.closeModal);
        this._modalClose.forEach(modal => modal.addEventListener('click', Modal.closeModal));
        this._modalContinue.forEach(modal => modal.addEventListener('click', Modal.closeModal));
    };
}

export { Modal }