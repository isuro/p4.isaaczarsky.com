<?php
class users_controller extends base_controller {

    public function __construct() {
        parent::__construct();
        // echo "users_controller construct called<br><br>";
    } 

    public function index() {
        Router::redirect('/users/profile');
    }

    public function signup($error = NULL) {

        # Setup view
        $this->template->content = View::instance('v_users_signup');
        $this->template->title   = "Sign Up";
        $this->template->client_files_head = "<script type=\"text/javascript\" src=\"http://cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js\"></script>
            <script>
            $('input[name=timezone]').val(jstz.determine().name());
            </script>";

        # Error validation
        $this->template->content->error = $error;

        # Render template
        echo $this->template;

    }

    public function p_signup() {

        # Dump out the results of POST to see what the form submitted
        // print_r($_POST);

        $_POST = DB::instance(DB_NAME)->sanitize($_POST);

        # Check that no fields are empty, send back if they are

        if (!isset($_POST['username']) && !isset($_POST['display_name']) && !isset($_POST['email']) && !isset($_POST['password'])) {
            if (!$value) Router::redirect("/users/signup/error");
        }

        # Check for existing user with same email

        $q= "SELECT 'email' 
        FROM  `users` 
        WHERE  `email` =  '".$_POST['email']."'";

        $existingEmail = DB::instance(DB_NAME)->select_rows($q);

        if ($existingEmail) {
            Router::redirect("/users/signup/error");
        }

        $q= "SELECT 'username' 
        FROM  `users` 
        WHERE  `username` =  '".$_POST['username']."'";

        $existingUser = DB::instance(DB_NAME)->select_rows($q);

        if ($existingUser) {
            Router::redirect("/users/signup/error");
        }

        # More data for the database
        $_POST['created']  = Time::now();
        $_POST['modified'] = Time::now();

        # Password encryption
        $_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);

        # Token made from email and random string
        $_POST['token'] = sha1(TOKEN_SALT.$_POST['email'].Utils::generate_random_string());

        # Insert this user into the database
        $user_id = DB::instance(DB_NAME)->insert('users', $_POST);

        # User follows themself
        # Prepare the data array to be inserted
        #$data = Array(
        #    "created" => Time::now(),
        #    "user_id" => $this->user->user_id,
        #    "user_id_followed" => $this->user->user_id
        #    );

        # Do the insert
        #DB::instance(DB_NAME)->insert('users_users', $data);

        # For now, just confirm they've signed up - 
        # You should eventually make a proper View for this
        #Router::redirect("/");

        # Hack for self-following
        # Router::redirect("/posts/follow/".$this->user->user_id);
        # !!! Still problems with this
    }

    public function login($error = NULL) {
        # Setup view
        $this->template->content = View::instance('v_users_login');
        $this->template->title   = "Login";

        # Error validation
        $this->template->content->error = $error;

        # Render template
        echo $this->template;
    }

    public function p_login() {

        # Sanitize the user entered data to prevent any funny-business (re: SQL Injection Attacks)
        $_POST = DB::instance(DB_NAME)->sanitize($_POST);

        # Hash submitted password so we can compare it against one in the db
        $_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);

        # Search the db for this email and password
        # Retrieve the token if it's available
        $q = "SELECT token 
        FROM users 
        WHERE email = '".$_POST['email']."' 
        AND password = '".$_POST['password']."'";

        $token = DB::instance(DB_NAME)->select_field($q);

        # If we didn't find a matching token in the database, it means login failed
        if(!$token) {

        # Send them back to the login page
            Router::redirect("/users/login/error");

        # But if we did, login succeeded! 
        } else {

        /* 
        Store this token in a cookie using setcookie()
        Important Note: *Nothing* else can echo to the page before setcookie is called
        Not even one single white space.
        param 1 = name of the cookie
        param 2 = the value of the cookie
        param 3 = when to expire
        param 4 = the path of the cookie (a single forward slash sets it for the entire domain)
        */
        setcookie("token", $token, strtotime('+1 year'), '/');

        # Send them to the main page - or whever you want them to go
        Router::redirect("/");

        }
    }

    public function logout() {

    # If user is blank, they're not logged in; redirect them to the login page
    if(!$this->user) {
        Router::redirect('/users/login');
    }

    # If they weren't redirected away, continue:

    # Generate and save a new token for next login
    $new_token = sha1(TOKEN_SALT.$this->user->email.Utils::generate_random_string());

    # Create the data array we'll use with the update method
    # In this case, we're only updating one field, so our array only has one entry
    $data = Array("token" => $new_token);

    # Do the update
    DB::instance(DB_NAME)->update("users", $data, "WHERE token = '".$this->user->token."'");

    # Delete their token cookie by setting it to a date in the past - effectively logging them out
    setcookie("token", "", strtotime('-1 year'), '/');

    # Send them back to the main index.
    Router::redirect("/");
    }

    public function profile() {

    # If user is blank, they're not logged in; redirect them to the login page
    if(!$this->user) {
        Router::redirect('/users/login');
    }

    # Setup view
    $this->template->content = View::instance('v_users_profile');
    $this->template->title   = "Profile of ".$this->user->display_name;

    # Query
    $q = 'SELECT 
            posts.title,
            posts.media_type,
            posts.content_preview,
            posts.created,
            posts.user_id,
            posts.post_id
        FROM posts
        WHERE posts.user_id = '.$this->user->user_id.'
        ORDER BY posts.created DESC';

    # Run the query, store the results in the variable $posts
    $posts = DB::instance(DB_NAME)->select_rows($q);

    # Pass data to the View
    $this->template->content->posts = $posts;

    # Render template
    echo $this->template;
    }

} # end of the class