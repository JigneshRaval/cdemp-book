// login.router.js
// LOGIN ROUTER
//===================================

// This is server side Router using Express.js
//===================================================

const router 		= require('express').Router(),
	  path 			= require('path'),
	  db			= require('../../config/db.config'),
      session		= require('express-session');

router.get('/', function (req, res) {
	console.log("Login GET / Route -------->", req.session);
	if (req.session && req.session.user) {
		res.redirect('/users');
	}
	else {
		res.redirect('/login');		
	}	
});

// TODO : Two things are not working 
// 1. After Login page is not redirecting to USERS page
// 2. User is not passing into authenticate function : FIXED by wrapping logic into DB query

router.post('/login', function(req, res){

	db.snippets.find({"name" : req.body.username}, function(err, doc){
		if (doc.length === 0 || !doc) {
			req.session.error = 'Authentication failed, please check your username and password. (use "tj" and "foobar")';
			res.render('login',{
				message: '<p class="alert alert-error">Authentication failed, please check your username and password.</p>'
			});
		} 
		else {
			if (req.body.password === doc[0].password) {
				// Regenerate session when signing in
				// to prevent fixation
				req.session.regenerate(function(){
					// Store the user's primary key
					// in the session store to be retrieved,
					// or in this case the entire user object
					req.session.user = doc[0].name;

					req.session.success = 'Authenticated as ' + req.session.user + ' click to <a href="/logout">logout</a>. '
					+ ' You may now access <a href="/restricted">/restricted</a>.';
					setTimeout(function(){
						res.redirect('/');
					}, 2000);
				});
			}
			else {
				res.render('login', { message: '<p class="alert alert-error">Invalid email or password.</p>' });
			}
		}
	});

});

// Login endpoint
router.get('/login', function (req, res) {
	console.log("GET Login -------->", req.session);
	if (req.session && req.session.user) {
		res.redirect('/users');
	}
	else {
		// Use response.render when you are using any Templating Engine like Jade, Express-Handlebar etc...
		res.render('login',{
			message: ''
		});

		// Use response.sendFile when you are only using pure HTML file instead of 
		// any Templating Engine listed above
		/*res.sendFile(path.join(__dirname, './login.html'), function(){
			console.log("Sending Login file..");
		});*/
	}	
});

// Register User endpoint : Redirect to Login page
router.post('/signup', function (req, res) {

	db.snippets.insert(req.body, function(err, newDoc){
		if(err) {
			//res.render('signup', {message: err});
			res.send({"message": err});
		} else {
			//res.render('signup', {message: 'Thank you for registering. Please <a href="/login">signin</a> to your account.'});
			res.send({"message" : 'Thank you for registering. Please <a href="/login">signin</a> to your account.'});
		}
	});

});

// Register User endpoint : Redirect to Login page
router.get('/signup', function (req, res) {
	res.render('signup');
});

// Logout endpoint : Redirect to Login page
router.get('/logout', function (req, res) {
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

module.exports = router;