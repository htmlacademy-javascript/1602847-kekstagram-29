function checkLength(inputString, statementLength) {
    return inputString.length <= statementLength;
}

function checkPalindrome(inputString){
    if (typeof inputString === 'number') {
        inputString += ''
    }
    let clearString = inputString.toLowerCase().replaceAll(" ", "");
    let firstPointer = 0;
    let lastPointer = clearString.length;

    for (let pointer = firstPointer; pointer < lastPointer/2; pointer++) {
        if (clearString[pointer] !== clearString[lastPointer-1-pointer]) {
            return false;
        }
    }
    return true
}
