<?php
// neuroseo-php/inc/layout.php
require_once __DIR__ . '/config.php';

function render_header($title, $meta_description, $og_tags = '') {
    global $SITE;
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($title) ?> | <?= e($SITE['name']) ?></title>
    <meta name="description" content="<?= e($meta_description) ?>">
    <?= $og_tags ?>
    <style>
        body { font-family: sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
        .post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .post-card { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; display: flex; flex-direction: column; }
        .post-card h3 { margin-top: 0; }
        .post-card img { max-width: 100%; height: auto; margin-bottom: 15px; }
        .breadcrumb { margin-bottom: 20px; }
    </style>
</head>
<body>
    <header>
        <h1><a href="/"><?= e($SITE['name']) ?></a></h1>
        <nav><a href="/blog">Blog</a></nav>
    </header>
    <main>
    <?php
}

function render_footer() {
    global $SITE;
    ?>
    </main>
    <footer>
        <p>&copy; <?= date('Y') ?> <?= e($SITE['name']) ?>. All rights reserved.</p>
    </footer>
</body>
</html>
    <?php
}
