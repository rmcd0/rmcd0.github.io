/*
 * Builds the theme with an empty content folder (no posts, no home page) to make sure
 * a brand-new site never crashes. Used by the CI workflow; safe to run locally.
 */
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync, writeFileSync, mkdirSync, symlinkSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dir = mkdtempSync(path.join(tmpdir(), "joran-empty-"));
try {
  for (const f of ["theme", "scripts", "package.json", "eleventy.config.js"]) cpSync(path.join(root, f), path.join(dir, f), { recursive: true });
  symlinkSync(path.join(root, "node_modules"), path.join(dir, "node_modules"), "dir");
  mkdirSync(path.join(dir, "content"));
  writeFileSync(path.join(dir, "content/site.config.js"), 'export default { title: "Empty", url: "https://example.com" };\n');
  execFileSync("npx", ["eleventy"], { cwd: dir, stdio: "inherit" });
  for (const f of ["journal/index.html", "tags/index.html", "404.html", "feed.xml", "sitemap.xml", "search.json"]) {
    if (!existsSync(path.join(dir, "_site", f))) throw new Error(`missing ${f}`);
  }
  console.log("✓ An empty site builds.");
} finally {
  rmSync(dir, { recursive: true, force: true });
}
