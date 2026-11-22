# Configuration

All settings live in **`content/site.config.js`**. Anything you leave out keeps its default (`theme/defaults.js`), so your file can be as short as:

```js
export default {
  title: "Ada's notes",
  url: "https://ada.example",
};
```

The build checks the file: a wrong value stops it with a message that says what to change. After a change, `npm start` reloads by itself.

**Text in several languages.** Wherever a text is shown to visitors (`description`, nav `label`, type labels, `home.featuredTitle`, testimonials), you can give a plain string or one string per language: `{ en: "Notes", fr: "Carnet" }`.

## Identity

| Option | Default | What it does |
| --- | --- | --- |
| `title` | `"My site"` | Name of the site: sidebar, page titles, feed, share cards. |
| `description` | `""` | One sentence about the site. Used when a page has no `description`. |
| `url` | `"https://example.com"` | Full address, **origin only** (no path, no trailing slash). Used for canonical links, the feed, the sitemap, share cards. On GitHub Pages the workflow sets it for you ([details](deploy-github-pages.md)). |
| `author.name`, `author.url` | `""` | Author of the posts (feed, structured data, `<meta name="author">`) and name on your IndieWeb author card (`h-card`). Empty name = the site title. |
| `avatar` | `""` | Square image shown next to the title, e.g. `/assets/img/avatar.jpg`, also the photo of your author card. Empty = none. |
| `favicon` | Joran wave | Path to an `.svg`, `.png` or `.ico` in `content/assets/`. |
| `ogImage` | `""` | Default image for link previews (1200 × 630 px is ideal). Pages with an `image` use theirs. |

## Languages

| Option | Default | What it does |
| --- | --- | --- |
| `languages` | `["en"]` | Interface languages. **One language** is the simple case: everything in it, no switch, and posts can still be in other languages. With **several**, the first is served at the root and each other one gets `/<code>/` versions of the journal and tags, plus the pages you write in `content/<code>/`. Remove a code to switch that language off: its `content/<code>/` folder is then ignored (nothing to delete). |
| `locales` | `en-GB`, `fr-CH` | How dates are written for each language, e.g. `{ en: "en-US" }` for "November 18, 2026". |

Details and translated posts: [i18n.md](i18n.md).

## Navigation

```js
nav: [
  { key: "home", url: "/" },                      // label from the interface dictionary: nav.home
  { key: "journal", url: "/journal/" },
  { label: "CV", url: "/cv/" },                   // your own label
  { label: { en: "Photos", fr: "Photos" }, url: "/photos/" },
  { label: "Codeberg", url: "https://codeberg.org/me" }, // external links work too
],
footerNav: [{ key: "colophon", url: "/colophon/" }],
```

Built-in keys: `home`, `intro`, `about`, `journal`, `projects`, `tags`, `now`, `uses`, `colophon`, `changelog`, `contact`. On a page in another language, links go to the translated page (`/fr/journal/`) when it exists.

## Social links <a id="socials"></a>

```js
socials: [
  { icon: "github", label: "GitHub", url: "https://github.com/me" },
  { icon: "mastodon", label: "Mastodon", url: "https://mastodon.social/@me", verify: true },
  { icon: "mail", label: "E-mail" },   // uses `email` below
],
email: { user: "me", domain: "example.com" },
```

