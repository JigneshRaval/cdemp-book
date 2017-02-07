var LoginModule = (function($) {
	// PRIVATE METHODS
	//=======================================
	function _bindTemplate(templateID, data, containerID) {
		var source = $(templateID).html();
		var template = Handlebars.compile(source);
		var html = template(data);
		$(containerID).html(html);
	};

	// Create New User
	function loginUser() {
		// process the form to save data into database
		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)
		var formData = {
			'username': $('input[name=userId]').val(),
			'password': $('input[name=userPassword]').val()
		};

		// process the form
		$.ajax({
			type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url: '/login', // the url where we want to POST
			data: formData, // our data object
			dataType: 'json', // what type of data do we expect back from the server
			encode: true
		})
		// using the done promise callback
		.done(function(data) {
			console.log("DATA :", data)
			_bindTemplate("#entry-template", data.user, '#sample-data');
		});
	};


	return {
		loginUser : loginUser
	}

})(jQuery);

$(document).ready(function() {
	$('#addSnippetform').submit(function(event) {
		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
		LoginModule.loginUser();
	});
});