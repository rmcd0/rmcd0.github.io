/*
 * Joran: the Eleventy plugin that turns content/ into a site.
 *
 * You normally never edit this file: settings live in content/site.config.js,
 * and your own Eleventy additions go in eleventy.config.js at the root.
 * How it works is explained in docs/architecture.md.
 */
import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { HtmlBasePlugin, IdAttributePlugin } from "@11ty/eleventy";
import Image, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import nunjucks from "nunjucks";

import { merge, resolveConfig } from "./lib/config.js";
import { validatePost } from "./lib/validate.js";
import * as f from "./lib/filters.js";

const THEME = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(THEME, "..");
const CONTENT = path.join(ROOT, "content");
const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));

function gitCommit() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  try { return execSync("git rev-parse HEAD", { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); }
  catch { return ""; }
}

/* ---- interface dictionaries: theme/i18n/<lang>.json, overridable by content/i18n/<lang>.json ---- */
function loadI18n() {
  const dicts = {};
  for (const file of readdirSync(path.join(THEME, "i18n")).filter((x) => x.endsWith(".json"))) {
    dicts[file.replace(".json", "")] = readJson(path.join(THEME, "i18n", file));
  }
  const userDir = path.join(CONTENT, "i18n");
  if (existsSync(userDir)) {
    for (const file of readdirSync(userDir).filter((x) => x.endsWith(".json"))) {
      const lang = file.replace(".json", "");
      dicts[lang] = merge(dicts[lang] || {}, readJson(path.join(userDir, file)));
    }
  }
  return dicts;
}

