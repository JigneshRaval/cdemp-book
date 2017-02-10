// router.js
// USER ROUTER
//===================================

// This is server side Router using Express.js
//===================================================

const router 		= require('express').Router(),
	  path 			= require('path'),
	  UserModel		= require('./user.model'), 	// Load Database and Related Methods
	  Handlebars	= require('handlebars'),
	  fs			= require('fs');

// Applying middleware to all routes in the router
router.use(function (req, res, next) {
	if (req.session.user) {
		console.log(new Date(), req.method, req.url);
		next();
	} 
	else {
		req.session.error = 'Access denied!';
		res.redirect('/');
	}
})

// GET Route for Page : http://localhost:3000/users
//==============================================

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './users.html'), function(){
		console.log("Sending Users HTML file..");
	});
});

// GET ALL USER :: Send Response
//==============================================
//router.get('/all', UserModel.findAll); // Put this in user.router.js
// Put this in Controller or Model.js
/*
exports.findAll = function(req, res){
  res.send([{
    "id": 1,
    "name": "Max",
    "band": "Maximum Pain",
    "instrument": "guitar"
  }]);
};*/

router.get('/all', function(req, res) {
	UserModel.getAll(req.query.searchTerm, function(users){
		res.send(users);
	});
});

// GET SINGLE USER :: Send Response as HTML
//==============================================

router.get('/:id', function(req, res){
	UserModel.getSingleUser(req.params.id, function(data){
		
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
	UserModel.createUser(req.body, function(user){
		res.send(user);
	});
});

// REMOVE USER :: Send Response
//==============================================

router.get('/removeUser/:id', function(req, res){
	UserModel.removeUser(req.params.id, function(snippet){
		res.send("User with id "+req.params.id+" has been removed successfully");
	});
});

module.exports = router;
