/* Joran · journal filters: type, language, text (?q=) and grouping by year. State is kept in the address. */
export default function filters({ $, $$, t, store }) {
  const box = $("[data-filters]"), list = $("[data-postlist]");
  if (!list) return;
  const params = new URLSearchParams(location.search);
  const S = { type: params.get("type") || "all", lang: params.get("lang") || "all", q: (params.get("q") || "").toLowerCase(), group: store.get("joran-group") !== "0" };
  const items = $$("li[data-type]", list);
  const status = $("[data-filter-status]", box);

  const okType = (li) => S.type === "all" || li.dataset.type === S.type;
  const okLang = (li) => S.lang === "all" || li.dataset.lang === S.lang;
  const okText = (li) => !S.q || S.q.split(/\s+/).every((w) => li.dataset.text.includes(w));

  function count(selector, key, other) {
    $$(selector, box).forEach((b) => {
      const v = b.dataset[key];
      const n = items.filter((li) => other(li) && okText(li) && (v === "all" || li.dataset[key === "ftype" ? "type" : "lang"] === v)).length;
      $(".n", b).textContent = n;
      b.setAttribute("aria-pressed", String(S[key === "ftype" ? "type" : "lang"] === v));
      b.disabled = !n && v !== "all";
      b.dataset.baseTitle ??= b.title;
      b.title = b.disabled ? b.dataset.emptyTitle || "" : b.dataset.baseTitle;
    });
  }

  function apply() {
    let shown = 0;
    items.forEach((li) => { li.hidden = !(okType(li) && okLang(li) && okText(li)); if (!li.hidden) shown++; });
    count("[data-ftype]", "ftype", okLang);
    count("[data-flang]", "flang", okType);
    const years = [];
    $$(".year-group", list).forEach((g) => {
      const n = $$("li", g).filter((li) => !li.hidden).length;
      g.hidden = !n;
      $("[data-count]", g).textContent = `${n} ${t(n === 1 ? "post.one" : "post.many")}`;
      if (n) years.push(g.dataset.year);
    });
    $("[data-years]", box).innerHTML = years.length > 1 ? years.map((y) => `<a href="#y${y}">${y}</a>`).join("") : "";
    $("[data-empty]").hidden = shown > 0;
    list.toggleAttribute("data-flat", !S.group);
    box.toggleAttribute("data-flat", !S.group);
    $$("[data-group]", box).forEach((b) => b.setAttribute("aria-pressed", String((b.dataset.group === "1") === S.group)));
    status.textContent = status.dataset.template.replace("{n}", shown);
  }

  box.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.ftype) S.type = b.dataset.ftype;
    else if (b.dataset.flang) S.lang = b.dataset.flang;
    else if (b.dataset.group) { S.group = b.dataset.group === "1"; store.set("joran-group", S.group ? "1" : "0"); }
    const u = new URL(location.href);
    for (const k of ["type", "lang"]) S[k] === "all" ? u.searchParams.delete(k) : u.searchParams.set(k, S[k]);
    history.replaceState(null, "", u);
    apply();
  });
  box.hidden = false;
  apply();
}
