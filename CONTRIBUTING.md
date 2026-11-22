# Contributing to Joran

Thank you for helping! Bug reports, translations, documentation fixes and code are all welcome.

## Before you start

- **Questions and ideas**: open a [discussion](https://github.com/rmcd0/joran/discussions).
- **Bugs**: open an [issue](https://github.com/rmcd0/joran/issues/new/choose) with the template.
- **Bigger changes**: open an issue first, so we agree on the approach before you spend time on it.

Joran aims to stay small: no framework, no build tool beyond Eleventy, no third-party requests by default. A feature that most personal sites need fits; a feature that few need is better as documentation ("how to add X").

## Set up

```bash
git clone https://github.com/<you>/joran.git
cd joran
nvm use        # or any Node 22+
npm install
npm start
```

The demo content in `content/` exercises every feature: two interface languages, three post languages, projects, a draft, images, translations.

## Make a change

1. Create a branch: `git switch -c fix-search-accents`.
2. Change the code. Read [docs/architecture.md](docs/architecture.md) for how things fit together and the conventions.
3. Check:

   ```bash
   npm run check       # build, links, HTML validity
   npm run test:empty  # a site with no content still builds
   npm run test:configs  # the demo with several settings (languages, types, statistics…)
   PATH_PREFIX=/joran/ npm run build && PATH_PREFIX=/joran/ npm run check:links
   ```

   And look at the result in light and dark mode, on a narrow window, and with the keyboard only.
4. Update `docs/` if behaviour or options changed, and add a line to `CHANGELOG.md` under **Unreleased**.
5. Open a pull request. The checklist in the template repeats the points above.

## Translations

To add an interface language, copy `theme/i18n/en.json` to `theme/i18n/<code>.json`, translate the values (keep keys, `{placeholders}` and HTML), add the date locale in `theme/defaults.js > locales`, and mention it in `docs/i18n.md` and the README. Native speakers reviewing existing translations are very welcome too.

## Style

- 2 spaces, LF, UTF-8 (see `.editorconfig`).
- JavaScript: ES modules, no dependencies in the browser, small functions with a comment on top of each file.
- CSS: put rules in the right layer; use tokens instead of raw colours; logical properties (`margin-inline`) instead of left/right.
- Texts: short sentences, plain words; the docs are read by people who are not developers.

## Releases (maintainers)

1. Move *Unreleased* entries under a new version in `CHANGELOG.md`, bump `version` in `package.json`.
2. Commit, tag `vX.Y.Z`, push with tags.
3. Create a GitHub release from the tag, with the changelog entry.

By contributing, you agree that your contribution is licensed under the GNU GPL, version 3 or any later version, like the rest of the project, and you follow the [code of conduct](CODE_OF_CONDUCT.md).
