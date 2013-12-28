<?php foreach($posts as $post): ?>

	<article>

		<h1><?=$post['display_name']?> posted:</h1>

		<p><a href="/posts/view/<?=$post['post_id']?>"><?=$post['title']?></a></p>

		<time datetime="<?=Time::display($post['created'],'Y-m-d G:i')?>">
			<?=Time::display($post['created'])?>
		</time>

	</article>

<?php endforeach; ?>