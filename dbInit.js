const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'root', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false, //set logging to false before deploying, this is for production only
	storage: 'database.sqlite',
});

module.exports = sequelize;
