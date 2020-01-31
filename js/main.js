'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_MIN_X = 0;
  var CARD_AVATAR = 'img/avatars/user';
  var CARD_TITLES = [
    'Уютное гнездышко для молодоженов',
    'Маленькая квартирка рядом с парком',
    'Небольшая лавочка в парке',
    'Императорский дворец в центре Токио',
    'Милейший чердачок',
    'Наркоманский притон',
    'Чёткая хата',
    'Стандартная квартира в центре'
  ];
  var CARD_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var CARD_CHECKS = [
    '13:00',
    '14:00',
    '15:00'
  ];
  var CARD_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var CARD_DESCRIPTIONS = [
    'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
    'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
    'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
    'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
    'Маленькая квартирка на чердаке. Для самых не требовательных.',
    'У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.',
    'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
    'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.'
  ];
  var CARD_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var typeTranslated = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var map = document.querySelector('.map');
  var mapPinsArea = map.querySelector('.map__pins');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinMaxX = mapPinsArea.offsetWidth;

  var getRandomValue = function (min, max, values, needArrayAsResult) {
    var randomNumber = Math.floor(Math.random() * (max - min)) + min;
    // все ifы это что-то типо перегрузки функции
    // первый if отвечает на вопрос, нужно ли вернуть новый массив случайной длины из переданного массива
    // второй if возвращает просто случайное значение из переданного массива
    // а если оба ifа false, значит двух последних аргументов нет, и нужно вернуть случайное число из диапозона
    if (needArrayAsResult) {
      var newValues = [];
      for (var i = 0; i < values.length; i++) {
        // так как новый массив должен быть случайной длины, то рандом либо закидывает из исходного массива значение, либо нет
        var willBePushed = Math.round(Math.random()); // true or false random
        if (willBePushed) {
          newValues.push(values[i]);
        }
      }
      return newValues;
    }
    if (values !== undefined) {
      return values[randomNumber];
    }
    return randomNumber;
  };

  var generateArrayOfCards = function (count) {
    var array = [];
    for (var i = 0; i < count; i++) {
      var objectCardTemplate = {
        author: {
          avatar: CARD_AVATAR + 0 + (i + 1) + '.png'
        },
        offer: {
          title: getRandomValue(0, CARD_TITLES.length, CARD_TITLES),
          address: 0,
          price: getRandomValue(1000, 5000),
          type: getRandomValue(0, CARD_TYPES.length, CARD_TYPES),
          rooms: getRandomValue(1, 5),
          guests: getRandomValue(1, 8),
          checkin: getRandomValue(0, CARD_CHECKS.length, CARD_CHECKS),
          checkout: getRandomValue(0, CARD_CHECKS.length, CARD_CHECKS),
          features: getRandomValue(0, CARD_FEATURES.length, CARD_FEATURES, true),
          description: getRandomValue(0, CARD_DESCRIPTIONS.length, CARD_DESCRIPTIONS),
          photos: getRandomValue(0, CARD_PHOTOS.length, CARD_PHOTOS, true)
        },
        location: {
          x: getRandomValue(PIN_MIN_X, pinMaxX),
          y: getRandomValue(PIN_MIN_Y, PIN_MAX_Y)
        }
      };
      objectCardTemplate.offer.address = objectCardTemplate.location.x + ', ' + objectCardTemplate.location.y;
      array.push(objectCardTemplate);
    }
    return array;
  };

  var renderPin = function (card) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElement.style.left = (card.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (card.location.y - PIN_HEIGHT) + 'px';
    pinElementImg.src = card.author.avatar;
    pinElementImg.alt = card.offer.title;
    return pinElement;
  };

  var displayFeatures = function (list, items, features) {
    for (var i = 0; i < items.length; i++) {
      items[i].style.display = 'none';
    }
    for (var j = 0; j < features.length; j++) {
      var featureItemClassName = '.popup__feature--' + features[j];
      list.querySelector(featureItemClassName).style.display = 'inline-block';
    }
  };

  var displayPhotos = function (list, itemTemplate, photos) {
    var fragmentForPhotos = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var item = itemTemplate.cloneNode(true);
      item.src = photos[i];
      fragmentForPhotos.appendChild(item);
    }
    itemTemplate.remove();
    list.appendChild(fragmentForPhotos);
  };

  var renderCard = function (card) {
    var cardElement = mapCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeTranslated[card.offer.type];
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

  var cards = generateArrayOfCards(8);
  map.classList.remove('map--faded');
  var fragmentForPin = document.createDocumentFragment();
  for (var i = 0; i < cards.length; i++) {
    if ('offer' in cards[i]) {
      fragmentForPin.appendChild(renderPin(cards[i]));
    }
  }
  mapPinsArea.appendChild(fragmentForPin);
  var fragmentForCard = document.createDocumentFragment();
  fragmentForCard.appendChild(renderCard(cards[0]));
  mapFiltersContainer.before(fragmentForCard);
})();
