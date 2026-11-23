---
title: "Digressions, hygiène numérique et devoirs de vacances"
description: "Bonnes pratiques d’hygiène numérique pour limiter vos données et leur propagation, et améliorer leur sécurité, leur organisation et leur accès."
type: post
lang: fr
tags: ["digital", "privacy"]
image: "/assets/img/posts/2019-01-10-1-kmWnjbl7tDCdC1gwA2zUWg-03ef43.webp"
imageAlt: "Coucher de soleil sur un ponton au-dessus de la mer"
permalink: "/digressions-hygiene-numerique-et-devoirs-de-vacances/"
imageCaption: "Inspiration et tranquillité d’esprit — Photographie personnelle prise à [Båstad, Suède](https://en.wikipedia.org/wiki/Båstad), 2014"
alsoOn: "https://medium.com/@rmcd0/hygi%C3%A8ne-num%C3%A9rique-protection-donn%C3%A9es-data-cleaning-r%C3%A9duction-sources-d8b4984ba755"
---

Les fêtes de fin d’année, synonymes de déconnexion (un peu), de bon temps en famille, de repas bien copieux et d’apéritifs sans fin (beaucoup)… et devoirs de vacances!

Oui alors non, enfin pas les cahiers d’exercices qu’on se trimbalait dans la valise quand on était minots, mais un exercice continu que chacun d’entre nous devrait prendre le temps de faire, un peu comme le ménage: au quotidien toute l’année, grâce au respect de certaines **bonnes pratiques** et quelques gros coups de balai quand l’occasion se présente.

L’article étant un peu long, en voici les principaux éléments. Menu :

