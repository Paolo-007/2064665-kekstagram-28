// функция для проверки длины строки
const isCheckStringLength = (string, length) => string.length <= length;

isCheckStringLength ();


// функция для проверки, является ли строка палиндромом.
const isCheckStringPalindrome = (string) => {
  const tempString = string.toLowerCase().replaceAll(' ','');
  let reverseString = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }
  return tempString === reverseString;
};

isCheckStringPalindrome ();


// функция извлечения цифр из строки
const extractNumber = (string) => {
  let extract = '';
  for (let i = 0; i < string.length; i++) {
    if(!Number.isNaN(parseInt(string.at(i), 10))) {
      extract += string.at(i);
    }
  }
  return parseInt(extract, 10);
};

extractNumber ();

//функция дополнения строки указанными символами
const addStartString = (string, minLength, addition) => {
  const actualAddition = minLength - string.length;
  if (actualAddition <= 0) {
    return string;
  }
  return addition.slice(0, actualAddition % addition.length) + addition.repeat(actualAddition / addition.length) + string;
};

addStartString ();
