'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var activatePage = function () {
    mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainEnterKeyHandler);
    window.form.activateForm();
    window.map.activateMap();
  };

  var deactivatePage = function () {
    mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
    mapPinMain.addEventListener('keydown', mapPinMainEnterKeyHandler);
  };

  var mapPinMainMouseDownHandler = function () {
    activatePage();
  };

  var mapPinMainEnterKeyHandler = function (evt) {
    window.util.enterEvent(evt, activatePage);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainEnterKeyHandler);

  window.form.makeFormPrimarySettings();

  window.main = {
    deactivatePage: deactivatePage
  };
})();
