'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsArea = map.querySelector('.map__pins');
  var AreaLimit = {
    X: {
      MIN: 0,
      MAX: mapPinsArea.offsetWidth
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var activate = function (element, width, height, callback) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var halfWidth = Math.round(width / 2);
      var target = evt.target.closest('button');
      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };
      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY,
        };
        var newStyleLeft = parseInt(target.style.left, 10) - shift.x;
        var newStyleTop = parseInt(target.style.top, 10) - shift.y;
        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var getPositionStyle = function (axis, newStylePosition, side) {
          var position;
          if (newStylePosition < (AreaLimit[axis].MIN - side)) {
            position = (AreaLimit[axis].MIN - side) + 'px';
            document.removeEventListener('mousemove', mouseMoveHandler);
          } else if (newStylePosition > (AreaLimit[axis].MAX - side)) {
            position = (AreaLimit[axis].MAX - side) + 'px';
            document.removeEventListener('mousemove', mouseMoveHandler);
          } else {
            position = newStylePosition + 'px';
          }
          return position;
        };

        target.style.left = getPositionStyle('X', newStyleLeft, halfWidth);
        target.style.top = getPositionStyle('Y', newStyleTop, height);
        callback();
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  };

  window.dragNDrop = {
    activate: activate,
  };
})();
