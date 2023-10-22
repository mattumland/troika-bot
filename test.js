const test = require('ava');
const Game = require('./game.js');
const { stringToArray, arrayToString, removeWhiteSpace } = require('./gameHelpers.js')

// Game class tests

test('adds pcs to a game', t => {
  const game = new Game()
  const pcNames = 'Ringo,Stevie,Blue';
  game.pcs = pcNames;
  t.assert(game.pcs === pcNames);
});

test('constructs games with pc names when provided', t => {
  const pcNames = 'Ringo,Stevie,Blue';
  const game = new Game(pcNames);
  t.assert(game.pcs === pcNames);
});

// Game method unit tests

test('builds a default stack when given a number of enemies', t => {
  const pcNames = 'Ringo,Stevie,Blue';
  const pcTokenCount = 2;
  const totalPcTokenCount = (stringToArray(pcNames).length) * pcTokenCount;
  const enemyCount = 3;

  const game = new Game(pcNames);
  const startingStackLength = stringToArray(game.defaultStack).length;
  game.createStack(enemyCount);
  const enemyTokenCount = stringToArray(game.defaultStack).filter((token => token === 'Enemy'));
  const ringoTokenCount = stringToArray(game.defaultStack).filter((token => token === 'Ringo'));

  t.assert(stringToArray(game.defaultStack).length === totalPcTokenCount + enemyCount + startingStackLength); 
  t.assert(stringToArray(game.currentStack).length === totalPcTokenCount + enemyCount + startingStackLength); 
  t.assert(enemyTokenCount.length === enemyCount);
  t.assert(ringoTokenCount.length === pcTokenCount);
  t.assert(game.defaultStack[0] != 'End of the Round');
});

test('builds a default stack when given a number of henchman', t => {
  const pcNames = 'Ringo,Stevie,Blue';
  const pcTokenCount = 2;
  const totalPcTokenCount = (stringToArray(pcNames).length) * pcTokenCount;
  const enemyCount = 3;
  const henchCount = 1;

  const game = new Game(pcNames);
  const startingStackLength = stringToArray(game.defaultStack).length;
  game.createStack(enemyCount, henchCount);
  const enemyTokenCount = stringToArray(game.defaultStack).filter((token => token === 'Enemy'));
  const ringoTokenCount = stringToArray(game.defaultStack).filter((token => token === 'Ringo'));
  const henchTokenCount = stringToArray(game.defaultStack).filter((token => token === 'Henchman'));

  t.assert(stringToArray(game.defaultStack).length === totalPcTokenCount + enemyCount + startingStackLength + henchCount); 
  t.assert(stringToArray(game.currentStack).length === totalPcTokenCount + enemyCount + startingStackLength + henchCount); 
  t.assert(enemyTokenCount.length === enemyCount);
  t.assert(henchTokenCount.length === henchCount);
  t.assert(ringoTokenCount.length === pcTokenCount);
  t.assert(game.defaultStack[0] != 'End of the Round');
});

test('removes a token from the stack, places it current turn', t => {
  const game = new Game('Rad,Marth,Squimp');
  game.createStack(5);
  game.drawToken();
  t.truthy(game.currentTurn);
  t.assert(stringToArray(game.currentStack).length === 11);
});

test('displays a formatted list of PCs', t => {
  const game = new Game('Rad,Marth,Squimp');
  t.assert(game.displayPcs() === 'Rad, Marth, Squimp');
})

test('returns a random oops value', t => {
  const game = new Game('Rad,Marth,Squimp');
  t.truthy(game.oops());
})

test('returns a random spell', t => {
  const game = new Game('Rad,Marth,Squimp');
  t.truthy(game.randomSpell());
})

test('returns a number in the correct range when rolling at damage', t => {
  const game = new Game('Rad,Marth,Squimp');
  const damage = game.damage("small-beast");
  t.truthy(damage < 6 && damage > 1);
})

test('accepts modifiers when rolling at damage', t => {
  const game = new Game('Rad,Marth,Squimp');
  const damage = game.damage("pistolet", -1);
  t.truthy(damage < 12 && damage > 1);
})

// gameHelper unit tests

test('converts comma separated string into an array', t => {
  const nameList = 'Billy, Bill, Billerson';
  const nameArray = stringToArray(nameList);
  t.assert(nameArray.length === 3)
});

test('converts array into comma separated string', t => {
  const nameArray = ['Billy', 'Bill', 'Billerson'];
  const nameList = arrayToString(nameArray);
  t.assert(nameList.length === 20)
});

test('removes white space from user pc name string', t => {
  const pcNames = 'Ringo,  Stevie,  Blue ';
  t.falsy(removeWhiteSpace(pcNames).includes(' '))
})

test.only('returns axe damage', t => {
  const game = new Game();
  const type = "axe"
  let result = game.damage(type, 0)
  console.log("result", result)
  t.assert(result > 0)

  result = game.damage(type, 2)
  console.log('result with modifier', result)
  t.assert(result > 5)
})
