/*
 * Template filters and helpers. Every filter here is documented in docs/architecture.md.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const WORDS_PER_MINUTE = 220;

export const getPath = (obj, key) => key.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

export function format(s, vars = {}) {
  if (typeof s !== "string") return s;
  for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return s;
}

/** Text of a value that may be a string or a { lang: string } object. */
export function localized(value, lang, fallback) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value[fallback] ?? Object.values(value)[0] ?? "";
}

export function readingTime(html = "") {
  const words = String(html).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function byYear(posts = []) {
  const groups = [];
  for (const p of posts) {
    const y = new Date(p.date).getUTCFullYear();
    if (!groups.length || groups.at(-1).year !== y) groups.push({ year: y, posts: [] });
    groups.at(-1).posts.push(p);
  }
  return groups;
}

export function slugify(s = "") {
  return String(s)
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Cache-busting: "/assets/joran/joran.js" -> "/assets/joran/joran.js?v=1a2b3c4d" */
export function makeAssetFilter({ root, fallback, noCache = false }) {
  const cache = new Map();
  const cssDir = path.join(root, "theme/includes/css");
  const jsDir = path.join(root, "theme/assets/js");
  const sources = (url) => {
    if (url === "/assets/joran/joran.css") return readdirSync(cssDir).sort().map((f) => path.join(cssDir, f));
    // main.js passes its version on to the modules it loads (terminal.js, search.js…), so it covers them all
    if (url === "/assets/joran/js/main.js") return readdirSync(jsDir).filter((f) => f.endsWith(".js")).sort().map((f) => path.join(jsDir, f));
    if (url.startsWith("/assets/joran/")) return [path.join(root, "theme/assets", url.slice("/assets/joran/".length))];
    if (url.startsWith("/assets/")) return [path.join(root, "content/assets", url.slice("/assets/".length))];
    return [];
  };
  return (url = "") => {
    if (!url.startsWith("/") || url.includes("?")) return url;
    if (noCache || !cache.has(url)) {
      const files = sources(url).filter((f) => existsSync(f));
      const h = createHash("sha1");
      for (const file of files) h.update(readFileSync(file));
      const hash = files.length ? h.digest("hex").slice(0, 8) : fallback;
      cache.set(url, hash);
    }
    return `${url}?v=${cache.get(url)}`;
  };
}

export function host(u = "") {
  try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; }
}

export function languageName(code, inLang) {
  try { return new Intl.DisplayNames([inLang || code], { type: "language" }).of(code); } catch { return code; }
}

/** Text of rendered HTML, for the search index: no tags, no code blocks, entities decoded, spaces collapsed. */
export function plainText(html = "", max = 0) {
  let t = String(html)
    .replace(/<(script|style|pre|svg)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&#8217;/g, "’").replace(/&amp;/g, "&")
    .replace(/\s+/g, " ").trim();
  if (max && t.length > max) t = t.slice(0, max);
  return t;
}
