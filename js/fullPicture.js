import { isEscapeKey, isEnterKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeModal = document.querySelector('.big-picture__cancel');
const imageNode = document.querySelector('.big-picture__img > img');
const likesNode = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const commentsParentNode = document.querySelector('.social__comments');

const commentsLoader = document.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function clearPreviousComments() {
  while(commentsParentNode.hasChildNodes()){
    commentsParentNode.firstChild.remove();
  }
}

function loadComments(comments) {
  clearPreviousComments();
  for (const comment in comments) {
    const commentNode = createComment(comments[comment]);
    commentsParentNode.appendChild(commentNode);
  }
}

function createComment (comment) {
  const commentNode = document.createElement('li');
  commentNode.classList.add('social__comment');

  const commentImgNode = document.createElement('img');
  commentImgNode.classList.add('social__picture');
  commentImgNode.src = comment.avatar;
  commentImgNode.alt = comment.name;
  commentImgNode.width = commentImgNode.height = '35';

  const commentTextNode = document.createElement('p');
  commentTextNode.classList.add('social__text');
  commentTextNode.textContent = comment.text;

  commentNode.appendChild(commentImgNode);
  commentNode.appendChild(commentTextNode);

  return commentNode;
}

function openUserModal (photoData) {
  bigPicture.classList.remove('hidden');

  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.body.classList.add('modal-open');

  imageNode.src = photoData.url;
  imageNode.alt = photoData.description;
  likesNode.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  loadComments(photoData.comments);

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

closeModal.addEventListener('click', () => {
  closeUserModal();
});

closeModal.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});

export {openUserModal};
