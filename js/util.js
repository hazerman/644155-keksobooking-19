'use strict';

(function () {
  var KEY_ENTER = 13;
  var KEY_ESC = 27;

  var elementEnterPressHadler = function (evt, callback) {
    if (evt.keyCode === KEY_ENTER) {
      callback();
    }
  };

  var elementEscPressHadler = function (evt, callback) {
    if (evt.keyCode === KEY_ESC) {
      callback();
    }
  };

  window.util = {
    enterEvent: elementEnterPressHadler,
    escEvent: elementEscPressHadler
  };
})();
