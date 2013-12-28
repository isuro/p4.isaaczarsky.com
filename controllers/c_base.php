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
			if(isset($_POST['source_url'])) {

	      	  	# Associate this post with this user
				$_POST['user_id']  = $this->user->user_id;

				$headerArray = get_headers($_POST['source_url'], 1);
				$typeArray = explode("/", $headerArray["Content-Type"]);

				$_POST['media_type'] = $typeArray[0];

				if($_POST['media_type'] == "text") {
					$parserArray = json_decode(file_get_contents("http://www.readability.com/api/content/v1/parser?token=349c3efd94e9cebb53cf6697724b6a7dc6797c5c&url=".$_POST('url')), true);

					$_POST['title'] = $parserArray['title'];
					$_POST['content-preview'] = $parserArray['excerpt'];

				}

				else {
					$_POST['title'] = basename($_POST['source_url']);
				}

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
