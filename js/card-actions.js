'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinsArea = map.querySelector('.map__pins');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var previousPinButton;
  var previousCard;

  var activate = function (buttons, cards) {
    var documentEscKeyHandler = function (evt) {
      window.util.escEvent(evt, removeCard);
    };

    var removeCard = function () {
      document.removeEventListener('keydown', documentEscKeyHandler);
      previousPinButton.classList.remove('map__pin--active');
      previousCard.remove();
      previousCard = null;
      previousPinButton = null;
    };

    var showCard = function (button) {
      var currentButton;
      var indexOfCard;
      if (previousPinButton) {
        removeCard();
      }
      for (var i = 0; i < buttons.length; i++) {
        if (button === buttons[i]) {
          currentButton = buttons[i];
          currentButton.classList.add('map__pin--active');
          indexOfCard = i;
          var currentCard = cards[indexOfCard].cloneNode(true);
          currentCard.querySelector('.popup__close').addEventListener('click', function () {
            removeCard();
          });
          document.addEventListener('keydown', documentEscKeyHandler);
          mapFiltersContainer.before(currentCard);
          break;
        }
      }
      previousPinButton = currentButton;
      previousCard = currentCard;
    };

    mapPinsArea.addEventListener('click', function (evt) {
      var target = evt.target.closest('button');
      if (target !== mapPinMain && target) {
        showCard(target);
      }
    });
  };

  window.cardActions = {
    activate: activate
  };
})();
