const express 	= require('express');
const app     	= express();
const SnippetsModel = require('./app/components/users/model');

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
    function authenticate(name, pass, fn) {
        if (!module.parent) console.log('authenticating %s:%s', name, pass);
        
        
        SnippetsModel.findUser(name, function(data){
            console.log("UUU :", data);
            if(data) {
                user = data.name;
            }            
        });
        console.log("UUU 2 :", user);

        // query the db for the given username
        if (!user) return fn(new Error('cannot find user'));

        fn(null, user);

        //fn(new Error('cannot find user'), user);
        // apply the same algorithm to the POSTed password, applying
        // the hash against the pass / salt, if there is a match we
        // found the user
        /*hash(pass, user.salt, function(err, hash){
            if (err) return fn(err);
            if (hash.toString() == user.hash) return fn(null, user);
            fn(new Error('invalid password'));
        })*/
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