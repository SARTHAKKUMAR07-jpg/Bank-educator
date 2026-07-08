<?php
// neuroseo-php/blog-sitemap.php
require_once __DIR__ . '/inc/db.php';

header("Content-Type: application/xml; charset=utf-8");

try {
    $posts = get_all_posts('published');
} catch (\Exception $e) {
    $posts = [];
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <?php foreach ($posts as $post): ?>
        <url>
            <loc><?= htmlspecialchars(SITE_PUBLIC_URL . '/blog/' . $post['slug']) ?></loc>
            <lastmod><?= date('Y-m-d', strtotime($post['updated_at'])) ?></lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
    <?php endforeach; ?>
</urlset>
