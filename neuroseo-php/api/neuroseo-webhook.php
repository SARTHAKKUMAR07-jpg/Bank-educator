<?php
// neuroseo-php/api/neuroseo-webhook.php
require_once __DIR__ . '/../inc/config.php';
require_once __DIR__ . '/../inc/db.php';
require_once __DIR__ . '/../inc/helpers.php';

// 8. Non-POST -> 405
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method not allowed']);
    exit;
}

// 1. Read raw body
$rawBody = file_get_contents('php://input');

// Reject > 2MB
if (strlen($rawBody) > 2 * 1024 * 1024) {
    http_response_code(413);
    echo json_encode(['error' => 'payload too large']);
    exit;
}

// Check headers
$headers = getallheaders();
$headers_lower = array_change_key_case($headers, CASE_LOWER);

$signature = $headers_lower['x-neuroseo-signature'] ?? '';
$event = $headers_lower['x-neuroseo-event'] ?? '';

// 2. Verify signature
if (NEUROSEO_SIGNING_SECRET === 'placeholder_secret_replace_me' || empty(NEUROSEO_SIGNING_SECRET)) {
    http_response_code(500);
    echo json_encode(['error' => 'signing secret not configured']);
    exit;
}

$expectedSignature = hash_hmac('sha256', $rawBody, NEUROSEO_SIGNING_SECRET);
if (!hash_equals($expectedSignature, $signature)) {
    http_response_code(401);
    echo json_encode(['error' => 'invalid signature']);
    exit;
}

// 3. Ping
if ($event === 'ping') {
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
}

// Parse body
$payload = json_decode($rawBody, true);
if (!$payload) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid json']);
    exit;
}

$slug = $payload['slug'] ?? '';
// Generate slug if empty (user task: Implement slug generation)
if (empty($slug) && !empty($payload['title'])) {
    $slug = slugify($payload['title']);
}

// 4. Validate slug
if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid slug format']);
    exit;
}

$title = $payload['title'] ?? '';
$meta_title = $payload['meta_title'] ?? '';
$meta_description = $payload['meta_description'] ?? '';
$excerpt = $payload['excerpt'] ?? '';
$featured_image_url = $payload['featured_image']['url'] ?? '';
$featured_image_alt = $payload['featured_image']['alt'] ?? '';
$faq = json_encode($payload['faq'] ?? []);
$tags = $payload['tags'] ?? [];
$primary_tag = !empty($tags) ? $tags[0] : '';
$tags_json = json_encode($tags);

// 5. Status
$status = (isset($payload['status']) && $payload['status'] === 'draft') ? 'draft' : 'published';

$content_format = $payload['content_format'] ?? 'html';
$content_html = '';

if ($content_format === 'html') {
    $content_html = $payload['content'] ?? '';
} else if ($content_format === 'markdown') {
    // Minimal fallback if no library is available
    $content_html = "<pre>" . htmlspecialchars($payload['content'] ?? '') . "</pre>";
} else if ($content_format === 'json') {
    $content_html = $payload['content_html'] ?? '';
}

$reading_time = calculate_reading_time($content_html);
$now = date('Y-m-d H:i:s');

try {
    $pdo = get_db();
    
    // 6. Upsert by slug
    $sql = "INSERT INTO neuroseo_posts 
            (slug, title, meta_title, description, excerpt, cover_image, cover_alt, primary_tag, tags, faq, content_html, reading_time, status, published_at, updated_at) 
            VALUES 
            (:slug, :title, :meta_title, :description, :excerpt, :cover_image, :cover_alt, :primary_tag, :tags, :faq, :content_html, :reading_time, :status, :published_at, :updated_at)
            ON DUPLICATE KEY UPDATE 
            title = VALUES(title),
            meta_title = VALUES(meta_title),
            description = VALUES(description),
            excerpt = VALUES(excerpt),
            cover_image = VALUES(cover_image),
            cover_alt = VALUES(cover_alt),
            primary_tag = VALUES(primary_tag),
            tags = VALUES(tags),
            faq = VALUES(faq),
            content_html = VALUES(content_html),
            reading_time = VALUES(reading_time),
            status = VALUES(status),
            updated_at = VALUES(updated_at)";
            
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':slug' => $slug,
        ':title' => $title,
        ':meta_title' => $meta_title,
        ':description' => $meta_description,
        ':excerpt' => $excerpt,
        ':cover_image' => $featured_image_url,
        ':cover_alt' => $featured_image_alt,
        ':primary_tag' => $primary_tag,
        ':tags' => $tags_json,
        ':faq' => $faq,
        ':content_html' => $content_html,
        ':reading_time' => $reading_time,
        ':status' => $status,
        ':published_at' => $now,
        ':updated_at' => $now
    ]);
    
    // 7. Respond 200
    http_response_code(200);
    $url = SITE_PUBLIC_URL . '/blog/' . $slug;
    echo json_encode([
        'id' => $slug,
        'url' => $url
    ]);
} catch (\Exception $e) {
    error_log("Webhook DB Error: " . $e->getMessage());
    http_response_code(502);
    echo json_encode(['error' => 'database error']);
}
