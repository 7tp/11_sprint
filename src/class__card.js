'use strict';
const popupImg = document.querySelector('.popup-img');
const popupImgCloseBtn = document.querySelector('.popup-img__close');

//Создание карточек
export default class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
    this.cardElement = this.create(this.name, this.link)
  };

  //Создание новой карточки в памяти браузера
  create (name, link) {
    const tmplCard = document.querySelector('#tmplCards').content.querySelector('.place-card');
    let tmplClone = tmplCard.cloneNode(true);

    document.querySelector('.places-list').appendChild(tmplClone);

    tmplClone.querySelector('.place-card__image').setAttribute('style', `background-image: url(${link})`);
    tmplClone.querySelector('.place-card__name').textContent = name;
   
    this.openImage(tmplClone);

    return tmplClone;
  }

  //Открытие фото карточки
  openImage(element) {
    element.querySelector('.place-card__image').addEventListener('click', function(event) {
      let imgSrc = event.target.style.backgroundImage.slice(5,-2);
      popupImg.querySelector('.popup-img__place-card').setAttribute('src', `${imgSrc}`);
      root.appendChild(popupImg);

      return root;
     
    });

    new Popup(popupImg, element.querySelector('.place-card__image'), popupImgCloseBtn);

  }
}

import Popup from './class__popup.js'