/*
 * Builds the demo with several settings and checks what each one must show or hide.
 * Each case runs in a temporary copy of the project; your files are never changed.
 *   npm run test:configs
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const base = (await import(path.join(root, "content/site.config.js"))).default;

const cases = [
  {
    name: "demo in one language",
    config: { languages: ["en"] },
    expect: { "index.html": ["Selected projects", "All 3 projects", "Recent", "0 cookies · 0 trackers", 'class="badge88"', "data-weight", "built "], "!fr/index.html": [], "!index.html": ['class="langs"'] },
  },
  {
    name: "two languages",
    config: { languages: ["en", "fr"] },
    expect: { "fr/index.html": ["Bonjour, je suis le Joran.", "Projets choisis"], "fr/journal/index.html": ["Journal"], "index.html": ['class="langs"', 'hreflang="fr"'] },
  },
  {
    name: "no featured, no recent",
    config: { home: { featured: [] }, sidebar: { recent: { count: 0, types: [] } } },
    expect: { "!index.html": ["Selected projects", "Latest", ">Recent<"] },
  },
  {
    name: "only one type",
    config: { types: ["post"], defaultType: "post", home: { featured: [] } },
    expectBuildError: "is not one of the types",
  },
  {
    name: "three types with politics",
    config: { types: ["post", "project", { key: "politics", empty: { en: "Coming soon: council questions" } }] },
    expect: { "journal/index.html": ['data-ftype="politics"', "Politics", "Coming soon: council questions"] },
  },
  {
    name: "cookie-free counter",
    config: { analytics: { goatcounter: "demo" } },
    expect: { "index.html": ["0 cookies · anonymous visit stats", "demo.goatcounter.com"], "colophon/index.html": ["GoatCounter"] },
  },
  {
    name: "custom counter with cookies",
    config: { analytics: { custom: { name: "Matomo", html: '<script src="https://matomo.example/m.js"></script>', cookies: true } } },
    expect: { "index.html": ["Privacy &amp; cookies", "matomo.example/m.js"], "!index.html": ["0 trackers"], "colophon/index.html": ["Matomo, which sets cookies"] },
  },
  {
    name: "calm and classic",
    config: { features: { terminal: false, rainTheme: false, blinkingCursor: false }, footer: { badge: null, pageWeight: false } },
    expect: { "index.html": ["built ", "0 cookies · 0 trackers", "Made with"], "!index.html": ['class="badge88"', "data-terminal", 'class="pill"', "joran-rain", "data-weight", 'class="cursor"'] },
  },
  {
    name: "footer switched off",
    config: { footer: { buildDate: false, commit: false, pageWeight: false, privacyNote: false, badge: null, webring: null, feedLink: false, madeWith: false } },
    expect: { "index.html": ["Colophon"], "!index.html": ["built ", "data-weight", "0 cookies", "badge88", "Made with", 'class="ring"'] },
  },
];

let failed = 0;
for (const c of cases) {
  const dir = mkdtempSync(path.join(tmpdir(), "joran-case-"));
  try {
    for (const f of ["theme", "content", "scripts", "package.json", "eleventy.config.js"]) cpSync(path.join(root, f), path.join(dir, f), { recursive: true });
    symlinkSync(path.join(root, "node_modules"), path.join(dir, "node_modules"), "dir");
    const cfg = { ...base, ...c.config };
    writeFileSync(path.join(dir, "content/site.config.js"), `export default ${JSON.stringify(cfg, null, 2)};\n`);
    let out = "";
    try { out = execFileSync("npx", ["eleventy"], { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); }
    catch (e) { out = String(e.stdout) + String(e.stderr); if (!c.expectBuildError) throw new Error(out.slice(-800)); }
    const problems = [];
    if (c.expectBuildError && !out.includes(c.expectBuildError)) problems.push(`build should fail with "${c.expectBuildError}"`);
    for (const [file, needles] of Object.entries(c.expect || {})) {
      const negate = file.startsWith("!"), f = path.join(dir, "_site", file.replace(/^!/, ""));
      if (!existsSync(f)) { if (!negate || needles.length) problems.push(`missing ${file}`); continue; }
      if (negate && !needles.length) { problems.push(`${file} should not exist`); continue; }
      const html = readFileSync(f, "utf8").replace(/<script id="joran-ui"[\s\S]*?<\/script>/, "");
      for (const n of needles) if (html.includes(n) === negate) problems.push(`${file} ${negate ? "contains" : "lacks"} "${n}"`);
    }
    if (problems.length) { failed++; console.log(`✗ ${c.name}\n  ${problems.join("\n  ")}`); } else console.log(`✓ ${c.name}`);
  } catch (e) { failed++; console.log(`✗ ${c.name}\n  ${e.message}`); }
  finally { rmSync(dir, { recursive: true, force: true }); }
}
process.exit(failed ? 1 : 0);
