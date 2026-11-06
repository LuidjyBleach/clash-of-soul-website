# Sécurité de la publication V2

Le propriétaire a explicitement approuvé le design, les 15 cartes et les quatre illustrations et confirmé les droits nécessaires dans son instruction du 6 novembre 2026. Les statuts des ressources sont `approved` et `rightsConfirmed: true`. Le manifeste contient leurs références et les empreintes des exports optimisés. Les 34 WebP publiés sont comparés octet pour octet par empreinte SHA-256 aux exports approuvés.

Le dépôt public comprend le code propre au site, les métadonnées de cartes sélectionnées, les images expressément approuvées, les données publiques de releases et sa documentation. Aucun moteur Python, composant React privé, compte, sauvegarde, base de données, secret, fichier `.env`, clé ou configuration du jeu n’est copié. Les fichiers de référence privés, les outils d’authentification et les journaux de travail restent hors du dépôt.

Le scan des formats connus de secrets et fichiers interdits est exécuté avant livraison et dans les workflows. Il ne remplace pas une revue exhaustive, mais aucun résultat n’a été détecté dans les fichiers ajoutés. L’audit npm et les vérifications de build sont également exécutés.

L’API de releases est publique, sans jeton côté navigateur. Téléchargements restreints au dépôt officiel de distribution, sélection d’un EXE unique admissible, cache revalidé, délai réseau et secours. Les notes sont rendues comme texte React ; les tests d’injection restent actifs. La CSP et la politique referrer sont conservées. Aucun backend, Supabase, analytique ou script externe supplémentaire.

Les autorisations GitHub utilisées pour activer Pages et envoyer le code restent en mémoire du processus ; elles ne sont ni écrites dans les sources ni affichées dans les sorties. Le workflow utilise exclusivement les jetons temporaires gérés par GitHub. Les permissions d’écriture sont limitées au job de déploiement Pages.

Aucune modification, release, action ou écriture n’est réalisée dans les dépôts du jeu et des mises à jour, sur Render ou dans Supabase. Le rapport de publication livré séparément indique les vérifications observées sur le site en ligne.
