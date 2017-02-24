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
router.post('/createUser', UserModel.createUser);

// REMOVE USER :: Send Response as JSON
//==============================================
router.get('/removeUser/:id', UserModel.removeUser);

// UPLOAD USER IMAGE :: 
//==============================================
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './app/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ dest: './app/uploads/' }).array('upload_avatar', 2);

router.post('/upload', function(req, res){
	console.log(req.body, req.file); //form files
    upload(req,res,function(err) {
		
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });    
});

module.exports = router;
