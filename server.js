const express = require('express');
const bp = require('body-parser');
const app = express();
const passport = require('./auth/passport.js');
const cp = require('cookie-parser');
const expressSession = require('express-session');

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));

app.use(cp('my super secret'));
app.use(expressSession({
	secret: 'my super secret',
	resave: false,
	uninitalized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//var apiRoute = require('./route/api');
var indexRoute = require('./routes/index');
//app.use('/api',apiRoute);
app.use('/',indexRoute);
app.use('/',express.static(__dirname+"/public_static"));


app.listen(1234,function(){
	console.log('Listening to http://localhost:1234')
});