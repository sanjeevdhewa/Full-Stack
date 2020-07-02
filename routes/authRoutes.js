const passport = require('passport');

//google internally contain an identifier called 'google' thats why we use passport.authenticate('google') to it internally called google to handle the request
//google contains multiple scopes so we only need 2 scopes profile and email for authentication
module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', { 
			scope: ['profile', 'email'] 
		})
	);
//2nd route handler when the google callback the url to the server.So, it is simply a callback url to handel requests
app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/api/logout',(req,res) => {
	req.logout();
	res.send(req.user);
});

app.get('/api/current_user', (req, res) => {
	res.send(req.user);
});
};