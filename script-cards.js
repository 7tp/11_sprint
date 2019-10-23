'use strict';

const root = document.querySelector('.root');
const placesList = document.querySelector('.places-list');

const popupCard = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.user-info__button');
const popupCloseButton = document.querySelector('.popup__close');
const addButton = document.querySelector('.popup__button');
const cardForm = document.forms.new;
const cardName = cardForm.elements.name;
const cardLink = cardForm.elements.link;

const popupImg = document.querySelector('.popup-img');
const popupImgCloseBtn = document.querySelector('.popup-img__close');

const myId = 'b7dcd7edd2fc9c71b434cd70';
const api = new Api('http://95.216.175.5/cohort3', '4ed88103-f904-48a9-b18c-9f00126cc9ec');

//Получения карточек из сервера
function getCards() {
  api.loadData()
    .then(res => {
      //Отрисовка карточек
      placesList.textContent = '';
      new CardList(placesList, res);

      //Получение лайков из сервера
      document.querySelectorAll('.place-card__like-count').forEach(function(elem, i) {
        elem.textContent = res[i].likes.length
      });

      //Сделать иконки удаления своих карточек видимыми
      for (let i=0; i<document.querySelectorAll('.place-card__delete-icon').length; i++) {
        if (res[i].owner._id === myId) {
          document.querySelectorAll('.place-card__delete-icon')[i].classList.remove('.place-card__delete-icon');
          document.querySelectorAll('.place-card__delete-icon')[i].style.display = 'inline';
        }
      }

      //Сделать иконки "лайк" у полюбившихся карточек видимыми
      document.querySelectorAll('.place-card__like-icon').forEach(function(elem, i) {
        res[i].likes.forEach(function(el, id) {
          if (res[i].likes[id]._id === myId) {
            elem.classList.add('place-card__like-icon_liked');
          }
        })
      });

      //Удаление карточки
      //Получение id удаляемой карточки. Можно удалять только свои карточки
      document.querySelectorAll('.place-card__delete-icon').forEach(function(elem, i) {
        elem.addEventListener('click', function() {
          event.stopPropagation();
          let id = res[i]._id;
          if ( res[i].owner._id === myId) {
            //Удаление карточки из сервера
            if (window.confirm("Действительно хотите удалить карточку?")) {
              api.deleteCard(id)
                .then(res => {
                    elem.parentNode.parentNode.remove();
                    return res
                })
            }
          } else {
            alert('Вы не можете удалить чужую карточку')
          }
        });
      });

      //Добавление лайка
      document.querySelectorAll('.place-card__like-icon').forEach(function(elem, i) {
        elem.addEventListener('click', function() {
          let id = res[i]._id;
          //Проверка наличия моего лайка
          if (elem.classList.contains('place-card__like-icon_liked')) {
            //Удаление лайка из сервера
            api.deleteLikeCard(id)
              .then(res => {
                elem.classList.remove('place-card__like-icon_liked');
                elem.nextElementSibling.textContent = res.likes.length;
              })
          } else {
            //Добавление лайка на сервер
            api.likeCard(id)
            .then(res => {
              elem.classList.add('place-card__like-icon_liked');
              elem.nextElementSibling.textContent = res.likes.length;
            })
          }
        });
      });

    });
}

//Добавление новой карточки
cardForm.addEventListener('submit', function(event) {
  event.preventDefault();
  profileLoading(true);
  api.saveNewCard(cardName.value, cardLink.value)
    .then(res => {
      res;
    })
    .finally(res => profileLoading(false));

  //Перезагрузка карточек
  getCards();

  cardForm.reset();
  addButton.setAttribute('disabled', true);
  addButton.classList.add("popup__button-disabled");
  popupCard.classList.remove('popup_is-opened');
});

getCards();

//Открытие и закрытие формы добавления новых карточек
new Popup(popupCard, popupOpenButton, popupCloseButton);

//Проверка валидности значений формы добавления новых карточек
new ValidateForm(addButton, cardName, cardLink);