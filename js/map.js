'use strict';

(function () {
  var NUMBER_OF_WIZARDS = 5;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinsArea = map.querySelector('.map__pins');
  var pinMainWidth = mapPinMain.offsetWidth;
  var pinMainHeight = pinMainWidth;
  var pinMainArrowHeight = 16;
  var pinMainFullHeight = pinMainHeight + pinMainArrowHeight;
  var cardElements = [];
  var pinButtons = [];
  var cardObjects = [];

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

  var cardObjectsLoadSuccessHandler = function (array) {
    for (var i = 0; i < array.length; i++) {
      cardObjects.push(array[i]);
    }
    var fragmentForPin = document.createDocumentFragment();
    for (var j = 0; j < NUMBER_OF_WIZARDS; j++) {
      if ('offer' in cardObjects[j]) {
        fragmentForPin.appendChild(window.pin.renderPin(cardObjects[j]));
      }
    }
    pinButtons = fragmentForPin.querySelectorAll('.map__pin');
    mapPinsArea.appendChild(fragmentForPin);
    var fragmentForCard = document.createDocumentFragment();
    for (var k = 0; k < NUMBER_OF_WIZARDS; k++) {
      if ('offer' in cardObjects[k]) {
        fragmentForCard.appendChild(window.card.renderCard(cardObjects[k]));
      }
    }
    cardElements = fragmentForCard.querySelectorAll('.map__card');
    window.cardActions.activate(pinButtons, cardElements);
  };

  var makeMapActive = function () {
    map.classList.remove('map--faded');
    window.ajax.loadCardObjects(cardObjectsLoadSuccessHandler);
  };

  window.dragNDrop.activate(mapPinMain, pinMainWidth, pinMainFullHeight, window.form.setAddress);

  window.map = {
    getAddressFromMainPin: getAddressFromMainPin,
    makeMapActive: makeMapActive,
  };
})();
