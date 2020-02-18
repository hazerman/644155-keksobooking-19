'use strict';

(function () {
  var typeMinPrice = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  var linkRoomsGuests = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };
  var map = document.querySelector('.map');
  var mapForm = map.querySelector('.map__filters');
  var mapFormInputs = mapForm.querySelectorAll('.map__filters-container input');
  var mapFormSelects = mapForm.querySelectorAll('.map__filters-container select');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form fieldset');
  var adFormTitleInput = adForm.querySelector('#title');
  var adFormAddressInput = adForm.querySelector('#address');
  var adFormTypeSelect = adForm.querySelector('#type');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormTimeInSelect = adForm.querySelector('#timein');
  var adFormTimeOutSelect = adForm.querySelector('#timeout');
  var adFormRoomNumberSelect = adForm.querySelector('#room_number');
  var adFormCapacitySelect = adForm.querySelector('#capacity');
  var validationFields = [
    adFormTitleInput,
    adFormPriceInput,
    adFormCapacitySelect
  ];

  var disableFormElements = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].setAttribute('disabled', '');
    }
  };

  var enableFormElements = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].removeAttribute('disabled');
    }
  };

  var setLinkBetweenTypeAndPrice = function () {
    adFormPriceInput.setAttribute('min', typeMinPrice[adFormTypeSelect.value]);
    adFormPriceInput.setAttribute('placeholder', typeMinPrice[adFormTypeSelect.value]);
  };

  var setLinkBetweenTime = function (action) {
    if (action === 'in') {
      adFormTimeOutSelect.value = adFormTimeInSelect.value;
    } else {
      adFormTimeInSelect.value = adFormTimeOutSelect.value;
    }
  };

  var getValidityMessageForCapacity = function (capacity) {
    var message = '';
    var roomNumber = adFormRoomNumberSelect.value;
    for (var i = 0; i < linkRoomsGuests[roomNumber].length; i++) {
      if (parseInt(capacity.value, 10) === linkRoomsGuests[roomNumber][i]) {
        return message;
      }
    }
    if (parseInt(roomNumber, 10) === 100) {
      message = 'Для такого количества комнат нужно выбрать вариант НЕ ДЛЯ ГОСТЕЙ';
      return message;
    }
    message =
      'Для такого количества комнат вы можете выбрать не больше '
      + linkRoomsGuests[roomNumber][linkRoomsGuests[roomNumber].length - 1]
      + ' гостей, а также нельзя выбирать вариант НЕ ДЛЯ ГОСТЕЙ';
    return message;
  };

  var showInvalidField = function (field) {
    field.style.boxShadow = '0 0 0 5px red';
  };

  var resetInvalidField = function (field) {
    field.removeAttribute('style');
  };

  var setAddress = function (isPinActive) {
    adFormAddressInput.value = window.map.getAddressFromMainPin(isPinActive);
  };

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    enableFormElements(mapFormInputs);
    enableFormElements(mapFormSelects);
    enableFormElements(adFormFieldsets);
    adFormAddressInput.setAttribute('readonly', '');
    adFormCapacitySelect.setCustomValidity(getValidityMessageForCapacity(adFormCapacitySelect));
    setAddress(true);
  };

  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');
    disableFormElements(mapFormInputs);
    disableFormElements(mapFormSelects);
    disableFormElements(adFormFieldsets);
  };

  var makePrimarySettings = function () {
    disableFormElements(mapFormInputs);
    disableFormElements(mapFormSelects);
    disableFormElements(adFormFieldsets);
    setAddress(false);
    setLinkBetweenTypeAndPrice();
  };

  adFormTitleInput.addEventListener('invalid', function (evt) {
    showInvalidField(evt.target);
  });

  adFormPriceInput.addEventListener('invalid', function (evt) {
    showInvalidField(evt.target);
  });

  adFormTypeSelect.addEventListener('input', function () {
    setLinkBetweenTypeAndPrice();
  });

  adFormTimeInSelect.addEventListener('input', function () {
    setLinkBetweenTime('in');
  });

  adFormTimeOutSelect.addEventListener('input', function () {
    setLinkBetweenTime('out');
  });

  adFormCapacitySelect.addEventListener('input', function () {
    adFormCapacitySelect.setCustomValidity(getValidityMessageForCapacity(adFormCapacitySelect));
  });

  adFormCapacitySelect.addEventListener('invalid', function (evt) {
    showInvalidField(evt.target);
  });

  adFormRoomNumberSelect.addEventListener('input', function () {
    adFormCapacitySelect.setCustomValidity(getValidityMessageForCapacity(adFormCapacitySelect));
  });

  var adFormSuccessSubmitHandler = function () {
    window.message.showMessage('success');
    adForm.reset();
    setAddress(false);
  };

  var adFormErrorSubmitHandler = function (message) {
    window.message.showMessage('error', message);
  };

  adForm.addEventListener('change', function (evt) {
    if (evt.target.validity.valid) {
      resetInvalidField(evt.target);
    } else {
      showInvalidField(evt.target);
    }
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.ajax.sendForm(new FormData(adForm), adFormSuccessSubmitHandler, adFormErrorSubmitHandler);
  });

  adForm.addEventListener('reset', function () {
    deactivateForm();
    window.map.deactivateMap();
    window.main.deactivatePage();
    validationFields.forEach(function (item) {
      if (item.hasAttribute('style')) {
        resetInvalidField(item);
      }
    });
  });

  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  adFormResetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    setAddress(false);
  });

  window.form = {
    activateForm: activateForm,
    makeFormPrimarySettings: makePrimarySettings,
    setAddress: setAddress
  };
})();
