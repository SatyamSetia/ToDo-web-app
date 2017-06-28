const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models.js').User;

passport.serializeUser(function(user,done){
	done(null,user.id)
});

passport.deserializeUser(function(userKey,done){
	User.findByPrimary(userKey).then((user)=>{
		done(null,user)
	}).catch((err)=>{
		done(err)
	})
});

passport.use(new LocalStrategy(function(username,password,done){
	User.findOne({
		where: {
			username: username,
			password: password
		}
	}).then((user)=>{
		if(!user){
			return done(null,false, {message: 'Incorrect username or password.'});
		}

		return done(null,user);
	}).catch((err)=>{
		done(err)
	})
}));

module.exports = passport;