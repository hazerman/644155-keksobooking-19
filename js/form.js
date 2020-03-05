'use strict';

(function () {
  var typeToMinPriceMap = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  var roomsToGuestsMap = {
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
    adFormPriceInput
  ];

  var disableFormElements = function (collection) {
    collection.forEach(function (item) {
      item.disabled = true;
    });
  };

  var enableFormElements = function (collection) {
    collection.forEach(function (item) {
      item.disabled = false;
    });
  };

  var disableMapForm = function () {
    disableFormElements(mapFormInputs);
    disableFormElements(mapFormSelects);
    window.filter.disableFilterListener();
  };

  var enableMapForm = function () {
    enableFormElements(mapFormInputs);
    enableFormElements(mapFormSelects);
    window.filter.enableFilterListener();
  };

  var setLinkBetweenTypeAndPrice = function () {
    adFormPriceInput.setAttribute('min', typeToMinPriceMap[adFormTypeSelect.value]);
    adFormPriceInput.setAttribute('placeholder', typeToMinPriceMap[adFormTypeSelect.value]);
  };

  var setLinkBetweenTime = function (action) {
    if (action === 'in') {
      adFormTimeOutSelect.value = adFormTimeInSelect.value;
    } else {
      adFormTimeInSelect.value = adFormTimeOutSelect.value;
    }
  };

  var setLinkBetweenRoomsAndGuests = function () {
    var guestsOptions = adFormCapacitySelect.querySelectorAll('option');
    guestsOptions.forEach(function (item) {
      item.disabled = true;
    });
    var guestsValues = Array.from(guestsOptions).map(function (item) {
      return item.value;
    });
    var roomNumber = adFormRoomNumberSelect.value;
    var isSelectedIndexValid = false;
    var validIndex;
    roomsToGuestsMap[roomNumber].forEach(function (item) {
      validIndex = guestsValues.indexOf(item.toString());
      guestsOptions[validIndex].disabled = false;
      if (adFormCapacitySelect.selectedIndex === validIndex) {
        isSelectedIndexValid = true;
      }
    });
    if (!isSelectedIndexValid) {
      adFormCapacitySelect.selectedIndex = validIndex;
    }
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
    enableFormElements(adFormFieldsets);
    setAddress(true);
    window.photo.enableUserPicAdjunction();
    window.photo.enableHousingPicAdjunction();
  };

  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');
    disableMapForm();
    disableFormElements(adFormFieldsets);
    window.photo.disableUserPicAdjunction();
    window.photo.disableHousingPicAdjunction();
  };

  var makePrimarySettings = function () {
    disableMapForm();
    disableFormElements(adFormFieldsets);
    setAddress(false);
    adFormAddressInput.setAttribute('readonly', '');
    setLinkBetweenTypeAndPrice();
    setLinkBetweenRoomsAndGuests();
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

  adFormRoomNumberSelect.addEventListener('input', function () {
    setLinkBetweenRoomsAndGuests();
  });

  var adFormSuccessSubmitHandler = function () {
    window.message.showMessage('success');
    adForm.reset();
    setAddress(false);
    setLinkBetweenRoomsAndGuests();
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
    mapForm.reset();
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
    setLinkBetweenRoomsAndGuests();
  });

  window.form = {
    activateForm: activateForm,
    enableMapForm: enableMapForm,
    makeFormPrimarySettings: makePrimarySettings,
    setAddress: setAddress
  };
})();
