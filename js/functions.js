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
