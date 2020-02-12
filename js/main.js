'use strict';

(function () {
  var NUMBER_OF_CARDS = 8;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var cardObjects = [];

  var makePageActive = function () {
    mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainEnterKeyHandler);
    cardObjects = window.data.generateArrayOfCards(NUMBER_OF_CARDS);
    window.form.makeFormActive();
    window.map.makeMapActive(cardObjects);
  };

  var mapPinMainMouseDownHandler = function () {
    makePageActive();
  };

  var mapPinMainEnterKeyHandler = function (evt) {
    window.util.enterEvent(evt, makePageActive);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainEnterKeyHandler);

  window.form.makeFormPrimarySettings();
})();
