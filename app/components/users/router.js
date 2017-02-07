// router.js
//===================================

// This is server side Router using Express.js
//===================================================

const router = require('express').Router(),
	path = require('path'),
	SnippetsModel = require('./model'), 	// Load Database and Related Methods
	Handlebars = require('handlebars'),
	fs = require('fs');

// route middleware that will happen on every request
/*
router.use(function(req, res, next){
	console.log("users router.js --> ", req.method, req.url);
	next();
});
*/

// Applying middleware to all routes in the router
router.use(function (req, res, next) {
	console.log("Inner Router.js ---> :", req.session, req.session.user);

	if (req.session.user) {
		next();
	} 
	else {
		req.session.error = 'Access denied!';
		res.redirect('/');
	}
})

// ALL USER :: Send Response
//==============================================
router.get('/all', function(req, res) {
	SnippetsModel.getAll(req.query.searchTerm, function(snippets){
		res.send(snippets);
	});
});

// SINGLE USER :: Send Response
//==============================================
router.get('/:id', function(req, res){
	SnippetsModel.getSingleUser(req.params.id, function(data){
		
		// Sending Data From SERVER using Handlebars
		fs.readFile(path.join(__dirname, '/single-user.hbs'), 'utf-8', function(error, source){
			var template = Handlebars.compile(source); 	// Get HTML by reading .hbs file
			var html = template(data); 					// Merge HTML with DATA
			res.send(html); 							// Send Merged HTML files to client
		});

	});
});

// CREATE USER :: Send Response
//==============================================
router.post('/createUser', function(req, res){
	SnippetsModel.createUser(req.body, function(snippet){
		res.send(snippet);
	});
});

// REMOVE USER :: Send Response
//==============================================
router.delete('/removeUser/:id', function(req, res){
	SnippetsModel.removeUser(req.params.id, function(snippet){
		res.send("User with id "+req.params.id+" has been removed successfully");
	});
});

module.exports = router;
