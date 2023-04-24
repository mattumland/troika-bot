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

const d6 = () => {
  return Math.floor(Math.random() * 6) + 1
}

const twoD6 = () => {

}

const d66 = () => {
  const firstDigit = d6();
  const secondDigit = d6();
  return `${firstDigit}${secondDigit}`
}

module.exports = { stringToArray, arrayToString, shuffleArray, removeWhiteSpace, d66 }
