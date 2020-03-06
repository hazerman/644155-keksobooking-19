'use strict';

(function () {
  var MAX_PINS = 5;
  var map = document.querySelector('.map');
  var mapPinsArea = map.querySelector('.map__pins');
  var pinButtons = [];
  var cardElements = [];
  var cardObjects = [];

  var removePins = function () {
    if (pinButtons.length) {
      for (var j = pinButtons.length - 1; j >= 0; j--) {
        pinButtons[j].remove();
      }
    }
  };

  var showPins = function (data) {
    var numberOfPins = data.length > MAX_PINS ? MAX_PINS : data.length;
    window.cardActions.removeCard();
    removePins();
    cardElements = [];
    cardObjects = [];
    for (var i = 0; i < numberOfPins; i++) {
      cardObjects.push(data[i]);
    }
    var fragmentForPin = document.createDocumentFragment();
    cardObjects.forEach(function (item) {
      fragmentForPin.appendChild(window.pin.render(item));
    });
    pinButtons = fragmentForPin.querySelectorAll('.map__pin');
    mapPinsArea.appendChild(fragmentForPin);
    var fragmentForCard = document.createDocumentFragment();
    cardObjects.forEach(function (item) {
      fragmentForCard.appendChild(window.card.render(item));
    });
    cardElements = fragmentForCard.querySelectorAll('.map__card');
    window.cardActions.recieveElements(pinButtons, cardElements);
  };

  window.render = {
    showPins: showPins,
    removePins: removePins
  };
})();
