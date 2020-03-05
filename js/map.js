'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsArea = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var pinMainStartPosition = {
    x: mapPinMain.style.left,
    y: mapPinMain.style.top
  };
  var pinMainWidth = mapPinMain.offsetWidth;
  var pinMainHeight = pinMainWidth;
  var pinMainArrowHeight = 16;
  var pinMainFullHeight = pinMainHeight + pinMainArrowHeight;
  var cardObjects = [];

  var pinsAreaClickHandler = function (evt) {
    var target = evt.target.closest('button');
    if (target !== mapPinMain && target) {
      window.cardActions.showCard(target);
    }
  };

  var getAddressFromMainPin = function (isActive) {
    var left = parseInt(mapPinMain.style.left, 10);
    var top = parseInt(mapPinMain.style.top, 10);
    var address = Math.round(left + pinMainWidth / 2) + ', ';
    address += isActive ? Math.round(top + pinMainFullHeight) : Math.round(top + pinMainHeight / 2);
    return address;
  };

  var hasAlreadyLoaded = false;
  var cardObjectsLoadSuccessHandler = function (data) {
    data.forEach(function (item) {
      if ('offer' in item) {
        cardObjects.push(item);
      }
    });
    window.render.showPins(cardObjects);
    window.form.enableMapForm();
    hasAlreadyLoaded = true;
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    if (!hasAlreadyLoaded) {
      window.ajax.loadCardObjects(cardObjectsLoadSuccessHandler);
    } else {
      window.render.showPins(cardObjects);
      window.form.enableMapForm();
    }
    mapPinsArea.addEventListener('click', pinsAreaClickHandler);
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    mapPinMain.style.left = pinMainStartPosition.x;
    mapPinMain.style.top = pinMainStartPosition.y;
    window.cardActions.removeCard();
    window.render.removePins();
    mapPinsArea.removeEventListener('click', pinsAreaClickHandler);
  };

  window.dragNDrop.activate(mapPinMain, pinMainWidth, pinMainFullHeight, function () {
    window.form.setAddress(true);
  });

  window.map = {
    getAddressFromMainPin: getAddressFromMainPin,
    activate: activateMap,
    deactivate: deactivateMap,
    cardObjects: cardObjects
  };
})();
