'use strict';

const errName = document.querySelector('#error-name');
const errLink = document.querySelector('#error-link');
const errAvatar = document.querySelector('#error-avatar');
const errProfileName = document.querySelector('#error-profile-name');
const errProfileJob = document.querySelector('#error-job');

//Проверка валидности форм
export default class ValidateForm {
    constructor(button, name, linkOrJob) {
        this.button = button;
        this.name = name;
        this.linkOrJob = linkOrJob;
        this.listener(name, linkOrJob);
        this.validateName();
        this.validateLinkOrJob();
    }
    listener() {
        this.name.addEventListener('input', () => {
            this.validateName();
        });
        this.linkOrJob.addEventListener('input', () => {
            this.validateLinkOrJob();
        });
    }
    validateName() {
        if (this.name.value.length === 0) {
            this.button.setAttribute('disabled', true);
            this.button.classList.add("popup__button-disabled");
            errName.textContent = "Это обязательное поле";
            errProfileName.textContent = "Это обязательное поле";
        } else if (this.linkOrJob.validity.valid && this.name.validity.valid) {
            this.button.removeAttribute('disabled');
            this.button.classList.remove("popup__button-disabled");
            errName.textContent = "";
            errProfileName.textContent = "";
        } else if (this.name.validity.valid) {
            errName.textContent = "";
            errProfileName.textContent = "";
        }  else {
            this.button.setAttribute('disabled', true);
            this.button.classList.add("popup__button-disabled");
            errName.textContent = "Должно быть от 2 до 30 символов";
            errProfileName.textContent = "Должно быть от 2 до 30 символов";
        }
    }
    validateLinkOrJob() {
        if (this.linkOrJob.value.length === 0) {
            this.button.setAttribute('disabled', true);
            this.button.classList.add("popup__button-disabled");
            errLink.textContent = "Это обязательное поле";
            errAvatar.textContent = "Это обязательное поле";
            errProfileJob.textContent = "Это обязательное поле";
        } else if (this.name.validity.valid && this.linkOrJob.validity.valid) {
            this.button.removeAttribute('disabled');
            this.button.classList.remove("popup__button-disabled");
            errLink.textContent = "";
            errAvatar.textContent = "";
            errProfileJob.textContent = "";
        } else if (this.linkOrJob.validity.valid) {
            errLink.textContent = "";
            errProfileJob.textContent = "";
        } else {
            this.button.setAttribute('disabled', true);
            this.button.classList.add("popup__button-disabled");
            errLink.textContent = "Здесь должна быть ссылка";
            errAvatar.textContent = "Здесь должна быть ссылка";
            errProfileJob.textContent = "Должно быть от 2 до 30 символов";
        }
    }
}