export default async function joran(eleventyConfig) {
  const runMode = process.env.ELEVENTY_RUN_MODE || "build";
  const isDev = runMode !== "build";

  const i18n = loadI18n();
  const userConfigFile = path.join(CONTENT, "site.config.js");
  const userConfig = existsSync(userConfigFile)
    ? (await import(pathToFileURL(userConfigFile).href + `?t=${Date.now()}`)).default
    : {};
  const site = resolveConfig(userConfig, { i18nLanguages: Object.keys(i18n) });
  const langPrefix = (lang) => (lang === site.defaultLanguage ? "" : `/${lang}`);
  const build = { date: new Date().toISOString(), commit: gitCommit(), version: pkg.version, mode: runMode };

  // Settings and dictionaries are read once when the configuration loads: a change reloads it,
  // so npm start always shows the current settings (not only a rebuild with the old ones).
  eleventyConfig.addWatchTarget(userConfigFile, { resetConfig: true });
  eleventyConfig.addWatchTarget(path.join(THEME, "i18n/**"), { resetConfig: true });
  eleventyConfig.addWatchTarget(path.join(CONTENT, "i18n/**"), { resetConfig: true });
  eleventyConfig.addGlobalData("site", site);
  eleventyConfig.addGlobalData("build", build);
  eleventyConfig.addGlobalData("customCss", existsSync(path.join(CONTENT, "assets/custom.css")));
  eleventyConfig.addGlobalData("joran", { version: pkg.version, homepage: "https://github.com/rmcd0/joran" });

  /* ---- Nunjucks: your content/_includes/ first, then the theme's ---- */
  const loader = new nunjucks.FileSystemLoader([path.join(CONTENT, "_includes"), path.join(THEME, "includes")], { noCache: isDev });
  eleventyConfig.setLibrary("njk", new nunjucks.Environment(loader));

  /* ---- plugins ---- */
  eleventyConfig.addPlugin(HtmlBasePlugin); // PATH_PREFIX for every URL in the HTML. Add it only once: twice doubles the prefix.
  eleventyConfig.addPlugin(IdAttributePlugin, { selector: ".prose h2, .prose h3, .prose h4" });
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: [...new Set([...site.images.formats, "svg"])],
    svgShortCircuit: true,
    widths: site.images.widths,
    sharpOptions: { animated: true },
    failOnError: false,
    htmlOptions: { imgAttributes: { loading: "lazy", decoding: "async", sizes: site.images.sizes } },
  });


  // Folders for languages that are not in site.languages (e.g. content/fr/ when languages is ["en"])
  // are left out, so switching a language off is one line in site.config.js. Posts are never left out.
  for (const d of readdirSync(CONTENT, { withFileTypes: true })) {
    if (d.isDirectory() && /^[a-z]{2,3}(-[a-z0-9]+)?$/i.test(d.name) && !site.languages.includes(d.name)) {
      eleventyConfig.ignores.add(`content/${d.name}/**`);
      console.log(`[joran] content/${d.name}/ skipped: "${d.name}" is not in site.config.js > languages.`);
    }
  }
  eleventyConfig.ignores.add("content/README.md");
  eleventyConfig.ignores.add("content/LICENSE.md");
  eleventyConfig.ignores.add("content/_includes/**");

  /* ---- files copied as they are ---- */
  eleventyConfig.addPassthroughCopy({ [path.join(THEME, "assets")]: "assets/joran" });
  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "content/static": "/" }); // CNAME, .well-known/, keybase.txt… (optional folder)

  /* ---- drafts and front matter checks ---- */
  eleventyConfig.addPreprocessor("joran", "md", (data) => {
    const isPost = data.page.inputPath.replace(/\\/g, "/").includes("/content/posts/");
    if (data.draft && !isDev) return false; // drafts: visible with `npm start`, never published
    if (isPost) validatePost(data, site, ROOT);
  });

  /* ---- data computed for every page ---- */
  eleventyConfig.addGlobalData("eleventyComputed", {
    isPost: (d) => d.page.inputPath.replace(/\\/g, "/").includes("/content/posts/"),
    lang: (d) => d.lang || d.pageLang || site.defaultLanguage,
    uiLang: (d) => {
      const l = d.pageLang || d.lang;
      return site.languages.includes(l) ? l : site.defaultLanguage;
    },
    type: (d) => (d.page.inputPath.includes("/content/posts/") ? d.type || site.defaultType : d.type),
  });
  // Default addresses. A `permalink` in front matter always wins.
  //   posts:  content/posts/2024-05-01-my-trip.md -> /my-trip/   (site.postPermalink)
  //   pages:  content/now.md -> /now/,  content/fr/index.md -> /fr/
  eleventyConfig.addGlobalData("permalink", () => (d) => {
    const stem = d.page.filePathStem;
    if (d.page.outputFileExtension && d.page.outputFileExtension !== "html") return `${stem}.${d.page.outputFileExtension}`;
    if (d.page.inputPath.replace(/\\/g, "/").includes("/content/posts/")) {
      return site.postPermalink.replace("{slug}", f.slugify(d.slug || d.page.fileSlug)).replace("{year}", d.page.date.getUTCFullYear());
    }
    return stem.endsWith("/index") ? stem.slice(0, -"index".length) : `${stem}/`;
  });
  eleventyConfig.addGlobalData("layout", "page");

  /* ---- collections ---- */
  const postGlob = "content/posts/**/*.md";
  const published = (api) => api.getFilteredByGlob(postGlob).filter((p) => !p.data.draft || isDev);
  eleventyConfig.addCollection("posts", (api) => published(api).sort((a, b) => b.date - a.date));
  eleventyConfig.addCollection("tagList", (api) => {
    const count = {};
    for (const p of published(api)) for (const t of [].concat(p.data.tags || [])) count[t] = (count[t] || 0) + 1;
    return Object.entries(count)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, n]) => ({ name, n, slug: f.slugify(name) }));
  });
  // One entry per tag and interface language, for the paginated tag pages
  eleventyConfig.addCollection("tagPages", (api) => {
    const names = new Set(published(api).flatMap((p) => [].concat(p.data.tags || [])));
    return site.languages.flatMap((lang) => [...names].map((name) => ({ name, slug: f.slugify(name), lang, prefix: langPrefix(lang) })));
  });
  // One entry per interface language, for the paginated journal and tag index
  eleventyConfig.addGlobalData("uiLanguages", site.languages.map((lang) => ({ lang, prefix: langPrefix(lang) })));
  // Pages that are translations of each other share a `translationKey`
  eleventyConfig.addCollection("translations", (api) => {
    const map = {};
    for (const p of api.getAll()) {
      const k = p.data.translationKey;
      if (k && p.url) (map[k] ||= []).push({ lang: p.data.lang, url: p.url, title: p.data.title });
    }
    return map;
  });

  /* ---- filters ---- */
  const uiLangOf = (ctx) => ctx?.uiLang || ctx?.pageLang || site.defaultLanguage;
  const tr = (lang, key) => f.getPath(i18n[lang], key) ?? f.getPath(i18n.en, key);
  eleventyConfig.addFilter("t", function (key, vars) {
    const v = tr(uiLangOf(this.ctx), key);
    return v === undefined ? key : f.format(v, vars);
  });
  // Only the strings the browser scripts use (search, filters, terminal, console), to keep pages light
  const JS_KEYS = ["a11y", "sidebar", "post", "term", "console"];
  eleventyConfig.addFilter("i18nDict", (lang) => { const d = merge(i18n.en, i18n[lang] || {}); return Object.fromEntries(JS_KEYS.map((k) => [k, d[k]])); });
  eleventyConfig.addFilter("l10n", function (value) { return f.localized(value, uiLangOf(this.ctx), site.defaultLanguage); });
  eleventyConfig.addFilter("typeLabel", function (key, plural = false) {
    const lang = uiLangOf(this.ctx);
    const custom = site.types.find((t) => t.key === key);
    const fromConfig = plural ? custom?.plural : custom?.label;
    if (fromConfig) return f.localized(fromConfig, lang, site.defaultLanguage);
    const v = tr(lang, `types.${key}`);
    if (Array.isArray(v)) return plural ? v[1] : v[0];
    return key.charAt(0).toUpperCase() + key.slice(1);
  });
  eleventyConfig.addFilter("dateFmt", function (d, style = "long") {
    const date = d instanceof Date ? d : new Date(d);
    const locale = site.locales[uiLangOf(this.ctx)] || uiLangOf(this.ctx);
    const opts = style === "short" ? { day: "numeric", month: "short" } : { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat(locale, { ...opts, timeZone: "UTC" }).format(date);
  });
  eleventyConfig.addFilter("atomDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("year", (d) => new Date(d).getUTCFullYear());
  eleventyConfig.addFilter("readingTime", f.readingTime);
  eleventyConfig.addFilter("byYear", f.byYear);
  eleventyConfig.addFilter("ofType", (posts, type) => posts.filter((p) => p.data.type === type));
  eleventyConfig.addFilter("ofTypes", (posts, types) => (types?.length ? posts.filter((p) => types.includes(p.data.type)) : posts));
  eleventyConfig.addFilter("withTag", (posts, tag) => posts.filter((p) => [].concat(p.data.tags || []).includes(tag)));
  eleventyConfig.addFilter("bySlugs", (posts, slugs) => (slugs || []).map((s) => posts.find((p) => p.fileSlug === s || p.data.slug === s)).filter(Boolean));
  eleventyConfig.addFilter("published", (posts = []) => posts.filter((p) => !p.data.draft));
  eleventyConfig.addFilter("limit", (arr = [], n) => arr.slice(0, n ?? 8));
  eleventyConfig.addFilter("neighbours", (posts, page) => {
    const i = posts.findIndex((p) => p.url === page.url);
    return i < 0 ? {} : { newer: posts[i - 1], older: posts[i + 1] };
  });
  eleventyConfig.addFilter("languagesOf", (posts) => [...new Set(posts.map((p) => p.data.lang).filter(Boolean))].sort());
  eleventyConfig.addFilter("languageName", function (code) { return f.languageName(code, uiLangOf(this.ctx)); });
  eleventyConfig.addFilter("slug", f.slugify);
  eleventyConfig.addFilter("plainText", f.plainText);
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v).replace(/</g, "\\u003c"));
  eleventyConfig.addFilter("host", f.host);
  eleventyConfig.addFilter("asset", f.makeAssetFilter({ root: ROOT, fallback: (build.commit || build.date).replace(/\W/g, "").slice(0, 8) }));
  // "/journal/" -> "/fr/journal/" on a French page, when that page exists
  eleventyConfig.addFilter("localeUrl", function (url, lang) {
    lang ||= uiLangOf(this.ctx);
    if (!url?.startsWith("/") || lang === site.defaultLanguage) return url;
    const all = this.ctx?.collections?.all || [];
    const candidate = `/${lang}${url}`;
    return all.some((p) => p.url === candidate) || ["/journal/", "/tags/"].includes(url) ? candidate : url;
  });
  eleventyConfig.addFilter("langPrefix", langPrefix);
  // Inline Markdown (captions, testimonials) with Eleventy's own markdown-it
  let md;
  eleventyConfig.amendLibrary("md", (lib) => { md = lib; lib.set({ typographer: true }); });
  eleventyConfig.addFilter("mdInline", (s = "") => (md ? md.renderInline(String(s)) : s));

  // Share image: resized to 1200 px JPEG so that every social network accepts it
  const absolute = (u) => site.url + (process.env.PATH_PREFIX || "/").replace(/\/$/, "") + u;
  eleventyConfig.addAsyncFilter("ogImage", async (src) => {
    if (!src) return "";
    if (/^https?:/.test(src)) return src;
    const file = path.join(CONTENT, src);
    if (!existsSync(file) || file.endsWith(".svg")) return absolute(src);
    // Written next to the other generated images (<output>/img/), whatever the output folder is
    const meta = await Image(file, { widths: [1200], formats: ["jpeg"], outputDir: path.join(eleventyConfig.directories.output, "img/og/"), urlPath: "/img/og/" });
    return absolute(meta.jpeg[0].url);
  });

  /* ---- icons: {{ icon("github", 18) }}, list in theme/icons.json (Tabler Icons, MIT) ---- */
  const ICONS = readJson(path.join(THEME, "icons.json"));
  if (existsSync(path.join(CONTENT, "icons.json"))) Object.assign(ICONS, readJson(path.join(CONTENT, "icons.json")));
  eleventyConfig.addNunjucksGlobal("icon", (name, size = 18) => {
    const i = ICONS[name] || ICONS.link;
    const o = typeof i === "string" ? { body: i } : i;
    return `<svg viewBox="${o.viewBox || "0 0 24 24"}" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${o.strokeWidth || 1.75}" stroke-linecap="${o.linecap || "round"}" stroke-linejoin="round" aria-hidden="true" focusable="false">${o.body}</svg>`;
  });

  /* ---- pages provided by the theme (journal, tags, 404, feeds…), from theme/pages/ ---- */
  for (const file of readdirSync(path.join(THEME, "pages"))) {
    const userOverride = path.join(CONTENT, file.replace(/\.njk$/, ".md"));
    if (existsSync(userOverride) || existsSync(path.join(CONTENT, file))) continue; // your own version wins
    eleventyConfig.addTemplate(`joran/${file}`, readFileSync(path.join(THEME, "pages", file), "utf8"));
  }

  eleventyConfig.setServerOptions({ showAllHosts: false });
  eleventyConfig.setQuietMode(true);
}

export const config = {
  dir: { input: "content", includes: "../theme/includes", layouts: "../theme/includes/layouts", data: "_data", output: "_site" },
  markdownTemplateEngine: false,
  htmlTemplateEngine: "njk",
  templateFormats: ["md", "njk", "html"],
  pathPrefix: process.env.PATH_PREFIX || "/",
};
