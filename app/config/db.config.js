const Datastore = require('nedb'),
db = {};

db.snippets = new Datastore({ filename: './data/snippets.json' });

// Load Snippets database
db.snippets.loadDatabase(function (err) {
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

module.exports = db;