<form method='POST' action='/users/p_signup' class="form-horizontal">

    <?php if(isset($error1)): ?>
        <div class='alert alert-danger'>
            Signup failed. All fields are required.
        </div>
        <br>
    <?php elseif(isset($error2)): ?>
        <div class='alert alert-danger'>
            Signup failed. An account with that email address already exists.
        </div>
        <br>
    <?php elseif(isset($error3)): ?>
        <div class='alert alert-danger'>
            Signup failed. An account with that username already exists.
        </div>
        <br>
    <?php endif; ?>

    <div class="form-group">
        <label for="inputUsername" class="col-sm-2 control-label">Username</label>
        <input type='text' id='inputUsername' name='username'>
    </div>
    <div class="form-group">
        <label for="inputDisplayName" class="col-sm-2 control-label">Display Name</label>
        <input type='text' id='inputDisplayName' name='display_name'>
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