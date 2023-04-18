const { stringToArray, arrayToString, shuffleArray } = require('./gameHelpers.js')

class Game {
  constructor(pcs = '', defaultStack) {
    this.pcs = pcs;
    this.defaultStack = defaultStack || '';
    this.currentStack = '';
    this.currentTurn = '';
  }

  getRandomPosition(max) {
    const position = Math.floor(Math.random() * max);
    if (position === 0) {
      return 1
    } else {
      return position 
    }
  }

  createStack(enemyCount) {
    const stack = stringToArray('End of Turn')
    
    const pcStack = stringToArray(this.pcs);
    pcStack.forEach(pc => stack.unshift(pc))

    const enemyStack = Array(enemyCount).fill('Enemy')
    const assembledStack = shuffleArray([...stack, ...pcStack, ...enemyStack]);
    if (assembledStack[0] === 'End of Turn') {
      const endOfTurn = assembledStack.shift();
      const randomPosition = this.getRandomPosition(assembledStack.length)
      assembledStack.splice(randomPosition, 0, endOfTurn);
    }
    this.defaultStack = arrayToString(assembledStack);
    this.currentStack = arrayToString(assembledStack);
    this.currentTurn = ''; 
  }
  
  drawToken() {
    const newStack = shuffleArray(stringToArray(this.currentStack));
    this.currentTurn = newStack.shift();
    this.currentStack = arrayToString(newStack);
  }

  reset() {
    this.pcs = '';
    this.defaultStack = '';
    this.currentStack = '';
    this.currentTurn = '';
  }
}

module.exports = Game;
