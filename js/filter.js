'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapForm = map.querySelector('.map__filters');
  var filterType = mapForm.querySelector('#housing-type');

  var filteringType = function (value) {
    var newArray = window.map.cardObjects.filter(function (item) {
      if (value !== 'any') {
        return item.offer.type === value;
      } else {
        return item;
      }
    });
    return newArray;
  };

  filterType.addEventListener('input', function () {
    window.render.showPins(filteringType(filterType.value));
  });
})();
