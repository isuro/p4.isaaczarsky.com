<!DOCTYPE html>
<html>
<head>
	<title><?php if(isset($title)) echo $title; ?></title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
	<script src="/js/scripts.js"></script>

	<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
	<!-- <link rel="stylesheet" href="/css/styles.css"> -->

	<!-- Controller Specific JS/CSS -->
	<?php if(isset($client_files_head)) echo $client_files_head; ?>
	
</head>

<body style="padding-top: 70px;">	

	<div class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#menu">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="/">Scrapper</a>
			</div>
			<div class = "navbar-collapse collapse" id="menu">

				<ul class="nav navbar-nav">
					<!-- Menu for users who are logged in -->
					<?php if($user): ?>

					<li><a href='/users/profile'>Profile</a></li>
					<li><a href='/posts/users'>Follow</a></li>
					<!-- <li><a href='/posts/add'>Post</a></li> -->
					<li><a href='#' data-toggle='modal' data-target='#postModal'>Post</a></li>
					<li><a href='/posts/'>Feed</a></li>
					<li><a href='/users/logout'>Logout</a></li>

					<!-- Menu options for users who are not logged in -->
					<?php else: ?>

					<li><a href='/users/signup'>Sign up</a></li>
					<li><a href='/users/login'>Log in</a></li>

					<?php endif; ?>
				</ul>
			</div>
			<table class="navbar-left" id="back-button" class="controls" hidden>
				<tr>
					<td></td>
				</tr>
				<tr>
					<td><button onclick="window.history.back()">Go Back</button>
					</td>
				</tr>
			</table>
			<table class="navbar-right" id="text-controls" class="controls" hidden>
				<tr>
					<td>Font Size</td><td>Margin Size</td><td>Line Spacing</td><td>Font Type</td><td>Color Theme</td>
				</tr>
				<tr>
					<td><button onclick="fontSizePlus()">+</button>
						<button onclick="fontSizeMinus()">-</button>
					</td>
					<td><button onclick="paddingPlus()">+</button>
						<button id="padding-minus" onclick="paddingMinus()" disabled>-</button>
					</td>
					<td><button onclick="lineHeightPlus()">+</button>
						<button onclick="lineHeightMinus()">-</button>
					</td>
					<td><select id="font-selector" onchange="fontChange()">
							<option value="serif">Serif</option>
							<option value="sans">Sans-Serif</option>
							<option value="fixed">Fixed-Width</option>
						</select>
					</td>
					<td><select id="theme-selector" onchange="themeChange()">
							<option value="day">Day</option>
							<option value="night">Night</option>
							<option value="solarized-light">Solarized Light</option>
							<option value="solarized-dark">Solarized Dark</option>
						</select>
					</td>
				</tr>
			</table>
			<table class="navbar-right" id="image-controls" class="controls" hidden>
				<tr>
					<td></td>
				</tr>
				<tr>
					<td><button id="image-resize" onclick="imageResize()">Toggle Image Size</td>
				</tr>
			</table>
		</div>
	</div>
		<div class="container">
			<!-- Feedback on a submitted post -->
			<?php if(isset($post_submitted)) echo $post_submitted; ?>
			<!-- New post modal for logged in users only -->
			<?php if($user): ?>
				<div class="modal fade" id="postModal" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h4 class="modal-title" id="newPostModal">New post:</h4>
							</div>
							<form method='POST' action='<?php echo $_SERVER['PHP_SELF']; ?>'>
								<div class="modal-body">
									<textarea name='source_url' id='source-url' class='form-control' rows='5' onkeyup="stoppedTyping()"></textarea>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-default" data-dismiss="modal">Dismiss</button>
									<button type="submit" class="btn btn-primary" disabled="disabled" id="submit-post">Submit</button>
								</div>
							</form>
						</div><!-- /.modal-content -->
					</div><!-- /.modal-dialog -->
				</div><!-- /.modal -->
			<?php endif; ?>
		<br>

	<?php if(isset($content)) echo $content; ?>

	<?php if(isset($client_files_body)) echo $client_files_body; ?>

	</div>
</body>
</html>