# Customization

From the smallest change to the biggest. Everything here survives theme updates, because it lives in `content/`.

## 1. Palette and mode

In `site.config.js`:

```js
palette: "joran",    // "joran" (default) · "lake" · "mono"
defaultMode: "auto", // "auto" · "light" · "dark"
```

## 2. Colours, fonts, sizes: `content/assets/custom.css`

Create `content/assets/custom.css`. Joran loads it after its own stylesheet, on every page, as soon as the file exists. Its rules are outside any [cascade layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), so they always win over the theme.

The theme is built on **design tokens**: CSS custom properties defined in `theme/includes/css/10-tokens.css`. Override the ones you want:

```css
:root {
  /* light-dark(<light mode>, <dark mode>) */
  --accent: light-dark(#a4161a, #ff8a8a);
  --bg: light-dark(#fffdf8, #111111);
  --sidebar-width: 18rem;
  --measure: 40rem;        /* width of the text column */
  --radius: 4px;
}
```

The `joran` palette uses gradients in dark mode only: in light mode each pair (`--grad-a`/`--grad-b`, …) has the same colour twice, so it looks flat. Main tokens:

| Token | Role |
| --- | --- |
| `--bg`, `--bg-side`, `--surface`, `--hover` | Page, sidebar, cards and code, hovered items |
| `--fg`, `--muted`, `--heading` | Text, secondary text, headings |
| `--line` | Borders and separators |
| `--accent`, `--accent-fg` | Links, active items, focus ring; text on accent backgrounds |
| `--bg-top` | Top colour of the page background gradient (same as `--bg` for a flat background) |
| `--side-a`, `--side-b` | Sidebar gradient, top and bottom |
| `--grad-a`, `--grad-b` | Gradient of the page titles (same colour twice for plain titles) |
| `--active-a`, `--active-b` | Gradient of the current menu item and pressed buttons |
| `--rule-a`, `--rule-b` | Gradient of the line under the breadcrumb bar |
| `--glow-1`, `--glow-2` | The two soft halos in the page background (`transparent` to remove) |
| `--tag-1` … `--tag-4` | Tag cloud colours |
| `--lang-en`, `--lang-fr`, `--lang-other` (and `-fg`) | Language badges on posts; every other language uses `--lang-other` |
| `--badge-bg`, `--badge-fg`, `--badge-accent` | The 88×31 button in the footer |
| `--font-retro` | Headings of the rain theme |
| `--font-text`, `--font-mono`, `--font-display` | Body text, dates and code, headings |
| `--text-xs` … `--text-xl`, `--leading` | Type scale and line height |
| `--space-1` … `--space-8` | Spacing scale |
| `--radius-sm`, `--radius`, `--radius-pill` | Corners |
| `--sidebar-width`, `--measure` | Layout widths |

Keep text contrast at **4.5:1** at least ([WCAG](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)); check with a tool such as [WebAIM's contrast checker](https://webaim.org/resources/contrastchecker/).

### Your own font

Put the `.woff2` file in `content/assets/fonts/`, then:

```css
@font-face {
  font-family: "Atkinson Hyperlegible";
  src: url("fonts/atkinson-hyperlegible.woff2") format("woff2");
  font-display: swap;
}
:root { --font-text: "Atkinson Hyperlegible", system-ui, sans-serif; }
```

(The URL is relative to `/assets/custom.css`.) Check the font's licence allows self-hosting; most on [Google Fonts](https://fonts.google.com/) and [Fontsource](https://fontsource.org/) do.

### Your own palette

```css
:root[data-palette="forest"] {
  --bg: light-dark(#f3f5ef, #0e140f);
  --accent: light-dark(#2f6b3a, #8fd49c);
  /* … any other token … */
}
```

and `palette: "forest"` in `site.config.js`.

## 3. Your own Eleventy filters, shortcodes, plugins

In `eleventy.config.js`, below the line:

```js
export default async function (eleventyConfig) {
  await eleventyConfig.addPlugin(joran);

  // ---- your additions ----
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));
  eleventyConfig.addPlugin(somePlugin, { /* … */ });
}
```

See the [Eleventy configuration docs](https://www.11ty.dev/docs/config/) and the list of [plugins](https://www.11ty.dev/docs/plugins/).

## 4. Overriding a part of the theme

Copy a file from `theme/includes/partials/` into **`content/_includes/partials/`** (same name) and edit your copy. Joran looks in `content/_includes/` first. Examples:

| Copy | To change |
| --- | --- |
| `partials/footer.njk` | the footer |
| `partials/sidebar.njk` | the sidebar |
| `partials/article.njk` | how a post looks |
| `partials/head.njk` | add a `<meta>`, a stylesheet, a script |
| `partials/analytics.njk` | another statistics service |

Copy as little as possible: a copied file no longer receives theme fixes. Compare it with the new version after an update (`git diff` or `npm run update-theme`, which lists the changes).

## 5. Replacing a whole theme page

The journal, tags, 404, feed, sitemap and robots.txt come from `theme/pages/`. To replace one, create a file with the same name in `content/`: `content/journal.njk` (or `.md`) replaces the theme's journal. Use the theme's file as a starting point.

## 6. Your own layout

Layouts live in `theme/includes/layouts/`. For a page with a completely different look, create your own Nunjucks file in `content/_includes/` and use it as a partial from a page that has `layout: base.njk`, or write the page in `.njk` directly:

```njk
---
layout: base.njk
title: Photos
---
<h1>{{ title }}</h1>
{% include "photo-grid.njk" %}
```

## 7. JavaScript

`theme/assets/js/main.js` loads the other modules only when a page needs them. For your own script, put it in `content/assets/js/` and add it through a copy of `partials/head.njk`, with `<script type="module" src="/assets/js/mine.js"></script>`.
