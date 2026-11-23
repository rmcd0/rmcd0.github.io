/*
 * Checks that every internal link and image in _site/ points to a file that exists,
 * and that links to a heading (#id, on the same page or another) find it.
 * Run after a build: npm run check:links (or npm run check, which builds first).
 * External links are not checked (that needs the network and is slow).
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.resolve(process.env.SITE_DIR || "_site");
const PREFIX = (process.env.PATH_PREFIX || "/").replace(/\/?$/, "/");
if (!existsSync(OUT)) { console.error("No _site/ folder: run npm run build first."); process.exit(1); }

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const pages = walk(OUT).filter((f) => f.endsWith(".html"));
const broken = [];
const ids = new Map();
const idsOf = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
};

for (const page of pages) {
  const html = readFileSync(page, "utf8").replace(/<script[\s\S]*?<\/script>/g, "").replace(/<pre[\s\S]*?<\/pre>/g, "");
  for (const [, attr, raw] of html.matchAll(/\s(href|src|srcset)="([^"]+)"/g)) {
    const urls = attr === "srcset" ? raw.split(",").map((s) => s.trim().split(/\s+/)[0]) : [raw];
    for (const u of urls) {
      if (attr === "href" && u.startsWith("#") && u.length > 1) {
        // link to a heading on the same page
        if (u !== "#main" && !idsOf(page).has(decodeURIComponent(u.slice(1)))) broken.push(`${path.relative(OUT, page)}: ${u} (no element with id="${u.slice(1)}")`);
        continue;
      }
      if (!u.startsWith("/") || u.startsWith("//")) continue;
      const [pathPart, hash] = u.split("#");
      let p = decodeURIComponent(pathPart.split("?")[0]);
      if (!p.startsWith(PREFIX)) { broken.push(`${path.relative(OUT, page)}: ${u} (missing path prefix ${PREFIX})`); continue; }
      p = path.join(OUT, p.slice(PREFIX.length));
      if (existsSync(p) && statSync(p).isDirectory()) p = path.join(p, "index.html");
      if (!existsSync(p)) broken.push(`${path.relative(OUT, page)}: ${u}`);
      else if (hash && p.endsWith(".html") && !idsOf(p).has(hash) && hash !== "main") broken.push(`${path.relative(OUT, page)}: ${u} (no element with id="${hash}")`);
    }
  }
}

if (broken.length) {
  console.error(`✗ ${broken.length} broken internal link(s):\n  ${[...new Set(broken)].join("\n  ")}`);
  process.exit(1);
}
console.log(`✓ ${pages.length} pages, all internal links OK.`);
