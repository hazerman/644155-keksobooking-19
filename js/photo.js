'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var userPicAreaUpload = document.querySelector('.ad-form-header__upload');
  var userPicPreview = userPicAreaUpload.querySelector('img');
  var userPicDefaultUrl = 'img/muffin-grey.svg';
  var userPicInput = userPicAreaUpload.querySelector('input[type=file]');

  var userPicChangeHandler = function () {
    var file = userPicInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();

      var readerLoadHandler = function () {
        userPicPreview.src = reader.result;
        reader.removeEventListener('load', readerLoadHandler);
      };

      reader.addEventListener('load', readerLoadHandler);
      reader.readAsDataURL(file);
    }
  };

  var housingPicAreaUpload = document.querySelector('.ad-form__photo-container');
  var housingPicPreview = housingPicAreaUpload.querySelector('.ad-form__photo');
  var housingPicInput = housingPicAreaUpload.querySelector('input[type=file]');

  var housingPicChangeHandler = function () {
    housingPicPreview.innerHTML = '';
    var file = housingPicInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
    if (matches) {
      var reader = new FileReader();

      var readerLoadHandler = function () {
        var image = document.createElement('img');
        image.style.width = '100%';
        image.style.height = '100%';
        image.src = reader.result;
        housingPicPreview.appendChild(image);
        reader.removeEventListener('load', readerLoadHandler);
      };

      reader.addEventListener('load', readerLoadHandler);
      reader.readAsDataURL(file);
    }
  };

  var enableUserPicAdjunction = function () {
    userPicInput.addEventListener('change', userPicChangeHandler);
  };

  var disableUserPicAdjunction = function () {
    userPicInput.removeEventListener('change', userPicChangeHandler);
    userPicPreview.src = userPicDefaultUrl;
  };

  var enableHousingPicAdjunction = function () {
    housingPicInput.addEventListener('change', housingPicChangeHandler);
  };

  var disableHousingPicAdjunction = function () {
    housingPicInput.removeEventListener('change', housingPicChangeHandler);
    housingPicPreview.innerHTML = '';
  };

  window.photo = {
    enableUserPicAdjunction: enableUserPicAdjunction,
    disableUserPicAdjunction: disableUserPicAdjunction,
    enableHousingPicAdjunction: enableHousingPicAdjunction,
    disableHousingPicAdjunction: disableHousingPicAdjunction
  };
})();
