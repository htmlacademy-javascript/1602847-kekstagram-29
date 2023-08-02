import {generateUniqueID, generateImageData} from './data.js';
import { openUserModal } from './fullPicture.js';

const generateImageId = generateUniqueID({min: 0, max: 25});
const generateUrlId = generateUniqueID({min: 0, max: 25});

const photosData = [];
for(let i = 0; i < 25; i++){
  photosData.push(generateImageData(generateImageId(), generateUrlId()));
}
const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoListFragment = document.createDocumentFragment();

for (const photo in photosData) {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = `./photos/${photosData[photo].url}`;
  photoElement.querySelector('.picture__img').alt = photosData[photo].description;
  photoElement.querySelector('.picture__likes').textContent = photosData[photo].likes;
  photoElement.querySelector('.picture__comments').textContent = photosData[photo].comments.length;
  photoListFragment.appendChild(photoElement);
  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openUserModal(photosData[photo]);
  });
}

photoContainer.appendChild(photoListFragment);
