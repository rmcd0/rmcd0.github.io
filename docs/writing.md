# Writing

## Posts

A post (or a project, a note…) is a Markdown file in `content/posts/`, named `YYYY-MM-DD-slug.md`:

```text
content/posts/2026-05-31-a-week-in-the-jura.md   →   /a-week-in-the-jura/   dated 31 May 2026
```

Create one with:

```bash
npm run new -- "A week in the Jura"
npm run new -- "Carte des vents" --type project --lang fr --tags "lake, wind"
npm run new -- "Half-baked idea" --draft
npm run new -- "Old story" --date 2019-04-02
```

You can group posts in sub-folders (`content/posts/2024/…`): the address does not change.

### Front matter

The block between the `---` lines at the top of the file:

| Field | Required | What it does |
| --- | --- | --- |
| `title` | **yes** | Title of the post. |
| `description` | recommended | One sentence: journal list, search, link previews, feed. A warning is printed when it is missing. |
| `lang` | recommended | Language of the text: `en`, `fr` or any other language code. Default: the main language of the site. |
| `type` | no | One of `types` in `site.config.js`. Default: `defaultType` (`post`). |
| `tags` | no | A list: `tags: ["bike", "Jura"]`. Each tag gets its page at `/tags/<tag>/`. |
| `image` | no | Path of an image in `content/` (`/assets/img/photo.jpg`) or a full URL. Shown under the title and used for link previews. |
| `imageAlt` | with `image` | What the image shows, for people who cannot see it. Use `imageAlt: ""` only for a purely decorative image. |
| `imageCaption` | no | Caption under the image. Markdown allowed: `"Photo by [Ada](https://…)"`. |
| `updated` | no | Date of the last real change, e.g. `2026-06-15`: shown as "updated", used by the sitemap and search engines. |
| `translationKey` | no | Same value on the translations of a post: they link to each other. See [i18n.md](i18n.md). |
| `alsoOn` | no | URL where the post was also published: adds "Also published on medium.com ↗". |
| `showDescription` | no | `true` shows the description as a lead paragraph under the title. |
| `draft` | no | `true`: visible with `npm start` (with a *Draft* badge), never published. |
| `permalink` | no | Choose the address yourself, e.g. to keep an old one: `permalink: /2019/04/old-post/`. |
| `slug` | no | Change only the slug part of the address, keeping the file name. |
| `noindex` | no | `true`: not in the sitemap, and search engines are asked not to index the page. |

### What the build checks

| Problem | Result |
| --- | --- |
| No `title` | build stops |
| `type` not in `site.config.js` | build stops, lists the allowed types |
| `image` file not found in `content/` | build stops, says where it looked |
| `tags` that is not a list | build stops |
| `lang` that is not a language code | build stops |
| No `description`, no `lang`, `image` without `imageAlt` | warning |

### Which type?

A **project** is something you delivered or built, with a role, a period and an outcome: something that could go on a CV. A **post** is an idea, an opinion, a tutorial, a story. When in doubt, it is a post. Add your own types (`note`, `talk`, `recipe`…) in [`site.config.js`](configuration.md#content-types).

## Markdown

Joran uses Eleventy's Markdown ([markdown-it](https://github.com/markdown-it/markdown-it), CommonMark) with typographic quotes and dashes, and raw HTML allowed. The demo post *Markdown showcase* shows every element.

- **Headings**: start at `##` (the title is the page's only `#`). `##`, `###` and `####` get an `id`, so you can link to `/my-post/#a-section`.
- **Image caption**: put a line in italics right under an image.
- **Callout**: `<p class="callout">…</p>`.
- **Code**: fenced blocks with three backticks.
- **Template code**: Markdown files are not processed as templates, so `{{ }}` in your text or code blocks is safe. To use Nunjucks in a page, add `templateEngineOverride: njk,md` to its front matter (as `colophon.md` does).

## Pages

Any `.md` file in `content/` (outside `posts/`) is a page: `content/cv.md` → `/cv/`, `content/fr/cv.md` → `/fr/cv/`.

```markdown
---
title: CV
description: My experience in one page.
---

Text…
```

Add it to the menu in `site.config.js > nav`. Front matter fields for pages: `title`, `description`, `lang`, `image`, `permalink`, `noindex`, `translationKey`, `showDescription`, and `layout` (see below).

### Layouts

| Layout | Used for |
| --- | --- |
| `page` | Default for everything: a title and text. In `content/posts/` it shows the post view. |
| `post` | The post view, for a page outside `content/posts/` that should look like a post. |
| `home` | The home page: introduction, Now, featured cards, latest post, testimonials, contact. |
| `base.njk` | The bare shell (sidebar, footer) with nothing else: for fully custom pages. |

The home layout also reads, from the page's front matter: `heading` (big title, default: `title`), `now` (Markdown, one line), `nowUrl` (link after it), `contactNote` (Markdown after the e-mail).

## Data files

Anything in `content/_data/` is available in every template: `content/_data/books.json` becomes `books`. The theme uses `testimonials.json`:

```json
[
  { "quote": "Short and true.", "author": "Ada L.", "role": "colleague" },
  { "quote": { "en": "In English.", "fr": "En français." }, "author": "Grace H." }
]
```

## Files copied as they are

Put files that must land at the root of the site unchanged in `content/static/`: `CNAME`, `.well-known/`, `keybase.txt`, `_headers`, `.htaccess`, `google1234.html`… They are copied to `_site/` as they are.
