'use strict';

(function () {
  var pinButtons = [];
  var cardElements = [];
  var previousPinButton = null;
  var previousCard = null;

  var documentEscKeyHandler = function (evt) {
    window.util.escEvent(evt, removeCard);
  };

  var recieveElements = function (buttons, cards) {
    pinButtons = buttons;
    cardElements = cards;
  };

  var removeCard = function () {
    if (previousPinButton) {
      document.removeEventListener('keydown', documentEscKeyHandler);
      previousPinButton.classList.remove('map__pin--active');
      previousCard.remove();
      previousCard = null;
      previousPinButton = null;
    }
  };

  var showCard = function (button, insertPlace) {
    var currentButton;
    var indexOfCard;
    if (previousPinButton) {
      removeCard();
    }
    for (var i = 0; i < pinButtons.length; i++) {
      if (button === pinButtons[i]) {
        currentButton = pinButtons[i];
        currentButton.classList.add('map__pin--active');
        indexOfCard = i;
        var currentCard = cardElements[indexOfCard].cloneNode(true);
        currentCard.querySelector('.popup__close').addEventListener('click', function () {
          removeCard();
        });
        document.addEventListener('keydown', documentEscKeyHandler);
        insertPlace.before(currentCard);
        break;
      }
    }
    previousPinButton = currentButton;
    previousCard = currentCard;
  };

  window.cardActions = {
    recieveElements: recieveElements,
    showCard: showCard,
    removeCard: removeCard
  };
})();
