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

document.getElementsByClassName('check-length-result')[0].innerHTML = checkLength('проверяемая строка', 20);
document.getElementsByClassName('check-length-result')[1].innerHTML = checkLength('проверяемая строка', 18);
document.getElementsByClassName('check-length-result')[2].innerHTML = checkLength('проверяемая строка', 10);

document.getElementsByClassName('check-palindrome-result')[0].innerHTML = checkPalindrome('топот');
document.getElementsByClassName('check-palindrome-result')[1].innerHTML = checkPalindrome('ДовОд');
document.getElementsByClassName('check-palindrome-result')[2].innerHTML = checkPalindrome('Кекс');
document.getElementsByClassName('check-palindrome-result')[3].innerHTML = checkPalindrome('Лёша на полке клопа нашёл ');
document.getElementsByClassName('check-palindrome-result')[4].innerHTML = checkPalindrome(2023);