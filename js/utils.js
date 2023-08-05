function getRandomInteger (range) {
  let result;
  if(range) {
    const lower = Math.ceil(Math.min(Math.abs(range.min), Math.abs(range.max)));
    const upper = Math.floor(Math.max(Math.abs(range.min), Math.abs(range.max)));
    result = Math.random() * (upper - lower + 1) + lower;
  } else {
    result = Math.random() * 1000;
  }

  return Math.floor(result);
}

function checkLength(inputString, statementLength) {
  return inputString.length <= statementLength;
}

function checkPalindrome(inputString){
  if (typeof inputString === 'number') {
    inputString += '';
  }
  const clearString = inputString.toLowerCase().replaceAll(' ', '');
  const firstPointer = 0;
  const lastPointer = clearString.length;

  for (let pointer = firstPointer; pointer < lastPointer / 2; pointer++) {
    if (clearString[pointer] !== clearString[lastPointer - 1 - pointer]) {
      return false;
    }
  }
  return true;
}
const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

function showError(errText) {
  const errFragment = document.createDocumentFragment();
  const errTemplate = document.querySelector('#error').content.querySelector('.error');
  const errNode = errTemplate.cloneNode(true);
  const errTextNode = errNode.querySelector('.error__title');
  errTextNode.textContent = errText;
  errFragment.appendChild(errNode);
  document.body.appendChild(errNode);
}

export {getRandomInteger, checkLength, checkPalindrome, isEscapeKey, isEnterKey, showError};
