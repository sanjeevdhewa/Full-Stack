//general strategy to handle passport authentication
const passport = require('passport');
//specific strategy (it is google OAUTH-20)
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		//database information after authentication and save it to as new user
		(accessToken,refreshToken,profile,done) => {
			User.findOne({googleId: profile.id})
			.then((existingUser) => {
					if(existingUser) {
						done(null, existingUser);
							//we already have a record with the given profile id
					} else {
						//we don't have record so make a new id
						//create user
						new User({ googleId: profile.id })
							.save()
							.then(user => done(null, user));
			//console.info("Program Started");
					}
				});
			
		}
	)
); //new GoogleStrategy creates new instance of google passport strategy
//google internally contain an identifier called 'google' thats why we use passport.authenticate('google') to it internally called google to handle the request
//google contains multiple scopes so we only need 2 scopes profile and email for authentication
