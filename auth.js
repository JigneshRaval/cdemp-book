const express 	= require('express');
const app     	= express();
const SnippetsModel = require('./app/components/users/model');
const db = require('./app/config/db.config');

let user;

// Session-persisted message middleware
/*app.use(function(req, res, next){
	var err = req.session.error
    , msg = req.session.success;
	delete req.session.error;
	delete req.session.success;
	res.locals.message = '';
	if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
	if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
	next();
});
*/

var AuthModule = (function(){

    // Authenticate using our plain-object database of doom!
    function authenticate(name, pass, callback) {
        if (!module.parent) console.log('authenticating %s:%s', name, pass);
       /*
        SnippetsModel.findUser(name, function(data){
            if(data) {
                user = data.name;
            }            
        });
        */
        db.snippets.find({"name" : name}, function(err, doc){
            user = doc[0].name;
			callback(null, user);
		});

        // query the db for the given username
        if (!user) return callback(new Error('cannot find user'));
    };

    function restrict(req, res, next) {
        if (req.session.user) {
            console.log(new Date(), req.method, req.url);
            next();
        } 
        else {
            req.session.error = 'Access denied!';
            res.redirect('/');
        }
    };

    return {
        authenticate    : authenticate,
        restrict        : restrict
    }

})();

module.exports = AuthModule;