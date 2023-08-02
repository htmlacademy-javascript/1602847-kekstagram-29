import { isEscapeKey, isEnterKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeModal = document.querySelector('.big-picture__cancel');
const imageNode = document.querySelector('.big-picture__img > img');
const likesNode = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.social__comment-count');
const commentsParentNode = document.querySelector('.social__comments');

const commentsLoader = document.querySelector('.comments-loader');
let commentsInModalQty = 0;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function clearPreviousComments() {
  commentsInModalQty = 0;
  while(commentsParentNode.hasChildNodes()){
    commentsParentNode.firstChild.remove();
  }
}

function loadComments(comments, lastQty) {
  commentsInModalQty = lastQty + 5;
  if(comments.length <= commentsInModalQty) {
    commentsLoader.classList.add('hidden');
    commentsInModalQty = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  commentsCount.classList.remove('hidden');
  commentsCount.textContent = `${commentsInModalQty} из ${comments.length} комментариев`;

  const commentsInModal = comments.slice(lastQty, commentsInModalQty);


  for (const comment in commentsInModal) {
    const commentNode = createComment(commentsInModal[comment]);
    commentsParentNode.appendChild(commentNode);
  }

  return commentsInModalQty;
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

  document.body.classList.add('modal-open');

  imageNode.src = photoData.url;
  imageNode.alt = photoData.description;
  likesNode.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  clearPreviousComments();

  let lastCommsQty = loadComments(photoData.comments, 0);

  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', (evt) => {
    evt.preventDefault();
    lastCommsQty = loadComments(photoData.comments, lastCommsQty);
  });
}

function closeUserModal () {
  bigPicture.classList.add('hidden');

  commentsLoader.removeEventListener('click', () => {});
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
