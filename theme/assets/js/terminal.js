/*
 * Joran · the hidden terminal. A native <dialog>: focus stays inside, Esc closes it.
 * Commands read the same search.json as the sidebar search. They are listed in COMMANDS below;
 * their texts live in theme/i18n/*.json (term.*) and can be changed in content/i18n/<lang>.json.
 */
let T = null;

export default async function terminal(ctx) {
  if (!T) T = build(ctx);
  if (!T.dlg.open) T.dlg.showModal();
  T.inp.focus();
}

function build(ctx) {
  const { UI, t, esc, href, loadIndex, load, setMode } = ctx;
  const P = UI.prefix || "";
  const user = t("term.user"), host = String(UI.title || "site").toLowerCase().replace(/\s+/g, "-");
  const prompt = `<span class="term-ps">${esc(user)}@${esc(host)}:~$</span>`;
  const SECT = { "~": "/", "/": "/", "..": "/", home: "/", journal: `${P}/journal/`, blog: `${P}/journal/`, projects: `${P}/journal/?type=project`, tags: `${P}/tags/`, now: "/now/", uses: "/uses/", colophon: "/colophon/", changelog: "/changelog/" };
  const hist = []; let hi = 0, last = [];
  // Your own commands: text replies from the dictionary, term.commands.<name> (content/i18n/<lang>.json, HTML allowed)
  const mine = t("term.commands");
  const CUSTOM = mine && typeof mine === "object" ? mine : {};

  const dlg = document.createElement("dialog");
  dlg.className = "term";
  dlg.setAttribute("aria-label", "Terminal");
  dlg.innerHTML = `<div class="term-bar"><span>${esc(user)}@${esc(host)}: ~</span><button class="term-x" type="button">esc ✕<span class="visually-hidden"> ${esc(t("a11y.close"))}</span></button></div><div class="term-out" role="log" aria-live="polite"></div><label class="term-line">${prompt}<input class="term-in" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Command"></label>`;
  document.body.append(dlg);
  const out = dlg.querySelector(".term-out"), inp = dlg.querySelector(".term-in");
  dlg.querySelector(".term-x").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });

  const print = (s, html = false) => { const d = document.createElement("div"); html ? (d.innerHTML = s) : (d.textContent = s); out.append(d); out.scrollTop = out.scrollHeight; };
  const pad = (n, w) => String(n).padStart(w);
  const go = (u) => (location.href = href(u));
  print(t("term.welcome", { site: esc(UI.title) }), true);
  loadIndex();

  const COMMANDS = {
    help: () => print(t("term.help") + (Object.keys(CUSTOM).length ? `\n+ ${Object.keys(CUSTOM).map((k) => `<b>${esc(k)}</b>`).join("   ")}` : ""), true),
    ls: (arg, idx) => {
      if (/^(journal|proj)/.test(arg)) {
        last = (arg.startsWith("proj") ? idx.filter((p) => p.y === "project") : idx).slice(0, 20);
        last.forEach((p, i) => print(`${pad(i + 1, 2)}  ${p.d}  ${(p.l || "").toUpperCase()}  ${p.s}`));
        print(t("term.toRead"));
      } else print(`<span class="term-d">journal/  projects/  tags/</span>  ${Object.keys(SECT).filter((k) => /^[a-z]/.test(k) && !["home", "blog", "journal", "projects", "tags"].includes(k)).join("  ")}   (${idx.length} ${esc(t("term.posts"))})`, true);
    },
    cd: (arg) => (!arg || SECT[arg] ? go(SECT[arg || "~"]) : print(t("term.noDir", { x: arg }))),
    open: (arg, idx) => { const n = parseInt(arg, 10); const p = Number.isNaN(n) ? idx.find((x) => x.s === arg) : last[n - 1]; p ? go(p.u) : print(t("term.noPost")); },
    grep: async (arg, idx) => {
      if (!arg) return print(t("term.grepUsage"));
      const { find, snippet } = await load("search"); // same matching as the sidebar search, full text included
      last = find(idx, arg);
      last.slice(0, 20).forEach((p, i) => {
        const s = snippet(p, arg, 90);
        print(`${pad(i + 1, 2)}  ${esc(p.d)}  <b>${esc(p.t)}</b>${s ? `\n              ${esc(s.before)}<mark>${esc(s.match)}</mark>${esc(s.after)}` : ""}`, true);
      });
      print(t("term.results", { n: last.length }));
    },
    tags: (arg, idx) => { const m = {}; idx.forEach((p) => (p.g || []).forEach((g) => (m[g] = (m[g] || 0) + 1))); print(Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([g, n]) => `${g}(${n})`).join("  ")); },
    theme: (arg) => { if (!["light", "dark", "rain"].includes(arg)) return print(t("term.themeUsage")); setMode(arg); print(arg === "rain" ? t("term.redpill") : t("term.themeSet", { x: arg })); },
    redpill: () => { setMode("rain"); print(t("term.redpill")); },
    bluepill: () => { setMode(null); print(t("term.bluepill")); },
    whoami: () => print(t("term.whoami")),
    neofetch: (arg, idx) => {
      const nf = t("term.neofetch");
      const art = ["   .------.", "  /  ~~~~  \\", " |  ~~~~~~  |", "  \\  ~~~~  /", "   '------'", "", "", ""];
      const info = [`<b>${esc(user)}@${esc(host)}</b>`, "----------------", `OS       ${esc(nf.os)}`, `Uptime   ${esc(String(nf.uptime).replace("{since}", UI.since || "?"))}`, `Posts    ${idx.length} · Projects ${idx.filter((p) => p.y === "project").length}`, `Langs    ${[...new Set(idx.map((p) => (p.l || "").toUpperCase()))].join(" / ")}`, `Tracker  ${esc(UI.analytics ? nf.trackerStats : nf.tracker)}`, `Theme    ${esc(document.documentElement.dataset.mode || "auto")} · Joran`];
      print(`<pre class="term-pre">${info.map((l, i) => `<span class="term-d">${esc((art[i] || "").padEnd(16))}</span>${l}`).join("\n")}</pre>`, true);
    },
    date: () => print(new Date().toLocaleString(UI.locale)),
    history: () => hist.forEach((h, i) => print(`${pad(i + 1, 3)}  ${h}`)),
    clear: () => (out.innerHTML = ""),
    exit: () => dlg.close(),
    quit: () => dlg.close(),
    sudo: () => print(t(UI.analytics ? "term.sudoStats" : "term.sudo")),
    rm: () => print(t("term.rm")),
    vim: () => print(t("term.editor", { x: "vim" })),
    emacs: () => print(t("term.editor", { x: "emacs" })),
    nano: () => print(t("term.editor", { x: "nano" })),
  };

  inp.addEventListener("keydown", async (e) => {
    if (e.key === "ArrowUp") { e.preventDefault(); if (hi > 0) inp.value = hist[--hi] || ""; return; }
    if (e.key === "ArrowDown") { e.preventDefault(); if (hi < hist.length) inp.value = hist[++hi] || ""; return; }
    if (e.key === "Tab") {
      e.preventDefault();
      const parts = inp.value.split(" ");
      const idx = await loadIndex();
      const pool = parts.length === 1 ? [...Object.keys(COMMANDS), ...Object.keys(CUSTOM)] : [...Object.keys(SECT), ...idx.map((p) => p.s)];
      const m = pool.filter((x) => x.startsWith(parts.at(-1)));
      if (m.length === 1) { parts[parts.length - 1] = m[0]; inp.value = parts.join(" ") + (parts.length === 1 ? " " : ""); }
      else if (m.length > 1) print(m.slice(0, 16).join("   "));
      return;
    }
    if (e.key !== "Enter") return;
    const line = inp.value.trim(); inp.value = "";
    print(`${prompt} ${esc(line)}`, true);
    if (!line) return;
    hist.push(line); hi = hist.length;
    const [c, ...a] = line.split(/\s+/);
    const fn = Object.hasOwn(COMMANDS, c) ? COMMANDS[c] : null;
    if (!fn && Object.hasOwn(CUSTOM, c)) return print(String(CUSTOM[c]), true);
    if (!fn) return print(t("term.unknown", { x: c }));
    fn(a.join(" "), await loadIndex());
  });
  return { dlg, inp };
}
