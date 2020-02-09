'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsArea = map.querySelector('.map__pins');
  var AreaLimit = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    MAX_X: mapPinsArea.offsetWidth
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
      var overArea = {
        minX: -Infinity,
        maxX: Infinity,
        minY: -Infinity,
        maxY: Infinity,
        isOverMinX: false,
        isOverMaxX: false,
        isOverMinY: false,
        isOverMaxY: false,
      };
      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY,
        };
        var left = parseInt(target.style.left, 10) - shift.x;
        var top = parseInt(target.style.top, 10) - shift.y;
        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        if (left < (AreaLimit.MIN_X - halfWidth)) {
          target.style.left = (AreaLimit.MIN_X - halfWidth) + 'px';
          if (!AreaLimit.isOverMinX) {
            overArea.minX = moveEvt.clientX;
            AreaLimit.isOverMinX = true;
          }
          startCoordinates.x = overArea.minX;
        } else if (left > (AreaLimit.MAX_X - width / 2)) {
          target.style.left = (AreaLimit.MAX_X - halfWidth) + 'px';
          if (!AreaLimit.isOverMaxX) {
            overArea.maxX = moveEvt.clientX;
            AreaLimit.isOverMaxX = true;
          }
          startCoordinates.x = overArea.maxX;
        } else {
          target.style.left = left + 'px';
          AreaLimit.isOverMinX = false;
          AreaLimit.isOverMaxX = false;
        }
        if (top < (AreaLimit.MIN_Y - height)) {
          target.style.top = (AreaLimit.MIN_Y - height) + 'px';
          if (!AreaLimit.isOverMinY) {
            overArea.minY = moveEvt.clientY;
            AreaLimit.isOverMinY = true;
          }
          startCoordinates.y = overArea.minY;
        } else if (top > (AreaLimit.MAX_Y - height)) {
          target.style.top = (AreaLimit.MAX_Y - height) + 'px';
          if (!AreaLimit.isOverMaxY) {
            overArea.maxY = moveEvt.clientY;
            AreaLimit.isOverMaxY = true;
          }
          startCoordinates.y = overArea.maxY;
        } else {
          target.style.top = top + 'px';
          AreaLimit.isOverMinY = false;
          AreaLimit.isOverMaxY = false;
        }
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
