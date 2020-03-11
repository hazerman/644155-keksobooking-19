'use strict';

(function () {
  var MAX_PINS = 5;
  var DEFAULT_VALUE = 'any';
  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRoom = document.querySelector('#housing-rooms');
  var filterGuest = document.querySelector('#housing-guests');
  var filterFeature = document.querySelector('#housing-features');
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
  var FilterBy = {
    TYPE: 'type',
    PRICE: 'price',
    ROOMS: 'rooms',
    GUESTS: 'guests'
  };

  var isFilteredBySelect = function (item, flag, value) {
    if (value === DEFAULT_VALUE) {
      return true;
    }
    if (flag === FilterBy.PRICE) {
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
      var isFiltered = isFilteredBySelect(array[i], FilterBy.TYPE, filterType.value) &&
      isFilteredBySelect(array[i], FilterBy.PRICE, filterPrice.value) &&
      isFilteredBySelect(array[i], FilterBy.ROOMS, filterRoom.value) &&
      isFilteredBySelect(array[i], FilterBy.GUESTS, filterGuest.value) &&
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


  window.filter = {
    filtrate: filtrate
  };
})();
