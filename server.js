// server.js

// BASE SETUP
// ==============================================

const express		= require('express');
const app			= express();
const port			= process.env.PORT || 3000;
const bodyParser	= require('body-parser');
const session		= require('express-session');
const fs			= require('fs');

// This will help to load other included files in index.html
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}));

// TEMPLATE ENGINE
// ==============================================

app.engine('tpl', function (filePath, options, callback) { // define the template engine
	fs.readFile(filePath, function (err, content) {
		if (err) return callback(err)
		// this is an extremely simple template engine
		var rendered = content
					.toString()
					.replace('#body#', options.body)
					.replace('#data#', options.data)
					.replace('#error#', options.error)
					.replace('#message#', options.message)
		return callback(null, rendered)
	})
});

app.set('views', ['./app/layout', './app/views', './app/components/login']) // specify the views directory
app.set('view engine', 'tpl') // register the template engine
app.set("view options", {layout: false});
app.use(express.static(__dirname));

// ROUTES
// ==============================================

// Import [login.router.js] and Apply router for Authentication
app.use('/', require('./app/components/login/login.router'));

// Import [user.router.js] and Apply router for Users
app.use('/users', require('./app/components/users/user.router'));

// Handle 404 Error
app.use(function(req, res) {
	res.status(400);
	res.render('404', {body: '404: File Not Found', data: "Plese Go Back to Home page."});
});

// Handle 500 Error
app.use(function(error, req, res, next) {
	res.status(500);
	res.render('500', {body :'500: Internal Server Error', data: error});
});

// START THE SERVER
// ==============================================

app.listen(port, function() {
	console.log('Express server started on PORT :' + port);
});
