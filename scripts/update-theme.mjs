/*
 * Updates the theme files of your site from the Joran repository, without touching content/.
 *
 *   npm run update-theme            latest version (main branch)
 *   npm run update-theme -- v1.2.0  a given release
 *
 * What it does: fetches Joran, replaces theme/, scripts/ and docs/ with the new version,
 * and tells you if package.json or the workflows changed so you can merge them by hand.
 * Nothing is committed: review with `git diff`, test with `npm start`, then commit.
 */
import { execFileSync } from "node:child_process";

const REMOTE = "joran";
const URL = "https://github.com/rmcd0/joran.git";
const ref = process.argv[2] || "main";
const git = (...args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

try { git("rev-parse", "--is-inside-work-tree"); } catch { console.error("Run this inside your site's git repository."); process.exit(1); }
if (git("status", "--porcelain", "--", "theme", "scripts", "docs")) {
  console.error("theme/, scripts/ or docs/ have uncommitted changes. Commit or stash them first.");
  process.exit(1);
}
const remotes = git("remote").split("\n");
if (!remotes.includes(REMOTE)) git("remote", "add", REMOTE, URL);
console.log(`Fetching Joran (${ref})…`);
git("fetch", "--tags", REMOTE, ref);
const target = ref.startsWith("v") ? ref : `${REMOTE}/${ref}`;

git("checkout", target, "--", "theme", "scripts", "docs");
console.log("✓ theme/, scripts/ and docs/ updated.");

for (const f of ["package.json", ".github/workflows/deploy.yml", ".github/workflows/ci.yml", "eleventy.config.js", ".nvmrc"]) {
  let diff = "";
  try { diff = git("diff", "HEAD", target, "--", f); } catch { /* file missing upstream */ }
  if (diff) console.log(`! ${f} differs from Joran ${ref}. Compare with:  git diff HEAD ${target} -- ${f}`);
}
console.log("\nNext: read CHANGELOG.md (git show " + target + ":CHANGELOG.md), run npm install && npm start, then commit.");
