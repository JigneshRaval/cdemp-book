// router.js
// USER ROUTER
//===================================

// This is server side Router using Express.js
//===================================================

const router 		= require('express').Router(),
	  UserModel		= require('./user.model'), 	// Load Database and Related Methods
	  multer		= require('multer');

// Applying middleware to all routes in the router
//===================================================

router.use(function (req, res, next) {
	console.log(new Date(), req.method, req.url);

	if (req.session.user) {
		next();
	} 
	else {
		req.session.error = 'Access denied!';
		res.redirect('/');
	}
})

// GET Route for Page : http://localhost:3000/users
//==============================================
router.get('/', UserModel.renderUsersListingPage);

// GET ALL USER :: Send Response as JSON
//==============================================
router.get('/all', UserModel.getAll);

// GET SINGLE USER BY ID:: Send Response as HTML
//==============================================
router.get('/:id', UserModel.getSingleUser);

// CREATE USER :: Send Response as JSON
//==============================================
router.post('/updateProfile/:id', UserModel.updateProfile);

// REMOVE USER :: Send Response as JSON
//==============================================
router.get('/removeUser/:id', UserModel.removeUser);

// UPLOAD USER IMAGE :: 
//==============================================

module.exports = router;
