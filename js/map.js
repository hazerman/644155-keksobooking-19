'use strict';

(function () {
  var KEY_ESC = 27;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinsArea = map.querySelector('.map__pins');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var pinMainWidth = mapPinMain.offsetWidth;
  var pinMainHeight = pinMainWidth;
  var pinMainArrowHeight = 16;
  var pinMainFullHeight = pinMainHeight + pinMainArrowHeight;
  var cardElements = [];
  var pinButtons = [];
  var previousPinButton;
  var previousCard;

  var getAddressFromMainPin = function (isActive) {
    var address;
    var left = parseInt(mapPinMain.style.left, 10);
    var top = parseInt(mapPinMain.style.top, 10);
    if (isActive) {
      address = Math.round(left + pinMainWidth / 2) + ', ' + Math.round(top + pinMainFullHeight);
    } else {
      address = Math.round(left + pinMainWidth / 2) + ', ' + Math.round(top + pinMainHeight / 2);
    }
    return address;
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
        mapFiltersContainer.before(currentCard);
        break;
      }
    }
    previousPinButton = currentButton;
    previousCard = currentCard;
  };

  var documentEscKeyHandler = function (evt) {
    if (evt.keyCode === KEY_ESC) {
      removeCard();
    }
  };

  mapPinsArea.addEventListener('click', function (evt) {
    var target = evt.target.closest('button');
    if (target !== mapPinMain && target) {
      showCard(target);
    }
  });

  var makeMapActive = function (cards) {
    map.classList.remove('map--faded');

    var fragmentForPin = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      if ('offer' in cards[i]) {
        fragmentForPin.appendChild(window.pin.renderPin(cards[i]));
      }
    }
    pinButtons = fragmentForPin.querySelectorAll('.map__pin');

    mapPinsArea.appendChild(fragmentForPin);

    var fragmentForCard = document.createDocumentFragment();
    for (var k = 0; k < cards.length; k++) {
      fragmentForCard.appendChild(window.card.renderCard(cards[k]));
    }
    cardElements = fragmentForCard.querySelectorAll('.map__card');
  };

  window.dragNDrop.activate(mapPinMain, pinMainWidth, pinMainFullHeight, window.form.setAddress);

  window.map = {
    getAddressFromMainPin: getAddressFromMainPin,
    makeMapActive: makeMapActive,
  };
})();
