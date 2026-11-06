# Performances V1 → V2

Mesures réelles sur le serveur local de production, Chrome headless et Lighthouse 13. Les profils et le poste de travail sont les mêmes ; les mesures ont été prises à des moments différents et la charge système et le réseau peuvent varier. La V1 utilise des motifs originaux sans illustration ; la V2 mesurée est le build **review**, avec les véritables visuels candidats. Les scores ne sont pas ceux d’un déploiement GitHub Pages.

| Profil et catégorie | V1 /100 | V2 /100 | Écart |
|---|---:|---:|---:|
| Ordinateur · performance | 100 | 99 | -1 |
| Ordinateur · accessibility | 100 | 100 | +0 |
| Ordinateur · best-practices | 100 | 100 | +0 |
| Ordinateur · seo | 100 | 100 | +0 |
| Mobile · performance | 100 | 90 | -10 |
| Mobile · accessibility | 100 | 100 | +0 |
| Mobile · best-practices | 100 | 100 | +0 |
| Mobile · seo | 100 | 100 | +0 |

| Profil et mesure | V1 | V2 |
|---|---:|---:|
| Ordinateur · first-contentful-paint | 0.3 s | 0.2 s |
| Ordinateur · largest-contentful-paint | 0.3 s | 1.0 s |
| Ordinateur · cumulative-layout-shift | 0 | 0 |
| Ordinateur · total-blocking-time | 0 ms | 0 ms |
| Ordinateur · total-byte-weight | Total size was 92 KiB | Total size was 793 KiB |
| Mobile · first-contentful-paint | 0.8 s | 0.8 s |
| Mobile · largest-contentful-paint | 0.8 s | 3.5 s |
| Mobile · cumulative-layout-shift | 0 | 0 |
| Mobile · total-blocking-time | 0 ms | 130 ms |
| Mobile · total-byte-weight | Total size was 86 KiB | Total size was 504 KiB |

Horodatages bruts :

- V1 ordinateur : 2026-11-06T18:37:59.955Z ; mobile : 2026-11-06T18:38:07.118Z.
- V2 ordinateur : 2026-11-06T22:06:25.197Z ; mobile : 2026-11-06T22:06:33.211Z.

## Analyse

Le principal coût de la refonte est le chargement des cartes et du décor de l’accueil. Le LCP mobile passe d’environ 0,8 s à 3,5 s et la performance de 100 à 90. La stabilité reste à CLS 0. La V2 gagne une galerie réelle, des scènes par camp et un fond illustré ; elle conserve un score Lighthouse de 90 ou plus dans les profils mesurés. Les notes d’accessibilité, bonnes pratiques et SEO restent à 100 dans ce passage.

Le JavaScript de prévisualisation passe de 252,64 ko (79,33 ko gzip) à 260,56 ko (81,14 ko gzip). Le CSS passe de 26,55 ko (6,50 ko gzip) à 44,78 ko (10,36 ko gzip). Aucun moteur d’animation ou bibliothèque de galerie n’a été ajouté.

Optimisations : cartes en deux tailles WebP sans agrandissement artificiel de la source, `srcset` dans la galerie et le bandeau, images hors écran en chargement différé, réutilisation du cache des mêmes fichiers entre sections, formats et dimensions réservés, animations CSS limitées à l’opacité et au déplacement. Aucune animation permanente de carte ni de particules sous 821 px. `prefers-reduced-motion` neutralise animations, transitions et brillance. Le zoom ne charge la version détaillée qu’à l’ouverture, sauf si elle a déjà été choisie par le navigateur pour un écran dense.

Les sources de cartes accessibles dans le dépôt sont des WebP de 512 × 715 px ; les chemins historiques des PNG ne sont pas présents. Les exports `-360` font 360 px de large et les exports `-720` sont plafonnés à la largeur native 512 px, sans interpolation. L’agrandissement ne prétend pas offrir une définition supérieure à la ressource disponible.

Le poids total des fichiers candidats comprend les deux tailles de chaque carte et les portraits. Il n’est pas téléchargé en bloc au chargement initial. Consulter les rapports Lighthouse HTML/JSON pour les transferts réellement observés et les limites des audits.

Avant une publication autorisée, remesurer sur l’hébergement final et sur un appareil réel. Une image de décor plus petite sur mobile reste une piste si un objectif LCP inférieur à 2,5 s devient prioritaire.
