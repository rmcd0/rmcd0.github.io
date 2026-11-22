/*
 * Loads content/site.config.js, merges it over theme/defaults.js and checks it.
 * Problems that would break the site stop the build with a clear message;
 * the rest prints a warning.
 */
import defaults from "../defaults.js";

const isObject = (v) => v && typeof v === "object" && !Array.isArray(v);

export function merge(base, over) {
  if (!isObject(over)) return over === undefined ? base : over;
  const out = { ...base };
  for (const [k, v] of Object.entries(over)) out[k] = isObject(v) && isObject(base?.[k]) ? merge(base[k], v) : v;
  return out;
}

export class JoranError extends Error {
  constructor(where, message) {
    super(`\n\n  Joran · ${where}\n  ${message}\n`);
    this.name = "JoranError";
  }
}

export const warn = (where, message) => console.warn(`[joran] ${where}: ${message}`);

export function resolveConfig(user = {}, { i18nLanguages = [] } = {}) {
  const site = merge(defaults, user);
  const where = "content/site.config.js";

  // Environment overrides, used by the GitHub Pages workflow.
  if (process.env.SITE_URL) site.url = process.env.SITE_URL;
  site.url = String(site.url || "").replace(/\/+$/, "");

  let parsed;
  try { parsed = new URL(site.url); } catch {
    throw new JoranError(where, `"url" must be a full address such as "https://example.com" (got "${site.url}").`);
  }
  if (parsed.pathname !== "/" && parsed.pathname !== "") {
    throw new JoranError(where, `"url" must not contain a path ("${parsed.pathname}"). For a site served from a sub-folder, see docs/deploy-github-pages.md (path prefix).`);
  }

  if (!Array.isArray(site.languages) || !site.languages.length) {
    throw new JoranError(where, `"languages" must be a list with at least one language code, e.g. ["en"].`);
  }
  for (const l of site.languages) {
    if (!i18nLanguages.includes(l)) warn(where, `no interface dictionary for "${l}": English is used. Create content/i18n/${l}.json to translate it (docs/i18n.md).`);
  }
  site.defaultLanguage = site.languages[0];

  // Types: plain strings or { key, label: { en, fr } }
  site.types = (site.types || []).map((t) => (typeof t === "string" ? { key: t } : t));
  if (!site.types.length) site.types = [{ key: "post" }];
  if (!site.types.some((t) => t.key === site.defaultType)) site.defaultType = site.types[0].key;

  if (!["auto", "light", "dark"].includes(site.defaultMode)) {
    warn(where, `"defaultMode" must be "auto", "light" or "dark". Using "auto".`);
    site.defaultMode = "auto";
  }
  if (!site.postPermalink.includes("{slug}")) {
    throw new JoranError(where, `"postPermalink" must contain {slug}, e.g. "/{slug}/" or "/blog/{slug}/".`);
  }
  // Visit statistics: one summary the templates use for the footer, the privacy text and the terminal.
  const a = site.analytics || {};
  const custom = a.custom?.html ? a.custom : null;
  const services = [
    a.goatcounter && "GoatCounter",
    a.plausible && "Plausible",
    a.umami?.websiteId && a.umami?.src && "Umami",
    custom && (custom.name || "a third-party counter"),
  ].filter(Boolean);
  site.stats = {
    on: services.length > 0,
    names: services.join(", "),
    cookies: Boolean(custom?.cookies),
    // "none": 0 cookies, 0 trackers · "anonymous": cookie-free counter · "cookies": a service that sets cookies
    level: !services.length ? "none" : custom?.cookies ? "cookies" : "anonymous",
  };
  if (a.umami?.websiteId && !a.umami?.src) warn(where, `"analytics.umami.src" is empty: Umami is not loaded.`);
  if (custom?.cookies) warn(where, `"analytics.custom" sets cookies: in the EU and Switzerland you need the visitor's consent first (a cookie banner), which Joran does not provide.`);

  if (site.stats.on && !site.footer.privacyNote) warn(where, `"footer.privacyNote" is off while visit statistics run: say it somewhere visitors see it (the colophon's privacy section does).`);

  // Footer badge and webring need their details, not just `true`
  if (site.footer.webring && !site.footer.webring.url) {
    warn(where, `"footer.webring" needs the ring's address, e.g. { name: "XXIIVV webring", url: "https://webring.xxiivv.com/#random" }. Hidden for now.`);
    site.footer.webring = null;
  }
  if (site.footer.badge && !site.footer.badge.text) {
    warn(where, `"footer.badge" needs its text, e.g. { text: "JORAN", tld: ".CH" }. Hidden for now.`);
    site.footer.badge = null;
  }

  if (site.email?.user && !site.email?.domain) warn(where, `"email.domain" is empty: the e-mail link is hidden.`);

  return site;
}
