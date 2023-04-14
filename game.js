const { stringToArray, arrayToString, shuffleArray } = require('./gameHelpers.js')

class Game {
  constructor(pcs = '') {
    this.pcs = pcs
    this.defaultStack = ['End of Turn']
    this.currentStack = ['End of Turn']
    this.currentTurn = ''
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
    // the slash command needs to check if the pc list is empty and prompt an input before calling this command
    const stack = this.defaultStack;
    
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
  }
  
}

module.exports = Game;
