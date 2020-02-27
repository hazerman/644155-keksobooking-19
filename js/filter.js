'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapForm = map.querySelector('.map__filters');
  var filterType = mapForm.querySelector('#housing-type');
  var filterPrice = mapForm.querySelector('#housing-price');
  var filterRoom = mapForm.querySelector('#housing-rooms');
  var filterGuest = mapForm.querySelector('#housing-guests');
  var filterFeatures = mapForm.querySelectorAll('.map__checkbox');
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

  var filtrateByType = function (array, value) {
    var filteredArray = [];
    for (var i = 0; i < array.length; i++) {
      if (value === 'any') {
        filteredArray.push(array[i]);
      } else if (array[i].offer.type === value) {
        filteredArray.push(array[i]);
      }
    }
    return filteredArray;
  };

  var filtrateByPrice = function (array, value) {
    var filteredArray = [];
    for (var i = 0; i < array.length; i++) {
      if (value === 'any') {
        filteredArray.push(array[i]);
      } else if (array[i].offer.price >= rangeToCostMap[value][0] && array[i].offer.price <= rangeToCostMap[value][1]) {
        filteredArray.push(array[i]);
      }
    }
    return filteredArray;
  };

  var filtrateByRooms = function (array, value) {
    var filteredArray = [];
    for (var i = 0; i < array.length; i++) {
      if (value === 'any') {
        filteredArray.push(array[i]);
      } else if (array[i].offer.rooms === +value) {
        filteredArray.push(array[i]);
      }
    }
    return filteredArray;
  };

  var filtrateByGuests = function (array, value) {
    var filteredArray = [];
    for (var i = 0; i < array.length; i++) {
      if (value === 'any') {
        filteredArray.push(array[i]);
      } else if (array[i].offer.guests === +value) {
        filteredArray.push(array[i]);
      }
    }
    return filteredArray;
  };

  var filtrateByFeatures = function (array) {
    var filteredArray = [];
    var checkedFeatures = Array.from(filterFeatures).filter(function (item) {
      return item.checked;
    });
    for (var i = 0; i < array.length; i++) {
      if (!checkedFeatures.length) {
        filteredArray.push(array[i]);
      } else {
        var countFeatures = 0;
        for (var j = 0; j < checkedFeatures.length; j++) {
          var objectFeatures = array[i].offer.features;
          for (var k = 0; k < objectFeatures.length; k++) {
            if (objectFeatures[k] === checkedFeatures[j].value) {
              countFeatures++;
              break;
            }
          }
        }
        if (countFeatures === checkedFeatures.length) {
          filteredArray.push(array[i]);
        }
      }
    }
    return filteredArray;
  };

  var filtrate = function () {
    return filtrateByType(
        filtrateByPrice(
            filtrateByRooms(
                filtrateByGuests(
                    filtrateByFeatures(window.map.cardObjects),
                    filterGuest.value
                ),
                filterRoom.value
            ),
            filterPrice.value
        ),
        filterType.value
    );
  };

  mapForm.addEventListener('change', function () {
    window.render.showPins(filtrate());
  });
})();
