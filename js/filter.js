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

  var filtrateSelects = function (array, flag, value) {
    var filteredArray = array.filter(function (item) {
      if (value === defaultValue) {
        return item;
      }
      if (flag === 'price') {
        return item.offer[flag] >= rangeToCostMap[value][0] && item.offer[flag] <= rangeToCostMap[value][1];
      }
      if (typeof item.offer[flag] === 'number') {
        value = parseInt(value, 10);
      }
      return item.offer[flag] === value;
    });
    return filteredArray;
  };

  var filtrateByFeatures = function (array) {
    var filteredArray = [];
    var checkedFeatures = filterFeature.querySelectorAll('input:checked');
    for (var i = 0; i < array.length; i++) {
      if (!checkedFeatures.length) {
        filteredArray.push(array[i]);
      } else {
        var checkedValues = [];
        checkedFeatures.forEach(function (item) {
          checkedValues.push(item.value);
        });
        var sameValues = array[i].offer.features.filter(function (item) {
          return checkedValues.includes(item);
        });
        if (sameValues.length >= checkedValues.length) {
          filteredArray.push(array[i]);
        }
      }
      if (filteredArray.length === MAX_PINS) {
        break; // т.к. фильтр по фичам будет последним в цепочке, то проверяем чтобы он не выполнялся больше 5 раз
      }
    }
    return filteredArray;
  };

  var filtrate = function () {
    return filtrateByFeatures(
        filtrateSelects(
            filtrateSelects(
                filtrateSelects(
                    filtrateSelects(window.map.cardObjects, 'type', filterType.value),
                    'price',
                    filterPrice.value
                ),
                'rooms',
                filterRoom.value
            ),
            'guests',
            filterGuest.value)
    );
  };

  var renderFiltratedPins = function () {
    window.render.showPins(filtrate());
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
