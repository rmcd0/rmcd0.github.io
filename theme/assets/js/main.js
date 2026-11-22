/*
 * Joran · main script. Everything is progressive: the site works without JavaScript,
 * this only adds the theme switch, search, filters and the optional fun bits.
 * Features load on demand (search.js, filters.js, terminal.js, rain.js).
 */
const UI = JSON.parse(document.getElementById("joran-ui")?.textContent || "{}");
const V = new URL(import.meta.url).search; // cache-busting version, passed on to the modules we load
const load = (name) => import(`./${name}.js${V}`);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const t = (key, vars = {}) => {
  let s = key.split(".").reduce((o, k) => (o == null ? o : o[k]), UI.t) ?? key;
  if (typeof s === "string") for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return s;
};
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { /* private mode */ } },
};
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const href = (u) => (UI.base || "/") + String(u).replace(/^\//, "");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const F = UI.features || {};

let index = null;
const loadIndex = () => (index ??= fetch(href("search.json")).then((r) => r.json()).catch(() => []));

const ctx = { UI, $, $$, t, store, esc, href, reduced, loadIndex, load, setMode: (m) => setMode(m) };

/* ---------- theme: light / dark / rain, remembered in this browser ---------- */
const root = document.documentElement;
const darkQuery = matchMedia("(prefers-color-scheme: dark)");
const modes = $("[data-modes]");
let rainUsed = false;
function effectiveMode() { return root.dataset.mode || (darkQuery.matches ? "dark" : "light"); }
function setMode(mode, remember = true) {
  if (mode) root.dataset.mode = mode; else delete root.dataset.mode;
  if (remember) store.set("joran-mode", mode || null);
  $$("button", modes || document.createElement("div")).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === effectiveMode())));
  const pill = $(".pill", modes || document);
  if (pill) pill.title = effectiveMode() === "rain" ? pill.dataset.titleActive : pill.dataset.title;
  // rain.js is only fetched the first time the rain theme is on; afterwards it is told to stop or start
  if (F.rainTheme && (rainUsed || effectiveMode() === "rain")) { rainUsed = true; load("rain").then((m) => m.default(ctx, effectiveMode() === "rain")); }
}
if (modes) {
  modes.hidden = false;
  modes.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-mode]");
    if (!b) return;
    // pressing the active light/dark button again goes back to "follow my system"
    setMode(b.getAttribute("aria-pressed") === "true" && b.dataset.mode !== "rain" && store.get("joran-mode") ? null : b.dataset.mode);
  });
  darkQuery.addEventListener("change", () => setMode(root.dataset.mode, false));
}
if (modes || root.dataset.mode === "rain") setMode(root.dataset.mode, false);

/* ---------- mobile menu ---------- */
const toggle = $(".menu-toggle"), panel = $("#side-panel");
if (toggle && panel) {
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    panel.toggleAttribute("data-open", open);
    if (open) $("a, input, button", panel)?.focus();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.hasAttribute("data-open")) { toggle.click(); toggle.focus(); }
  });
}

/* ---------- features loaded on demand ---------- */
// search.js is fetched the first time the search box is used (focus, click or typing)
const searchInput = $("[data-search] input");
let searchStarted = false;
const startSearch = () => { if (searchStarted) return; searchStarted = true; load("search").then((m) => m.default(ctx)); };
if (F.search && searchInput) for (const ev of ["focus", "pointerdown", "input"]) searchInput.addEventListener(ev, startSearch, { once: true });
if ($("[data-filters]")) load("filters").then((m) => m.default(ctx));

/* ---------- home: testimonials, e-mail ---------- */
const allQuotes = $("[data-all-quotes]");
allQuotes?.addEventListener("click", () => {
  const extra = $$("[data-quotes] figure").slice(3);
  const open = extra[0]?.hidden;
  extra.forEach((f) => (f.hidden = !open));
  allQuotes.textContent = open ? allQuotes.dataset.less : allQuotes.dataset.more;
  allQuotes.setAttribute("aria-expanded", String(open));
});
const mailOf = (el) => `${el.dataset.mail}@${el.dataset.mailDomain}`;
$$("span[data-mail]").forEach((el) => (el.textContent = mailOf(el)));
$$("a[data-mail]").forEach((a) => (a.href = `mailto:${mailOf(a)}`));
$$("[data-copy-mail]").forEach((b) => {
  const span = $("span[data-mail]");
  if (!span) return;
  b.hidden = false;
  b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(mailOf(span)); b.textContent = b.dataset.done; }
    catch { const r = document.createRange(); r.selectNodeContents(span); getSelection().removeAllRanges(); getSelection().addRange(r); b.textContent = b.dataset.selected; }
  });
});
$$("[data-path]").forEach((el) => (el.textContent = location.pathname));

/* ---------- footer: real weight of this page, measured by the browser ---------- */
const weight = $("[data-weight]");
if (weight) addEventListener("load", () => setTimeout(() => {
  const entries = [...performance.getEntriesByType("navigation"), ...performance.getEntriesByType("resource")];
  let bytes = entries.reduce((s, e) => s + (e.transferSize || e.encodedBodySize || 0), 0);
  if (!bytes) bytes = new Blob([document.documentElement.outerHTML]).size;
  const kb = Math.round(bytes / 1024);
  const g = ((bytes / 1048576) * 0.1).toLocaleString(UI.locale, { maximumFractionDigits: 3 });
  weight.textContent = weight.dataset.template.replace("{kb}", kb).replace("{g}", g);
}, 300));

/* ---------- terminal: opened with ~ or §, or the >_ button ---------- */
if (F.terminal) {
  const open = () => load("terminal").then((m) => m.default(ctx));
  $$("[data-terminal]").forEach((b) => { b.hidden = false; b.addEventListener("click", open); });
  document.addEventListener("keydown", (e) => {
    const typing = e.target.closest?.("input, textarea, select, [contenteditable]");
    if (!typing && !e.ctrlKey && !e.metaKey && !e.altKey && (e.key === "~" || e.key === "§" || e.code === "Backquote")) { e.preventDefault(); open(); }
  });
}
document.addEventListener("keydown", (e) => {
  const q = $("[data-search] input");
  if (e.key === "/" && q && !e.target.closest?.("input, textarea, select, [contenteditable]")) { e.preventDefault(); q.focus(); }
});

/* ---------- a word for the curious ---------- */
if (F.consoleMessage) {
  console.log(`%c${UI.title}_`, "font:600 28px/1.3 monospace;color:#1b6680");
  console.log(`${t("console.headline")}${UI.email?.user ? `\n→ ${UI.email.user}@${UI.email.domain}` : ""}${F.terminal ? `\n→ ${t("console.tip")}` : ""}`);
}
