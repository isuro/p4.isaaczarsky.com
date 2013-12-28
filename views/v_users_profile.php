<h1>This is the profile of <?=$user->display_name?></h1>
<br>
<h3><?=$user->display_name?>'s posts:</h3>
<?php foreach($posts as $post): ?>

	<article>

		<br><br>
		<a href=<?="/posts/view/".$post['post_id'] ?>><h3><?=$post['title']?></h3></a>

	    <?php if($post['media_type'] == 'text'): ?>
  	    	<p><?=$post['content_preview']?></p>
	    <?php endif; ?>


		<time datetime="<?=Time::display($post['created'],'Y-m-d G:i')?>">
			<?=Time::display($post['created'])?>
		</time>

	</article>

<?php endforeach; ?>