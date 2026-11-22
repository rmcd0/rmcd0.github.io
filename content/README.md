# content/: your site

Everything that belongs to you lives in this folder. Theme updates never touch it.

| What | Where |
| --- | --- |
| Settings (title, address, languages, menu, socials, features) | `site.config.js` |
| Home page | `index.md` (and `fr/index.md`, one per extra language) |
| Posts and projects | `posts/YYYY-MM-DD-my-slug.md` |
| Other pages (Now, Uses, Colophon…) | any `*.md` here: `now.md` becomes `/now/` |
| Images, favicon, your own CSS | `assets/` (`assets/img/`, `assets/custom.css`) |
| Testimonials on the home page | `_data/testimonials.json` |
| Your own versions of theme parts | `_includes/partials/` (copy from `theme/includes/partials/`) |
| Changed interface texts | `i18n/<lang>.json` (only the keys you change) |
| Files copied as they are to the site root (CNAME, .well-known…) | `static/` |

The demo content (texts and images) is CC0: reuse it, or delete it. Start with docs/getting-started.md.
