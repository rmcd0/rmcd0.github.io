# Troubleshooting

## The build stops with "Joran · content/posts/…"

Joran checks every post. The message names the file and the fix, for example:

```text
Joran · content/posts/2026-05-31-trip.md
"type: projet" is not one of the types in site.config.js: post, project. Fix the post or add the type to "types".
```

Open the file, correct the front matter, save: `npm start` rebuilds by itself. The full list of checks is in [writing.md](writing.md#what-the-build-checks).

## The build stops with "Joran · content/site.config.js"

A setting has a wrong value: most often `url` with a path or a trailing slash (`https://example.com/blog/`). Use the origin only, and see [deploy-github-pages.md](deploy-github-pages.md) for sub-folders.

## "SyntaxError" pointing at site.config.js

A JavaScript typo: a missing comma between two options, a missing quote, a `}` too many. The error gives the line number. VS Code underlines it in red.

## "YAMLException" / "can not read a block mapping entry"

The front matter of a post is not valid YAML. Usual causes: a title containing `:` without quotes (write `title: "Paris: day one"`), tabs instead of spaces, a missing closing `---`.

## A page I deleted is still online

`npm run build` empties `_site/` first. If you upload by hand, delete the old files on the server too (`rsync --delete`, or FileZilla's synchronised browsing).

## My new post does not appear

- Is it in `content/posts/` and does it end in `.md`?
- Is the file name `YYYY-MM-DD-slug.md`?
- `draft: true`? Drafts show only with `npm start`.
- Is the date in the future? It is published anyway; check the year in the file name.

## Images are not resized / an image is missing

- The path must start with `/assets/…` and the file be in `content/assets/…`. Names are case-sensitive on servers: `Photo.JPG` ≠ `photo.jpg`.
- `eleventy:ignore` on the image turns off resizing.
- A corrupted image prints an `[11ty/eleventy-img]` warning; the original is kept.

## The site works locally but looks broken on GitHub Pages

- Open the **Actions** tab: did the last *Deploy to GitHub Pages* run succeed?
- Settings → Pages → Source must be **GitHub Actions**, not *Deploy from a branch*.
- Links written by hand in HTML with the full address (`https://you.github.io/old/…`) are not adjusted. Write links from the root: `/journal/`.

## "npm ci" fails on GitHub

`package-lock.json` is out of date with `package.json`. Run `npm install` on your computer and commit both files.

## The terminal does not open with ~

On some keyboards `~` needs a dead key. Use `§`, the backtick key, or the `>_` button next to the search. The terminal is off when `features.terminal` is `false`.

## Port 8080 is busy

Eleventy picks the next free port and prints it (`Server at http://localhost:8081/`). To choose: `npx eleventy --serve --port=3000`.

## Still stuck?

Run `npm run check` and read the first error. Then search the [issues](https://github.com/rmcd0/joran/issues), or open one with the template: versions, steps, and the full error.

## `npm run build` gives odd results while `npm start` is running

Both write to `_site/`. Stop `npm start` (<kbd>Ctrl</kbd>+<kbd>C</kbd>) before a final build or `npm run check`.
