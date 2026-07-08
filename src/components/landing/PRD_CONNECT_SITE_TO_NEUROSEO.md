# PRD — Connect this site to NeuroSEO (instant blog publishing, PHP + MySQL)

**Audience:** Claude Code running inside a frontend site's repo.
**Goal:** Make this site receive and instantly publish blogs from the NeuroSEO platform — no git commit, no rebuild per post.
**Status:** Proven pattern. Reference implementation is LIVE at https://flybear.in/blog (repo: `C:\Users\acer\Desktop\Web\flybear\Flybear`, integration in its `neuroseo-php/` folder). **If that path is readable from your machine, COPY the files from there and adapt — do not rewrite from scratch.** Otherwise implement from the specs in this document (they are complete).

---

## 0. Context & architecture (read first)

- The site you are in is a **prerendered static React app** (typically TanStack Start / Vite, sometimes Next.js exported static), deployed to **Hostinger shared hosting** (`public_html`), which also provides **PHP 8 + MySQL**.
- NeuroSEO publishes via its **headless webhook**: it POSTs the article (HMAC-signed) to a URL on this site. Because the React site is static (content baked at build time), the receiver **cannot** be JS. Instead:
  - A **PHP webhook** saves the post into **MySQL** → instant.
  - `/blog` and `/blog/<slug>` are **server-rendered by PHP** from MySQL → new posts appear immediately AND the HTML is crawlable by Google + AI engines (ChatGPT/Perplexity) — this is required, it's an SEO/GEO product. Do NOT propose client-side fetching of posts.
- The React app keeps every other page. Only `/blog` moves to PHP.

```
NeuroSEO "Publish" ──POST (HMAC)──▶ public_html/api/neuroseo-webhook.php
                                        └─ verify sig → upsert MySQL → {id,url}
/blog        ──▶ public_html/blog/index.php   (list, from MySQL)
/blog/<slug> ──▶ public_html/blog/view.php    (article, server HTML + JSON-LD)
```

---

## 1. Deliverables

Create a `neuroseo-php/` folder in the repo root containing:

| File | Purpose |
|---|---|
| `api/neuroseo-webhook.php` | Receiver: HMAC verify → `ping` → upsert post into MySQL → return `{id,url}` |
| `blog/index.php` | `/blog` list page (server HTML) |
| `blog/view.php` | `/blog/<slug>` article page (meta tags, OG, BlogPosting + FAQPage JSON-LD) |
| `inc/config.php` | DB creds, `NEUROSEO_SIGNING_SECRET`, `SITE_PUBLIC_URL`, brand/nav config |
| `inc/db.php` | PDO + `neuroseo_posts` table auto-create + `get_all_posts()` / `get_post()` |
| `inc/helpers.php` | `e()` escaping, `json_field()`, date & reading-time, minimal Markdown→HTML fallback |
| `inc/layout.php` | Shared header/footer + **self-contained CSS replicating THIS site's theme** |
| `inc/.htaccess` | `Require all denied` (blocks web access to `/inc`; PHP includes still work) |
| `blog-sitemap.php` | Dynamic XML sitemap of blog posts |
| `import-seed.php` + `seed/` | One-time migration of any existing hardcoded/markdown blog posts (skip if the site has no existing blog content) |
| `README-DEPLOY.md` | Site-specific record of what was configured |

Plus **edits to the React app** (§5) and **deployment** (§6).

---

## 2. The webhook contract (authoritative — do not deviate)

NeuroSEO (`headless.publisher.ts`) sends:

**Headers**
- `Content-Type: application/json`
- `X-NeuroSEO-Signature`: lowercase-hex `HMAC-SHA256(rawBody, signing_secret)`
- `X-NeuroSEO-Event`: `post.publish` (real publish) or `ping` (connection test)

**Body (dashboard `format` will be set to `html`)**
```json
{
  "title": "...", "slug": "kebab-case-slug",
  "meta_title": "...", "meta_description": "...", "excerpt": "...",
  "featured_image": { "url": "https://...", "alt": "..." },
  "faq": [{ "question": "...", "answer": "..." }],
  "tags": ["..."], "status": "publish",
  "content": "<h2>ready HTML</h2>...", "content_format": "html"
}
```
(`format=markdown` sends `content` as markdown; `format=json` sends both `content_markdown` and `content_html`. Handle all three: prefer `content_html`, then `content_format`-appropriate handling, fall back to converting markdown.)

