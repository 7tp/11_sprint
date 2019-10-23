'use strict';
  
//Открытие и закрытие попапов
class Popup {
    constructor(popup, openBtn, closeBtn) {
        this.popup = popup;
        this.openBtn = openBtn;
        this.closeBtn = closeBtn
        this.listener();
    }
    listener() {
        this.openBtn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
    }
    open() {
        this.popup.classList.add('popup_is-opened');
        this.closeBtn.removeEventListener('click', () => this.close());
    }
    close(){
        let errText = document.querySelectorAll('.popup__error');
        this.popup.classList.remove('popup_is-opened');
        cardForm.reset();
        errText.forEach(function(text) {
            text.textContent = "";
        });
        avatarForm.reset();

        this.openBtn.removeEventListener('click', () => this.open());
    }
}