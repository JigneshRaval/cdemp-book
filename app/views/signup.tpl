<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8" />
	<title>Home</title>
	<link rel="stylesheet" href="app/assets/build/styles/styles.css" />
	<link rel="stylesheet" href="app/assets/css/main.css" />
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
</head>

<body>
	<div class="full-bg"></div>
	<!--# START : Login Form #-->
	<div class="c-register c-flex-container fh">
		<div class="c-user-form c-flex-container__item">
			<h1 class="tc c-user-form__title">Sign Up</h1>
			<form id="createUserForm" class="c-user-form__form" method="POST" action="/signup">
				<div class="c-laert c-flex-container__item alert alert-success" style="color: #FFF;">
					<p class="signup-alert"></p>
				</div>
				<div class="form-group">
					<label for="userId">User Name</label>
					<input type="text" name="userName" class="form-control" id="userName" placeholder="User ID or Email" required/>
				</div>
                <div class="form-group">
					<label for="userEmail">Email</label>
					<input type="email" name="userEmail" class="form-control" id="userEmail" placeholder="Email Address" required/>
				</div>
				<div class="form-group">
					<label for="userPhone">Contact Number</label>
					<input type="tel" name="userPhone" class="form-control" id="userPhone" placeholder="Contact Number" required/>
				</div>
				<div class="form-group">
					<label for="userPassword">Password</label>
					<input type="password" name="userPassword" class="form-control" id="userPassword" placeholder="Password" required/>
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-large btn-grd1 btn-full" id="submit">Register</button>
				</div>
			</form>
		</div>
		<div class="c-flex-container__item tu" style="color: #FFF;">
			<p>Already have an account? <a href="/login"  style="color: #FFF;">Signin</a></p>
		</div>
	</div>
	<!--# END : Login Form #-->
	
	<script src="app/assets/build/scripts/script.js"></script>
	<script src="app/components/login/login-controller.js"></script>

</body>

</html>