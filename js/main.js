'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var makePageActive = function () {
    mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainEnterKeyHandler);
    window.form.makeFormActive();
    window.map.makeMapActive();
  };

  var makePageInactive = function () {
    mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
    mapPinMain.addEventListener('keydown', mapPinMainEnterKeyHandler);
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

  window.main = {
    makePageInactive: makePageInactive
  };
})();
