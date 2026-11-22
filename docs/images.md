# Images

## Where to put them

In `content/assets/img/` (sub-folders are fine). Refer to them with an address starting with `/assets/`:

```markdown
![A red train crossing a viaduct](/assets/img/2026/viaduct.jpg)
*Optional caption, in italics on the next line.*
```

For the image at the top of a post and in link previews, use the front matter:

```yaml
image: /assets/img/2026/viaduct.jpg
imageAlt: "A red train crossing a stone viaduct in the snow"
imageCaption: "Photo: me, CC BY"
```

## What happens at build time

Joran uses the official [Eleventy Image](https://www.11ty.dev/docs/plugins/image/) plugin on every `<img>` of every page, including images in Markdown:

- each image is converted to **WebP** in three widths (480, 960 and 1440 px by default; never larger than the original);
- `srcset` and `sizes` let the browser download the smallest file that fits;
- `width` and `height` are written, so the page does not jump while loading;
- `loading="lazy"` and `decoding="async"` are added (the top image of a post loads first, with `fetchpriority="high"`);
- **animated GIFs stay animated** (animated WebP);
- **SVG files are kept as SVG**.

Generated files go to `/img/` in the built site (`_site/img/`); Eleventy keeps a cache, so only new images are processed again. Originals are also published, at their own address, so links to them keep working.

Change the defaults in `site.config.js`:

```js
images: {
  widths: [480, 960, 1440],     // add 1920 for a photography site
  formats: ["avif", "webp"],    // AVIF first: smaller files, slower builds
  sizes: "(min-width: 1000px) 720px, 100vw",
},
```

## Per-image options

Write the image in HTML when you need control:

```html
<img src="/assets/img/diagram.png" alt="…" eleventy:widths="800" eleventy:formats="png">
<img src="/assets/img/keep-as-is.jpg" alt="…" eleventy:ignore>
```

- `eleventy:ignore`: no processing at all.
- `eleventy:widths`, `eleventy:formats`: override the defaults for this image.
- Your own `loading`, `sizes` or `class` attributes are kept.

## Share images (link previews)

Social networks show the `image` of the page, or `ogImage` from `site.config.js`, or the avatar. Joran resizes it to a 1200 px JPEG, which every network accepts. Best ratio: 1.91:1 (1200 × 630 px).

## Remote images

Images on another site (`https://…`) are downloaded and processed at build time too, and cached in `.cache/`. If the remote site is down, the build keeps the original address. To make your site independent, download them into `content/assets/img/`.

## Video and audio

Videos are far lighter than long GIFs. Put the file in `content/assets/video/`:

```html
<video src="/assets/video/demo.mp4" controls muted playsinline preload="metadata"></video>
<audio src="/assets/audio/interview.mp3" controls preload="none"></audio>
```

Embedded players (YouTube, Vimeo, PeerTube) load third-party trackers; consider a simple link with a thumbnail instead, or a privacy-friendly embed (e.g. `youtube-nocookie.com`).

## Writing good alternative text

Describe what matters in the image for the text around it, in one sentence, without "image of". A chart: give its main message. A decorative image: `alt=""` (empty, not missing). The build warns when a post's `image` has no `imageAlt`.

## Weight

Keep originals reasonable (under 3000 px and a few MB): the build is faster and the repository lighter. GitHub recommends repositories under 1 GB and files under 100 MB.
