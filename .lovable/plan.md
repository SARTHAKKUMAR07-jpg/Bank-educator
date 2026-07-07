
# BankEducator — NeuroSEO PHP+MySQL Integration Plan

## Important note on scope
You picked "Wipe TanStack, PHP-only repo." The PRD assumes an existing prerendered React site where only `/blog` moves to PHP, and says "don't touch the rest of the site." Since this Lovable project has no real bankeducator content yet, we'll instead build a **complete Hostinger-ready PHP site** (marketing pages in PHP too) so it can actually be deployed as one unit. If you already have the React frontend elsewhere and want me to output only the `neuroseo-php/` folder to drop into it, say so and I'll switch to that mode.

Lovable's preview cannot run PHP or MySQL. This repo becomes a source tree you upload to Hostinger `public_html/` via cPanel/FTP. I cannot verify endpoints from here — acceptance testing (§8 of the PRD) must run against your live Hostinger domain with curl. I'll provide the exact curl commands.

## 1. Architecture

```text
Browser ─▶ Hostinger Apache + PHP 8 ─▶ MySQL (neuroseo_posts table)
                        ▲
                        │ HMAC-signed POST
             NeuroSEO "Publish" webhook
```

- All pages server-rendered by PHP (SEO/GEO requirement, PRD §0 & §10).
- Static assets served directly by Apache.
- `.htaccess` handles pretty URLs for `/blog` and `/blog/<slug>`.
- Secrets confined to `inc/config.php`; `/inc/` blocked by `.htaccess`.

## 2. Folder structure (repo = Hostinger `public_html/`)

```text
/
├── .htaccess                     # blog rewrites + security headers
├── index.php                     # homepage (bankeducator landing)
├── about.php                     # about page
├── contact.php                   # contact page
├── robots.txt                    # includes sitemap ref
├── favicon.ico
├── assets/
│   ├── css/site.css              # shared theme (single source)
│   ├── js/site.js
│   └── img/                      # logo, hero, etc.
├── blog/
│   ├── index.php                 # /blog list (PHP-rendered)
│   └── view.php                  # /blog/<slug> article (PHP-rendered)
├── blog-assets/                  # cover images for seeded posts
├── api/
│   └── neuroseo-webhook.php      # HMAC receiver → upsert MySQL
├── inc/
│   ├── .htaccess                 # Require all denied
│   ├── config.php                # DB creds, signing secret, SITE array
│   ├── db.php                    # PDO + auto-create table + get_all_posts/get_post
│   ├── helpers.php               # e(), json_field(), reading_time(), md→html fallback
│   └── layout.php                # header/footer partial, brand nav from config
├── seed/                         # optional: markdown/json seed posts
├── import-seed.php               # guarded one-time importer (?key=<secret>)
├── blog-sitemap.php              # dynamic XML sitemap of posts
└── README-DEPLOY.md              # what was configured, how to deploy
```

The current TanStack Start scaffolding (`src/`, `vite.config.ts`, `package.json`, `bun.lock`, `src/routes/`, `src/routeTree.gen.ts`, `src/styles.css`, `src/main.tsx`, `src/router.tsx`, etc.) will be deleted in Phase 1.

## 3. Technologies

- **Runtime:** PHP 8.x (Hostinger shared hosting)
- **DB:** MySQL / MariaDB via PDO, `utf8mb4_unicode_ci`, InnoDB
- **HTTP:** Apache + mod_rewrite (Hostinger default)
- **Frontend:** Plain HTML/CSS/JS, no framework, no build step
- **Fonts:** Google Fonts `<link>` in `inc/layout.php` (pick a legible pair for a financial-education brand — proposing Outfit + Inter unless you specify)
- **Security:** HMAC-SHA256 signature verify, `hash_equals`, prepared statements, `htmlspecialchars` on all non-`content_html` output, `/inc/` blocked

## 4. Pages

