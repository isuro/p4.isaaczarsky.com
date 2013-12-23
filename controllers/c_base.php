<?php

class base_controller {
	
	public $user;
	public $userObj;
	public $template;
	public $email_template;

	/*-------------------------------------------------------------------------------------------------

	-------------------------------------------------------------------------------------------------*/
	public function __construct() {
						
		# Instantiate User obj
			$this->userObj = new User();
			
		# Authenticate / load user
			$this->user = $this->userObj->authenticate();					
						
		# Set up templates
			$this->template 	  = View::instance('_v_template');
			$this->email_template = View::instance('_v_email');			
								
		# Set a global variable called $user which is accessible to all the views
        # Set it to be $this->user			
			$this->template->set_global('user', $this->user);

		# Check if a post was submitted
			if(isset($_POST['content'])) {

	      	  	# Associate this post with this user
				$_POST['user_id']  = $this->user->user_id;

	       	 	# Unix timestamp of when this post was created / modified
				$_POST['created']  = Time::now();
				$_POST['modified'] = Time::now();

		        # Insert
		        # Note we didn't have to sanitize any of the $_POST data because we're using the insert method which does it for us
				DB::instance(DB_NAME)->insert('posts', $_POST);

	        	# Quick and dirty feedback
				$this->template->post_submitted = "<div class=\"alert alert-success\">Your post has been added.</div>";
			}
			
	}
	
} # eoc
