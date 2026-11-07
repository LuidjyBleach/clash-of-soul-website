# Rapport de validation V2.1 — 7 novembre 2026

## Modifications

- Badges Shinigami bleu spirituel, Quincy violet électrique et Hollow vert émeraude, avec couleurs cohérentes dans les onglets de camps. Illustrations, noms, formes et raretés des cartes conservés.
- Cinq captures réelles réparties en quatre catégories, navigation entre les deux duels, agrandissement et clavier. Proportions conservées ; zones de compte masquées par script explicitement autorisé. Les dix exports WebP sont vérifiés par empreinte et les originaux exclus.
- Notes de version directement dans le site, avec panneaux dépliables, dates, chargement et état de secours. Liens du téléchargement et du pied de page vers la section interne. Aucun lien « Source code » ni sortie vers GitHub pour consulter les notes. L’EXE et le secours de téléchargement conservent leurs URL officielles.
- Aucun paquet supplémentaire. Les captures sont réellement chargées à l’approche de la section (IntersectionObserver), puis avec priorité faible ; leurs versions détaillées sont chargées à l’agrandissement.

## Tests

21 tests unitaires réussis. TypeScript strict et build de production réussis. Quatre résolutions : 1920 × 1080, 1366 × 768, 768 × 1024 et 390 × 844. Navigation, galerie de cartes, trois badges distincts, trois camps, quatre catégories de captures, deux vues de duel, agrandissements, guide, téléchargement et notes intégrées vérifiés.

Quatre scénarios d’API simulés : panne, absence de release, nouvelle version fictive et HTML hostile. Aucun test existant supprimé ou désactivé. Aucun débordement horizontal, aucune erreur JavaScript ni ressource locale en échec. Axe WCAG 2 A/AA et 2.1 AA ne détecte aucune violation sur les quatre résolutions.

## Performances locales mesurées

| Profil | Performance | Accessibilité | Bonnes pratiques | SEO | LCP |
|---|---:|---:|---:|---:|---:|
| Ordinateur | 99 | 100 | 100 | 100 | 1.0 s |
| Mobile | 89 | 100 | 100 | 100 | 3.7 s |

CLS : 0 dans les deux profils. JavaScript : 264,43 ko (82,23 ko gzip). CSS : 49,13 ko (11,20 ko gzip). La V2 précédente avait mesuré 99 ordinateur / 90 mobile ; ce passage V2.1 mesure 99 / 89. Les mesures locales varient avec la charge et le réseau. Un premier passage sans différé effectif des captures avait atteint 86 mobile ; le chargement à l’approche de la section réduit leur concurrence avec l’accueil. Aucun score Lighthouse de production n’est revendiqué.

## Sécurité

Audit de distribution en lecture seule satisfaisant : un commit et un README, deux tags sur le même commit, quatre archives Source code contenant uniquement le README. Aucun code privé ou secret identifié. Le dépôt est déjà public ; aucune modification de visibilité ou de contenu.

EXE, signatures et latest.json des deux versions répondent HTTP 200. URL et signature Windows cohérentes dans les manifestes. L’URL existante de l’updater reste publique et annonce 7.26.1. Aucun changement au client, aux clés, à Render ou à Supabase. Voir `UPDATES_SECURITY_AUDIT_V21.md` pour la portée et les limites.

## Captures et limites

Les captures du site figurent dans le dossier de validation livré : accueil, galerie, camps, quatre catégories gameplay et notes intégrées, sur ordinateur et mobile. Les captures de gameplay ont fait l’objet d’un contrôle visuel après masquage. La sixième capture fournie est un double-écran contenant une conversation et le Bureau ; elle est exclue de la publication.

Tests navigateur sous Chrome, sans appareil mobile physique ni lecteur d’écran. Pas d’exécution d’installateur ni de mise à jour Tauri réelle : vérification des endpoints, assets et cohérence de signatures seulement. Les résultats de production, le commit et les workflows sont fournis dans le rapport de livraison après déploiement.
