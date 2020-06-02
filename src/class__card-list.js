'use strict';  

//Хранение и отрисовка карточек
export default class CardList {
  constructor(container, placesArr) {
    this.container = container;
    this.placeRender(placesArr);
    // Можно улучшить - правильнее передавать placesArr под именем cards
    // и внутри методов использовать this.cards без повторной передачи параметра
  }
  //Добавление новой карточки на страницу
  addCard(cardName, cardLink) {
    const { cardElement } = new Card(cardName, cardLink);
    this.container.appendChild(cardElement);
  }
  //Автоматическое добавление карточек на страницу
  placeRender(placesArr) {
    for (let i = 0; i < placesArr.length; i++) {
      this.addCard(placesArr[i].name, placesArr[i].link);
    }
  }
}

import Card from './class__card.js'