<?php
// neuroseo-php/inc/helpers.php

function e($str) {
    if ($str === null) return '';
    return htmlspecialchars($str, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function json_field($str) {
    if (!$str) return [];
    $decoded = json_decode($str, true);
    return is_array($decoded) ? $decoded : [];
}

function format_date($datetime) {
    if (!$datetime) return '';
    return date('M j, Y', strtotime($datetime));
}

function calculate_reading_time($text) {
    $word_count = str_word_count(strip_tags($text));
    $minutes = ceil($word_count / 200);
    return $minutes . ' min read';
}

function slugify($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    if (empty($text)) {
        return 'n-a';
    }
    return $text;
}
