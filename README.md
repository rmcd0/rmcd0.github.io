# Joran

**A calm, fast and private Eleventy theme for personal sites, journals and portfolios.**

Joran is the cold wind that comes down from the Jura onto Lake Geneva and clears the sky. This theme tries to do the same for your personal site: one journal for everything you write and build, one or two languages, light and dark modes, no framework, no tracker, and a build that tells you in plain words when something is wrong.

[Features](#features) · [Quick start](#quick-start) · [Documentation](docs/README.md) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md)

---

## Features

- **One journal**: posts, projects, notes, or your own types, filterable by type and language, grouped by year. Tags, full-text search, Atom feed.
- **One or two languages**: interface in English or French; switch on a second language (`/fr/` pages and a language switch) with one line, or add your own dictionary for another one. Each post keeps its own language; translated posts are linked together (`hreflang`).
- **Looks good everywhere**: sidebar layout that becomes a menu on phones, light / dark / automatic modes, three palettes: `joran` (warm paper by day, midnight purple and pink gradients by night: a little retro, a little indie web), `lake` and `mono`. Every colour and font is a CSS variable.
- **Fast**: plain HTML, one CSS file, a few small JavaScript modules loaded only when needed. Images resized to WebP with width and height, lazy-loaded. Self-hosted fonts.
- **Private**: no cookie, no tracker, no third-party request by default. Optional statistics: GoatCounter, Plausible, Umami, or any service's snippet; the footer always says honestly what runs.
- **Found and shared**: canonical URLs, Open Graph and social cards, JSON-LD, sitemap, robots.txt, IndieWeb microformats (`h-entry`, author `h-card`), `rel="me"`.
- **Accessible**: semantic HTML, skip link, visible focus, keyboard navigation, reduced-motion support, valid HTML checked in CI.
- **Robust**: front matter checked at build time, drafts, empty-site safe, link checker, HTML validation, cache-busting for every server.
- **Easy to keep up to date**: everything you write lives in `content/`; the theme lives in `theme/` and updates with one command.
- **For the curious**: a hidden terminal (press <kbd>~</kbd> or <kbd>§</kbd>), a secret theme behind a red and blue pill, the real weight and CO₂ of each page in the footer, a blinking 88×31 badge. Each one can be switched off for a calmer, classic site.

## Quick start

You need [Node.js](https://nodejs.org/) 22 or newer and [git](https://git-scm.com/).

1. On GitHub, click **Use this template → Create a new repository**. Name it `<your-username>.github.io` for a personal site, or anything else for a project site.
2. Clone it and start the local site:

   ```bash
   git clone https://github.com/<you>/<your-repo>.git
   cd <your-repo>
   npm install
   npm start
   ```

   Open <http://localhost:8080>. The page reloads every time you save a file.
3. Edit `content/site.config.js` (title, languages, menu, links) and `content/index.md` (your introduction).
4. Replace the demo posts in `content/posts/`: `npm run new -- "My first post"`.
5. On GitHub: **Settings → Pages → Source: GitHub Actions**. Push to `main`: the site is online a minute later.

The full walkthrough, step by step, is in [docs/getting-started.md](docs/getting-started.md).

## What goes where

```text
content/              ← yours: everything you write and configure
  site.config.js      settings
  index.md            home page
  posts/              posts and projects (YYYY-MM-DD-slug.md)
  *.md                other pages (now.md → /now/)
  assets/img/         images
  _data/              testimonials and any data you want
theme/                ← the theme: updated with `npm run update-theme`
docs/                 documentation
eleventy.config.js    your own Eleventy additions (optional)
```

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Local site at <http://localhost:8080>, reloads on save, shows drafts |
| `npm run build` | Builds the final site into `_site/` |
| `npm run new -- "Title"` | Creates a post (`--type project --lang fr --tags "a, b" --draft`) |
| `npm run check` | Build, then check internal links and HTML validity |
| `npm run update-theme` | Updates `theme/`, `scripts/` and `docs/` from Joran, leaves `content/` alone |

## Documentation

| | |
| --- | --- |
| [Getting started](docs/getting-started.md) | From the template to your site online |
| [Configuration](docs/configuration.md) | Every option of `site.config.js` |
| [Writing](docs/writing.md) | Posts, pages, front matter, types, tags, drafts |
| [Images](docs/images.md) | Resizing, captions, share images, video |
| [Languages](docs/i18n.md) | Multilingual sites, translations, adding a language |
| [Customization](docs/customization.md) | Colours, fonts, your own CSS, overriding templates |
| [Features](docs/features.md) | Search, terminal, rain theme, statistics, footer |
| [GitHub Pages](docs/deploy-github-pages.md) | User site, project site, custom domain |
| [Other hosts](docs/deploy-server.md) | Apache, nginx, SSH/rsync, Netlify, Cloudflare Pages |
| [Updating](docs/updating.md) | Getting new versions of the theme |
| [Migrating](docs/migrating.md) | Coming from Jekyll, Hugo, Medium or WordPress |
| [Troubleshooting](docs/troubleshooting.md) | Common errors and their fix |
| [Architecture](docs/architecture.md) | How the theme works, for contributors |

## Built with

[Eleventy](https://www.11ty.dev/) 3 · [eleventy-img](https://www.11ty.dev/docs/plugins/image/) · [Nunjucks](https://mozilla.github.io/nunjucks/) · [Inter](https://rsms.me/inter/), [IBM Plex Mono](https://www.ibm.com/plex/), [VT323](https://fonts.google.com/specimen/VT323) (SIL OFL 1.1) · [Tabler Icons](https://tabler.io/icons) (MIT).

## Licence

Copyright © 2026 rmcd and the Joran contributors.

**Code**: Joran is free software under the [GNU General Public License, version 3 or (at your option) any later version](LICENSE) (`GPL-3.0-or-later`). You may use it, study it, change it and share it. If you share it, changed or not, you share it under the same licence, with its source.

**Your content stays yours.** Your texts, images and settings (your posts, pages and `site.config.js`) are your own work, not part of Joran: license them as you like, or not at all. Using Joran to publish your site does not put your writing under the GPL.

**Demo content** (texts and images in `content/`): [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), reuse it freely. **Fonts**: SIL Open Font License 1.1 (`theme/assets/fonts/`). **Icons**: [Tabler Icons](https://tabler.io/icons), MIT (`theme/LICENSE-Tabler-Icons.txt`). Both are compatible with the GPL.

A link back to Joran in your footer is kept by default and appreciated, never required.