- A link without `url` is not shown (except `mail`, built from `email`).
- `verify: true` adds `<link rel="me">` in the page head, for [Mastodon verification](https://docs.joinmastodon.org/user/profile/#verification) and the IndieWeb.
- The e-mail address is never written whole in the HTML: JavaScript assembles it. This keeps most spam robots away. Without JavaScript, visitors see `me [at] example.com`.

Available icons ([Tabler Icons](https://tabler.io/icons), MIT):

`applepodcasts` `bandcamp` `behance` `bitbucket` `blogger` `bluesky` `buymeacoffee` `calendar` `codepen` `coffee` `cv` `deezer` `deviantart` `discord` `dribbble` `etsy` `facebook` `figma` `fiverr` `flickr` `git` `github` `gitlab` `goodreads` `gumroad` `instagram` `itch` `keyoxide` `kick` `kickstarter` `kofi` `lastfm` `letterboxd` `liberapay` `link` `linkedin` `linktree` `location` `mail` `mastodon` `matrix` `medium` `meetup` `misskey` `newsletter` `npm` `patreon` `paypal` `pgp` `phone` `pinterest` `podcast` `printables` `producthunt` `reddit` `rss` `rumble` `signal` `slack` `snapchat` `soundcloud` `sponsor` `spotify` `stackoverflow` `steam` `strava` `substack` `telegram` `thingiverse` `threads` `tidal` `tiktok` `tumblr` `twitch` `twitter` `unsplash` `upwork` `vimeo` `vk` `vsco` `webring` `website` `whatsapp` `wikipedia` `wordpress` `x` `xing` `youtube` `zwift`

An unknown name shows a generic link icon. To add an icon, create `content/icons.json` with the SVG inner markup of any [Tabler icon](https://tabler.io/icons) (the `<path>` elements, without `<svg>`):

```json
{ "codeberg": "<path d=\"M12 3l-9 18h18z\" />" }
```

## Content types

```js
types: [
  "post",
  "project",
  { key: "recipe", label: { en: "Recipe", fr: "Recette" }, plural: { en: "Recipes", fr: "Recettes" } },
],
defaultType: "post",
```

Types are the categories of the journal: one filter button each (in this order) and a label on each post (`type:` in its front matter). Examples:

```js
types: ["post"],                               // only posts: no type filter is shown
types: ["project"], defaultType: "project",    // a portfolio
types: ["post", "project", "politics"],        // e.g. an elected official's council questions and motions
types: ["post", { key: "politics", empty: { en: "Coming soon: council questions", fr: "Bientôt : interpellations" } }],
```

Built-in labels, in every interface language: `post`, `project`, `politics`, `note`, `talk`, `link`, `photo`. Give `label` and `plural` for your own. `empty` is the hint shown on the filter button while the type has no post yet. Posts without `type:` get `defaultType`. A post whose type is not in the list stops the build, with the list of allowed types.

## Addresses

| Option | Default | What it does |
| --- | --- | --- |
| `postPermalink` | `"/{slug}/"` | Address of posts. `{slug}` is the file name without date; `{year}` is also available. Examples: `"/blog/{slug}/"`, `"/{year}/{slug}/"`. A `permalink:` in a post's front matter always wins. |

## Home page and sidebar

| Option | Default | What it does |
| --- | --- | --- |
| `home.featured` | `[]` | Posts shown as cards, as many as you like: file names without date and `.md`, in this order. `[]` = no cards section and no "All … · Latest" line. |
| `home.featuredTitle` | `""` | Title of the cards section. Empty = "Selected projects" in the visitor's language. |
| `home.showLatest` | `true` | Under the cards: "All 3 projects" (journal filtered by the type of the first card) and "Latest: …". |
| `sidebar.recent.count` | `6` | Number of latest posts in the sidebar. `0` hides the list and its title. |
| `sidebar.recent.types` | `[]` | Only these types in the list, e.g. `["post"]`. Empty = all. |

The home page text and its "Now" line are in `content/index.md`; testimonials in `content/_data/testimonials.json` (delete the file to hide the section).

## Look

| Option | Default | What it does |
| --- | --- | --- |
| `palette` | `"joran"` | `"joran"` (warm paper by day; midnight purple with pink and lilac gradients by night), `"lake"` (limestone and lake blue, calmer) or `"mono"` (black and white). |
| `defaultMode` | `"auto"` | `"auto"` follows the visitor's system; `"light"` or `"dark"` forces one. Visitors can still switch, and their choice is remembered in their browser. |

Your own colours and fonts: [customization.md](customization.md).

## Features

```js
features: {
  search: true,          // search box in the sidebar
  terminal: true,        // hidden terminal (~ or §, or the >_ button)
  rainTheme: true,       // secret third theme behind the red/blue pill
  readingTime: true,     // "4 min read"
  consoleMessage: false, // a message in the browser console
  blinkingCursor: true,  // the blinking _ after the site title and in the footer badge
  themeSwitcher: true,   // light/dark buttons
  prefetch: true,        // a page is fetched when the pointer rests on its link
},
```

Each feature is described in [features.md](features.md).

Funky or calm: everything is on by default. For a calmer, classic site, set `terminal`, `rainTheme` and `blinkingCursor` to `false`, and in `footer`: `badge: null`, `pageWeight: false`.

## Footer

```js
footer: {
  buildDate: true,    // "built 2026-11-20"
  commit: true,       // "commit 1a2b3c4", linked to the commit (needs `repo`)
  pageWeight: true,   // real weight of the page and a CO₂ estimate, measured in the browser
  privacyNote: true,  // "0 cookies · 0 trackers", or the statistics wording
  badge: { text: "JORAN", tld: ".CH" },  // the little 88×31-style button; null = none
  webring: null,      // { name, url, icon }: a webring link
  feedLink: true,     // RSS button
  madeWith: true,     // "Made with Joran"
},
```

With everything off, the footer keeps only `footerNav`. If you use visit statistics, keep `privacyNote` on: visitors must be told (the build reminds you).

## Statistics

Fill one; leave everything empty for none.

```js
analytics: {
  goatcounter: "mysite",                // for mysite.goatcounter.com
  plausible: "example.com",             // domain registered on plausible.io
  umami: { src: "https://umami.example/script.js", websiteId: "…" },
  custom: {                             // any other service
    name: "Matomo",
    html: '<script defer src="https://stats.example/matomo.js"></script>',
    cookies: false,                     // true if it sets cookies
    privacyUrl: "https://matomo.org/privacy-policy/",
  },
},
```

GoatCounter, Plausible and Umami are cookie-free. The footer, the colophon (`{% include "partials/privacy.njk" %}`) and the terminal adapt by themselves:

| Setting | Footer says |
| --- | --- |
| nothing | 0 cookies · 0 trackers |
| a cookie-free service | 0 cookies · anonymous visit stats |
| `custom.cookies: true` | Privacy & cookies |

Why: a visit counter is a tracker, even an anonymous one, so "0 trackers" would no longer be true. Cookie-free, anonymous counting used only for your own statistics is exempt from consent in the EU (ePrivacy guidelines, CNIL exemption) and in Switzerland, but you must say it runs: the footer links to the privacy section of the colophon. A service that sets cookies needs the visitor's consent first (a cookie banner), which Joran does not provide; the build prints a warning. See [features.md](features.md#statistics-analytics).

## Search

| Option | Default | What it does |
| --- | --- | --- |
| `searchFullText` | `true` | The sidebar search and the terminal's `grep` look inside the whole text of posts. `false`: titles, descriptions and tags only (smaller index). |
| `searchMaxChars` | `0` | Limit of text per post in the index (`0` = all). For sites with hundreds of long posts, `3000` keeps `/search.json` small. |

## Images

```js
images: { widths: [480, 960, 1440], formats: ["webp"], sizes: "(min-width: 1000px) 720px, 100vw" },
```

Add `"avif"` before `"webp"` for even smaller files (slower builds). See [images.md](images.md).

## Extras

| Option | Default | What it does |
| --- | --- | --- |
| `feed.path`, `feed.limit` | `"/feed.xml"`, `0` | Address of the Atom feed and number of entries (`0` = all). |
| `repo` | `""` | Repository URL: makes the commit in the footer a link (`footer.commit`). |
| `noindex` | `false` | `true` asks search engines not to index the site (`robots.txt` and `<meta name="robots">`). Handy for a test copy. |

## Environment variables

Mostly for deployments; you rarely set them yourself.

| Variable | Effect |
| --- | --- |
| `SITE_URL` | Overrides `url`. The GitHub Pages workflow sets it. |
| `PATH_PREFIX` | Serves the site from a sub-folder, e.g. `/blog/`. The GitHub Pages workflow sets it for project sites. |
| `GITHUB_SHA` | Commit shown in the footer (set by GitHub Actions; otherwise read from git). |
