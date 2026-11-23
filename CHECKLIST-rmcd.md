# Checklist : mise en ligne de rmcd0.github.io

Mise à jour le 23 novembre 2026. Tout le contenu est en place dans `content/` et `npm run check` passe au vert (build, liens, HTML). Il ne reste que ce que je ne peux pas faire à ta place.

Règle d'or : tu n'édites que `content/`. Jamais `theme/`, `scripts/` ni `docs/` (`npm run update-theme` les remplace).

Le thème Joran est cloné dans `Documents/Github/joran` : c’est là qu’on modifie le thème, puis on le fait venir dans le site avec `npm run update-theme vX.Y.Z` (après avoir commité le site).

## Déjà fait

- [x] Langues : interface en français à la racine, page d’accueil aussi en anglais sous `/en/` (`languages: ["fr", "en"]`, bouton FR · EN dans la barre latérale). Now, Uses, Colophon et Changelog en français seulement ; chaque article garde sa langue (`lang:`).
- [x] 35 articles publiés + 1 brouillon (permanences, `draft: true`), avec leurs anciennes adresses (`permalink`).
- [x] 188 images d'articles dans `content/assets/img/posts/`, avec un texte alternatif pour chaque image d'en-tête (`imageAlt`) et chaque image sans description.
- [x] Tags en anglais (12) : society, ecology, politics, column, digital, 360-vr, crypto, tools, it, volunteering, career, privacy.
- [x] Types : post, project, politics. `medium:` devient `alsoOn:` (lien « Also published on medium.com »).
- [x] Titres d'articles remis dans l'ordre (`##` puis `###`), vieux HTML (`<center>`, `align`) nettoyé.
- [x] Pages écrites : accueil (FR et EN), Now, Uses, Colophon, Changelog (FR), licence du contenu (CC BY 4.0), 10 témoignages relus.
- [x] Images du site : avatar (ton avatar dessiné), favicon, image d'aperçu de liens 1200×630 (`og-default.jpg`).
- [x] `site.config.js` : titre, description, GitHub, LinkedIn, Medium, e-mail, 6 projets en vitrine, « Recent » sans les articles politiques, message console activé.
- [x] Page **Me recruter / Hire me** (`content/hire.md`, `content/en/hire.md`) dans le menu, avec les 10 témoignages (retirés des pages d’accueil : `testimonials: false`).
- [x] Raccourcis à mettre sur tes CV : `/cv/` → `/hire/` et `/en/cv/` → `/en/hire/`.
- [x] Commande `cv` dans le terminal (touche `` ` `` ou bouton `>_`) : un pitch court en FR ou en EN selon la langue de la page. Le texte est dans `content/i18n/fr.json` et `content/i18n/en.json`.

## 1. Ménage

- [x] `content/fr/` supprimé (l’ancien dossier du template). Le français est maintenant à la racine de `content/`, l’anglais dans `content/en/`.
- [x] `content/posts/.gitkeep` : déjà absent.

## 2. À remplir dans `content/site.config.js` (cherche ✏️)

- [x] `socials` : LinkedIn rempli. Mastodon, Bluesky, Strava : à ajouter si tu veux.
- [x] `email` : `rmcd @ duck.com` (jamais écrite en entier dans le HTML).
- [ ] `footer.badge` : « RMCD .CH » tant que le domaine n'est pas choisi. À adapter le jour où tu prends ton domaine (ou `null`).
- [ ] `analytics.goatcounter` (optionnel) : crée un compte gratuit sur goatcounter.com, mets ton code (ex. `"rmcd"`). Le pied de page et le colophon s'adaptent tout seuls.

## 3. À relire (ce sont tes mots, je les ai écrits pour toi)

- [ ] `content/index.md` et `content/en/index.md` : l'accueil. Surtout le paragraphe sur ta recherche d'emploi.
- [ ] `content/hire.md` et `content/en/hire.md` : la section EXPÉRIENCE est un bouche-trou. Le contenu détaillé (postes, projets internes, missions de conseil) se prépare dans le projet « CV & job search » avec `HANDOVER-hire-page.md`.
- [ ] `content/i18n/fr.json` et `en.json` : le pitch de la commande `cv` (garde-le court : 5 lignes).
- [ ] `content/now.md` : date et liste du moment.
- [ ] `content/uses.md` : ton matériel, tes logiciels, tes vélos. Ajoute ton éditeur de texte et tes outils de notes si tu veux.
- [ ] `content/colophon.md` et `content/changelog.md`.
- [ ] Les 6 projets de l'accueil (`home.featured`) : DMS, Corporate IT, Vichy, Swissvax, Crypto Dashboard, Blancarré. Change l'ordre ou la liste si tu veux.
- [ ] Les articles politiques : ils sont visibles dans le Journal (filtre « Politics ») mais pas dans « Recent ». Pour les y remettre : `sidebar.recent.types: []`.

## 4. Vérifier en local

- [ ] `npm install` puis `npm start`, et ouvre http://localhost:8080
- [ ] Clique un peu partout : accueil, Journal (filtres), un article avec images, Now, Uses, thème sombre, la pilule rouge.
- [ ] `npm run check` : doit afficher « all internal links OK » et aucune erreur HTML.

## 5. Publier

- [ ] Joran 1.1.0 (dossier `Documents/Github/joran`) : commit, tag `v1.1.0`, push, release GitHub. Puis dans le site : `git restore theme docs`, commit du contenu, `npm run update-theme v1.1.0`, `git checkout v1.1.0 -- package.json`, `npm install`, `npm run check`, commit « Update Joran theme to v1.1.0 ».

- [ ] `git add -A && git commit -m "Site content: posts, pages and settings" && git push`
- [ ] GitHub → dépôt `rmcd0.github.io` → **Settings → Pages → Source : GitHub Actions** (une seule fois).
- [ ] Onglet **Actions** : attendre le ✓ vert (1 à 2 minutes), puis ouvrir https://rmcd0.github.io/
- [ ] Coller un lien d'article dans un brouillon LinkedIn pour vérifier l'aperçu (titre, description, image).

## Plus tard

- Domaine perso (rmcd + extension à choisir) : voir `docs/deploy-github-pages.md`, puis le badge du pied de page.
- Mettre à jour tes profils (GitHub, LinkedIn, Medium) avec l'adresse du site.
- Les mini-apps (crypto dashboard, suivi de dépenses, calculateur CO₂).
- Webring : postuler au XXIIVV webring, puis `footer.webring`.
