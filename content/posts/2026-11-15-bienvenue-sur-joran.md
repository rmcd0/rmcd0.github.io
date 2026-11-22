---
title: "Bienvenue sur Joran"
description: "Ce qu’est ce thème, ce qu’il fait, et comment vous l’approprier en dix minutes."
lang: fr
type: post
tags: ["guide", "joran"]
translationKey: welcome
image: /assets/img/wind-lines.jpg
imageAlt: "Lignes courbes bleues et dorées sur fond sombre, comme des rafales de vent."
---

Joran est un thème pour [Eleventy](https://www.11ty.dev/) qui vous donne un site personnel complet : une page d’accueil, un journal, des tags, une recherche, des flux, et des pages comme *Now* et *Uses*. Il est fait pour celles et ceux qui veulent **écrire**, pas maintenir une application web.

## Ce que vous obtenez

- **Un seul journal** pour tout : articles, projets, notes… Les visiteurs filtrent par type et par langue, regroupés par année.
- **Une ou deux langues** : l’interface existe en français et en anglais, avec un sélecteur de langue dans la barre latérale. À vous de choisir, dans `content/site.config.js` :
  - garder les deux, ou remplacer l’une par une autre langue (espagnol, allemand…) en ajoutant son fichier de traduction ;
  - ou désactiver la fonction et servir tout le site dans une seule langue.

  Quel que soit votre choix, chaque article garde sa propre langue.
- **Thèmes clair, sombre et automatique**, trois palettes, et chaque couleur est une variable modifiable.
- **Rapide et respectueux** : pas de framework, pas de cookie, pas de traqueur, des polices servies par le site lui-même. Les images sont redimensionnées automatiquement.
- **Léger pour la planète** : un site statique est un ensemble de fichiers déjà prêts. Aucun serveur ne fabrique la page à chaque visite, aucune base de données ne répond, et les pages sont petites : moins de données circulent, moins d’énergie est consommée. C’est pourquoi le pied de chaque page affiche son poids réel, mesuré par votre navigateur, et une estimation du CO₂ qu’elle coûte : un chiffre sous les yeux est le meilleur rappel pour garder des pages légères.
- **Robuste** : la génération vérifie vos en-têtes et vous dit, en clair, quoi corriger.

## Surprises, dans l’esprit du web d’antan

Joran suit plusieurs [principes de l’IndieWeb](https://indieweb.org/principles), une communauté qui veut que les sites personnels restent personnels :

- **Vos données vous appartiennent** : vos articles sont de simples fichiers texte dans votre propre dépôt, publiés en HTML simple, idéalement sur votre propre nom de domaine. Aucune plateforme dont dépendre, rien de verrouillé, et des fichiers qui s’ouvriront encore dans vingt ans.
- **Des données visibles, d’abord pour les humains** : ce que lisent les machines, c’est ce que voient les gens. Un flux Atom pour les lecteurs de flux, des microformats pour que les outils de l’IndieWeb comprennent vos articles, et des liens `rel="me"` pour montrer que vos profils sociaux sont bien les vôtres.
- **Libre et open source** : le thème est sous licence GNU GPL v3 (ou ultérieure). Prenez-le, modifiez-le, partagez-le ; qui le partage, modifié ou non, le garde ouvert sous la même licence. Vos propres textes et images restent les vôtres.
- **Avant tout, s’amuser** : le dernier de ces principes, celui qu’ils placent au-dessus des autres. D’où les surprises :
  - un terminal : appuyez sur <kbd>§</kbd> (ou <kbd>~</kbd>), puis tapez `help`, `ls journal` ou `grep` suivi de n’importe quel mot ;
  - un thème secret derrière la pilule rouge et bleue de la barre latérale.

D’autres détails ne sont pas des principes, juste un clin d’œil aux pages perso des années 1990 et 2000 : le petit bouton 88×31 qui clignote dans le pied de page, comme les badges que l’on s’échangeait entre sites ; un lien de webring optionnel, un cercle de sites qui se recommandent les uns les autres ; le curseur qui clignote après le titre.

Pas votre style ? Chaque élément ludique se désactive dans `content/site.config.js` (`features` et `footer`) pour un site plus calme et plus classique.

## Vous l’approprier

1. Modifiez `content/site.config.js` : titre, adresse, langues, menu, réseaux.
2. Réécrivez `content/index.md` : c’est votre présentation.
3. Supprimez les articles de démo de `content/posts/` et écrivez le premier avec `npm run new -- "Mon premier article"`.
4. Publiez : poussez sur GitHub, le workflow inclus met le site en ligne avec GitHub Pages.

La [documentation](https://github.com/rmcd0/joran/tree/main/docs) détaille chaque étape. Bon vent !
