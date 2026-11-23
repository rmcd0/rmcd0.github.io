---
title: Colophon
description: Comment ce site est fait, et ce qu’il fait (ou pas) de vos données.
templateEngineOverride: njk,md
---

Comment ce site est fait.

## Fabrication

Du HTML statique généré par [Eleventy](https://www.11ty.dev/) à partir de fichiers Markdown, avec le thème [Joran]({{ joran.homepage }}) (version {{ joran.version }}). Pas de base de données, pas de code côté serveur : chaque page est un fichier, versionné sur [GitHub](https://github.com/rmcd0/rmcd0.github.io) et publié par GitHub Pages.

Joran est mon propre thème, publié en open source. Il porte le nom du *joran*, ce vent qui tombe du Jura sur le Léman sans prévenir, balaie le lac et repart. Un site léger devrait faire pareil : arriver vite, ne rien laisser derrière lui.

## Contenu

Des articles écrits depuis 2015, d’abord sur mon ancien site Jekyll (thème Moon) et sur Medium, désormais rapatriés ici. Chaque article garde sa langue et son ancienne adresse. Les images sont redimensionnées et converties à la construction du site.

## Typographie

[Inter](https://rsms.me/inter/) pour le texte, [IBM Plex Mono](https://www.ibm.com/plex/) pour les dates et le code, [VT323](https://fonts.google.com/specimen/VT323) pour un thème secret. Toutes servies depuis ce site : aucun appel à Google ni à un autre tiers.

## Icônes

[Tabler Icons](https://tabler.io/icons) (MIT).

<h2 id="privacy">Vie privée</h2>

{% include "partials/privacy.njk" %}

Le pied de page affiche le poids de chaque page, mesuré dans votre navigateur, et son estimation en CO₂.

## Licences

Code : [GNU GPL v3 ou ultérieure](https://www.gnu.org/licenses/gpl-3.0.html). Textes et images : [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr), sauf mention contraire (les dessins de presse et les images de tiers appartiennent à leurs auteurs). Réutilisez, citez, traduisez, republiez : il suffit de créditer rmcd et de mettre un lien vers l’original.

## Inspirations

[nikiv.dev](https://nikiv.dev/) pour la structure, [Retro Garden](https://retro-garden-eleventy-theme.vercel.app/) pour les couleurs de nuit, [l0g.fr](https://l0g.fr/), [lea.verou.me](https://lea.verou.me/), [small-tech.org](https://small-tech.org/) et tout l’IndieWeb : maîtriser ses données, et surtout, s’amuser.

## Pour les curieux

- [Changelog](/changelog/) : l’historique de ce site.
- [La page 404](/404.html) : voyez ce qui se passe quand on se perd.
- Appuyez sur <kbd>§</kbd> (ou <kbd>~</kbd> sur un clavier américain) pour ouvrir le terminal. Essayez `help`.
