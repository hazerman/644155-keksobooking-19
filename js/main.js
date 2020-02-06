'use strict';

(function () {
  var KEY_ENTER = 13;
  var NUMBER_OF_CARDS = 8;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var cardObjects = [];

  var makePageActive = function () {
    mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);

    cardObjects = window.data.generateArrayOfCards(NUMBER_OF_CARDS);

    window.form.makeFormActive();
    window.map.makeMapActive(cardObjects);
  };

  var mapPinMainMouseDownHandler = function () {
    makePageActive();
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      makePageActive();
    }
  });

  window.form.makeFormPrimarySettings();
})();
