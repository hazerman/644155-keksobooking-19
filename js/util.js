'use strict';

(function () {
  var KEY_ENTER = 13;
  var KEY_ESC = 27;
  var DEBOUNCE_INTERVAL = 500;

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

  var enableFormElements = function (collection) {
    collection.forEach(function (item) {
      item.disabled = false;
    });
  };

  var disableFormElements = function (collection) {
    collection.forEach(function (item) {
      item.disabled = true;
    });
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    enterEvent: elementEnterPressHadler,
    escEvent: elementEscPressHadler,
    debounce: debounce,
    enableFormElements: enableFormElements,
    disableFormElements: disableFormElements
  };
})();
