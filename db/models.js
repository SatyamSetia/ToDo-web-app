const Sequelize = require('sequelize');

const db = new Sequelize({
	username: 'todoadmin',
    password: 'todopass',
    database: 'todoproject',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const User = db.define('user',{
	id: { 
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING
});

db.sync({});

function createUser(username){
	const userTable = db.define(username,{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		todo: Sequelize.STRING,
		status: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		}
	},{
		timestamps: false
	});

	db.sync({});
}

function getTodos(username){
	db.query('SELECT * FROM '+username+'s').then((users)=>{
		return users;
	});
}

function addTodo(username,task){
	db.query('INSERT INTO '+username+'s (todo) VALUES ("'+task+'")').then((todos)=>{
		return todos;
	});
}

module.exports = {
	User,createUser,getTodos,addTodo
}