// server.js

// BASE SETUP
// ==============================================
const express 	= require('express');
const app     	= express();
const port    	= process.env.PORT || 3000;
const bodyParser = require('body-parser');
const session = require('express-session');
const AuthModule = require('./auth');

console.log("Directory Name in Server.js :", __dirname);

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}));

// this will help to load other included files in index.html
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
	console.log("GET / Route -------->", req.session);
	if (req.session && req.session.user) {
		res.redirect('/users');
	}
	else {
		res.redirect('/login');		
	}	
});

// Login endpoint
app.get('/login', function (req, res) {
	console.log("GET Login -------->", req.session);
	if (req.session && req.session.user) {
		res.redirect('/users');
	}
	else {
		res.sendFile(__dirname + '/app/components/login/login.html', function(){
			console.log("Sending Login file..");
		});
	}	
});

// TODO : Two things are not working 
// 1. After Login page is not redirecting to USERS page
// 2. User is not passing into authenticate function
app.post('/login', function(req, res){
	AuthModule.authenticate(req.body.username, req.body.password, function(err, user){
		if (user) {
			// Regenerate session when signing in
			// to prevent fixation
			req.session.regenerate(function(){
				// Store the user's primary key
				// in the session store to be retrieved,
				// or in this case the entire user object
				req.session.user = user;
				console.log("req.session.user", req.session.user);
				req.session.success = 'Authenticated as ' + user
				+ ' click to <a href="/logout">logout</a>. '
				+ ' You may now access <a href="/restricted">/restricted</a>.';
				// Sending Data From SERVER using Handlebars
				res.redirect('/users');
				//res.redirect('back');
			});
		} 
		else {
			req.session.error = 'Authentication failed, please check your '
			+ ' username and password.'
			+ ' (use "tj" and "foobar")';
			res.redirect('/login');
		}
	});
});

// Logout endpoint : Redirect to Login page
app.get('/logout', function (req, res) {
	// destroy the user's session to log them out
	// will be re-created next request
	console.log("GET Logout -------->", req.session)
	if(req.session && req.session.user) {
		delete req.session.user;
	}
	req.session.destroy(function(){
		console.log("logout success!");
		res.redirect('/');
	});
});

// GET Route for Page : http://localhost:3000/users
app.get('/users', AuthModule.restrict, function(req, res) {
    res.sendFile(__dirname + '/app/components/users/index.html', function(){
		console.log("Sending Users file..");
	});
});

// ROUTES
// ==============================================
app.set("view options", {layout: false});
app.use(express.static(__dirname));

// Import and Apply router for Users
app.use('/users', require('./app/components/users/router'));

// START THE SERVER
// ==============================================
app.listen(port, function() {
	console.log('Express server started on PORT :' + port);
});
