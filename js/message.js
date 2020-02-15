'use strict';

(function () {
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var linkTypeMessage = {
    'success': successMessage,
    'error': errorMessage
  };

  var showMessage = function (type, text) {
    var messageElement = linkTypeMessage[type].cloneNode(true);
    if (type === 'error') {
      messageElement.querySelector('p').innerText += text;
    }
    document.querySelector('main').appendChild(messageElement);

    var removeMessage = function () {
      messageElement.remove();
    };

    var messageClickHandler = function (evt) {
      if (evt.target !== messageElement.querySelector('p')) {
        removeMessage();
        document.removeEventListener('click', messageClickHandler);
        document.removeEventListener('keydown', documentEscPressHandler);
      }
    };

    var documentEscPressHandler = function (evt) {
      window.util.escEvent(evt, removeMessage);
      document.removeEventListener('keydown', documentEscPressHandler);
      document.removeEventListener('click', messageClickHandler);
    };

    messageElement.addEventListener('click', messageClickHandler);
    document.addEventListener('keydown', documentEscPressHandler);
  };

  window.message = {
    showMessage: showMessage
  };
})();
