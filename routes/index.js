const route = require('express').Router();
const User = require('../db/models.js').User;
const createUser = require('../db/models.js').createUser;
const passport = require('../auth/passport.js');
const eli = require('../auth/utils.js').eli;
const getTodos = require('../db/models.js').getTodos;
const addTodo = require('../db/models.js').addTodo;

route.post('/signup',(req,res)=>{
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	}).then((user)=>{
		createUser(user.username);
		res.redirect('login.html')
	})
});

route.post('/login',passport.authenticate('local',{
	successRedirect: '/profile',
	failureRedirect: '/login.html'
}));

route.get('/profile',eli('/login.html'),(req,res)=>{
	var name = "" + (req.user.username);
	console.log(name)
	//getTodos(name);
	res.send(getTodos(name));
	//res.send(req.user);
});

route.get('/addTodo',(req,res)=>{
	var name = "" + (req.user.username);
	var todo = "task1";
	// addTodo(name,todo);
	res.send(addTodo(name,todo));
});

route.get('/logout', (req, res) => {
    req.user = null;
    req.logout();
    req.session.destroy(function () {
        res.redirect('/login.html')
    })
});

module.exports = route;