| URL | File | Rendering | Notes |
|---|---|---|---|
| `/` | `index.php` | PHP | Homepage — hero, value props, 3 featured posts from DB, CTA |
| `/about` | `about.php` | PHP | Static about page |
| `/contact` | `contact.php` | PHP | Contact info + email (form optional) |
| `/blog` | `blog/index.php` | PHP | Card grid from `neuroseo_posts`, empty state, SEO meta |
| `/blog/<slug>` | `blog/view.php` | PHP | Article body, breadcrumb, BlogPosting + FAQPage JSON-LD, 404 on unknown slug |
| `/api/neuroseo-webhook.php` | direct | PHP | HMAC-verified POST receiver; 405 on GET |
| `/blog-sitemap.php` | direct | PHP | XML sitemap of published posts |

## 5. Components (PHP partials via `inc/layout.php`)

- `site_head($title, $description, $canonical, $og = [])` — meta tags, favicon, canonical, OG/Twitter, JSON-LD hook
- `site_header()` — logo, nav from `$SITE['nav']`, CTA button
- `site_footer()` — brand block, footer nav, socials, copyright
- `render_post_card($post)` — cover, tag chip, title, excerpt, reading time
- `render_faq($faq_json)` — accordion cards
- `render_jsonld_blogposting($post)` / `render_jsonld_faq($post)`

All CSS lives in `assets/css/site.css` (one file, no build hash — safe for direct upload).

## 6. Backend requirements

### `api/neuroseo-webhook.php` (PRD §2, authoritative)
1. Read raw body with `file_get_contents('php://input')` **before** parsing. Reject > 2 MB → 413.
2. Refuse to run (500) if `NEUROSEO_SIGNING_SECRET` still equals its placeholder.
3. Non-POST → 405 `{"error":"method not allowed"}`.
4. `hash_equals(hash_hmac('sha256', $raw, SECRET), $sig)` → else 401.
5. `X-NeuroSEO-Event: ping` → 200 `{"ok":true}`.
6. Validate slug `/^[a-z0-9]+(?:-[a-z0-9]+)*$/` → else 400.
7. Content handling: prefer `content_html`; else if `content_format=markdown` convert via minimal MD→HTML in `helpers.php`; JSON format uses `content_html` when present.
8. `status: draft` → store `draft` (hidden from list); else `published`.
9. Upsert by slug with `INSERT ... ON DUPLICATE KEY UPDATE`, preserving `published_at`, updating `updated_at = NOW()`.
10. Success → 200 `{"id":"<slug>","url":"<SITE_PUBLIC_URL>/blog/<slug>"}`. DB failure → 502 + `error_log`.

### `inc/db.php`
- PDO singleton with `ERRMODE_EXCEPTION`, `utf8mb4`.
- `ensure_schema()` runs `CREATE TABLE IF NOT EXISTS neuroseo_posts (...)` on first call.
- `get_all_posts($limit=null)` returns published, newest first.
- `get_post($slug)` returns one post or null.

### `inc/helpers.php`
- `e($s)` → `htmlspecialchars($s, ENT_QUOTES|ENT_SUBSTITUTE, 'UTF-8')`
- `json_field($json, $default=[])`
- `reading_time($html)` → ~200 wpm
- `md_to_html($md)` — minimal fallback (headings, bold/italic, links, lists, code, paragraphs)
- `absolute_url($path)`

## 7. Database requirements

Table `neuroseo_posts` (auto-created; PRD §2 schema):

```text
id             INT PK AUTO_INCREMENT
slug           VARCHAR(200) UNIQUE
title          VARCHAR(300)
meta_title     VARCHAR(300) NULL
description    TEXT NULL
excerpt        TEXT NULL
cover_image    VARCHAR(600) NULL
cover_alt      VARCHAR(400) NULL
primary_tag    VARCHAR(120) NULL
tags           TEXT NULL            -- JSON
faq            MEDIUMTEXT NULL      -- JSON
content_html   MEDIUMTEXT
reading_time   VARCHAR(20) NULL
status         VARCHAR(20) DEFAULT 'published'
published_at   DATETIME
updated_at     DATETIME
```

Engine InnoDB, charset `utf8mb4_unicode_ci`. Indexes: `UNIQUE(slug)`, `INDEX(status, published_at)`.

DB creation on Hostinger: hPanel → MySQL Databases → create DB + user, note the prefixed final names (e.g. `u123456789_bankedu`), paste into `inc/config.php`.

## 8. API / Webhook flow

