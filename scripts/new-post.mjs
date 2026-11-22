/*
 * Creates a new post with its front matter.
 *
 *   npm run new -- "My title"
 *   npm run new -- "Mon projet" --type project --lang fr --tags "lake, wind" --draft
 *
 * Options: --type <type>  --lang <code>  --tags "a, b"  --date YYYY-MM-DD  --draft
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import site from "../content/site.config.js";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { type: { type: "string" }, lang: { type: "string" }, tags: { type: "string" }, date: { type: "string" }, draft: { type: "boolean" } },
});
const title = positionals.join(" ").trim();
if (!title) {
  console.error('Usage: npm run new -- "My title" [--type project] [--lang fr] [--tags "a, b"] [--draft]');
  process.exit(1);
}
const slug = title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const date = values.date || new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { console.error("--date must look like 2026-05-31"); process.exit(1); }
const types = (site.types || ["post"]).map((t) => (typeof t === "string" ? t : t.key));
const type = values.type || site.defaultType || types[0];
if (!types.includes(type)) { console.error(`Unknown type "${type}". Types in site.config.js: ${types.join(", ")}`); process.exit(1); }
const lang = values.lang || (site.languages || ["en"])[0];
const tags = (values.tags || "").split(",").map((s) => s.trim()).filter(Boolean);

const file = new URL(`../content/posts/${date}-${slug}.md`, import.meta.url);
if (existsSync(file)) { console.error(`Already exists: content/posts/${date}-${slug}.md`); process.exit(1); }
const q = (s) => JSON.stringify(s);
const fm = [
  "---",
  `title: ${q(title)}`,
  `description: ""`,
  `lang: ${lang}`,
  `type: ${type}`,
  `tags: [${tags.map(q).join(", ")}]`,
  "# image: /assets/img/my-image.jpg",
  '# imageAlt: "What the image shows"',
  values.draft ? "draft: true" : null,
  "---",
  "",
  "Write here.",
  "",
].filter((l) => l !== null).join("\n");
await mkdir(new URL("../content/posts/", import.meta.url), { recursive: true });
await writeFile(file, fm);
console.log(`Created content/posts/${date}-${slug}.md  →  ${(site.postPermalink || "/{slug}/").replace("{slug}", slug).replace("{year}", date.slice(0, 4))}`);
