var UsersModule = (function($) {
	// PRIVATE METHODS
	//=======================================
	function _bindTemplate(templateID, data, containerID) {
		var source = $(templateID).html();
		var template = Handlebars.compile(source);
		var html = template(data);
		$(containerID).html(html);
	};
	
	// PUBLIC METHODS
	//=======================================
	// Get all the users from database on page load
	function findUser() {
		console.log(this, this.value);

		$.ajax({
			type: 'GET', 		// define the type of HTTP verb we want to use (POST for our form)
			url: '/users/all?searchTerm='+this.value+'&searchBy=contactNo', // the url where we want to POST
			dataType: 'json', 	// what type of data do we expect back from the server
			encode: true
		})
		// using the done promise callback
		.done(function(data) {
			_bindTemplate("#entry-template", data, '#sample-data');
		});
	};
	
	/**
	 * Get all the users from database on page load
	 */
	function getAllUsers() {
		// url (required), options (optional)
		/*
		fetch('/snippets/all') // Call the fetch function passing the url of the API as a parameter
		.then(function(resp) {
			return resp.json()
		}) // Transform the data into json
		.then(function(data) {
			console.log(JSON.parse(data));
			// Your code for handling the data you get from the API
			//_bindTemplate("#entry-template", data, '#sample-data');
		})
		.catch(function(errors) {
			// This is where you run code if the server returns any errors
			console.log(errors);
		});
		*/

		$.ajax({
			type: 'GET', 		// define the type of HTTP verb we want to use (POST for our form)
			url: '/users/all', 	// the url where we want to POST
			dataType: 'json', 	// what type of data do we expect back from the server
			encode: true
		})
		// using the done promise callback
		.done(function(data) {
			_bindTemplate("#entry-template", data, '#sample-data');
		});
	};

	// REMOVE USER
	function removeUser(id) {
		$.ajax({
			type: 'GET',
			url: '/users/removeUser/'+id,
			dataType: 'json',
			encode: true
		})
		// using the done promise callback
		.done(function(data) {
			console.log("User Deleted with ID :", id, data);
			getAllUsers();
		});
	};
	


	// REMOVE USER
	function uploadImage() {
		console.log('processForm');
		var $f1 = $('[name="upload_avatar"]');
		var formData = new FormData();

		if($f1.val()) formData.append('file1', $f1.get(0).files[0]);


		var request = new XMLHttpRequest();
		request.open('POST', '/users/upload');
		request.send(formData);
		
		request.onload = function(e) {
			console.log('Request Status', request.status);
		};
		/*$.ajax({
			type: 'POST',
			url: '/users/upload',
			data : $('[name="upload_avatar"]').val(),
			encode: true
		})
		// using the done promise callback
		.done(function(data) {
			console.log("User Deleted with ID :", id, data);
		});*/
	};

	return {
		getAllUsers : getAllUsers,
		removeUser: removeUser,
		findUser: findUser,
		uploadImage: uploadImage
	}
	
})(jQuery);


$(document).ready(function() {
	UsersModule.getAllUsers();
	
	$('#sample-data').on('click', '.delete-user', function(){
		var id= $(this).data('user-id');
		UsersModule.removeUser(id);
		UsersModule.getAllUsers();
	});

	$('#formUploadAvatar').submit(function(event) {
		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
		UsersModule.uploadImage();
		this.reset();
	});

});

var searchField = document.querySelector('#searchUser');
searchField.addEventListener('keyup', UsersModule.findUser);