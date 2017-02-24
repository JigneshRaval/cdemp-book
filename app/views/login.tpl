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
	<div class="c-login c-flex-container fh">
		<div class="c-user-form c-flex-container__item">

			<form id="loginForm" class="c-user-form__form" method="POST" action="/login">
				<h1 class="c-user-form__title">Welcome</h1>
				<p>Login to get started!</p>
				#message#
				<div style="padding: 2em 0">
					<div class="form-group">
						<label for="userId">User Name</label>
						<input type="text" name="username" class="form-control" id="userId" placeholder="User ID" required/>
					</div>
					<div class="form-group">
						<label for="userPassword">Password</label>
						<input type="password" name="password" class="form-control" id="userPassword" placeholder="Password" required/>
					</div>
				</div>
				<button type="submit" class="btn btn-large grd2-b btn-full" id="submit">Login</button>
			</form>

			<p style="background-color: #EEE; padding: 2em;text-align: center; border-top: 1px solid #CCC;">First time here? <a href="/signup">Create your account</a></p>
		</div>
	</div>
	<!--# END : Login Form #-->

	<script src="app/assets/build/scripts/script.js"></script>
	<!--<script src="app/components/login/login-controller.js"></script>-->

</body>

</html>