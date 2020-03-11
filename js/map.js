'use strict';

(function () {
  var PIN_MAIN_ARROW_HEIGHT = 16;
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapFilter = map.querySelector('.map__filters');
  var mapFilterInputs = mapFilter.querySelectorAll('.map__filters-container input');
  var mapFilterSelects = mapFilter.querySelectorAll('.map__filters-container select');
  var mapPinsArea = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var pinMainStartPosition = {
    x: mapPinMain.style.left,
    y: mapPinMain.style.top
  };
  var pinMainWidth = mapPinMain.offsetWidth;
  var pinMainHeight = pinMainWidth;
  var pinMainFullHeight = pinMainHeight + PIN_MAIN_ARROW_HEIGHT;
  var cardObjects = [];
  var DragLimit = {
    X: {
      MIN: 0,
      MAX: mapPinsArea.offsetWidth
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var renderFiltratedPins = function () {
    window.render.showPins(window.filter.filtrate(window.map.cardObjects), mapPinsArea);
  };

  var filterChangeHandler = window.util.debounce(renderFiltratedPins);

  var enableFilter = function () {
    window.util.enableFormElements(mapFilterInputs);
    window.util.enableFormElements(mapFilterSelects);
    mapFilter.addEventListener('change', filterChangeHandler);
  };

  var disableFilter = function () {
    window.util.disableFormElements(mapFilterInputs);
    window.util.disableFormElements(mapFilterSelects);
    mapFilter.removeEventListener('change', filterChangeHandler);
  };

  var getAddressFromMainPin = function (isActive) {
    var left = parseInt(mapPinMain.style.left, 10);
    var top = parseInt(mapPinMain.style.top, 10);
    var address = Math.round(left + pinMainWidth / 2) + ', ';
    address += isActive ? Math.round(top + pinMainFullHeight) : Math.round(top + pinMainHeight / 2);
    return address;
  };

  var pinsAreaClickHandler = function (evt) {
    var target = evt.target.closest('button');
    if (target !== mapPinMain && target) {
      window.cardActions.showCard(target, mapFiltersContainer);
    }
  };

  var hasAlreadyLoaded = false;
  var cardObjectsLoadSuccessHandler = function (data) {
    data.forEach(function (item) {
      if ('offer' in item) {
        cardObjects.push(item);
      }
    });
    window.render.showPins(cardObjects, mapPinsArea);
    enableFilter();
    hasAlreadyLoaded = true;
  };

  var cardObjectsLoadErrorHandler = function (message) {
    window.message.show('error', message, true);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    if (!hasAlreadyLoaded) {
      window.ajax.downloadData(cardObjectsLoadSuccessHandler, cardObjectsLoadErrorHandler);
    } else {
      window.render.showPins(cardObjects, mapPinsArea);
      enableFilter();
    }
    mapPinsArea.addEventListener('click', pinsAreaClickHandler);
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    mapPinMain.style.left = pinMainStartPosition.x;
    mapPinMain.style.top = pinMainStartPosition.y;
    window.cardActions.removeCard();
    window.render.removePins();
    mapFilter.reset();
    disableFilter();
    mapPinsArea.removeEventListener('click', pinsAreaClickHandler);
    mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
    mapPinMain.addEventListener('keydown', mapPinMainEnterKeyHandler);
  };

  var activatePage = function () {
    mapPinMain.removeEventListener('mousedown', mapPinMainMouseDownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainEnterKeyHandler);
    window.form.activate();
    activateMap();
  };

  var mapPinMainMouseDownHandler = function () {
    activatePage();
  };

  var mapPinMainEnterKeyHandler = function (evt) {
    window.util.enterEvent(evt, activatePage);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMouseDownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainEnterKeyHandler);

  window.dragNDrop.activate(DragLimit, mapPinMain, pinMainWidth, pinMainFullHeight, function () {
    window.form.setAddress(true);
  });

  disableFilter();

  window.map = {
    getAddressFromMainPin: getAddressFromMainPin,
    activate: activateMap,
    deactivate: deactivateMap,
    cardObjects: cardObjects
  };
})();
