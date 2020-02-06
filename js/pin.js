'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (card) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElement.style.left = (card.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (card.location.y - PIN_HEIGHT) + 'px';
    pinElementImg.src = card.author.avatar;
    pinElementImg.alt = card.offer.title;
    return pinElement;
  };

  window.pin = {
    renderPin: renderPin,
  };
})();
