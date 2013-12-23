<form method='POST' action='/users/p_signup' class="form-horizontal">

    <?php if(isset($error)): ?>
        <div class='alert alert-danger'>
            Signup failed. All fields are required.
        </div>
        <br>
    <?php endif; ?>

    <div class="form-group">
        <label for="inputFirstName" class="col-sm-2 control-label">First Name</label>
        <input type='text' id='inputFirstName' name='first_name'>
    </div>
    <div class="form-group">
        <label for="inputLastName" class="col-sm-2 control-label">Last Name</label>
        <input type='text' id='inputLastName' name='last_name'>
    </div>
    <div class="form-group">
        <label for="inputEmail" class="col-sm-2 control-label">Email</label>
        <input type='text' id='inputEmail' name='email'>
    </div>
    <div class="form-group">
        <label for="inputPassword" class="col-sm-2 control-label">Password</label>
        <input type='password' id='inputPassword' name='password'>
    </div>
    
    <input type='hidden' name='timezone'>

    <div class="col-sm-offset-2">
        <input type='submit' value='Sign up'>
    </div>

</form>