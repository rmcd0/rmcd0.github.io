# Checklist : rmcd0.github.io

Mise à jour le 23 novembre 2026. Le site est en ligne sur https://rmcd0.github.io/ avec le thème Joran v1.1.1.

Règle d'or : tu n'édites que `content/`. Le thème se modifie dans `~/Documents/Github/joran`, puis arrive ici avec `npm run update-theme vX.Y.Z` (après avoir commité le site).

## Déjà fait

- [x] Site en anglais (`languages: ["en"]`), sans bouton de langue. Chaque article garde sa langue (`lang:` fr, en, es).
- [x] 35 articles et 1 brouillon (permanences, `draft: true`), avec leurs anciennes adresses Medium (`permalink`).
- [x] Pages : accueil, Now, Uses, Hire me, Colophon, Changelog (en anglais), licence du contenu (CC BY 4.0).
- [x] Hire me (`content/hire.md`) avec les 10 témoignages ; raccourcis `/cv/` et `/en/cv/` → `/hire/`.
- [x] Commande `cv` dans le terminal : texte dans `content/i18n/en.json`.
- [x] Mise en ligne : GitHub Pages (Settings → Pages → Source : GitHub Actions).

## À faire

- [ ] Accueil (`content/index.md`) : introduction plus courte, avec un paragraphe 🇬🇧 et un paragraphe 🇫🇷.
- [ ] Hire me : répondre aux questions ouvertes du projet CV (dans `Claude works/Website/HANDOVER-hire-page-retour.md`).
- [ ] Relire `now.md`, `uses.md`, `colophon.md`, `changelog.md`.
- [ ] Coller un lien d'article dans un brouillon LinkedIn pour vérifier l'aperçu (titre, description, image).
- [ ] Mettre l'adresse du site dans tes profils GitHub, LinkedIn et Medium, et `/cv/` sur tes CV.
- [ ] Optionnel : GoatCounter (`analytics.goatcounter`), Mastodon, Bluesky, Strava (`socials`).

## Plus tard

- Domaine perso (rmcd + extension à choisir) : voir `docs/deploy-github-pages.md`, puis `footer.badge` (aujourd'hui « RMCD .CH »).
- Les mini-apps (crypto dashboard, suivi de dépenses, calculateur CO₂).
- Webring : postuler au XXIIVV webring, puis `footer.webring`.

## Au quotidien

```bash
npm start          # http://localhost:8080 (un seul à la fois)
npm run new -- "Titre" --type post --lang fr --tags "digital"
npm run check      # build + liens + HTML
git add -A && git commit -m "…" && git push   # publication automatique
```
