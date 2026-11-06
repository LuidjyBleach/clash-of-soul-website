# Publication GitHub Pages

La V2 et les 19 ressources graphiques sont approuvées par le propriétaire du projet, avec confirmation des droits nécessaires, le 6 novembre 2026.

Le dépôt autorisé est exclusivement `LuidjyBleach/clash-of-soul-website`. Pages doit utiliser la source GitHub Actions (`build_type: workflow`). Le workflow `Publish GitHub Pages` se déclenche sur les pushs à `main`, ou manuellement avec confirmation. Il installe les dépendances verrouillées, actualise le manifeste public avec secours, contrôle TypeScript, tests, sécurité, build et audit, puis déploie `dist/`.

Le job de déploiement reçoit uniquement `pages: write` et `id-token: write` ; le reste du workflow est en lecture seule. Aucun jeton personnel n’est enregistré dans le dépôt. GitHub gère le jeton temporaire du workflow.

La base Vite est `/clash-of-soul-website/`. Toutes les images publiques se trouvent dans `public/images/cards` et `public/images/characters`. Le build `review` est exclu de la publication.

Après chaque publication, vérifier l’URL https://luidjybleach.github.io/clash-of-soul-website/ et les tests navigateur. Le rapport de livraison accompagnant cette publication fournit le SHA et le lien du run effectivement observés.

Pour revenir à une version antérieure, créer un commit de restauration à partir d’un état validé puis le pousser sur `main`. Aucun retour arrière du site ne doit modifier les releases ou installateurs du jeu.
