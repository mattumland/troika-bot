const test = require('ava');
// const Game = require('./dbObjects.js');

const {createGame, deleteGame} = require('./gameHelpers.js')

test('adds pcs to a game', async t => {
  const testGame = createGame('testid');
  const pcNames = 'Ringo, Stevie, Blue';
  testGame.pcs = pcNames;
  await testGame.save();
  t.assert(await testGame.pcs === pcNames);
});
