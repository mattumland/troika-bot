const stringToArray = (string) => {
  return string.split(',');
}

const arrayToString = (array) => {
  return array.toString();
}

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

module.exports = { stringToArray, arrayToString, shuffleArray }