```text
NeuroSEO dashboard "Publish"
   │  POST /api/neuroseo-webhook.php
   │  Headers: Content-Type: application/json
   │           X-NeuroSEO-Event: post.publish | ping
   │           X-NeuroSEO-Signature: hex HMAC-SHA256(raw, secret)
   ▼
neuroseo-webhook.php
   ├─ size guard (413 if > 2 MB)
   ├─ secret sanity (500 if placeholder)
   ├─ method (405 if not POST)
   ├─ HMAC verify (401 if mismatch)
   ├─ if ping → 200 {ok:true}
   ├─ slug regex (400 if bad)
   ├─ pick content_html (convert markdown if needed)
   ├─ upsert row (preserve published_at)
   └─ 200 {id, url}
```

Republish = same slug → UPDATE in place, no duplicate. Site is instant: `/blog` reads live from MySQL on every request.

## 9. Deployment plan

Lovable can't deploy PHP. Workflow:

1. I generate all files in this repo.
2. You download the repo as a ZIP.
3. Upload ZIP to Hostinger → File Manager → `public_html/` → Extract.
4. Create MySQL DB + user in hPanel, paste prefixed credentials into `inc/config.php`.
5. Generate signing secret: `openssl rand -hex 32`; paste into `inc/config.php`; set `SITE_PUBLIC_URL`.
6. Visit `https://<domain>/api/neuroseo-webhook.php` → expect 405 (proves PHP + MySQL connect works; the file's first line pings DB to auto-create the table).
7. Run acceptance curl suite (§10).
8. In NeuroSEO dashboard: paste webhook URL, signing secret, format=html. Click "Test Connection" (sends ping).
9. Delete `import-seed.php` from server after seeding (if used).

## 10. Acceptance criteria (PRD §8)

Verify with curl against the live Hostinger domain after deploy:

- `curl -I https://<domain>/` → 200
- `curl -I https://<domain>/blog` → 200, body has PHP-rendered cards
- `curl -I https://<domain>/blog/<real-slug>` → 200; `/blog/does-not-exist` → 404
- `curl -X GET https://<domain>/api/neuroseo-webhook.php` → 405
- Signed ping with correct HMAC → 200 `{"ok":true}`; wrong HMAC → 401
- `curl -I https://<domain>/inc/config.php` → 403
- `curl https://<domain>/blog-sitemap.php` → 200 XML
- Second signed POST same slug → row count unchanged, `updated_at` refreshed

## 11. Development phases

**Phase 1 — Wipe & scaffold** (single commit): delete all TanStack files (`src/`, `vite.config.ts`, `tsconfig*.json`, `package.json`, `bun.lock`, `index.html`, `public/`, `.workspace/`) and create the empty PHP folder tree.

**Phase 2 — Core includes**: `inc/config.php` (with placeholder secret), `inc/db.php` (PDO + auto-create), `inc/helpers.php`, `inc/layout.php` (theme + nav + footer), `inc/.htaccess`.

**Phase 3 — Blog + sitemap**: `blog/index.php`, `blog/view.php`, `blog-sitemap.php`, root `.htaccess` with rewrites, `assets/css/site.css`.

**Phase 4 — Webhook**: `api/neuroseo-webhook.php` implementing PRD §2 in full.

**Phase 5 — Marketing pages**: `index.php` (homepage pulls 3 latest published posts), `about.php`, `contact.php`, `robots.txt`, favicon.

**Phase 6 — Seed importer**: `import-seed.php` guarded by `?key=<secret>`, plus `seed/` folder pattern. Skip actual seeding unless you provide content.

**Phase 7 — Docs & handoff**: `README-DEPLOY.md` with Hostinger steps, curl test commands, the "SITE CONNECTED-READY" final report block (§9 of PRD) with placeholders for you to fill in domain/secret/DB name.

## 12. Open questions before Phase 1

Answer inline and I'll proceed:
- **Brand basics for bankeducator** — one-line tagline, primary color hex, and any nav items besides Home / Blog / About / Contact?
- **Production domain** for `SITE_PUBLIC_URL` (e.g. `https://bankeducator.com`)? I'll leave a placeholder if unknown.
- **Existing blog content to seed?** If yes, upload it now; if no, I'll skip `seed/`.
- **DB credentials** — you'll paste them into `inc/config.php` after deploy, right? (I'll leave placeholders; never commit real creds.)

Approve and I'll start Phase 1.
