---
title: "Images and media"
description: "Where to put images, how they are resized, and how to add videos."
lang: en
tags: ["guide", "images"]
image: /assets/img/jura-ridge.jpg
imageAlt: "Layers of blue mountain ridges under an orange sky, with a pale sun."
imageCaption: "The Jura at sunset. Demo image, CC0."
---

Put your images in `content/assets/img/` and use them like this:

```markdown
![What the image shows](/assets/img/my-photo.jpg)
```

At build time, every image becomes several **WebP** files (480, 960 and 1440 pixels wide by default). The browser downloads the smallest one that fits the screen. Width and height are written in the HTML, so the page doesn't jump while it loads, and images below the fold load only when the reader gets near them.

![A small hut on a green hill below snowy mountains](/assets/img/mountain-hut.jpg)
*Resized automatically: look at the page source.*

## Animated GIFs

They stay animated (as animated WebP). For long animations, a video is much lighter:

```html
<video src="/assets/video/demo.mp4" controls muted playsinline></video>
```

## Skipping the resizing

Add `eleventy:ignore` to an `<img>` written in HTML, or keep SVG files: they are copied as they are.

More in `docs/images.md`.