- [Pourquoi](#pourquoi)
- [Gestion documentaire locale](#gestion-documentaire-locale)
- [Desktop](#desktop)
- [Smartphone](#smartphone)
- [Twitter](#twitter)
- [Sécurité: comptes, accès et mots de passe](#securite-comptes-acces-et-mots-de-passe)
- [Dégooglisation](#degooglisation)
- [Facebook](#facebook)
- [Autres réseaux sociaux](#autres-reseaux-sociaux)
- [Mails](#mails)
- [Du devoir d’être méfiant](#du-devoir-d-etre-mefiant)
- [Bonus — aller plus loin](#bonus-aller-plus-loin)

## Pourquoi

*Homo-numericus* vivant avec son temps, j’ai comme beaucoup une fâcheuse tendance à être aussi *homo-bordélicus*, notamment quand on est relativement noyé d’informations via de multiples sources de nos jours.

Sur mon bureau (IRL), j’ai longtemps eu l’habitude d’accumuler une montagne de documents, puis je la triais de temps à autre. *Rinse & repeat*, jusqu’à la pyramide suivante. J’ai d’abord eu un bureau plus grand.. et juste fait des pyramides plus grandes. J’ai forcé le changement il y a quelques années maintenant, en traitant chaque document quasiment dès réception puis en le classant, ou ne me permettant qu’une toute petite pile de to-do, par exemple les factures en cours. Chacun sa méthode, après tout, rangée ou non, la pile de document a peu d’impact en dehors de la poussière qu’elle accumule et de la déco du bureau.

![GIF](/assets/img/posts/2019-01-10-giphy-a72cb0.webp)
*Faut bien rêver*

Or, dans le domaine numérique, j’ai toujours été nettement plus rigoureux dans mon organisation: machines toujours propres (aux sens propre et figuré) et à jour, bien configurées et relativement sécurisées. J’ai toujours été effrayé devant le desktop de certains. En entreprise, j’ai toujours halluciné de voir l‘écran de certains utilisateurs plein au point qu’on ne voyait parfois plus leur fond d’écran. Au-delà du fait que si on a mis des DMS en place sur les projets c’est pas pour les chiens (**doc sur desktop = zéro backup**, décalages de versioning avec les autres collaborateurs, pas de synchro, sécurité des données en cas de vol du laptop), je ne comprends juste pas comment leur esprit arrivait à s’y retrouver dans ce souk. Côté privé, je ne compte plus le nombre de potes qui malgré un super-méga-gros disque dur d’enfer ont un jour pleuré d’avoir tout perdu faute de règles d’hygiène numérique et de sauvegarde correctes.

Et puis en terme d’impact numérique, tous ces datas stockés partout, dont la plupart sont inutiles, prennent de la place, beaucoup de place. On a presque tous notre part de **disques durs remplis d’octets inutiles**: du template tableur macro mis de côté y’a 10 ans en se disant “peut servir un jour”, à l’album de 80 photos d’une soirée dans laquelle y’a tout au plus 10 photos sympas à garder, en passant par le PDF d’inscription à tu ne sais plus quelle foire annuelle locale de dégustation de calvados (oui, c’est du vécu).

Le coût du stockage ayant énormément baissé, associé à la **prolifération des solutions cloud** bien souvent gratuites (en échange de l’analyse de tes données, bien sûr) et synchronisées entre tous les appareils, a mené beaucoup d’utilisateurs peu regardants à **ne plus se soucier ni de leur vie privée, ni de leur hygiène numérique**, ni encore moins de l’utilité de leurs données, sans y réfléchir outre mesure, jusqu’au jour où [les données fuitent](https://fr.wikipedia.org/wiki/Fuite_des_photos_de_personnalités_d%27août_2014). **On stocke tout, c’est génial, illimité, gratuit, invisible!** Google Photos propose une sauvegarde gratuite illimitée et on trouve maintenant des disques 1To à 60€, alors osef!

![Coût du stockage disque dur depuis 1980 — source: mkomo.com](/assets/img/posts/2019-01-10-1-a3jACh5XZXWPynZeRdf-uQ-cdf684.webp)
*Coût du stockage disque dur depuis 1980 — source: [mkomo.com](http://www.mkomo.com)*

Du point de vue écolo, c’est pas folichon non plus, alors que comme avec la nourriture, c’est pas si compliqué d’instaurer des règles simples pour faire attention, trier et recycler. Toute donnée stockée engendre **consommation et émission de ressources**, depuis les matériaux utilisés pour fabriquer cette solution de stockage, jusqu’à l’énergie utilisée pour la faire fonctionner. Les articles sur le sujet foisonnent. Techniquement, cet article va aussi apporter quelques octets de plus à l’écosystème, alors je vais pas tarder à devoir arrêter cette intro.

Outre la praticité d’avoir peu de données, bien rangées, de les retrouver aisément et d’avoir des sauvegardes propres et diversifiées, c’est aussi plus économique: être rationnel dans mes données me permet de me contenter d’un vieux HDD 500Go trèèès largement suffisant, acheté il y a des années, ou d’avoir des smartphones en version de base et de n’utiliser qu’entre 6 et 8Go dessus.

Pour mes backups physiques, comme j’ai parfois fait de la récupération/restauration de vieux PC, j’ai 2 vieux HDD ‘bruts’ de 500Go qui ne m’ont rien coûté d’autre qu’un simple câble eSATA (que j’ai aussi récupéré je ne sais où, en fait). Puis, une machine ayant moins de données à indexer tourne aussi sensiblement mieux.

![Leg numérique — cursus.edu](/assets/img/posts/2019-01-10-1-UupsinKtvLeQrdU1GIbuvA-eedbf9.webp)
*Leg numérique — [cursus.edu](https://cursus.edu/articles/36614/que-transmettra-lhomo-numericus-a-ses-descendants#.XDTGMnKYXec)*

Enfin, c’est aussi une simple forme de *digital minimalism*, de **rejet de l’encombrement numérique.** Au-delà de l’aspect tracking, profiling, vie privée, interconnexion des données, c’est une volonté de simplicité. Pour votre sécurité, efficacité, organisation, l’environnement ou juste le plaisir, instaurez-vous quelques bonnes pratiques numériques, vraiment!

Au programme: tri de données, suppression de comptes, backups ou suppression de fichiers, dégooglisation de certains procédés, changement de ROM du smartphone, rattrapage et tri d’articles à lire, ménage des flux RSS et des comptes Twitter n’ayant plus d’intérêt, tri des favoris des navigateurs, suppression de comptes inutilisés: je m’étais fixé pas mal d’objectifs pour ces vacances de fin d’année! J’y reviens ci-après, ainsi que sur mes principaux fondamentaux de l’hygiène numérique quotidienne.

[[*retour menu ↑*](#main)]

![Allez hop, on s’y met!](/assets/img/posts/2019-01-10-1-f-2Zajsay_aO3DNBnEfQxA-0bcbdb.webp)
*Allez hop, on s’y met!*

## Gestion documentaire locale

Qu’on soit sous Windows, Mac, ou Linux ici, on retrouve +/- la même hiérarchie interne en terme de gestions de fichiers: Documents / Images / Vidéos / Téléchargements, etc. Personnellement, j’organise ma gestion de la sorte depuis de nombreuses années:

![Organisation interne des documents](/assets/img/posts/2019-01-10-1-cisVHp6B3Kt8XV477gz12w-9ca6c0.webp)
*Organisation interne des documents*

Chaque sous-fichier reprend une logique d’ordonnance en ‘01_’, puis ‘a_’ pour son sous-fichier, et éventuellement à nouveau par chiffre pour tout dossier de niveau encore inférieur. Les sous-fichiers pourraient aussi continuer en aa_, bb_, etc. L’essentiel est que cela soit **fonctionnel et facile à mémoriser**. Cela m’aide par exemple à mieux naviguer au clavier en tapant juste les chiffres ou lettres, ou à mieux mémoriser les chemins quand je me déplace via le terminal.

Je m’accorde bien des boîtes à fourre-tout, comme par exemple dans Images/03_sandbox, dans lequel se trouvent les images à traiter plus tard.

Pour les photos, elles sont toutes **triées par année puis par mois** (2017/01_janvier, 2017/02_février, pour reprendre la logique précédente). J’y effectue fréquemment un tri sans pitié afin d’en limiter la taille globale. Les vidéos, notamment filmées avec le téléphone sur le moment dans une soirée, dans la rue, pour capturer un instant? plus d’intérêt quand tu les revois 6 mois après. 150 photos pour le voyage en Islande? Mouais, allez, je fixe la limite aux 30 meilleures et j’efface le reste. C’est ainsi que toute mon archive de 14 ans d’images privées tient (tout de même ou seulement, c’est selon) sur 120Go et 168 folders (=mois). A multiplier par 3 car j’en ai 2 sauvegardes physiques.

[[*retour menu ↑*](#main)]

## Desktop

Là aussi, simple et efficace.

- Dock du bas: reprend les programmes fréquents tels que les navigateurs, dont [Vivaldi](https://vivaldi.com/fr/) (navigateur à découvrir, vraiment!) et Firefox sont les principaux (Chromium me sert quand j’ai besoin de vérifier une compatibilité ou des nouveautés Chrome), le gestionnaire de fichiers, le VPN, etc.

![Desktop — Distribution: Linux Voyager](/assets/img/posts/2019-01-10-1-IojazSg51DhCLx7xVO-1Og-07f60b.webp)
*Desktop — Distribution: [Linux Voyager](https://voyagerlive.org/)*

- Au centre, les outils principaux que j’utilise en local: synchro Netxcloud, VM, éditeur, GUI pour Git (GitKraken, que j’utilise depuis peu, vraiment tip top!), lecteur RSS (même politique que le reste: classement efficace et tri fréquent des flux devenus moins intéressants, sinon en 6 mois c’est le bazar et t’es noyé sous les flux).
- A gauche, les fichiers (ou raccourcis) de choses en cours. Je m’y permets +/- de fouillis selon l’époque et le nombre de travaux en cours. Ces éléments sont supprimés ou replacés dans les folders correspondant lorsque je n’en ai plus (autant) besoin.
- A droite, un [conky](https://doc.ubuntu-fr.org/conky) me permet d’avoir un rapide coup d’œil sur le système, RAM-CPU, stockage, IPs, etc.

Le reste des programmes est accessible à la souris en haut à gauche, dont quelques favoris d’une part (calculatrice, LibreOffice), ou plus rapidement via le terminal, c’est selon. Du coup, je n’utilise qu’à peine 20Go de mon SSD (mes archives photos sont stockées ailleurs).

[[*retour menu ↑*](#main)]

## Smartphone

Mi-ni-ma-lisme. L’objectif est de réduire le nombre d’apps de l’appareil, d’alléger son contenu, d’avoir un téléphone non agressif, de réduire pistage et profilage de nos données, d’enfin **donner du sens au *smart* de *smartphone***. Les fournisseurs utilisent toutes les techniques possibles pour créer de l’engagement et on est tous coupables de naviguer parfois bêtement dans des flux, d’article en vidéo, sans trop savoir pourquoi on était venu en premier lieu. On nettoie donc les principales distractions de l’attention et allège l’interface. Accessoirement, cela **favorise aussi l’autonomie** de la batterie, la moindre consommation de données et une réduction des sources de pistage:

- éviter au maximum les notifications en tout genre; strict minimum
- choisir des sons de notifications courts et doux
- désactiver les fonctionnalités inutilisées: bluetooth dont je ne me suis pas servi depuis des années, AirDrop, Handoff, partage de connexion, etc
- mettre en mode avion en ne gardant que le Wifi, ou en mode ne pas déranger, par exemple de 21h à 8h
- bannir la commande vocale, bien sûr. Pas de “*OK Google*”, ni de copinage avec Siri (ni sa cousine Alexa).

Thomas Gouritin, fondateur de TomG Conseils, rappelle dans les dossiers du Canard Enchaîné spécial vie privée d’octobre dernier: *“au même titre que l’empreinte digitale,* ***la voix est une donnée biométrique*** *qui nous identifie”*.

- laisser le téléphone dans le salon avant d’aller se coucher: je m’y mets mais je ne suis pas encore fiable à 100% là-dessus.. par contre il est systématiquement en mode avion et ne sert que de réveil et de support pour podcasts
- désactiver les synchros automatiques en tout genre, les faire manuellement ou régler un temps plus long (ex: l’app Podcasts propose d’office de vérifier les nouveaux épisodes chaque heure, alors que les podcasts que j’écoute sont quotidiens voire hebdomadaires).
- supprimer toutes les apps inutiles, dont celles installées d’office
- désactiver la synchronisation des photos: je les trie fréquemment et je sauvegarde celles qui me semble importantes en local
- SMS, WhatsApp, etc: *burn after reading!* J’efface après lecture sauf si besoin de conserver temporairement. Dans WhatsApp, pour ne pas quitter et supprimer un groupe, simplement choisir d’effacer la conversation. Enfin, je désactive les backups aussi. Aucun besoin d’envoyer mes messages sur le cloud et strictement rien à secouer si je les perds
- WhatsApp bis: marre que les photos de ton téléphone soient composées à 80% de conneries issues de WhatsApp? Donc bien penser à désactiver le téléchargement automatique des photos dans les conversations!
- éviter les apps lourdes et/ou intrusives. Éventuellement favoriser une web app. Exit les Eurosport ou autre Le Monde sur mon tél.
- vérifier quels sont les accès demandés par l’app et ce qu’elle contient. Chercher des alternatives le cas échéant, ou juste s’en passer.
- vérifier et bloquer d’office l’accès des apps aux photos, micro, géolocalisation, etc
- de manière générale, se concentrer sur les apps utiles et répondant à un besoin (je veux me déplacer = cartographie GPS).

Trop d’apps répondent à un problème qui n’existait pas avant elles (Insta, Snapchat, FB, etc) et n’ont pour objectif que de consommer du temps de cerveau disponible, d’inciter l’utilisateur à prendre sa dose de dopamine à chaque notification ou, surtout, de collecter ses habitudes et données personnelles puis le catégoriser pour lui vendre des trucs tout aussi inutiles. On dégage donc ça, voire idéalement on ne s’y inscrit même pas :-)

Si l’on s’intéresse à l’écosystème et aux mécanismes qui se cachent derrière l’interface de nombreux sites et apps, des outils tels qu’[Exodus Privacy](https://exodus-privacy.eu.org) ou [Lightbeam](https://en.wikipedia.org/wiki/Lightbeam_%28software%29), simples à installer et comprendre, révèlent de croustillants détails. La 1ère est une [app Android](https://play.google.com/store/apps/details?id=org.eu.exodus_privacy.exodusprivacy&hl=fr) affichant les **trackers embarqués** dans vos applications, la 2nde est une [extension du navigateur Firefox](https://addons.mozilla.org/fr/firefox/addon/lightbeam/) représentant le cheminement du **pistage de votre navigation**. Edifiant !

![Extrait des dossiers du Canard Enchaîné: “ #vie privée c’est terminé! ” d’octobre 2018 — commandable en ligne](/assets/img/posts/2019-01-10-1-HogfqvemtXKFw5ccd4X-8w-88859d.webp)
*Extrait des dossiers du [Canard Enchaîné: “*#vie privée c’est terminé!*”](https://www.lecanardenchaine.fr/vie-privee-cest-termine/) d’octobre 2018 — commandable en ligne*

- GPS: à propos, favoriser des outils tels que [OsmAnd](https://osmand.net/) plutôt que les apps natives d’Apple et Google: basée sur OpenStreetMap pour les cartes et Wikipedia pour les points d’intérêt, fonctionne totalement hors-ligne et contient des options piétions et cyclistes. L’interface est un peu moins *fancy* que sur GMaps ou Waze, mais fait tout à fait le boulot.
- GPS²: plus simplement, **utiliser un GPS traditionnel** (type *Tomtom)*: pas de profil ni de compte, zéro log ni tracking de données personnelles. Si on n’en a pas, ça se trouve à pas cher en occasion, tout le monde s’en débarrasse pour se servir de son téléphone! Astuce: ne pas mettre sa propre adresse dans “domicile” mais un lieu proche, voire la gendarmerie du coin :-) Ça évite de se faire du souci si on se le malheur de se le faire voler pendant ses vacances en même temps que son trousseau de clés…

J’ai temporairement du adopter un iPhone (moi qui voulait éviter d’avoir à paramétrer un compte Apple, scrogneuneu!), mais la façon dont je l’ordonne diffère assez peu de l’écran que j’avais sous Android il y a encore peu:

![iOS organisation](/assets/img/posts/2019-01-10-1-lbZP-wgLgsrxq1wIthbz1w-00bae7.webp)
*iOS organisation*

C’est simple, les apps que j’utilise le plus (moins d’une dizaine) sont dans *using*,et celles que je ne peux supprimer (une vingtaine: horloge, caméra, Safari, etc) ou que j’utilise peu (réglages, App store) dans *not using*. En bas à gauche, les communications (SMS, appels, WhatsApp), au centre le navigateur, à droite l’audio (Podcasts, Radio France, cette dernière contient une palanquée de trackers et je cherche à m’en débarrasser bientôt!). Ne pas avoir un tas d’applications sur l’accueil permet aussi d’éviter la distraction d’ouvrir machinalement son téléphone et une app juste pour s’occuper.

Si je teste une app (ici wehe et OneThingLess) ou n’en ai besoin que temporairement (SBB Mobile, la compagnie ferroviaire Suisse) je la mets dans le volet de droite. Et voilà.

Bon l’ordi, c’est fait, le smartphone aussi, il est temps de s’attaquer à la vie en ligne.

[[*retour menu ↑*](#main)]

## Twitter

Twitter, c’est le plus intéressant des contenus, quand on sélectionne bien, comme le plus grand foutoir, si t’es plutôt orienté trolls et conspirationnistes. C’est le seul réseau social sur lequel je concède me connecter souvent pour lâcher des données.

Mes abonnements sont répartis dans une dizaine de listes, entre pro: **Twitter est un formidable outil de veille** (digital, marketing, tech, influenceurs), et perso: hobbies, crypto, amis, actus-news, dessinateurs (mon petit faible) et un peu de lol parce que bon, c’est Twitter quand même. Ces derniers mois mon feed avait nettement perdu tant en qualité qu’en pertinence, ayant ajouté un peu trop de comptes à la volée. Au programme:

- Écrémer: reprendre les listes une par une et éliminer le superflu. Près de 1000 abonnements avant, un peu moins de 700 maintenant, et pas fini. C’est un peu long car fait manuellement*.
- Création d’une liste “temp”: pour certains nouveaux comptes que j’ajoute, notamment dont la qualité et la pertinence m’intéresseront particulièrement (personnalité culturelle, analyses, etc), je l’ajoute d’abord dans cette liste temporaire puis l’observe quelques temps avant de me décider à le follow ou non.
- Les “j’aime”: je trie aussi fréquemment. Quelques-uns sont vraiment des tweets que j’aime, mais cette fonctionnalité me sert surtout de classement à la volée pour des choses sur lesquelles je souhaite revenir plus tard. C’est plutôt comme une extension de Pocket. Une fois lu, hop, ça saute!

**il existe bien quelques outils en ligne permettant de sélectionner en masse mais libre à chacun de vouloir connecter son compte Twitter à une app inconnue…*

[[*retour menu ↑*](#main)]

## Sécurité: comptes, accès et mots de passe

J’utilise [Secure Safe](https://www.securesafe.com/fr/) depuis pas mal d’années maintenant, en Pro (16€/an). Rien à dire sur leur service, vraiment clean et simple. Il y a une fonction team bien pratique pour certains comptes partagés en entreprise. Le fait que la société et son stockage soient en Suisse (donc **or USA & UE**) était clairement un facteur décisif. J’ai donc repris la liste des mots de passe enregistrés et regardé quels étaient les comptes dont je n’avais plus besoin.

- Effacer chaque compte inutile, quand c’est possible depuis l’UI…

…n’est-ce pas Vistaprint, SBB-CFF, Clearbooks, gifs.com, La Mobilière, Strikingly? que j’ai du contacter un par un. Génial!

Pour Ricoh Imaging c’est pire, ma demande en est à son 2ème ticket, 2è conseiller différent, et dure depuis 3 semaines. Aux dernières nouvelles du 27 décembre, ce dernier venait de “transmettre le dossier à son supérieur”. J’ai juste demandé de supprimer mon compte et mes données!!

- Si contact direct: en profiter pour leur exiger au passage la demande de **suppression totale des infos personnelles**.
- Astuce: préparez-vous un modèle type dans les brouillons de votre boîte mail, contenant votre demande de suppression des données et la référence au texte légal de votre état ainsi qu’au RGPD, cela vous incitera à plus facilement franchir le pas pour balancer des demandes à la pelle!

Moins de comptes et de données stockées, c’est aussi une potentielle surface d’attaque réduite d’autant — ce serait quand même ballot de se faire poutrer via un compte dont on a presque oublié l’existence!

- Changement des mots de passe: je n’ai pas de timer précis mais les accès les plus courants ou sensibles sont changés plusieurs fois par an. Excellents points pour Secure Safe au passage: 1/ la mention de la date du dernier changement du password et 2/ la mise en évidence des mots de passe jugés trop faibles ainsi que de ceux étant utilisés sur plusieurs sites!
- 2FA: penser aussi à effacer les clés de double-authentification des comptes supprimés, stockées dans le coffre fort numérique ainsi que sur l’app.
- 2FA bis: si t’es sur Google Authenticator, en profiter pour migrer, vraiment. Choisir une app fiable et offrant un backup chiffré car avec l’app Google, en cas de **perte du mobile, aucune sauvegarde** nulle part! Authy a le mérite d’avoir une fonction de sauvegarde, par exemple.
- Mots de passe enregistrés dans le navigateur et/ou extensions type LastPass: alors c’est bien pratique, mais c’est non. Les rares passwords enregistrés dans mon navigateur sont pour des comptes non-stratégiques et sans véritables données personnelles.

[[*retour menu ↑*](#main)]

## Dégooglisation

Bon cette partie-là, je l’ai commencée y’a bien longtemps, mais elle reste partielle et assez paradoxale. En effet,

- côté perso je suis plutôt libriste, orienté vie privée, attentif aux données que j’émet et partage: mes archives photos sont sur du stockage physique en divers endroits ou du cloud séparé de mes autres comptes, j’utilise de préférence les outils Framasoft en ligne ou la suite LibreOffice en local, ou encore Inkscape, GIMP et Kdenlive pour les travaux image & vidéo, mes ordis sont tous sous Linux, etc
- côté pro je fais (à l’heure actuelle) du marketing et conseil numérique pour des PME, du SEO, de l’Analytics, des plateformes interactives basées sur Google Maps / Streetview, de l’acquisition, et j’héberge mon activité sur Google Suite. Gné! #facepalm

Mais je suis aussi justement bien placé pour voir l’étendue considérable du spectre GAFAM. Il est toutefois clair que, pour les entreprises, à l’heure actuelle il n’y a pas photo: si tu veux que ton business soit vu, le travail de présence en ligne passe nécessairement par Google. Ce qui n’empêche pas de préserver ce qui relève justement du privé.

Les deux activités n’ont donc pas lieu depuis le même navigateur ou parfois pas la même machine (VM) ou IP (VPN), ainsi que diverses extensions, bien qu’il y ait forcément du recroisement de données et que je ne vive pas si caché que ça puisque certains de mes profils se redirigent volontairement les uns vers les autres (Twitter, Medium, LinkedIn..). Mais quand je constate qu’il y a peu, Twitter ciblait mon profil comme une “*femme entre 13 et 54 ans ou d’âge supérieur à 65 ans*”, je me dis que je m’en sors pas trop mal — ou que l’algo de Twitter a encore beaucoup de boulot ?En bref:

- favoriser les outils libres et Open Source (ne veut pas forcément dire gratuits, *Free as in speech, not as in beer,* ne pas hésiter à payer pour un FOSS en valant la peine!)
- réfléchir avant toute mise en ligne de données: dans quel but? dois-je vraiment partager cette ressource avec des amis ou collègues? Sa fuite représente-t’elle un risque pour moi?
- Si oui, y’a t’il une alternative saine aux GAFAM, Dropbox, WeTransfer & co? (spoiler: oui, des tas!)
- Lorsque je “dois” utiliser Google, éviter de le faire sous le même profil/accès/navigateur que mes onglets personnels

![Les prédicateurs de l’open source avant que les GAFAM ne conquièrent nos données — xkcd](/assets/img/posts/2019-01-10-1-oXtrvRI0Q4tflNM14jlrGw-a00bb4.webp)
*Les prédicateurs de l’open source avant que les GAFAM ne conquièrent nos données — xkcd*

**Gmail**: je conserve mon vieux compte comme fourre-tout bien ordonné (on y reviendra) pour lequel j’accepte justement qu’une corrélation soit faite entre ce qui y entre/sort et qui a peu d’importance et certains profils créés avec cette adresse. Mais j’utilise d’autres services (ProtonMail notamment) pour des communications et comptes d’inscriptions à des outils importants.

**Youtube**: une chaîne liée au compte Google, mais quasiment sans visiteurs, ni abonnés, ni intérêt d’ailleurs, c’est plus un *repository* de divers projets. Quant aux flux qui m’intéressent (Youtubeurs science et espace principalement), je passe de plus en plus à l’ajout de leur feed dans mon RSS pour être notifié de leurs vidéos:

→ astuce: on peut **ajouter l’URL d’une chaîne dans un agrégateur RSS**, ou bien télécharger le fichier OPML directement depuis [la page de gestion des abonnements](https://www.youtube.com/subscription_manager) pour l’importer ensuite.

A faire manuellement un par un, ça permet là aussi de reconsidérer l’utilité réelle de chaque abonnement.

**Contacts / Drive / Agenda**: pas besoin → Nextcloud. Même une offre de compte gratuit chez [les fournisseurs agréés](https://nextcloud.com/providers/) (souvent limité à 4 ou 5Go) est suffisante dès lors qu’on applique justement quelques bonnes pratiques et que l’on s’en sert plutôt pour ses fonctionnalités que pour son stockage.

J’**évite le cloud pour mes données privées** telles que photos et documents: puisqu’elles sont privées, je ne vois pas pourquoi j’irais les mettre sur l’ordinateur d’un inconnu! En revanche, côté professionnel, je partage sur GSuite du contenu à des partenaires ou clients pour leurs projets. Il faut reconnaître que Google a développé un outil diablement efficace et intuitif!

**Android**: je voulais déjà installer [LineageOS](https://lineageos.org/), un système d’exploitation open source basé sur Android l’an passé sur mon bon vieux Nexus 5, mais j’avais repoussé. Il existe aussi un [fork MicroG](https://lineage.microg.org/) pour ceux qui tiendraient malgré tout à conserver les services Google principaux sur Lineage. Cette fois, pendant les vacances, j’avais du temps et m’y suis mis pour de bon. Manque de pot, comme écrit en intro, échec total:

Mon Nexus 5 avait parfois tendance à rebooter soudainement et, lorsque cela arrivait, il restait bloqué dans une bootloop pendant une grosse journée; ça lui arrivait 2 fois par an environ, donc j’attendais juste que ça passe. Jour-J, je m’y mets, installe les paquets *adb* et *fastboot* sur mon Linux, débloque le bootloader du Nexus, commence à flasher l’[outil de backup TWRP](https://twrp.me/), et plaf! Crise de hard reboot. Je n’ai pas encore trouvé de solution, je ne sais d’ailleurs par si c’est rattrapable… Projet d’un smartphone libre remis à plus tard.

[[*retour menu ↑*](#main)]

![Jusqu’ici tout allait bien!](/assets/img/posts/2019-01-10-1-6FMOLxiefPHVvHr_A9aoqA-2cc003.webp)
*Jusqu’ici tout allait bien!*

## Facebook

J’avais résisté pas mal de temps sans m’inscrire, puis succombé après quelques années. Plus tard, habitant loin de ma Normandie natale ou ayant des amis et de la famille un peu partout en France comme à l’étranger, prendre et donner des nouvelles est clairement devenu un besoin ponctuel.

Je n’ai pas (encore?) succombé à la vague de désinscription de ces derniers mois suite aux nombreux scandales, pour la simple et bonne raison que j’avais déjà **isolé Facebook du reste de mon activité** **en ligne** depuis bien longtemps et été vigilant quant au contenu publié. Sans jouer le donneur de leçons (je n’aurais d’ailleurs jamais imaginé l’ampleur que ça prendrait), ça sentait déjà un peu le flan à l’époque, ce truc. Bref, j’y accède et lâche un peu de contenu de temps en temps quand même.

![Moi publiant un post de temps à autre en offrande à Facebook et ses nombreux partenaires; allégorie.](/assets/img/posts/2019-01-10-1-q4zS5PLtCOh0lN-WgyvtAw-2bc8f4.webp)
*Moi publiant un post de temps à autre en offrande à Facebook et ses nombreux partenaires; allégorie.*

Mais je ne l’utilise qu’en environnement clos et ponctuellement, parfois quelques jours d’affilée, parfois plus du tout pendant 1 mois — généralement quand je réalise que j’y ai trop accédé sans y réfléchir en peu de temps et que cela a donc eu une emprise sur moi.

Enfin, jamais avec mon laptop ni mon smartphone. Seulement une ancienne tablette récupérée en entreprise il y a longtemps, qui me sert de passe-temps ou pour tester des trucs, et qui est connectée sur un autre réseau. Autrement, à recommander:

- publications privées et limitées au réseau par défaut, et paramétrage attentif de toutes les options du compte
- réfléchir avant toute publication: quelle est son utilité? quelle info? qui est sur l’image? cette personne est-elle d’accord ou en âge de l’être (le petit dernier qui gazouille, c’est non)
- visibilité recherche du profil: limiter aux seuls amis d’amis
- Smartphone: éviter. Ou bien privilégier une web app plutôt que la louuurde app officielle qui pompe tout le contenu du téléphone (et sa batterie)
- refuser toute app de tests, sondages ou jeux à la con. Malheureusement même sans cela, les scandales du printemps dernier ont montré que vos données fuitaient si vos amis se sont eux-mêmes inscrits à ce type de futilités (sic!)
- ne surtout pas utiliser son compte Facebook pour se connecter ou **s’inscrire à des services externes**. C’est pas compliqué de prendre 2 minutes pour créer un identifiant sur une plateforme! Si t’as la flemme de le faire c’est probablement que cette plateforme n’en vaut pas la peine. Cqfd.

Si l’outil en question vous **force** à vous inscrire via vos compte Google ou Facebook uniquement, il n’en vaut VRAIMENT pas la peine et souhaite seulement vos données. Cessez de goinfrer Facebook de votre vie en ligne complète, sur PC comme (surtout) sur smartphone.

D’où la nécessité de soigneusement dégager toutes les apps inutiles de son téléphone. Toujours dans “Les dossiers du Canard Enchaîné” cités plus haut, Thomas Gouritin décrit:

> > *« un grand nombre de sites ou d’applications embarquent des pisteurs fournis par Facebook demandant accès à nos carnets d’adresses et qui l’informent notamment sur le nom de l’application ou du site visité, le nombre de consultations, leurs dates et heure, mais aussi toutes les données qui ont été saisies ». Exemple : un site ou une application de suivi de grossesse va fournir à Facebook le prénom, le genre, la date de naissance prévue, le type d’allaitement, etc., de l’enfant né ou à naître.*

![Extrait des dossiers du Canard Enchaîné: “ #vie privée c’est terminé! ” d’octobre 2018 — commandable en ligne](/assets/img/posts/2019-01-10-1-NtDwerh5D6OxgoDdj1DqHA-38172b.webp)
*Extrait des dossiers du [Canard Enchaîné: “*#vie privée c’est terminé!*”](https://www.lecanardenchaine.fr/vie-privee-cest-termine/) d’octobre 2018 — commandable en ligne*

Il y a quelques années, j’utilisais un script sur iMacros dans Firefox que j’avais réglé pour qu’il efface mes publications quand je le déclenche. Un jour, plus moyen d’opérer, il fallait faire manuellement. C’est là que j’ai arrêté de mélanger Facebook avec mes autres activités/profils sur mes ordis.

[[*retour menu ↑*](#main)]

## Autres réseaux sociaux

Snapchat, Pinterest, Flickr et compagnie: c’est simple, j’ai pas! Enfin j’ai un Insta, ayant anciennement créé un compte pour mon activité pro, sur lequel j’ai publié des images de mes projets clients. Le taux d’engagement sur cette plateforme est vraiment intéressant, et il est flatteur de publier tes projets et de voir que les gens *likent*, mais à la fin ça ne paie ni le freelancer — moi — ni mon loyer.

Recommandations usuelles: **au mieux à éviter, au pire être vigilant** sur la config du compte, sécurité, géolocalisation, accès micro, vie privée, etc.

[[*retour menu ↑*](#main)]

## Mails

Comme la pyramide de docs sur le bureau, un jour j’ai halluciné en voyant le nombre de courriels dans mes boîtes et entrepris d’en repenser la gestion.

- là aussi: *burn after reading* au quotidien pour la majeure partie
- suppression des inutiles: par taille, par nom ou, pour retrouver par exemple des newsletters qu’on a oublié d’effacer, chercher les mots-clés “unsubscribe”, “désabonner” ou “désabonnez”.
- créer des règles automatiques et labels pour dépolluer la boîte principale dans laquelle je ne laisse que les éléments du moment à traiter ou en attente de réponse.

![Overview de mon compte Gmail, c’est quand même plus agréable de s’y retrouver…](/assets/img/posts/2019-01-10-1-lkAUVES-kdvurvB0FQpusw-cded38.webp)
*Overview de mon compte Gmail, c’est quand même plus agréable de s’y retrouver…*

Tous les autres mails conservés pour archive sont classés dans des labels, et une partie est supprimée lors des quelques grands ménages annuels. Quant aux newsletters d’emploi, ce que je reçois logiquement le plus à l’heure actuelle, une règle les classe comme “Job ads”. Il n’y a que le folder “Reading” qui contienne quelques éléments mis de côté pour traitement ultérieur. Accéder et travailler sur ma boîte mail est nettement plus agréable ainsi, tant pour la visibilité que pour l’esprit.

[[*retour menu ↑*](#main)]

---

## Du devoir d‘être méfiant

Si j’abordais le sujet tout d’abord plutôt dans une approche de minimalisme et de suppression de l’inutile, il est clair que mon hygiène numérique courante est extrêmement corrélée à une certaine paranoïa visant à réduire d’autant le pistage et la collecte des données. Il ne faut pas se leurrer, j’ai déjà **fourni des milliers de lignes de données à d’opaques entités** depuis le début de ma vie numérique. Mais puisqu’il vaut mieux prévenir que guérir et qu’il semble plutôt compliqué d’aller effacer soi-même ses données dans un data center GAFAM, il est plus sage de contrôler attentivement leur propagation. Nous sommes en train de coder et développer un monde entièrement numérique dans lequel on semble parfois choqué d’apprendre qu’**Orwell n’était pas si loin du compte**. Un citoyen résident d’un pays a priori libre et démocratique aujourd’hui a-t’il la garantie que ce dernier le restera indéfiniment? Ne devrait-il pas se méfier dès à présent du fichage automatique?

![Extrait des dossiers du Canard Enchaîné: “ #vie privée c’est terminé! ” d’octobre 2018 — commandable en ligne](/assets/img/posts/2019-01-10-1-gbj3li2RFLavNe3Vs936Sg-f681b9.webp)
*Extrait des dossiers du [Canard Enchaîné: “*#vie privée c’est terminé!*”](https://www.lecanardenchaine.fr/vie-privee-cest-termine/) d’octobre 2018 — commandable en ligne*

La grande majorité des utilisateurs n’a aucune idée de l’écosystème numérique complet qui s’alimente et s’enrichi déjà sur le dos des données privées — moi le premier, très certainement. L’équivalent numérique d’un puits de pétrole intarissable. Qui d’entre vous connaît les brokers collectant, achetant et revendant vos données? Ils s’appellent Acxiom, Infogroup, Experian, Quantum, Epsilon, CoreLogic, Recorded Future, Datalogix, Inome, PeekYou ou… Cambridge Analytica.

Rien qu’Acxiom dispose des profils détaillés de 2.2 milliards de personnes dont il tire une recette de près d’1 milliard de $. Les *data brokers,* une face pas si cachée du web, mais clairement méconnue:

> > Les données utilisateurs contiennent parfois « plusieurs milliers de ligne : âge, sexe, taille, poids, statut marital, religion, niveau d’éducation, problèmes de santé, habitudes de consommation, tendances politiques, appartenance ethnique, centres d’intérêt, adresse, montant des crédits… » (dossier Canard Enchaîné).

---

Je ne parle (et divague) ici que de quelques méthodes que j’**applique à moi-même** et qui selon moi représentent des **principes simples** à mettre en place et respecter pour ne pas se laisser trop envahir par l’overdose de notifications, documents et données que nous faisons avaler à nos esprits et machines chaque jour. Quant aux outils utilisés, s’il est préférable de se tourner vers des solutions open source et respectueuses de la vie privée, j’ai conscience d’être **plein de contradictions** et qu’il est parfois difficile d’effectuer une totale *déGAFAmisation* de ses environnements. Toutefois voilà un peu de discipline, de bon sens, de réflexion avant de diffuser ses données n’importe où, qui sont à la portée de chacun :-)

[[*retour menu ↑*](#main)]

---

## Bonus — aller plus loin

Plusieurs des illustrations et citations utilisées ici proviennent de l’excellent supplément d’octobre 2018 du Canard Enchaîné, [commandable en ligne](https://www.lecanardenchaine.fr/vos-commandes/) si vous l’avez raté. 120 pages d’information captivante pour qui aime le sujet, de la face cachée de la collecte des données au puissant lobbying des GAFAM auprès des institutions européennes, en passant par les accords malins de Microsoft avec l’Education Nationale ou de Facebook avec Pôle Emploi et les logiciels d’analyse comportementale accompagnant les caméras de vidéosurveillance urbaine. Ci-après un patchwork (fait sur Inkscape, alternative libre à Adobe Illustrator, bien sûr!) des quelques dessins que j’avais mis de côté pour cet article et dont je ne me suis pas servi:

![Extrait des dossiers du Canard Enchaîné: “ #vie privée c’est terminé! ” d’octobre 2018 — commandable en ligne](/assets/img/posts/2019-01-10-1-bwTMJUyP0lL3UgGDN376DA-395eef.webp)
*Extrait des dossiers du [Canard Enchaîné: “*#vie privée c’est terminé!*”](https://www.lecanardenchaine.fr/vie-privee-cest-termine/) d’octobre 2018 — commandable en ligne*

Enfin, prendre le temps de se laisser compter l’histoire de la vie (plus très) privée de Bob et Carole, “*deux jeunes gens qui vous ressemblent. Une aventure, une tromperie, un secret inavouable, voici le synopsys parfait d’un Harlequin pour jeunes filles en fleur. Et pourtant, dès lors que l’eau de rose est diluée dans un océan commercial, l’intimité de nos protagonistes n’est plus qu’une information à vendre”.* Datant du festival Pas Sage En Seine 2014, cette conférence est toujours fichtrement d’actualité et illustre parfaitement l’envergure et l’impact des données numériques sur les faces les intimes de nos vies.

→ [Libérer Internet : Sexe, alcool et vie privée — sur Lorraine Data Network](https://ldn-fai.net/liberer-internet-sexe-alcool-et-vie-privee/)

[[*retour menu ↑*](#main)]
