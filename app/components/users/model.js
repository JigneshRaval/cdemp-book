const Datastore = require('nedb'),
db = {};

db.snippets = new Datastore({ filename: './data/snippets.json' });


// Load Snippets database
db.snippets.loadDatabase(function (err) {    // Callback is optional
	if(err) {
		console.log("Snippets database error :", err);
	} else {
		console.log("Snippets database loaded successfuly.");
	}
});

db.snippets.ensureIndex({ fieldName: 'name' }, function (err) {
  // If there was an error, err is not null
  if(err) {
	  console.log("Database indexing error :", err);
  }
});

const SnippetsModel = (function(){
	
	// GET ALL USER
	function getAll(searchTerm, callback) {
		if(searchTerm) {
			var searchTermRegex = new RegExp(searchTerm, 'i');

			db.snippets.find({name : searchTermRegex}).sort({ dateCreated: -1 }).exec(function(err, docs){
				if(callback && typeof callback === 'function'){
					callback({"users" : docs});
				}
			});
		}
		else {
			db.snippets.find({}).sort({ dateCreated: -1 }).exec(function(err, docs){
				if(callback && typeof callback === 'function'){
					callback({"users" : docs});
				}
			});
		}
		
	};

	// GET SINGLE USER
	function getSingleUser(id, callback) {
		db.snippets.find({_id : id}, function(err, doc){
			callback(doc[0]) 	// This sends data as an array which is not required for Single record so used [0]
		});
	};

	// CREATE NEW USER
	function createUser(data, callback) {
		db.snippets.insert(data, function(err, newDoc){
			if(err) {
				callback({"error": err});
			} else {
				callback({"user" : newDoc});
			}
		});
	};	

	// REMOVE USER
	function removeUser(id, callback) {
		db.snippets.remove({ _id: id }, {}, function (err, numRemoved) {
  			callback(numRemoved);
		});
	};

	// Return all Public Methods
	return {
		getAll : getAll,
		createUser : createUser,
		getSingleUser: getSingleUser,
		removeUser: removeUser
	}
})();

module.exports = SnippetsModel;
