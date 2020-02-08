'use strict';

(function () {
  var move = function (element, callback) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var target = evt.target.closest('button');
      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };
      var overArea = {
        minX: -Infinity,
        maxX: Infinity,
        minY: -Infinity,
        maxY: Infinity
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

        if (moveEvt.clientX < overArea.minX || moveEvt.clientX > overArea.maxX || moveEvt.clientY < overArea.minY || moveEvt.clientY > overArea.maxY) {
          if (moveEvt.clientX < overArea.minX) {
            target.style.left = (-(element.offsetWidth / 2)) + 'px';
            target.style.top = top + 'px';
            startCoordinates.x = overArea.minX;
            startCoordinates.y = moveEvt.clientY;
          } else if (moveEvt.clientX > overArea.maxX) {
            target.style.left = (1200 - element.offsetWidth / 2) + 'px';
            target.style.top = top + 'px';
            startCoordinates.x = overArea.maxX;
            startCoordinates.y = moveEvt.clientY;
          }
          if (moveEvt.clientY < overArea.minY) {
            target.style.left = left + 'px';
            target.style.top = (130 - element.offsetWidth - 16) + 'px';
            startCoordinates.x = moveEvt.clientX;
            startCoordinates.y = overArea.minY;
          } else if (moveEvt.clientY > overArea.maxY) {
            target.style.left = left + 'px';
            target.style.top = (630 - element.offsetWidth - 16) + 'px';
            startCoordinates.x = moveEvt.clientX;
            startCoordinates.y = overArea.maxY;
          }
        } else {
          if (left < -(element.offsetWidth / 2)) {
            target.style.left = (-(element.offsetWidth / 2)) + 'px';
            overArea.minX = moveEvt.clientX;
          } else if (left > 1200 - element.offsetWidth / 2) {
            target.style.left = (1200 - element.offsetWidth / 2) + 'px';
            overArea.maxX = moveEvt.clientX;
          } else {
            target.style.left = left + 'px';
          }

          if (top < 130 - element.offsetWidth - 16) {
            target.style.top = (130 - element.offsetWidth - 16) + 'px';
            overArea.minY = moveEvt.clientY;
          } else if (top > 630 - element.offsetWidth - 16) {
            target.style.top = (630 - element.offsetWidth - 16) + 'px';
            overArea.maxY = moveEvt.clientY;
          } else {
            target.style.top = top + 'px';
          }
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
    move: move,
  };
})();
