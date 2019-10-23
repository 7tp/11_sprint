'use strict';  

//Хранение и отрисовка карточек
class CardList {
  constructor(container, placesArr) {
    this.container = container;
    this.placeRender(placesArr);
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