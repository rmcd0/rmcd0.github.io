# Updating

Joran keeps your work and the theme apart:

- **yours**: `content/`, `eleventy.config.js` (below the line), `README.md`, your own workflows;
- **the theme's**: `theme/`, `scripts/`, `docs/`.

So updating the theme means replacing the theme's folders, and nothing you wrote is touched.

## Update the theme

```bash
npm run update-theme            # latest version
npm run update-theme -- v1.2.0  # a given release
```

The script:

1. adds Joran as a git remote called `joran` (once);
2. fetches the requested version;
3. replaces `theme/`, `scripts/` and `docs/`;
4. lists the shared files that differ (`package.json`, `.github/workflows/*.yml`, `eleventy.config.js`, `.nvmrc`) so you can merge them by hand.

Then:

```bash
git show joran/main:CHANGELOG.md | head -40   # what changed, and anything to do
npm install                                   # if package.json changed
npm start                                     # check your site
git add -A && git commit -m "Update Joran"
```

Nothing is committed for you. To cancel, `git restore theme scripts docs`.

If you copied partials into `content/_includes/partials/`, compare them with the new versions in `theme/includes/partials/`: your copies do not get the fixes.

## Without the script

The same thing by hand:

```bash
git remote add joran https://github.com/rmcd0/joran.git
git fetch joran
git checkout joran/main -- theme scripts docs
```

## Versions

Joran follows [semantic versioning](https://semver.org/): `1.x` releases never require changes to your content or configuration. A `2.0` would, and its changelog entry would explain how. Releases are listed on the [releases page](https://github.com/rmcd0/joran/releases).

## Eleventy and other dependencies

Dependency versions are pinned in `package.json` and locked in `package-lock.json`, so the site builds the same on your computer and on GitHub. Dependabot opens a pull request once a month when updates exist; the CI checks them before you merge. Joran is tested with each Eleventy 3.x release; a move to Eleventy 4 will come as a Joran release with notes.

To update by hand:

```bash
npm outdated
npm update
npm run check
```

## Node.js

Use an [active LTS version](https://nodejs.org/en/about/previous-releases) of Node: 22 or 24 today. `.nvmrc` says which one GitHub Actions uses; `nvm use` picks it on your computer.