**Receiver rules**
1. Read the **raw body** (`file_get_contents('php://input')`) BEFORE parsing — re-serializing breaks the HMAC. Reject bodies > 2 MB with 413.
2. Verify: `hash_equals(hash_hmac('sha256', $raw, SECRET), $sig)` → else **401**. Refuse to run (500) if the secret is still a placeholder.
3. `ping` → `200 {"ok":true}` and nothing else.
4. Validate slug against `/^[a-z0-9]+(?:-[a-z0-9]+)*$/` → else 400.
5. `status: "draft"` in payload → store as `draft` (hidden); anything else → `published`.
6. **Upsert by slug** (`INSERT ... ON DUPLICATE KEY UPDATE`) — republishing must update in place, never duplicate; preserve original `published_at` on update.
7. Respond `200 {"id": "<slug>", "url": "<SITE_PUBLIC_URL>/blog/<slug>"}`.
8. Non-POST → 405. DB failure → 502 (log via `error_log`).

**MySQL table `neuroseo_posts`** (auto-create via `CREATE TABLE IF NOT EXISTS` on first webhook/import; use TEXT/MEDIUMTEXT for JSON columns — shared-hosting MariaDB compatibility):
`id PK AI · slug VARCHAR(200) UNIQUE · title VARCHAR(300) · meta_title · description TEXT · excerpt TEXT · cover_image VARCHAR(600) · cover_alt VARCHAR(400) · primary_tag VARCHAR(120) · tags TEXT(json) · faq MEDIUMTEXT(json) · content_html MEDIUMTEXT · reading_time VARCHAR(20) · status VARCHAR(20) default 'published' · published_at DATETIME · updated_at DATETIME` — engine InnoDB, charset utf8mb4_unicode_ci.

---

## 3. Blog pages (PHP) — quality bar

- `/blog`: hero section + responsive card grid (cover image, primary tag, title, 2-line excerpt, reading time). Empty state if no posts.
- `/blog/<slug>`: breadcrumb (Home › Blog › title) → tag eyebrow → H1 → date + reading time → cover image → `article-body` (the stored HTML, output UNescaped — it comes from our own pipeline) → FAQ cards → tag chips → back link. Unknown slug → real 404 status + friendly message.
- **Head/SEO on both pages:** title, meta description, canonical, og:title/description/type/url/image, favicon. On article: `BlogPosting` JSON-LD (+ `FAQPage` JSON-LD when FAQs exist).
- **Escape everything** user-visible with `htmlspecialchars` EXCEPT `content_html`.

### 3.1 Design matching (the important per-site work)
The PHP pages must look native to THIS site. Do it the way Flybear did:
1. Read the site's theme source (`src/styles.css` / `globals.css` / tailwind config): extract the **actual color tokens, fonts, radii, shadows** (Flybear used oklch custom properties + Outfit/Inter from Google Fonts).
2. Read the site's React `Header`/`Footer` components and **replicate them in PHP** (topbar, nav links, CTA button, footer columns, socials, copyright) inside `inc/layout.php`.
3. Put ALL CSS **inline in a `<style>` block** in `layout.php` — do NOT reference the Vite build's hashed CSS files (filenames change every build).
4. If the site already had blog pages, replicate their exact card/article layout and their `article-body`/prose typography rules.
5. Centralize brand values (name, logo path, phones, email, address, nav array, footer categories) in `inc/config.php` `$SITE` array — mirror the site's `site.ts`/config file.

---

## 4. Config & secrets

`inc/config.php` constants:
- `DB_HOST = 'localhost'`, `DB_NAME`, `DB_USER`, `DB_PASS`
- `NEUROSEO_SIGNING_SECRET` — generate: `openssl rand -hex 32`
- `SITE_PUBLIC_URL` — the site's real production domain, `https://`, no trailing slash

**Creating the DB:** If the Hostinger MCP (`hostinger-mcp`, the normal one — NOT any "cbr" variant) is available: `hosting_listWebsitesV1({domain})` → get the hosting `username` → `hosting_createAccountDatabaseV1({username, name, user, password, website_domain})` → `hosting_listAccountDatabasesV1` to confirm the **prefixed** final name/user (e.g. `u303064311_myblog`) → put those exact values in config. If no MCP, output instructions for the user to create it in hPanel and fill config themselves.

Secrets live ONLY in `inc/config.php` (never in the React bundle, never committed to a public repo) and `/inc` is blocked by its `.htaccess`.

---

## 5. React app changes (one-time)

