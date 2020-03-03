'use strict';

(function () {
  var MAX_PINS = 5;
  var map = document.querySelector('.map');
  var mapForm = map.querySelector('.map__filters');
  var filterType = mapForm.querySelector('#housing-type');
  var filterPrice = mapForm.querySelector('#housing-price');
  var filterRoom = mapForm.querySelector('#housing-rooms');
  var filterGuest = mapForm.querySelector('#housing-guests');
  var filterFeature = mapForm.querySelector('#housing-features');
  var defaultValue = 'any';
  var rangeToCostMap = {
    'middle': [
      10000,
      50000
    ],
    'low': [
      -Infinity,
      9999
    ],
    'high': [
      50001,
      +Infinity
    ]
  };

  var isFilteredBySelect = function (item, flag, value) {
    if (value === defaultValue) {
      return true;
    }
    if (flag === 'price') {
      return item.offer[flag] >= rangeToCostMap[value][0] && item.offer[flag] <= rangeToCostMap[value][1];
    }
    if (typeof item.offer[flag] === 'number') {
      value = parseInt(value, 10);
    }
    return item.offer[flag] === value;
  };

  var isFilteredByFeature = function (item) {
    var checkedFeatures = filterFeature.querySelectorAll('input:checked');
    if (!checkedFeatures.length) {
      return true;
    }
    var checkedValues = [];
    checkedFeatures.forEach(function (feature) {
      checkedValues.push(feature.value);
    });
    var sameValues = item.offer.features.filter(function (feature) {
      return checkedValues.includes(feature);
    });
    return sameValues.length >= checkedValues.length;
  };

  var filtrate = function (array) {
    var filteredArray = [];
    for (var i = 0; i < array.length; i++) {
      var isFiltered = isFilteredBySelect(array[i], 'type', filterType.value) &&
      isFilteredBySelect(array[i], 'price', filterPrice.value) &&
      isFilteredBySelect(array[i], 'rooms', filterRoom.value) &&
      isFilteredBySelect(array[i], 'guests', filterGuest.value) &&
      isFilteredByFeature(array[i]);
      if (isFiltered) {
        filteredArray.push(array[i]);
      }
      if (filteredArray.length === MAX_PINS) {
        break;
      }
    }
    return filteredArray;
  };

  var renderFiltratedPins = function () {
    window.render.showPins(filtrate(window.map.cardObjects));
  };

  var mapFormChangeHandler = window.util.debounce(renderFiltratedPins);

  var enableFilterListener = function () {
    mapForm.addEventListener('change', mapFormChangeHandler);
  };

  var disableFilterListener = function () {
    mapForm.removeEventListener('change', mapFormChangeHandler);
  };

  window.filter = {
    enableFilterListener: enableFilterListener,
    disableFilterListener: disableFilterListener
  };
})();
