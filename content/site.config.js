/*
 * Your site's settings. This is the main file you edit.
 *
 * Anything you leave out keeps its default value (theme/defaults.js).
 * Every option is explained in docs/configuration.md.
 * After a change, `npm start` reloads the site by itself.
 */
export default {
  /* ---- identity ---- */
  title: "joran",
  // A plain string, or one text per language: { en: "…", fr: "…" }
  description: {
    en: "Demo of Joran, a calm and fast Eleventy theme for personal sites, journals and portfolios.",
    fr: "Démo de Joran, un thème Eleventy sobre et rapide pour sites perso, journaux et portfolios.",
  },
  // Full address of the site: origin only, no path, no trailing slash.
  // On GitHub Pages the deploy workflow sets it for you (see docs/deploy-github-pages.md).
  url: "https://example.com",
  author: { name: "Joran demo", url: "" },
  avatar: "/assets/img/avatar.jpg",      // square image in content/assets/img/, or "" for none
  ogImage: "/assets/img/og-default.jpg", // shown in link previews when a page has no image of its own
  // favicon: "/assets/favicon.svg",     // default: the Joran wave

  /* ---- languages ----
     ONE language (the usual case): the whole interface is in it, no language switch is shown.
     Posts can still be in any language: set lang: in their front matter.
       languages: ["en"]
     SEVERAL languages: the first is served at the root; each other one gets /<code>/ pages
     (journal, tags, and the pages you write in content/<code>/, e.g. content/fr/index.md),
     plus a language switch. Remove the code again to switch it off: content/<code>/ is then ignored.
       languages: ["en", "fr"]
     Interface texts exist in English and French; any other language can be added (docs/i18n.md). */
  languages: ["en", "fr"],

  /* ---- navigation ----
     key: label from the interface dictionary (nav.home, nav.journal, nav.now…)
     or label: "Text" (or { en: "Text", fr: "Texte" }) for your own entries. External URLs work too. */
  nav: [
    { key: "home", url: "/" },
    { key: "journal", url: "/journal/" },
    { key: "tags", url: "/tags/" },
    { key: "now", url: "/now/" },
    { key: "uses", url: "/uses/" },
  ],
  footerNav: [
    { key: "colophon", url: "/colophon/" },
    { key: "changelog", url: "/changelog/" },
  ],

  /* ---- social links: icons in the sidebar, in this order. No url = not shown.
     About 90 icons (github, mastodon, bluesky, youtube, strava…): list in docs/configuration.md#socials
     verify: true adds <link rel="me"> (Mastodon verification, IndieWeb). */
  socials: [
    { icon: "github", label: "GitHub", url: "https://github.com/rmcd0/joran" },
    { icon: "bluesky", label: "Bluesky", url: "https://bsky.app/" },
    { icon: "discord", label: "Discord", url: "https://discord.com" },
    { icon: "mastodon", label: "Mastodon", url: "https://joinmastodon.org" },
    { icon: "twitter", label: "X", url: "https://x.com" },
    { icon: "facebook", label: "Facebook", url: "https://facebook.com" },
    { icon: "instagram", label: "Instagram", url: "https://instagram.com" },
    { icon: "youtube", label: "YouTube", url: "https://youtube.com" },
    { icon: "soundcloud", label: "Soundcloud", url: "https://soundcloud.com" },
    { icon: "twitch", label: "Twitch", url: "https://twitch.com" },
    { icon: "webring", label: "webring", url: "https://webring.xxiivv.com/#random" },
    { icon: "mail", label: "E-mail" }, // built from `email` below
  ],

  /* E-mail in two parts: never written whole in the HTML, which keeps most spam robots away. */
  email: { user: "hello", domain: "example.com" },

  /* ---- content types ----
     The categories of the journal: one filter button each, a label on each post (type: in front matter).
     As many as you want, in this order. Only one type = no type filter is shown.
     Built-in labels (in every interface language): post, project, politics, note, talk, link, photo.
       types: ["post"]                          only posts
       types: ["post", "project", "politics"]   three categories
     Your own, with its labels:
       { key: "recipe", label: { en: "Recipe", fr: "Recette" }, plural: { en: "Recipes", fr: "Recettes" } }
     Optional `empty` text, shown on the filter button while the type has no post yet:
       { key: "politics", empty: { en: "Coming soon: council questions and motions" } } */
  types: ["post", "project"],
  defaultType: "post", // type of posts that have no type: in their front matter

  /* Address of posts. {slug} = file name without the date. Also available: {year}.
     Examples: "/{slug}/" (default), "/blog/{slug}/", "/{year}/{slug}/" */
  postPermalink: "/{slug}/",

  /* ---- home page ---- */
  home: {
    /* Cards on the home page: as many as you like, in this order (3 per row on a wide screen).
       File names in content/posts/, without the date and .md.
       [] = no cards section, and no "All projects · Latest: …" line either. */
    featured: ["lake-cleanup-day", "mountain-hut-bookings", "open-wind-map"],
    featuredTitle: "",  // empty = "Selected projects" in the visitor's language
    showLatest: true,   // the "All 3 projects · Latest: …" line under the cards
  },
  /* "Recent" list in the sidebar: how many latest posts (0 = no list), and of which types ([] = all).
     Example: { count: 5, types: ["post", "project"] } leaves the other types out. */
  sidebar: { recent: { count: 6, types: [] } },

  /* ---- look ----
     palette: "joran" (default: warm paper by day, midnight purple and pink by night),
              "lake" (calmer: limestone and lake blue) or "mono" (black and white).
     defaultMode: "auto" follows the visitor's system; "light" or "dark" forces one.
     Fine-tune colours and fonts in content/assets/custom.css (docs/customization.md). */
  palette: "joran",
  defaultMode: "auto",

  /* ---- features: switch any of them off ----
     Funky (the default): everything on.
     Calm and classic: keep search, readingTime, themeSwitcher and prefetch; set terminal, rainTheme
     and blinkingCursor to false, and in footer below: badge: null, pageWeight: false. */
  features: {
    search: true,        // search box in the sidebar
    terminal: true,      // hidden terminal: press ~ or §, or click >_
    rainTheme: true,     // a third, secret theme behind the red/blue pill
    readingTime: true,   // "4 min read" on posts
    consoleMessage: false, // a hello in the browser's developer console
    blinkingCursor: true,  // the blinking _ after the site title and in the footer badge
    themeSwitcher: true,   // light/dark buttons
    prefetch: true,        // pages open faster: a link is fetched when the pointer rests on it
  },

  /* ---- visit statistics (optional) ----
     Fill ONE of them. All empty = no statistics.
     The footer adapts by itself, so it always tells the truth:
       nothing          → "0 cookies · 0 trackers"
       a cookie-free one → "0 cookies · anonymous visit stats"
       one with cookies  → "Privacy & cookies" (and you need a consent banner in the EU / Switzerland)
     The colophon's privacy section names the service. Details: docs/features.md#statistics-analytics */
  analytics: {
    goatcounter: "", // "mysite" for mysite.goatcounter.com (free for personal sites, no cookies)
    plausible: "",   // your domain as registered on plausible.io (no cookies)
    umami: { src: "", websiteId: "" }, // Umami Cloud or self-hosted (no cookies)
    // Any other service (Matomo, Pirsch, Fathom, Cloudflare Web Analytics, Simple Analytics…):
    // paste the snippet it gives you, and say honestly whether it sets cookies.
    custom: {
      name: "",       // e.g. "Matomo"
      html: "",       // e.g. '<script defer src="https://…" data-site="…"></script>'
      cookies: false, // true if the service sets cookies
      privacyUrl: "", // link to the service's privacy page, shown in the colophon
    },
  },

  /* ---- images: sizes generated for every <img> (docs/images.md) ---- */
  images: { widths: [480, 960, 1440], formats: ["webp"] },

  /* ---- footer: switch each part on or off ---- */
  footer: {
    buildDate: true,   // "built 2026-11-20"
    commit: true,      // "commit 1a2b3c4", linked to GitHub (needs repo below)
    pageWeight: true,  // real weight of the page and a CO₂ estimate, measured in the visitor's browser
    privacyNote: true, // "0 cookies · 0 trackers": keep it on if you use visit statistics
    badge: { text: "JORAN", tld: ".CH" }, // the little blinking 88×31 button; null = none
    webring: { name: "XXIIVV webring", url: "https://webring.xxiivv.com/#random" }, // a circle of personal sites; null = none
    feedLink: true,    // RSS button
    madeWith: true,    // "Made with Joran"
  },

  /* ---- little extras ---- */
  repo: "https://github.com/rmcd0/joran", // links the commit shown in the footer
  noindex: false, // true asks search engines not to index the site (staging, tests)
};
