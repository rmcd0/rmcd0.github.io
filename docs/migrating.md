# Migrating to Joran

The main goal when moving a site: **keep every old address working**, so links from elsewhere and search results do not break.

## From Jekyll

Jekyll posts (`_posts/2019-04-02-my-post.md`) already use the same file naming. Copy them to `content/posts/` and adapt the front matter:

| Jekyll | Joran |
| --- | --- |
| `layout: post` | remove it (every file in `content/posts/` gets the post layout) |
| `excerpt:` / `summary:` | `description:` |
| `feature:` / `image.feature:` / `cover:` | `image:` (+ `imageAlt:`) |
| `categories:` | `tags:` (or `type:` if they were *project / post* style categories) |
| `date: 2019-04-02 10:00` | can stay, or be removed (the file name gives the date) |
| `{% include … %}`, `{{ site.… }}` | remove, or add `templateEngineOverride: njk,md` and adapt |

**Addresses.** Jekyll's default is `/:categories/:year/:month/:day/:title.html`; many themes use `/:title/` or `/:year/:month/:title/`. Check what your old site used (look at a few real URLs), then:

- if it was `/:title/`, nothing to do: Joran's default `postPermalink: "/{slug}/"` matches;
- if it was `/:year/:title/`, set `postPermalink: "/{year}/{slug}/"`;
- otherwise give each post its old address: `permalink: /2019/04/02/my-post.html`.

Images in `assets/images/` → `content/assets/img/`, then search and replace the paths.

## From Hugo

Content in `content/posts/my-post.md` or `content/posts/my-post/index.md` (page bundles). Rename files to `YYYY-MM-DD-slug.md` (or keep the name and set `date:` in front matter). Convert TOML front matter (`+++`) to YAML (`---`). `summary` → `description`, `images: [...]` → `image:`, `categories` → `tags`. Shortcodes (`{{</* figure */>}}`) become plain Markdown or HTML.

## From Medium

Medium's *Download your information* export gives one HTML file per post. Convert them to Markdown with a tool such as [medium-to-markdown](https://github.com/dtesler/medium-to-markdown) or [turndown](https://github.com/mixmark-io/turndown), download the images into `content/assets/img/`, and add `alsoOn:` with the Medium URL to keep the link. Ask Medium to set the canonical URL to your site if you keep both.

## From WordPress

Export from *Tools → Export*, then convert with [wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown): it creates Markdown files with front matter and downloads images. Keep WordPress addresses with `permalink:` or `postPermalink` (WordPress often uses `/%year%/%monthnum%/%postname%/`).

## Redirects

GitHub Pages cannot send real redirects. For a page whose address must change, create a small page at the old address:

```markdown
---
permalink: /old-address/
layout: false
eleventyExcludeFromCollections: true
---
<!doctype html><meta charset="utf-8"><title>Moved</title>
<meta http-equiv="refresh" content="0; url=/new-address/">
<link rel="canonical" href="/new-address/">
<p>This page moved to <a href="/new-address/">/new-address/</a>.</p>
```

On Apache, nginx, Netlify or Cloudflare, prefer real `301` redirects (`Redirect 301 /old /new` in `.htaccess`, a `_redirects` file on Netlify and Cloudflare).

## After moving

- `npm run check` finds broken internal links and invalid HTML.
- Search your posts for leftovers of the old site: `grep -rn "{%" content/posts`, `grep -rn "assets/images" content/`.
- Keep the old site's repository history if you can: see [deploy-github-pages.md](deploy-github-pages.md#moving-an-existing-github-pages-site-to-joran).
