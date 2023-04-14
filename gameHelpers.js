const stringToArray = (string) => {
  return string.split(',');
}

const arrayToString = (array) => {
  return array.toString();
}

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

const removeWhiteSpace = (string) => {
  const array = stringToArray(string);
  const trimmedArray = array.map(string => string.trim());
  return arrayToString(trimmedArray);
}

module.exports = { stringToArray, arrayToString, shuffleArray, removeWhiteSpace }
