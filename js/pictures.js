import { openUserModal } from './fullPicture.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoListFragment = document.createDocumentFragment();

function clearPhotos() {
  const pictureNodes = photoContainer.querySelectorAll('.picture');
  for (const node in pictureNodes) {
    if(pictureNodes[node].hasChildNodes) {
      pictureNodes[node].remove();
    }
  }
}

const bindFilters = (photosData) => {
  const filtersNode = document.querySelector('.img-filters');
  filtersNode.classList.remove('img-filters--inactive');

  filtersNode.addEventListener('click', (evt) => {
    filtersNode.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    let newPhotoArr;
    switch(evt.target.id) {
      case 'filter-default':
        clearPhotos();
        evt.target.classList.add('img-filters__button--active');
        loadPhotos(photosData);
        break;
      case 'filter-random':
        clearPhotos();
        evt.target.classList.add('img-filters__button--active');
        newPhotoArr = [...photosData].sort(() => Math.random() - 0.5);
        loadPhotos(newPhotoArr);
        break;
      case 'filter-discussed':
        clearPhotos();
        evt.target.classList.add('img-filters__button--active');
        newPhotoArr = [...photosData].sort((a, b) => b.comments.length - a.comments.length);
        loadPhotos(newPhotoArr);
        break;
    }
  });
};

function loadPhotos(photosData) {
  for (const photo in photosData) {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photosData[photo].url;
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
}
export {loadPhotos, bindFilters};
