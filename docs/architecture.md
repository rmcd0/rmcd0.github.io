# Architecture

For contributors, and for anyone who wants to understand what happens between `content/` and `_site/`.

## Principles

1. **Content and theme are separate.** Users edit `content/` only; the theme can be replaced as a whole.
2. **No build step beyond Eleventy.** Plain CSS (cascade layers, custom properties, `light-dark()`), plain ES modules. No bundler, no framework, no transpiler.
3. **Progressive enhancement.** Every page works without JavaScript. Scripts add filters, search, the theme switch and the extras, and load only on pages that need them.
4. **Fail early, explain clearly.** Configuration and front matter are checked at build time, with messages written for non-developers.
5. **Private and light by default.** No third-party request unless the user configures one.

## Folders

```text
eleventy.config.js         user's entry point: loads the theme plugin, then user additions
content/                   Eleventy input directory (user-owned)
  site.config.js           user settings, merged over theme/defaults.js
  _data/                   global data (Eleventy data directory)
  _includes/               optional user overrides of theme partials (searched first)
  i18n/                    optional user overrides of interface strings
  assets/                  copied to /assets/ (images are also processed)
  static/                  copied to / as is
theme/
  eleventy.js              the plugin: data, collections, filters, plugins, virtual pages
  defaults.js              default settings
  lib/config.js            merge + validation of site.config.js
  lib/validate.js          front matter checks for posts
  lib/filters.js           pure helper functions used by the filters
  includes/layouts/        base, page, post, home
  includes/partials/       head, sidebar, crumb, footer, article, postlist, lang-switch, jsonld, analytics, privacy, ui-data
  includes/css/            stylesheet sources, concatenated in order into /assets/joran/joran.css
  pages/                   theme pages added as Eleventy virtual templates (journal, tags, 404, sitemap…)
  assets/                  copied to /assets/joran/ (fonts, favicon, JS modules)
  i18n/                    interface dictionaries (en, fr)
  icons.json               SVG icon bodies (Tabler Icons)
scripts/                   clean, new-post, check-links, test-empty-site, test-configs, update-theme
deploy/                    configuration examples for other hosts
```

## Build, step by step

1. `eleventy.config.js` calls the plugin `theme/eleventy.js`.
2. The plugin imports `content/site.config.js`, merges it over `theme/defaults.js`, applies `SITE_URL`, and validates (`lib/config.js`). The result is global data `site`.
3. It loads `theme/i18n/*.json` and merges `content/i18n/*.json` over them.
4. It replaces Eleventy's Nunjucks environment with one whose loader searches `content/_includes/` then `theme/includes/`, which makes partial overrides possible.
5. Global data: `site`, `build` (date, commit), `joran` (version), `uiLanguages`, `customCss`, a default `layout: page`, a default `permalink` function, and `eleventyComputed` values (`isPost`, `lang`, `uiLang`, `type`).
6. A **preprocessor** drops drafts in production and runs `lib/validate.js` on each post.
7. **Collections**: `posts` (newest first; also feeds the Atom template `theme/pages/feed.njk`), `tagList`, `tagPages` (tag × interface language), `translations` (by `translationKey`).
8. **Virtual templates**: each file in `theme/pages/` is added with `addTemplate`, unless `content/` has a file with the same name.
9. **Transforms**: Eleventy Image processes every `<img>`; the HTML Base plugin applies `PATH_PREFIX` to every URL; the Id Attribute plugin adds `id` to headings in `.prose`.

## Languages

`uiLang` is the language of the interface for a page: the page's `pageLang` (set on paginated theme pages) or `lang`, when it is one of `site.languages`; otherwise the main language. The `t` filter reads `this.ctx.uiLang`. Theme pages that exist per language (`journal`, `tags`, tag pages) paginate over `uiLanguages` and set `pageLang`.

## Filters and globals

| Name | Use |
| --- | --- |
| `t(key, vars)` | Interface string in the page's interface language, with `{placeholders}` |
| `l10n` | Picks the right language from a `{ en, fr }` value, or returns a string as is |
| `typeLabel(plural)` | Label of a content type |
| `dateFmt(style)` | Localised date (`"long"`, `"short"`) |
| `isoDate`, `year` | `2026-11-18`, `2026` |
| `readingTime` | Minutes, from rendered HTML |
| `byYear`, `ofType`, `ofTypes`, `withTag`, `bySlugs`, `limit`, `neighbours` | List helpers |
| `languagesOf`, `languageName` | Languages present in a list; `fr` → "French" in the interface language |
| `localeUrl(lang)` | `/journal/` → `/fr/journal/` when that page exists |
| `langPrefix` | `""` for the main language, `/fr` otherwise |
| `asset` | Appends `?v=<hash of the file>` for cache-busting |
| `ogImage` (async) | 1200 px JPEG for link previews |
| `mdInline` | Inline Markdown (captions, testimonials) with Eleventy's markdown-it |
| `slug`, `host`, `json` | Helpers |
| `icon(name, size)` (global) | Inline SVG icon |

## CSS

`theme/pages/joran-css.njk` includes the files of `theme/includes/css/` in order, producing one stylesheet. Layers, lowest priority first: `reset, tokens, base, layout, components, prose, themes, utilities`. User CSS is unlayered, so it wins. Colours use `light-dark()` with `color-scheme`, so a single declaration covers both modes; `[data-mode]` on `<html>` forces one.

## JavaScript

`main.js` reads the JSON in `#joran-ui` (strings, features, base URL), handles the theme switch, the mobile menu, e-mail and footer weight, and imports the other modules on demand with the same `?v=` version: `search.js`, `filters.js`, `terminal.js`, `rain.js`. Each module exports a default function that receives a small context (`t`, `$`, `esc`, `href`, `loadIndex`, `store`, `setMode`).

## Quality checks

- `npm run check`: build, `scripts/check-links.mjs` (internal links, anchors, path prefix), [html-validate](https://html-validate.org/) (`.htmlvalidate.json`).
- `npm run test:empty`: builds the theme with an empty `content/`.
- `npm run test:configs`: builds the demo with several settings (one or two languages, no featured posts, `Recent` at 0, one type, three types, each kind of statistics, a calm site, an empty footer) and checks what must show or hide.
- CI: the above on Node 22, 24 and 26, plus a build under `PATH_PREFIX=/joran/`.

## Conventions

- Interface text never lives in templates: add a key to **every** `theme/i18n/*.json`.
- New options go in `theme/defaults.js` with a safe default, and in `docs/configuration.md`.
- Keep templates readable; comment the top of each file with what it is for.
- Accessibility: semantic elements, labels for every control, `aria-pressed`/`aria-expanded` kept in sync, visible focus, contrast ≥ 4.5:1 in every palette and mode.
- Browser support: the last two versions of Chrome, Edge, Firefox and Safari (features from Baseline 2024: `light-dark()`, `:has()`, `<dialog>`, cascade layers).
