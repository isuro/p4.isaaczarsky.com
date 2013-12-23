<h1>This is the profile of <?=$user->first_name?></h1>
<br>
<h3><?=$user->first_name?>'s posts:</h3>
<?php foreach($posts as $post): ?>

	<article>

		<br><br>
		
		<p><?=$post['content']?></p>

		<time datetime="<?=Time::display($post['created'],'Y-m-d G:i')?>">
			<?=Time::display($post['created'])?>
		</time>

	</article>

<?php endforeach; ?>