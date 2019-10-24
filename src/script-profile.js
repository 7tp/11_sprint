'use strict';

const popupProfile = document.querySelector('.popup-profile');
const profileEditButton = document.querySelector('.user-info__edit-button');
const profileEditCloseButton = document.querySelector('.popup-profile__close');
const profileAddButton = document.querySelector('.popup__button_save');
const profileForm = document.forms.profile;
const profileName = profileForm.elements.profile_name;
const profileJob = profileForm.elements.profile_job;
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');

const popupAvatar = document.querySelector('.popup-avatar');
const avatarEditCloseButton = document.querySelector('.popup-avatar__close');
const avatarSaveButton = document.querySelector('.popup-avatar__button');
const avatarForm = document.forms.avatar;
const newAvatar = avatarForm.elements.avatar__link;
const userAvatar =  document.querySelector('.user-info__photo');

const api = new Api(serverUrl, myToken);

//Получение информации о профиле из сервера
function getProfile() {
  api.loadUser()
  .then(res => {
    userName.textContent = res.name;
    userJob.textContent = res.about;
    userAvatar.setAttribute('style', `background-image: url(${res.avatar})`)
  });
}

//Pедактирование профиля
profileForm.addEventListener('submit', function(event) {
  event.preventDefault();
  profileLoading(true);
  api.saveProfile(profileName.value, profileJob.value)
    .then(res => {
      userName.textContent = res.name;
      userJob.textContent = res.about
    })
    .finally(res => profileLoading(false));
  popupProfile.classList.remove('popup_is-opened');
});

//Обновление аватара
avatarForm.addEventListener('submit', function(event) {
  event.preventDefault();
  profileLoading(true);
  api.changeAvatar(newAvatar.value)
    .then(res => {
      userAvatar.setAttribute('style', `background-image: url(${res.avatar})`);
      return res;
    })
    .finally(res => profileLoading(false));
  popupAvatar.classList.remove('popup_is-opened');
  avatarForm.reset();
});

//Информация о том, что форма загружается
function profileLoading(isLoading) {
  if (isLoading) {
    profileAddButton.textContent = 'Загружаю...';
  } else {
    profileAddButton.textContent = 'Сохранить';
  }
}

getProfile();

//Открытие и закрытие формы редактирования профиля
new Popup(popupProfile, profileEditButton, profileEditCloseButton);

//Проверка валидности значений формы редактирования профиля
new ValidateForm(profileAddButton, profileName, profileJob);

//Открытие и закрытие формы обновления аватара
new Popup(popupAvatar, userAvatar, avatarEditCloseButton);

//Проверка валидности значений формы обновления аватара
new ValidateForm(avatarSaveButton, newAvatar, newAvatar);

//Импорт
import Api from './class__api';
import Popup from './class__popup.js';
import ValidateForm from './class__validate-form';
import {serverUrl, myToken} from './variables';

//Экспорт
export {getProfile, profileLoading}