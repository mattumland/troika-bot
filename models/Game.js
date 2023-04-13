
const { Sequelize, Model } = require('sequelize');
const sequelize = require('../dbInit.js')

class Game extends Model {

}

Game.init( {
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			unique: true,
		},
		pcs: {
			type: Sequelize.STRING,
			defaultValue: ""
		},
		defaultStack: {
			type: Sequelize.STRING,
			defaultValue: ""
		},
		currentStack: {
			type: Sequelize.STRING,
			defaultValue: ""
		},
		currentTurn: {
			type: Sequelize.STRING,
			defaultValue: ""
		} 
	}, {
		sequelize,
		timestamps: false,
		modelName: "Game"
}); 

module.exports = Game;
