'use strict';

(function () {

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
  var map = document.querySelector('.map');
  var mapPinsArea = map.querySelector('.map__pins');
  var AreaLimit = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    MAX_X: mapPinsArea.offsetWidth
  };

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

  var generateArrayOfCards = function (amount) {
    var array = [];
    for (var i = 0; i < amount; i++) {
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
          x: getRandomValue(AreaLimit.MIN_X, AreaLimit.MAX_X),
          y: getRandomValue(AreaLimit.MIN_Y, AreaLimit.MAX_Y)
        }
      };
      objectCardTemplate.offer.address = objectCardTemplate.location.x + ', ' + objectCardTemplate.location.y;
      array.push(objectCardTemplate);
    }
    return array;
  };

  window.data = {
    generateArrayOfCards: generateArrayOfCards,
    AreaLimit: AreaLimit,
  };
})();
