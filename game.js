const { stringToArray, arrayToString, shuffleArray } = require('./gameHelpers.js')

class Game {
  constructor(pcs = '') {
    this.pcs = pcs
    this.defaultStack = ['End of Turn']
    this.currentStack = ['End of Turn']
    this.currentTurn = ''
  }

  createStack(enemyCount) {
    // the slash command needs to check if the pc list is empty and prompt an input before calling this command
    const newStack = this.defaultStack;
    
    const pcStack = stringToArray(this.pcs);
    pcStack.forEach(pc => newStack.unshift(pc))

    const enemyStack = Array(enemyCount).fill('Enemy')
    this.defaultStack = arrayToString(shuffleArray([...newStack, ...pcStack, ...enemyStack]))
  }
  
}

module.exports = Game;
