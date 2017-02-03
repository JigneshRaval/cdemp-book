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

	function getAll(callback) {
		db.snippets.find({}).sort({ dateCreated: -1 }).exec(function(err, docs){
			if(callback && typeof callback === 'function'){
				callback({"snippets" : docs});
			}
		});
	};

	function addSnippet(data, callback) {
		db.snippets.insert(data, function(err, newDoc){
			if(err) {
				callback({"error": err});
			} else {
				callback({"snippet" : newDoc});
			}
		});
	};

	function getSingleSnippet(id, callback) {
		db.snippets.find({_id : id}, function(err, doc){
			callback({"snippet" : doc})
		});
	};

	function deleteSnippet(id, callback) {
		db.snippets.remove({ _id: id }, {}, function (err, numRemoved) {
  			callback(numRemoved);
		});
	};

	return {
		getAll : getAll,
		addSnippet : addSnippet,
		getSingleSnippet: getSingleSnippet,
		deleteSnippet: deleteSnippet
	}
})();

module.exports = SnippetsModel;
