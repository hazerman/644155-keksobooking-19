'use strict';

(function () {
  var TIMEOUT_IN_MS = 30000;
  var RESPONSE_TYPE = 'json';
  var StatusCode = {
    OK: 200
  };
  var Url = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };
  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  var getCreatedRequest = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Статус: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Проверьте наличие доступа в интернет');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Превышен лимит ожидания от сервера');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  var downloadData = function (successHandler, errorHandler) {
    var xhr = getCreatedRequest(successHandler, errorHandler);
    xhr.open(Method.GET, Url.DOWNLOAD);
    xhr.send();
  };

  var sendData = function (data, successHandler, errorHandler) {
    var xhr = getCreatedRequest(successHandler, errorHandler);
    xhr.open(Method.POST, Url.UPLOAD);
    xhr.send(data);
  };

  window.ajax = {
    downloadData: downloadData,
    sendData: sendData
  };
})();
