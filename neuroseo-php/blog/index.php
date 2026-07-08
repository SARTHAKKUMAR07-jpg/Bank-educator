<?php
// neuroseo-php/blog/index.php
require_once __DIR__ . '/../inc/db.php';
require_once __DIR__ . '/../inc/layout.php';
require_once __DIR__ . '/../inc/helpers.php';

try {
    $posts = get_all_posts('published');
} catch (\Exception $e) {
    $posts = [];
}

render_header('Blog', 'Read our latest articles');
?>

<h2>Blog</h2>

<?php if (empty($posts)): ?>
    <p>No posts found.</p>
<?php else: ?>
    <div class="post-grid">
        <?php foreach ($posts as $post): ?>
            <div class="post-card">
                <?php if ($post['cover_image']): ?>
                    <img src="<?= e($post['cover_image']) ?>" alt="<?= e($post['cover_alt']) ?>">
                <?php endif; ?>
                <?php if ($post['primary_tag']): ?>
                    <span class="tag"><?= e($post['primary_tag']) ?></span>
                <?php endif; ?>
                <h3><a href="/blog/<?= e($post['slug']) ?>"><?= e($post['title']) ?></a></h3>
                <p><?= e($post['excerpt']) ?></p>
                <small><?= e($post['reading_time']) ?></small>
            </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<?php
render_footer();
