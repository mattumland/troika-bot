const { stringToArray, arrayToString, shuffleArray, d66, d6, twoD6 } = require('./gameHelpers.js');
const oopsValues = require('./data/oops.json');
const randomSpellValues = require('./data/randomSpell.json');
const damageValues = require('./data/damage.json');

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
    const stack = stringToArray('End of the Round')
    
    const pcStack = stringToArray(this.pcs);
    pcStack.forEach(pc => stack.unshift(pc))

    const enemyStack = Array(enemyCount).fill('Enemy')
    const henchStack = Array(henchCount).fill('Henchman')
    const assembledStack = shuffleArray([...stack, ...pcStack, ...enemyStack, ...henchStack]);
    if (assembledStack[0] === 'End of the Round') {
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
    const currentTurn = this.currentTurn;
    const randomPosition = this.getRandomPosition(this.currentStack.length)
    const newCurrentStack = stringToArray(this.currentStack)
    newCurrentStack.splice(randomPosition, 0, currentTurn);
    this.currentStack = arrayToString(newCurrentStack);
    this.currentTurn = '';
  }

  oops() {
    return oopsValues[d66()];
  }

  randomSpell() {
    return randomSpellValues[d66()];
  }

  attack(modifier = 0) {
    const roll = twoD6();
    let result
    if (roll === 12) {
      result = "Mighty Blow!"
    } else {
      result = roll + modifier
    }
    return {
      total: result,
      roll: roll,
      modifier: modifier
    }
  }

  damage(type, modifier = 0) {
    const roll = d6() + modifier;

    if (roll < 1) {
      return damageValues[type]["1"]
    } else if (roll > 6) {
      return damageValues[type]["7+"]
    } else {
      return damageValues[type][roll]
    }
  }
}

module.exports = Game;
