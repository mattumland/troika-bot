const Game = require('./dbObjects.js');

const createGame = async (id) => {
  return await Game.create({id: id})
}

const deleteGame = async (id) => {
  await Game.destroy({ where: { id: id } })
}

module.exports = { createGame, deleteGame }
