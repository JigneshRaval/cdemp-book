// model.js

// USER DATA MODEL
// All the Database Operations will be handled by this file
//============================================================

const db 			= require('../../config/db.config'); // Load Database File
const path			= require('path');
const fs			= require('fs');
const Handlebars	= require('handlebars');


// EXPORT USERMODEL OBJECT
//=========================================

const UserModel = (function(){
	
	// RENDER USER LISTING PAGE AFTER LOGIN
	var renderUsersListingPage = function(req, res){
		res.sendFile(path.join(__dirname, './users.html'), function(){
			console.log("Sending Users HTML file..");
		});
	};

	// GET ALL USER FROM DB
	var getAll = function(req, res) {
		if(req.body.searchTerm) {
			var searchTermRegex = new RegExp(searchTerm, 'i');
			db.snippets.find({name : searchTermRegex}).sort({ dateCreated: -1 }).exec(function(err, docs){				
				res.send({"users" : docs});
			});
		}
		else {
			db.snippets.find({}).sort({ dateCreated: -1 }).exec(function(err, docs){				
				res.send({"users" : docs});				
			});
		}		
	};

	// GET SINGLE USER FROM DB
	var getSingleUser = function(req, res) {
		db.snippets.find({_id : req.params.id}, function(err, doc){
			// Sending Data From SERVER using Handlebars
			fs.readFile(path.join(__dirname, '/single-user.hbs'), 'utf-8', function(error, source){
				var template = Handlebars.compile(source); 	// Get HTML by reading .hbs file
				var html = template(doc[0]); 					// Merge HTML with DATA
				res.send(html); 							// Send Merged HTML files to client
			});
		});
	};

	// CREATE NEW USER [ INSERT NEW USER RECORD TO DB]
	var createUser = function(req, res) {
		db.snippets.insert(req.body, function(err, newDoc){
			if(err) {
				res.send({"error": err});
			} else {
				res.send({"user" : newDoc});
			}
		});
	};

	// REMOVE USER FROM DB
	var removeUser = function(req, res) {
		db.snippets.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
  			res.send("User with id "+req.params.id+" has been removed successfully");
		});
	};

	function findUser(username, callback) {
		db.snippets.find({"name" : username}, function(err, doc){
			callback(doc[0]) 	// This sends data as an array which is not required for Single record so used [0]
		});
	};

	// Return all Public Methods
	return {
		renderUsersListingPage: renderUsersListingPage,
		getAll			: getAll,
		createUser		: createUser,
		getSingleUser	: getSingleUser,
		removeUser		: removeUser,
		findUser		: findUser
	}
	
})();

module.exports = UserModel;
