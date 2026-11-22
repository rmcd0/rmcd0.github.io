---
title: "Writing a post"
description: "File names, front matter, types, tags, languages, drafts: everything a post can say about itself."
lang: en
tags: ["guide"]
---

A post is a Markdown file in `content/posts/`. Its name gives its date and its address:

```text
content/posts/2026-11-10-writing-posts.md  →  /writing-posts/  published on 10 November 2026
```

The quickest way to create one:

```bash
npm run new -- "My title"
npm run new -- "Mon projet" --type project --lang fr
```

## Front matter

The block between the two `---` lines at the top describes the post:

```yaml
---
title: "My title"                 # required
description: "One sentence."      # shown in lists, search and link previews
lang: en                          # language of the post: en, fr…
type: post                        # one of the types in site.config.js (default: post)
tags: ["travel", "bike"]
image: /assets/img/photo.jpg      # optional, shown under the title and in link previews
imageAlt: "What the photo shows"  # describe it for people who cannot see it
imageCaption: "Photo: *me*"       # optional, Markdown allowed
updated: 2026-12-01               # optional, shown as "updated"
translationKey: my-trip           # optional, links translations of the same post
alsoOn: https://medium.com/…      # optional, "Also published on medium.com"
draft: true                       # visible with npm start, never published
permalink: /my-old-address/       # optional, to keep an old URL
---
```

## Checks

When you run `npm start` or `npm run build`, Joran reads every post. A missing title, an unknown type or an image that does not exist **stops the build** with a message that names the file and the fix. A missing description only prints a warning.

## Which type?

A *project* is something you delivered or built, with a role, a period and an outcome. A *post* is an idea, an opinion, a tutorial, a story. When in doubt, it is a post. You can add your own types in `site.config.js`.
