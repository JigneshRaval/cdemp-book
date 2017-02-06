// server.js

// BASE SETUP
// ==============================================
const express 	= require('express');
const app     	= express();
const port    	= process.env.PORT || 3000;
const bodyParser = require('body-parser');

// ROUTES
// ==============================================

// this will help to load other included files in index.html
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.set("view options", {layout: false});
app.use(express.static(__dirname));

console.log("Directory Name in Server.js :", __dirname);

// Redirect Page to http://localhost:3000/users
app.get('/', function(req, res) {
    res.redirect('/users');
});

// On page load serve index.html file
app.get('/users', function(req, res) {
    res.sendFile(__dirname + '/app/components/users/index.html', function(){
		console.log("Sending file..");
	});
});

// Import router for Snippets
app.use('/users', require('./app/components/users/router'));

// START THE SERVER
// ==============================================
app.listen(port, function() {
	console.log('Express server started on PORT :' + port);
});
