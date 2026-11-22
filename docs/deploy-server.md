# Publishing elsewhere

The built site is a folder of files, `_site/`. Any web server can serve it. Build it with your final address:

```bash
SITE_URL=https://example.com npm run build
```

(or set `url` in `site.config.js`). For a site in a sub-folder (`https://example.com/blog/`), add `PATH_PREFIX=/blog/`.

Every build empties `_site/` first, so files you deleted or renamed do not stay online. CSS and JavaScript addresses carry a version (`joran.css?v=1a2b3c4d`) that changes when the file changes, and generated images have a content hash in their name: long browser caching is safe.

## Shared hosting (FTP, SFTP)

1. `npm run build`
2. Upload the **content** of `_site/` (not the folder itself) to your web root (`public_html/`, `www/`, `htdocs/`…), with an FTP client such as [FileZilla](https://filezilla-project.org/) or `lftp mirror -R --delete _site/ /public_html/`.
3. Most shared hosts run Apache: copy `deploy/apache/.htaccess` into `content/static/` once, so every build includes it. It sets the 404 page, HTTPS, caching, compression and security headers.

## Apache

`deploy/apache/.htaccess`, described above. It needs `mod_rewrite`, `mod_headers`, `mod_expires` and `mod_deflate`, enabled on almost every host.

## nginx

`deploy/nginx/joran.conf` is a complete server block: HTTPS redirect, `try_files` for clean addresses, 404 page, caching, compression, security headers. Copy it to `/etc/nginx/sites-available/`, adapt `server_name`, `root` and the certificate paths ([Certbot](https://certbot.eff.org/) gives free certificates), then `nginx -t && systemctl reload nginx`.

## Your own server, deployed automatically (SSH + rsync)

`deploy/github-actions/deploy-ssh.yml` builds the site on GitHub and copies it to your server with `rsync` at every push on `main`.

1. On the server, create a user that can write to the web root, and add a dedicated SSH public key to its `~/.ssh/authorized_keys`.
2. In the repository: **Settings → Secrets and variables → Actions**:
   - secrets: `DEPLOY_KEY` (the private key), `DEPLOY_HOST`, `DEPLOY_USER`;
   - variables: `DEPLOY_PATH` (e.g. `/var/www/example.com/`), `SITE_URL`.
3. Copy the file to `.github/workflows/`, and delete `deploy.yml` if you stop using GitHub Pages.

## Netlify

Copy `deploy/netlify/netlify.toml` to the root of your repository and connect the repository in Netlify. For headers, copy `deploy/netlify/_headers` into `content/static/`. Netlify serves `404.html` automatically.

## Cloudflare Pages

Build command `npm run build`, output directory `_site`, environment variable `NODE_VERSION=24`. `_headers` works the same as on Netlify.

## GitLab Pages, Codeberg Pages, others

Same recipe: Node 22+, `npm ci && npm run build`, publish `_site/`. For GitLab Pages, rename the output to `public/` in your CI job (`mv _site public`) and set `PATH_PREFIX` for project sites.

## Headers worth setting

When your host lets you, these improve security and speed (the examples in `deploy/` set them):

| Header | Value |
| --- | --- |
| `Strict-Transport-Security` | `max-age=31536000` (once HTTPS works everywhere) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Cache-Control` on `/assets/*` | `public, max-age=31536000, immutable` |
| `Cache-Control` on pages | `no-cache` |

A strict `Content-Security-Policy` is possible but must allow the one small inline script in `<head>` (it applies the saved theme before the page paints) and your statistics service.
