'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinsArea = map.querySelector('.map__pins');
  var pinMainWidth = mapPinMain.offsetWidth;
  var pinMainHeight = pinMainWidth;
  var pinMainArrowHeight = 16;
  var pinMainFullHeight = pinMainHeight + pinMainArrowHeight;
  var cardElements = [];
  var pinButtons = [];

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
    window.cardActions.activate(pinButtons, cardElements);
  };

  window.dragNDrop.activate(mapPinMain, pinMainWidth, pinMainFullHeight, window.form.setAddress);

  window.map = {
    getAddressFromMainPin: getAddressFromMainPin,
    makeMapActive: makeMapActive,
  };
})();
