<?php
// neuroseo-php/blog/view.php
require_once __DIR__ . '/../inc/db.php';
require_once __DIR__ . '/../inc/layout.php';
require_once __DIR__ . '/../inc/helpers.php';

$slug = $_GET['slug'] ?? '';
if (!$slug) {
    http_response_code(404);
    echo "Post not found.";
    exit;
}

try {
    $post = get_post($slug);
} catch (\Exception $e) {
    $post = null;
}

if (!$post || $post['status'] !== 'published') {
    http_response_code(404);
    echo "Post not found.";
    exit;
}

// JSON-LD logic
$canonical_url = SITE_PUBLIC_URL . '/blog/' . e($post['slug']);

$blog_posting_ld = [
    "@context" => "https://schema.org",
    "@type" => "BlogPosting",
    "headline" => $post['title'],
    "image" => [$post['cover_image']],
    "datePublished" => date('c', strtotime($post['published_at'])),
    "dateModified" => date('c', strtotime($post['updated_at'])),
];

$faq_array = json_field($post['faq']);
$faq_ld = null;
if (!empty($faq_array)) {
    $faq_ld = [
        "@context" => "https://schema.org",
        "@type" => "FAQPage",
        "mainEntity" => array_map(function($item) {
            return [
                "@type" => "Question",
                "name" => $item['question'] ?? '',
                "acceptedAnswer" => [
                    "@type" => "Answer",
                    "text" => $item['answer'] ?? ''
                ]
            ];
        }, $faq_array)
    ];
}

$og_tags = '
    <meta property="og:title" content="' . e($post['title'] ?: $post['meta_title']) . '">
    <meta property="og:description" content="' . e($post['description'] ?: $post['excerpt']) . '">
    <meta property="og:type" content="article">
    <meta property="og:url" content="' . e($canonical_url) . '">
    <meta property="og:image" content="' . e($post['cover_image']) . '">
    <link rel="canonical" href="' . e($canonical_url) . '">
    <script type="application/ld+json">' . json_encode($blog_posting_ld, JSON_UNESCAPED_SLASHES) . '</script>
';
if ($faq_ld) {
    $og_tags .= '<script type="application/ld+json">' . json_encode($faq_ld, JSON_UNESCAPED_SLASHES) . '</script>';
}

render_header($post['meta_title'] ?: $post['title'], $post['description'] ?: $post['excerpt'], $og_tags);
?>

<div class="breadcrumb">
    <a href="/">Home</a> &rsaquo; <a href="/blog">Blog</a> &rsaquo; <?= e($post['title']) ?>
</div>

<article>
    <?php if ($post['primary_tag']): ?>
        <span class="eyebrow"><?= e($post['primary_tag']) ?></span>
    <?php endif; ?>
    
    <h1><?= e($post['title']) ?></h1>
    <div class="meta">
        <?= format_date($post['published_at']) ?> &middot; <?= e($post['reading_time']) ?>
    </div>
    
    <?php if ($post['cover_image']): ?>
        <img src="<?= e($post['cover_image']) ?>" alt="<?= e($post['cover_alt']) ?>">
    <?php endif; ?>
    
    <div class="article-body">
        <?= $post['content_html'] ?>
    </div>
    
    <?php if (!empty($faq_array)): ?>
        <div class="faq-section">
            <h2>FAQ</h2>
            <?php foreach ($faq_array as $faq_item): ?>
                <div class="faq-card">
                    <h3><?= e($faq_item['question'] ?? '') ?></h3>
                    <p><?= e($faq_item['answer'] ?? '') ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
    
    <?php 
    $tags = json_field($post['tags']);
    if (!empty($tags)): ?>
        <div class="tags">
            <?php foreach ($tags as $tag): ?>
                <span class="tag-chip"><?= e($tag) ?></span>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
    
    <a href="/blog">&larr; Back to Blog</a>
</article>

<?php
render_footer();
