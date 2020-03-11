'use strict';

(function () {
  var typeToTranslateMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var displayFeatures = function (list, featureTemplates, features) {
    featureTemplates.forEach(function (template) {
      template.style.display = 'none';
    });
    features.forEach(function (feature) {
      var featureItemClassName = '.popup__feature--' + feature;
      list.querySelector(featureItemClassName).style.display = 'inline-block';
    });
  };

  var displayPhotos = function (list, itemTemplate, photos) {
    var fragmentForPhotos = document.createDocumentFragment();
    photos.forEach(function (photoSrc) {
      var image = itemTemplate.cloneNode(true);
      image.src = photoSrc;
      fragmentForPhotos.appendChild(image);
    });
    itemTemplate.remove();
    list.appendChild(fragmentForPhotos);
  };

  var renderCard = function (card) {
    var cardElement = mapCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeToTranslateMap[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    var featureList = cardElement.querySelector('.popup__features');
    var featureItems = featureList.querySelectorAll('.popup__feature');
    if (card.offer.features.length) {
      displayFeatures(featureList, featureItems, card.offer.features);
    } else {
      featureList.style.display = 'none';
    }
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    var photoList = cardElement.querySelector('.popup__photos');
    var photoItemTemplate = photoList.querySelector('.popup__photo');
    if (card.offer.photos.length) {
      displayPhotos(photoList, photoItemTemplate, card.offer.photos);
    } else {
      photoList.style.display = 'none';
    }
    return cardElement;
  };

  window.card = {
    render: renderCard,
  };
})();
