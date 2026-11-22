---
title: "Welcome to Joran"
description: "What this theme is, what it does, and how to make it yours in ten minutes."
lang: en
type: post
tags: ["guide", "joran"]
translationKey: welcome
image: /assets/img/wind-lines.jpg
imageAlt: "Curved lines in blue and gold on a dark background, like gusts of wind."
imageCaption: "Demo image, CC0. Replace it with yours in *content/assets/img/*."
---

Joran is a theme for [Eleventy](https://www.11ty.dev/) that gives you a complete personal site: a home page, a journal, tags, a search, feeds, and pages such as *Now* and *Uses*. It is made for people who want to **write**, not to maintain a web application.

## What you get

- **One journal** for everything: posts, projects, notes… Visitors filter by type and language, grouped by year.
- **One or two languages**: the interface comes in English and French, with a language switch in the sidebar. It is your choice, in `content/site.config.js`:
  - keep both, or swap one for another language (Spanish, German…) by adding its translation file;
  - or switch the feature off and serve the whole site in a single language.

  Whatever you choose, each post keeps its own language.
- **Light, dark and auto** themes, three palettes, and every colour is a variable you can change.
- **Fast and private**: no framework, no cookie, no tracker, fonts served by the site itself. Images are resized automatically.
- **Light on the planet**: a static site is a set of ready-made files. No server builds the page at each visit, no database answers, and the pages are small, so less data travels and less energy is used. That is why the footer of every page shows its real weight, measured by your browser, and an estimate of the CO₂ it costs: a figure in plain sight is the best reminder to keep pages light.
- **Robust**: the build checks your front matter and tells you, in plain words, what to fix.

## Surprises, in the spirit of the old web

Joran follows several [IndieWeb principles](https://indieweb.org/principles), from a community that wants personal sites to stay personal:

- **Own your data**: your posts are plain text files in your own repository, published as plain HTML, ideally on your own domain. No platform to depend on, nothing locked in, and files that will still open in twenty years.
- **Visible data, for humans first**: what machines read is what people see. An Atom feed for feed readers, microformats so IndieWeb tools understand your posts, and `rel="me"` links to show that your social profiles are yours.
- **Free and open source**: the theme is under the GNU GPL v3 (or later). Take it, change it, share it; whoever shares it, changed or not, keeps it open under the same licence. Your own texts and images stay yours.
- **Above all, have fun**: the last of these principles, and the one they put above the others. Hence the surprises:
  - a terminal: press <kbd>~</kbd> (or <kbd>§</kbd>), then type `help`, `ls journal` or `grep` followed by any word;
  - a secret theme behind the red and blue pill in the sidebar.

Other details are not principles, just a nod to the personal homepages of the 1990s and 2000s: the small blinking 88×31 button in the footer, like the badges people swapped between sites; an optional webring link, a circle of sites recommending each other; the blinking cursor after the title.

Not your style? Every playful part can be switched off in `content/site.config.js` (`features` and `footer`) for a calmer, more classic site.

## Make it yours

1. Edit `content/site.config.js`: title, address, languages, menu, social links.
2. Rewrite `content/index.md`: it is your introduction.
3. Delete the demo posts in `content/posts/` and write your first one with `npm run new -- "My first post"`.
4. Publish: push to GitHub, and the included workflow puts the site online with GitHub Pages.

The [documentation](https://github.com/rmcd0/joran/tree/main/docs) explains each step. Have a nice ride.
