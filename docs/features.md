# Features

Switch each one on or off in `site.config.js > features`. Everything works without JavaScript; scripts only add comfort.

## Journal and filters

`/journal/` lists every post, newest first, grouped by year. With JavaScript, visitors filter by **type** and **language** (counts on each button), switch between *By year* and *List*, and jump to a year. The filters live in the address (`/journal/?type=project&lang=fr`), so a filtered view can be shared; `?q=word` filters by text. The type filter appears when you have more than one type; the language filter, when posts exist in more than one language.

## Tags

`/tags/` shows every tag with its number of posts; `/tags/<tag>/` lists the posts. Tag addresses are simplified (`Vélo` → `/tags/velo/`).

## Search (`features.search`)

The box in the sidebar searches titles, tags, descriptions and the **full text** of every post, accents and case ignored. Several words must all be present. Results are ranked (a word in the title counts more than one in the text) and show the passage where the word was found. The index (`/search.json`) is downloaded the first time the box gets focus. Press <kbd>/</kbd> anywhere to jump to it, <kbd>↑</kbd> <kbd>↓</kbd> to pick a result, <kbd>Enter</kbd> to open it, <kbd>Esc</kbd> to close. Without JavaScript, pressing <kbd>Enter</kbd> opens the journal, where the full list can be searched with the browser's own find (<kbd>Ctrl</kbd>+<kbd>F</kbd>).

The index weighs about 1 kB per page of text. With hundreds of long posts, set `searchMaxChars: 3000` (or `searchFullText: false`) in `site.config.js`; for very large sites, [Pagefind](https://pagefind.app/) builds a split index and works well with Joran.

## Light, dark and auto (`features.themeSwitcher`)

By default the site follows the visitor's system. The ☼ and ☾ buttons force a mode, remembered in the browser (`localStorage`, no cookie). Pressing the active button again goes back to automatic. Set the starting mode with `defaultMode`.

## Rain theme (`features.rainTheme`)

A third, secret theme behind the small red and blue pill next to the mode buttons: green on black, falling glyphs, retro headings. The animation pauses when the tab is hidden and stays still for visitors who ask for reduced motion. Also reachable with `theme rain` or `redpill` in the terminal; `bluepill` goes back.

## Terminal (`features.terminal`)

Press <kbd>~</kbd> or <kbd>§</kbd> (or click `>_` next to the search). Commands: `help`, `ls journal`, `ls projects`, `cd <section>`, `open <n°|slug>`, `grep <word>` (full text, with the matching passage), `tags`, `theme light|dark|rain`, `whoami`, `neofetch`, `date`, `history`, `clear`, `exit`. <kbd>Tab</kbd> completes, <kbd>↑</kbd> <kbd>↓</kbd> recall history. It is a native `<dialog>`: focus stays inside, <kbd>Esc</kbd> closes it. The texts are in the interface dictionaries (`term.*`), so you can change them in `content/i18n/<lang>.json`. The code is loaded only when the terminal opens.

**Your own commands.** Add text replies under `term.commands` in `content/i18n/<lang>.json`, one dictionary per interface language, so each visitor gets the reply in their language. HTML is allowed (links, `<b>`). They appear in `help` and in <kbd>Tab</kbd> completion; built-in commands keep priority.

```json
{ "term": { "commands": { "cv": "Project manager, PMO. <a href=\"/hire/\">Read more</a>." } } }
```

## Footer (`footer`)

Each part has its own switch in `site.config.js > footer`:

- **Build date** (`buildDate`) and **commit** (`commit`), linked to the commit on GitHub when `repo` is set.
- **Real page weight** (`pageWeight`), measured by the visitor's browser (every file actually downloaded), with a CO₂ estimate using the [Sustainable Web Design](https://sustainablewebdesign.org/estimating-digital-emissions/) model (≈ 0.1 g per MB, a deliberately simple figure).
- **Privacy note** (`privacyNote`), linking to the colophon.
- **88×31 badge** (`badge`), the little blinking button of the old web; it stops blinking with `features.blinkingCursor: false`.
- **Webring** (`webring`), **RSS button** (`feedLink`) and **"Made with Joran"** (`madeWith`).

## Faster pages (`features.prefetch`)

When the pointer rests on a link to another page of the site (or a finger starts touching it), the browser fetches that page in advance, so it opens almost instantly. It uses the standard [Speculation Rules](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API): browsers that do not know it simply ignore it. Only pages are fetched, never run in advance, so visit counters are not affected. Add `data-no-prefetch` to a link to leave it out.

## Reading time (`features.readingTime`)

"4 min read", at 220 words a minute.

## Statistics (`analytics`)

GoatCounter, Plausible, Umami, or any other service through `analytics.custom`. Nothing is loaded when `analytics` is empty. See [configuration.md](configuration.md#statistics).

**What to tell visitors (good practice).** Be accurate and short, and link to details:

- no statistics: "0 cookies · 0 trackers";
- a cookie-free, anonymous counter: "0 cookies · anonymous visit stats". Do not write "0 trackers": a counter is one, even a respectful one;
- a service with cookies: "Privacy & cookies", and a consent banner before it loads (EU ePrivacy, Swiss nFADP).

Joran writes the right one from your settings, and the colophon's privacy section names the service. Prefer cookie-free services: no banner, nothing to manage, and visitors trust it.

## Contact

The e-mail from `email` appears on the home page with a *Copy* button, and as the `mail` icon in the sidebar. It is assembled by JavaScript, never written whole in the HTML.

## Feeds and machine-readable files

| Address | What |
| --- | --- |
| `/feed.xml` | Atom feed of every published post, full text |
| `/sitemap.xml` | Every page, with its last modification date |
| `/robots.txt` | Points to the sitemap; blocks everything when `noindex: true` |
| `/search.json` | Search index |
| `/manifest.webmanifest` | Name and icon when the site is added to a phone's home screen |
| `/404.html` | "Page not found", used by GitHub Pages, Netlify, and the Apache/nginx examples |

## Small web extras

- **Microformats**: invisible labels in the HTML that tell machines what is what. Each post is an `h-entry` (title, date, text, tags, address, author), and every page carries your **author card** (`h-card`: your name, your site's address and your avatar, from `author.name` and `avatar`). IndieWeb tools, feed readers and [Webmention](https://indieweb.org/Webmention) services use them to show who wrote what. Your e-mail is never put in it. Check your pages with [IndieWebify.me](https://indiewebify.me/).
- **`rel="me"`** on social links, and in the `<head>` for links with `verify: true`.
- **Console message** (`features.consoleMessage`) for developers who open the console.
