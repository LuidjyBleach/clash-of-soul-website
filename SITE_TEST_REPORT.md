# Rapport de tests V2 — 6 novembre 2026

## Vérifications réalisées

- 18 tests unitaires réussis, dont les 14 tests de téléchargement existants et quatre contrôles sur les droits, la sélection des 15 cartes et les empreintes des 34 fichiers approuvés. Aucun test supprimé ou désactivé.
- TypeScript strict : réussi.
- Build public et build local `review` : réussis.
- Build public contrôlé : aucun dossier `review-assets`, aucune URL candidate dans le JavaScript généré. Les 15 cartes et les quatre illustrations approuvées sont disponibles dans ce build.
- Tests Chrome aux quatre résolutions : 1920 × 1080, 1366 × 768, 768 × 1024 et 390 × 844, pour les deux builds.
- Galerie : 15 cartes, filtres Tous / Shinigami / Quincy / Hollow, cinq cartes par camp. Agrandissement réel dans le build public approuvé, navigation précédent/suivant par boutons et flèches, fermeture Échap et restauration du focus via le dialogue natif.
- Onglets de camps et guide existants : clic et clavier. Menu mobile et fermeture Échap. Navigation par ancres, guide, téléchargement, aide d’installation, actualités et liens de secours préservés.
- Quatre scénarios de releases sur la page : panne API, aucune release, version nouvelle fictive et notes HTML hostiles. Données simulées pour rendre les tests reproductibles ; l’intégration conserve les données publiques et le service de la V1.
- Aucun débordement horizontal, aucune erreur JavaScript ou ressource locale en échec dans les résultats navigateur.
- Axe WCAG 2 A/AA et 2.1 AA : aucune violation automatique aux quatre résolutions sur les builds testés. Cela ne remplace pas un audit humain exhaustif ou un test au lecteur d’écran.
- Contrôle visuel des captures d’accueil ordinateur/mobile, galerie, camps et emplacements gameplay. Les captures de sections masquent le bandeau fixe et l’étiquette de revue uniquement pendant la prise de vue.
- `git diff --check` : réussi. Scan de formats de secrets et fichiers interdits : aucun résultat.

## Images et données

15 cartes réelles présentes dans l’index et résolues vers des fichiers existants. Les noms, formes et raretés proviennent des cartes et des références du projet. Aucun effet ni statistique ajouté au texte du site. Le manifeste cite le véritable chemin du WebP utilisé, son empreinte et sa taille. Le contrôle de présence a permis d’écarter les chemins PNG historiques manquants.

Les 15 cartes et quatre illustrations ont été autorisées à la publication par le propriétaire, qui confirme les droits nécessaires. Les captures préparatoires restent une référence visuelle ; les images publiques correspondent aux mêmes exports optimisés. Les captures de gameplay du duel, de la collection et du constructeur n’étant pas disponibles sous une forme identifiée et validée dans le dépôt consulté, les trois emplacements explicites sont conservés. Aucune image de décor n’est présentée comme une capture de partie.

## Performances et limites

Consulter `SITE_PERFORMANCE_REPORT.md` et les rapports bruts avant/après. Dernier passage : performance 99 ordinateur et 90 mobile ; trois autres catégories à 100. La V1 mesurée était à 100 dans les quatre catégories. Les scores sont locaux et variables.

Tests Chrome uniquement, sans Safari, Firefox ni appareil mobile physique. Les workflows GitHub n’ont pas été exécutés, aucun installateur n’a été lancé et aucun test de gameplay n’a été effectué. Le jeu et son serveur n’ont pas été reconstruits ou modifiés. La publication est désormais autorisée. Les SHA, workflows et résultats de vérification en ligne sont consignés dans le rapport de livraison séparé.
