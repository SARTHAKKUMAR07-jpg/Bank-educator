<?php
// neuroseo-php/inc/db.php
require_once __DIR__ . '/config.php';

function get_db() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
            init_db($pdo);
        } catch (\PDOException $e) {
            error_log("DB Connection Failed: " . $e->getMessage());
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }
    return $pdo;
}

function init_db($pdo) {
    $sql = "CREATE TABLE IF NOT EXISTS neuroseo_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(200) UNIQUE,
        title VARCHAR(300),
        meta_title VARCHAR(300),
        description TEXT,
        excerpt TEXT,
        cover_image VARCHAR(600),
        cover_alt VARCHAR(400),
        primary_tag VARCHAR(120),
        tags TEXT,
        faq MEDIUMTEXT,
        content_html MEDIUMTEXT,
        reading_time VARCHAR(20),
        status VARCHAR(20) DEFAULT 'published',
        published_at DATETIME,
        updated_at DATETIME
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $pdo->exec($sql);
}

function get_all_posts($status = 'published') {
    $pdo = get_db();
    $stmt = $pdo->prepare("SELECT * FROM neuroseo_posts WHERE status = ? ORDER BY published_at DESC");
    $stmt->execute([$status]);
    return $stmt->fetchAll();
}

function get_post($slug) {
    $pdo = get_db();
    $stmt = $pdo->prepare("SELECT * FROM neuroseo_posts WHERE slug = ?");
    $stmt->execute([$slug]);
    return $stmt->fetch();
}
