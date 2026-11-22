/*
 * Joran · sidebar search. Looks in titles, descriptions, tags and, unless searchFullText is false,
 * the whole text of every post (search.json, downloaded on first use). Accents and case are ignored.
 * find() and snippet() are also used by the terminal's grep.
 */
export const norm = (s) => String(s ?? "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Posts matching every word, best first: title > tags > description > text. */
export function find(index, query) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const hits = [];
  for (const p of index) {
    const f = { t: norm(p.t), g: norm((p.g || []).join(" ")), e: norm(p.e), b: norm(p.b) };
    let score = 0;
    for (const w of words) {
      const s = (f.t.includes(w) ? 8 : 0) + (f.g.includes(w) ? 4 : 0) + (f.e.includes(w) ? 2 : 0) + (f.b.includes(w) ? 1 : 0);
      if (!s) { score = 0; break; }
      score += s;
    }
    if (score) hits.push({ p, score });
  }
  return hits.sort((a, b) => b.score - a.score || (a.p.d < b.p.d ? 1 : -1)).map((h) => h.p);
}

/** About `len` characters of the post text around the first word found; null when the word is already in the title or description. */
export function snippet(p, query, len = 120) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  const text = p.b || "", low = norm(text);
  let at = -1, w = "";
  for (const x of words) { const i = low.indexOf(x); if (i >= 0 && (at < 0 || i < at)) { at = i; w = x; } }
  if (at < 0 || norm(`${p.t} ${p.e}`).includes(w)) return null;
  const start = Math.max(0, at - Math.round(len / 3));
  return {
    before: (start ? "…" : "") + text.slice(start, at),
    match: text.slice(at, at + w.length),
    after: text.slice(at + w.length, start + len) + (start + len < text.length ? "…" : ""),
  };
}

export default function search({ $, $$, t, esc, href, loadIndex }) {
  const form = $("[data-search]"), input = $("input", form), box = $("#search-results"), status = $("[data-search-status]", form);
  let hits = [], active = -1;

  const close = () => { box.hidden = true; input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant"); active = -1; };
  const select = (i) => {
    const links = $$("a", box);
    active = Math.max(-1, Math.min(i, links.length - 1));
    links.forEach((a, k) => a.setAttribute("aria-selected", String(k === active)));
    if (active >= 0) input.setAttribute("aria-activedescendant", links[active].id); else input.removeAttribute("aria-activedescendant");
    links[active]?.scrollIntoView({ block: "nearest" });
  };

  async function show() {
    const q = input.value.trim();
    if (!q) return close();
    hits = find(await loadIndex(), q).slice(0, 8);
    box.innerHTML = hits.length
      ? hits.map((p, i) => {
          const s = snippet(p, q);
          const snip = s ? `<span class="snip">${esc(s.before)}<mark>${esc(s.match)}</mark>${esc(s.after)}</span>` : "";
          return `<a role="option" id="search-opt-${i}" aria-selected="false" href="${esc(href(p.u))}">${esc(p.t)}<small>${esc(p.d)} · ${esc((p.l || "").toUpperCase())}</small>${snip}</a>`;
        }).join("")
      : `<p>${esc(t("sidebar.noResults"))}</p>`;
    box.hidden = false;
    input.setAttribute("aria-expanded", "true");
    status.textContent = hits.length ? t("sidebar.results", { n: hits.length }) : t("sidebar.noResults");
    active = -1;
    input.removeAttribute("aria-activedescendant");
  }

  input.setAttribute("role", "combobox");
  input.setAttribute("aria-expanded", "false");
  input.addEventListener("input", show);
  input.addEventListener("focus", () => { loadIndex(); if (input.value) show(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { input.value = ""; close(); input.blur(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); select(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); select(active - 1); }
    else if (e.key === "Enter" && hits.length) { e.preventDefault(); location.href = $$("a", box)[Math.max(active, 0)].href; }
  });
  document.addEventListener("click", (e) => { if (!e.target.closest("[data-search]")) close(); });
  // loaded on first focus: fetch the index now, and catch up if something was typed meanwhile
  loadIndex();
  if (input.value.trim()) show();
}
