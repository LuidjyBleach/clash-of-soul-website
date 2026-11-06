# Bleach: Clash of Soul Website V2

Site officiel du projet de fan-game gratuit et non officiel, en français, React / TypeScript / Vite.

URL publique prévue : https://luidjybleach.github.io/clash-of-soul-website/

## Développement

Node.js 24 et npm :

```sh
npm ci
npm run dev
npm test
npm run test:security
npm run build
npm run preview -- --port 4173
```

Ouvrir l’URL affichée suivie de `/clash-of-soul-website/`.

## Validation

Avec la prévisualisation en cours : `npm run test:browser`. Les tests couvrent quatre résolutions, la galerie et ses filtres, les agrandissements, les camps, le guide, le menu mobile et les scénarios d’erreur de l’API GitHub. `npm run test:performance` mesure Lighthouse localement. Sous Windows, Chrome standard est utilisé ; sous Linux, installer Chromium avec `npx playwright install --with-deps chromium`.

## Publication

Les pushs sur `main` déclenchent `.github/workflows/deploy-pages.yml`. Le workflow compile le site après contrôles et déploie `dist/` sur GitHub Pages. Un lancement manuel reste possible avec confirmation. La CI séparée contrôle également le navigateur et l’accessibilité.

Vite utilise la base `/clash-of-soul-website/`. Les routes sont des ancres compatibles avec un hébergement statique. Aucun backend ou accès au compte du jeu n’est nécessaire.

## Contenus et ressources

Les 15 cartes, cinq par camp, et les quatre illustrations V2 sont approuvées par le propriétaire du projet, qui a confirmé les droits nécessaires à leur publication dans cette conversation le 6 novembre 2026. Les images publiques sont exclusivement les exports WebP optimisés déjà présentés. `ASSET_MANIFEST_V2.json` fournit les références, états et empreintes. Les tests comparent les 34 fichiers aux empreintes des versions approuvées. Aucun code du client ou du moteur, compte, secret ou configuration du jeu n’est inclus.

`src/data/showcase.json` décrit les cartes et les autorisations. `src/services/asset-rights.ts` exige approbation et droits confirmés. `src/components/Showcase.tsx` compose le bandeau, les camps et la galerie. `src/config.ts` conserve les liens communautaires à renseigner et les trois futures captures de gameplay. Aucun lien officiel n’est inventé.

Le mode historique `review` reste disponible pour le développement avec un dossier candidat voisin ; `dist-review/` est ignoré et n’est jamais déployé. La publication utilise uniquement le build normal et n’affiche aucune mention de prévisualisation.

## Versions du jeu

L’API publique GitHub Releases fournit la version et l’historique. Cache de 60 minutes, manifeste embarqué et lien de secours en cas d’échec. `npm run refresh-releases` rafraîchit le manifeste public. Le build de publication tente aussi cette opération, sans rendre la disponibilité du site dépendante de l’API.

Le bouton direct sélectionne uniquement un EXE Windows admissible du dépôt de distribution. Il ne sélectionne ni signature, ni métadonnées, ni archive. Les dépôts du jeu et de distribution ne sont jamais modifiés par ce site.
