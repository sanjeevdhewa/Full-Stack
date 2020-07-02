/*import express library in the backend we use thid kind of syntax instead of import call*/
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');   

mongoose.connect(keys.mongoURI);

/*in the front end side(REACT) we use import syntax. import uses e2015 module nodejs does not support es2015 module but it do now*/
/*import express from 'express'; */

/*JavaScript const variables must be assigned a value when they are declared:*/

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);

// above shows how to handle incoming http authRoutes