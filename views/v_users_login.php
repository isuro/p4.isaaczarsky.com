<form method='POST' action='/users/p_login' class="form-horizontal">
	<?php if(isset($error)): ?>
		<div class='alert alert-danger'>
			Login failed. Please double check your email and password.
		</div>
		<br>
	<?php endif; ?>
	<div class="form-group">
		<label for="inputEmail" class="col-sm-2 control-label">Email</label>
		<input type='email' id='inputEmail' name='email'>
	</div>
	<div class="form-group">
		<label for="inputPassword" class="col-sm-2 control-label">Password</label>
		<input type='password' id='inputPassword' name='password'>
	</div>

	<div class="col-sm-offset-2">
		<input type='submit' value='Log in'>
	</div>

</form>