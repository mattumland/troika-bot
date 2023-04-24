const { stringToArray, arrayToString, shuffleArray, d66 } = require('./gameHelpers.js');
const oopsValues = require('./data/oops.json');
const randomSpellValues = require('./data/randomSpell.json');

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

  createStack(enemyCount, henchCount = 0) {
    const stack = stringToArray('End of Turn')
    
    const pcStack = stringToArray(this.pcs);
    pcStack.forEach(pc => stack.unshift(pc))

    const enemyStack = Array(enemyCount).fill('Enemy')
    const henchStack = Array(henchCount).fill('Henchman')
    const assembledStack = shuffleArray([...stack, ...pcStack, ...enemyStack, ...henchStack]);
    if (assembledStack[0] === 'End of Turn') {
      const endOfTurn = assembledStack.shift();
      const randomPosition = this.getRandomPosition(assembledStack.length)
      assembledStack.splice(randomPosition, 0, endOfTurn);
    }
    this.defaultStack = arrayToString(assembledStack);
    this.currentStack = arrayToString(assembledStack);
    this.currentTurn = ''; 
  }
  
  displayPcs() {
    return this.pcs.replaceAll(',', ', ');
  }

  displayDefaultStack() {
    return this.defaultStack.replaceAll(',', ', ');
  }

  displayCurrentStack() {
    return this.currentStack.replaceAll(',', ', ');
  }

  drawToken() {
    const newStack = stringToArray(this.currentStack);
    this.currentTurn = newStack.shift();
    this.currentStack = arrayToString(shuffleArray(newStack));
  }

  reset() {
    this.pcs = '';
    this.defaultStack = '';
    this.currentStack = '';
    this.currentTurn = '';
  }

  delay() {
    // put current turn value into current stack
  }

  oops() {
    return oopsValues[d66()];
  }

  randomSpell() {
    return randomSpellValues[d66()];
  }

  attack(type, modifier) {
    // type gets passed by the slash command then fed into here to find the correct table
    // modifier can be positive or negative (for shields)
    // mighty blow on double sixes
  }
}

module.exports = Game;
