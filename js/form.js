'use strict';

(function () {
  var INVALID_BOX_SHADOW = '0 0 0 5px red';
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
  var TimeAction = {
    IN: 'in',
    OUT: 'out'
  };

  var setLinkBetweenTypeAndPrice = function () {
    adFormPriceInput.setAttribute('min', typeToMinPriceMap[adFormTypeSelect.value]);
    adFormPriceInput.setAttribute('placeholder', typeToMinPriceMap[adFormTypeSelect.value]);
  };

  var setLinkBetweenTime = function (action) {
    if (action === TimeAction.IN) {
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
    field.style.boxShadow = INVALID_BOX_SHADOW;
  };

  var resetInvalidField = function (field) {
    field.removeAttribute('style');
  };

  var setAddress = function (isPinActive) {
    adFormAddressInput.value = window.map.getAddressFromMainPin(isPinActive);
  };

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.enableFormElements(adFormFieldsets);
    setAddress(true);
    window.photo.enableUserPicAdjunction();
    window.photo.enableHousingPicAdjunction();
  };

  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');
    window.util.disableFormElements(adFormFieldsets);
    window.photo.disableUserPicAdjunction();
    window.photo.disableHousingPicAdjunction();
  };

  var makePrimarySettings = function () {
    window.util.disableFormElements(adFormFieldsets);
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
    setLinkBetweenTime(TimeAction.IN);
  });

  adFormTimeOutSelect.addEventListener('input', function () {
    setLinkBetweenTime(TimeAction.OUT);
  });

  adFormRoomNumberSelect.addEventListener('input', function () {
    setLinkBetweenRoomsAndGuests();
  });

  var resetFormCustom = function () {
    adForm.reset();
    setAddress(false);
    setLinkBetweenRoomsAndGuests();
    setLinkBetweenTypeAndPrice();
  };

  var adFormSuccessSubmitHandler = function () {
    window.message.show('success');
    resetFormCustom();
  };

  var adFormErrorSubmitHandler = function (message) {
    window.message.show('error', message, false);
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
    window.ajax.sendData(new FormData(adForm), adFormSuccessSubmitHandler, adFormErrorSubmitHandler);
  });

  adForm.addEventListener('reset', function () {
    deactivateForm();
    window.map.deactivate();
    validationFields.forEach(function (item) {
      if (item.hasAttribute('style')) {
        resetInvalidField(item);
      }
    });
  });

  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  adFormResetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetFormCustom();
  });

  makePrimarySettings();

  window.form = {
    activate: activateForm,
    setAddress: setAddress
  };
})();
