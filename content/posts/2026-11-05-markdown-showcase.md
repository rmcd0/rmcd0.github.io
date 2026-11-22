---
title: "Markdown showcase"
description: "Every element of the text style, on one page: headings, lists, quotes, code, tables, images."
lang: en
tags: ["guide", "design"]
---

This page shows how each Markdown element looks with the theme. Use it to check your colour or font changes.

## Headings and text

Text can be **bold**, *italic*, ~~struck~~, `inline code`, or a [link](https://www.11ty.dev/). Typographic quotes and dashes are automatic: "quotes" -- and dashes.

### A third-level heading

Paragraphs keep a comfortable line length, around 70 characters, which is easier to read than full-width text.

#### A fourth-level heading

Headings get an anchor, so you can link to [a section](#lists).

## Lists

- An unordered list
- with a second item
  - and a nested one

1. An ordered list
2. with a second item

Definition lists need a little HTML:

<dl><dt>Joran</dt><dd>A cold wind from the Jura, blowing over Lake Geneva.</dd><dt>Bise</dt><dd>Its cousin from the north-east.</dd></dl>

## Quotes and notes

> The wind does not break a tree that bends.
>
> — A proverb, paraphrased

<p class="callout"><strong>Tip.</strong> A paragraph with <code>class="callout"</code> stands out. Write it in HTML.</p>

## Code

```js
// eleventy.config.js: add your own filter below the line
eleventyConfig.addFilter("shout", (s) => String(s).toUpperCase());
```

## Table

| Wind | From | Season |
| --- | --- | --- |
| Joran | north-west, the Jura | storms, all year |
| Bise | north-east | winter and spring |
| Vaudaire | south-east | autumn |

## Image

![A lake at dusk with mountains behind](/assets/img/lake-evening.jpg)
*An image followed by a line in italics gets a caption style.*

---

That's all. A horizontal rule ends the page.
