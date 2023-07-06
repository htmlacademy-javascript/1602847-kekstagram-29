import {getRandomInteger} from './utils.js';

function generateUniqueID (range) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(range);
    if (range && previousValues.length >= (range.max - range.min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(range);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function generateImageData (id, urlId) {
  function generateComments() {
    const comments = [];
    const generateId = generateUniqueID();
    const text = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
    const names = ['Олег', 'Егор', 'Артём'];
    for (let i = 0; i < getRandomInteger({min:0, max:30}); i++){
      comments.push(
        {
          id: generateId(),
          avatar: `img/avatar-${getRandomInteger({min:1, max:6})}`,
          text: text[getRandomInteger({min:0, max: text.length - 1})],
          name: names[getRandomInteger({min:0, max: names.length - 1})]
        }
      );
    }
    return comments;
  }

  return {
    id: id,
    url: `photos/${urlId}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non lobortis elit. In sodales laoreet velit eu rutrum.',
    likes: Math.floor(Math.random() * (200 - 15) + 15),
    comments:  generateComments()
  };
}

export {generateUniqueID, generateImageData};