1. **Delete** the React blog routes (e.g. `src/routes/blog.tsx`, `src/routes/blog_.$slug.tsx`, or the Next equivalents) and remove `/blog` from any prerender `pages` list in `vite.config.ts`.
2. Change every internal Blog link (Header nav, Footer, homepage "All articles", etc.) from the router `<Link to="/blog">` to a **plain `<a href="/blog">`** — hard navigation to the PHP page. (If nav items are a typed array, add an `href` variant and branch with `"href" in n`.)
3. If a homepage section previews blog posts from a local hardcoded array, leave it (it's decorative) but make its links plain `<a href>`.
4. **`.htaccess`** (usually `public/.htaccess`, shipped with the build): add these rules **BEFORE** the prerender/SPA-fallback rules:
```apache
# ---- NeuroSEO dynamic blog (PHP + MySQL) -------------------------------
<IfModule mod_rewrite.c>
  RewriteRule ^blog/?$ /blog/index.php [L]
  RewriteRule ^blog/([a-z0-9]+(?:-[a-z0-9]+)*)/?$ /blog/view.php?slug=$1 [L,QSA]
</IfModule>
```
5. Build must pass: `npm install && npm run build`. Confirm `/blog` is NOT in the prerendered pages list.

---

## 6. Seed migration (only if the site already has blog content)

If existing posts live in `content/blog/*.md` or hardcoded arrays: copy them into `neuroseo-php/seed/`, copy any bundled cover images into `neuroseo-php/blog-assets/` (rewrite `asset:x.jpg` refs → `/blog-assets/x.jpg`), and write `import-seed.php` that parses their frontmatter, converts markdown→HTML, and upserts them into MySQL. Guard it: only runs with `?key=<NEUROSEO_SIGNING_SECRET>`. It must print what it imported and remind to delete itself.

---

## 7. Deployment (Hostinger MCP) — ⚠️ read the gotchas, they cost us a debug cycle

Deploy = build React + merge PHP + ship ONE archive:

```
npm run build                      # output typically dist/client (TanStack) — verify
cp -r neuroseo-php/{api,blog,inc,blog-assets} dist/client/
cp neuroseo-php/blog-sitemap.php dist/client/
# + import-seed.php and seed/ ONLY for the first deploy
tar -czf <scratchpad>/site_YYYYMMDD_HHMMSS.tgz -C dist/client .
```
Then `hosting_deployStaticWebsite({domain, archivePath, removeArchive: true})`.

**GOTCHA 1 — full REPLACE:** `hosting_deployStaticWebsite` **replaces the ENTIRE `public_html`**, it does NOT merge. NEVER deploy a partial archive (e.g. "just the changed PHP file") — it will wipe the whole site. Every deploy = the complete site archive.
**GOTCHA 2 — slow extract:** extraction takes ~30–90s after the API says success. Poll with `curl --retry` before judging.
**GOTCHA 3 — SPA fallback lies:** the `.htaccess` SPA fallback returns **200 + index.html shell for ANY missing path**. A `200` on a `.php` URL does NOT prove the file exists or ran — check the response **body** (PHP output vs `<!DOCTYPE html>` React shell).

**Post-deploy sequence:**
1. Wait for extraction (curl --retry on `/`).
2. If seeding: hit `https://<domain>/import-seed.php?key=<secret>`, confirm the import output.
3. Remove `import-seed.php` + `seed/` from the LOCAL merged dir and **redeploy the full archive** (that's how you delete server files — see Gotcha 1).
4. Verify (§8).

---

## 8. Acceptance criteria (verify each with curl; report the results)

- [ ] `/` and 2–3 other React pages → 200 (site intact)
- [ ] `/blog` → 200 with real post cards (or empty state) — body contains PHP-rendered HTML, not the React shell
- [ ] `/blog/<a-real-slug>` → 200 with article + JSON-LD; `/blog/nonexistent-slug-xyz` → 404 status
- [ ] `GET /api/neuroseo-webhook.php` → **405** `{"error":"method not allowed"}` (proves PHP executes)
- [ ] Signed POST test: body `{"event":"x"}` with header `X-NeuroSEO-Event: ping` and correct HMAC → `200 {"ok":true}`; wrong HMAC → **401**
- [ ] `/inc/config.php` and `/inc/db.php` → **403**
- [ ] `/blog-sitemap.php` → 200 XML listing the posts
- [ ] `import-seed.php` no longer executes (body check — see Gotcha 3)
- [ ] Republishing the same slug updates, doesn't duplicate (verify via a second signed POST with the same slug, then check `/blog` count)

---

## 9. Final report — output this to the user (they will paste it into NeuroSEO manually)

```
SITE CONNECTED-READY ✅  <domain>
NeuroSEO dashboard → Sites → <site> → CMS → Headless:
  Webhook URL    : https://<domain>/api/neuroseo-webhook.php
  Signing secret : <the generated 64-hex secret>
  Format         : html
DB: <full prefixed db name> (localhost) — creds in public_html/inc/config.php
Blog live at: https://<domain>/blog   |  Sitemap: https://<domain>/blog-sitemap.php
Suggested: add "Sitemap: https://<domain>/blog-sitemap.php" to robots.txt
```

## 10. Hard rules
- Server-rendered HTML for all blog content (SEO/GEO requirement) — no client-side post fetching.
- Never deploy partial archives. Never trust a bare 200 through the SPA fallback.
- Never put the signing secret or DB password anywhere the browser can fetch.
- Don't touch/redesign the rest of the site — this task adds the blog integration only.
- If the site's stack differs from the assumption (e.g. it's SSR with a live Node server, or not on Hostinger), STOP and tell the user which part of this PRD doesn't apply instead of forcing it.
