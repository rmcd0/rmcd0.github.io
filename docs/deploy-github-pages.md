# Publishing on GitHub Pages

Joran comes with a workflow, `.github/workflows/deploy.yml`, that builds and publishes the site at every push on `main`. It asks GitHub for the site's address and path, so the same files work for every kind of Pages site.

## One-time setup

1. Your repository on GitHub → **Settings → Pages**.
2. **Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the workflow by hand: **Actions → Deploy to GitHub Pages → Run workflow**).

The workflow installs the exact dependency versions (`npm ci`), builds, checks internal links, and publishes. It takes about a minute. The address appears in Settings → Pages and in the workflow summary.

## Personal site or project site

| Repository name | Address | Path prefix |
| --- | --- | --- |
| `<user>.github.io` | `https://<user>.github.io/` | none |
| anything else, e.g. `blog` | `https://<user>.github.io/blog/` | `/blog/` |

Nothing to configure: the workflow passes `SITE_URL` and `PATH_PREFIX` to the build, and every link, image, feed entry and canonical URL gets the right prefix. To test a project-site build on your computer:

```bash
PATH_PREFIX=/blog/ npm run build && PATH_PREFIX=/blog/ npm run check:links
```

(Write links in your Markdown from the root, `/journal/`, never with the prefix: Joran adds it.)

## Custom domain

1. **Settings → Pages → Custom domain**: enter `example.com` (or `www.example.com`) and save.
2. At your domain registrar, add DNS records:
   - for `example.com` (apex): four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and optionally the `AAAA` records listed in [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site));
   - for `www`: a `CNAME` record → `<user>.github.io`.
3. Wait for the DNS check (minutes to hours), then tick **Enforce HTTPS**.
4. Optional but recommended: [verify the domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) in your account settings, so nobody else can claim it.

With the Actions workflow, GitHub stores the custom domain in its settings; you do not need a `CNAME` file. Once the domain is active, the workflow uses it automatically for `SITE_URL`. Set `url` in `site.config.js` to the same domain so local builds match.

## Moving an existing GitHub Pages site to Joran

1. In the existing repository, create a branch: `git switch -c joran`.
2. Remove the old site's files (keep `.git`, and your images if you want to reuse them), then copy Joran's files in.
3. Move your posts to `content/posts/` (see [migrating.md](migrating.md)), build and check locally.
4. Settings → Pages → Source: **GitHub Actions**.
5. Merge `joran` into `main`. The history of the old site is kept.

## Branch name

The workflow publishes from `main`. If your default branch is called `master`, change `branches: [main]` in `.github/workflows/deploy.yml`.

## Checking pull requests

`.github/workflows/ci.yml` runs on every pull request and branch push: build on Node 22, 24 and 26, link check, HTML validation, a build under a path prefix, and a build with an empty `content/` folder. Dependabot (`.github/dependabot.yml`) proposes monthly updates of the dependencies and actions.

## Limits

GitHub Pages sites must stay under 1 GB, with a soft bandwidth limit of 100 GB a month: far above what a personal site needs. GitHub Pages cannot set custom HTTP headers; for that, see [deploy-server.md](deploy-server.md).
