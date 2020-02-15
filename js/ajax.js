'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 30000;

  var loadCardObjects = function (successHandler) {
    var method = 'GET';
    var url = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      }
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send();
  };

  var sendForm = function (data, successHandler, errorHandler) {
    var method = 'POST';
    var url = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler();
      } else {
        errorHandler('. Статус: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('. Проверьте наличие доступа в интернет');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('. Превышен лимит ожидания от сервера');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send(data);
  };

  window.ajax = {
    loadCardObjects: loadCardObjects,
    sendForm: sendForm
  };
})();
