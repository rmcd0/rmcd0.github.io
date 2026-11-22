# Getting started

From nothing to your own site online, in about fifteen minutes. No web development knowledge needed: you will edit text files and run a few commands.

## 1. What you need

- A [GitHub](https://github.com/) account (free).
- [Node.js](https://nodejs.org/) **22 or newer**. Check with `node -v`. On macOS and Linux, [nvm](https://github.com/nvm-sh/nvm) makes it easy (`nvm install`, it reads `.nvmrc`); on Windows, use the installer from nodejs.org.
- [git](https://git-scm.com/downloads). Check with `git --version`.
- A text editor. [VS Code](https://code.visualstudio.com/) is a good choice: it understands Markdown, Nunjucks and JavaScript.

## 2. Create your repository from the template

1. Open the Joran repository on GitHub and click **Use this template → Create a new repository**.
2. Choose the name:
   - `<your-username>.github.io` for your **personal site**, served at `https://<your-username>.github.io/`;
   - any other name (e.g. `blog`) for a **project site**, served at `https://<your-username>.github.io/blog/`.
   Joran handles both automatically.
3. Keep it **Public** (GitHub Pages is free for public repositories), then **Create repository**.

## 3. Run it on your computer

```bash
git clone https://github.com/<you>/<your-repo>.git
cd <your-repo>
npm install
npm start
```

Open <http://localhost:8080>. You see the demo site. Leave `npm start` running: every time you save a file, the page reloads by itself. Stop it with <kbd>Ctrl</kbd>+<kbd>C</kbd>.

## 4. Make it yours

Everything you change lives in the `content/` folder.

1. **Settings**: open `content/site.config.js`. Change `title`, `description`, `author`, `languages`, `nav`, `socials` and `email`. Each option is commented; the full list is in [configuration.md](configuration.md).
   - The demo has one interface language (`languages: ["en"]`). For a bilingual site, add a second code, e.g. `["en", "fr"]`: the French home page in `content/fr/index.md` comes to life. Remove it to switch back. See [i18n.md](i18n.md).
2. **Home page**: rewrite `content/index.md`. The text is your introduction. The `now:` line in its front matter is the short "Now" sentence.
3. **Avatar and share image**: replace `content/assets/img/avatar.jpg` (square, at least 200 px) and `og-default.jpg` (1200 × 630 px).
4. **Testimonials**: edit `content/_data/testimonials.json`, or delete the file to hide the section.
5. **Pages**: rewrite or delete `now.md`, `uses.md`, `colophon.md`, `changelog.md`. Remember to update `nav` and `footerNav` if you delete one.
6. **Posts**: delete the demo posts in `content/posts/` and their images in `content/assets/img/`, then:

   ```bash
   npm run new -- "My first post"
   ```

   Open the new file in `content/posts/` and write. More in [writing.md](writing.md).

If you make a mistake in a post (a missing title, an unknown type, an image that does not exist), the build stops and says which file and what to fix.

## 5. Publish on GitHub Pages

1. In your repository on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Commit and push:

   ```bash
   git add -A
   git commit -m "My site"
   git push
   ```

3. Open the **Actions** tab: the *Deploy to GitHub Pages* workflow runs. When it is green, your site is online at the address shown in Settings → Pages.

There is nothing else to configure: the workflow gives the right address and path to the build. A custom domain takes five more minutes: see [deploy-github-pages.md](deploy-github-pages.md#custom-domain).

## 6. Everyday use

```bash
npm start                                  # write and preview
npm run new -- "Title" --type project      # new post or project
git add -A && git commit -m "New post" && git push   # publish
```

## Next

- Change colours or fonts: [customization.md](customization.md).
- Several languages: [i18n.md](i18n.md).
- Turn features on or off (terminal, search, statistics…): [features.md](features.md).
- Get theme updates later: [updating.md](updating.md).
