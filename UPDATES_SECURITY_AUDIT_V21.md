# Audit de sécurité du dépôt de distribution — 7 novembre 2026

## Conclusion

Audit en lecture seule satisfaisant sur le périmètre examiné. Le dépôt `LuidjyBleach/clash-of-soul-updates` est déjà **public** et accessible sans authentification. Aucun code privé ni secret n’a été découvert dans la branche principale, l’historique atteignable, les tags ou les archives automatiques contrôlés. Il peut demeurer public au regard de ces contrôles ; aucune restauration de visibilité n’était nécessaire et aucune n’a été effectuée.

## Git et archives automatiques

Une copie locale complète des références Git a été examinée. Branche `main`, tags `v7.26.0` et `v7.26.1` : tous pointent sur `95d3e127cdfdecdbc61cafeda64cff9b7afe976f`.

L’historique atteignable comporte **un seul commit** et **un seul blob**, `README.md`. Ce fichier est la totalité de l’arborescence de la branche et des deux tags. Aucun composant client, moteur Python, serveur, fichier `.env`, configuration interne, clé privée ou base de données n’y figure. Le scan des formats connus de jetons, clés et affectations de mots de passe ne relève rien.

Les archives ZIP et TAR.GZ générées par GitHub pour **chacun des deux tags** ont été téléchargées et inspectées en mémoire, sans extraction sur disque. Les quatre archives contiennent uniquement `README.md`, avec un contenu identique à Git. Elles ne sont donc pas des archives des sources privées du jeu. Les assets de release et les archives automatiques « Source code » constituent des contenus distincts.

## Releases et updater

| Contrôle | v7.26.0 | v7.26.1 |
|---|---|---|
| Installateur EXE, requête HEAD | HTTP 200 | HTTP 200 |
| Taille | 571 163 062 octets | 570 860 294 octets |
| Fichier `.exe.sig` | HTTP 200 | HTTP 200 |
| `latest.json` | HTTP 200 | HTTP 200 |
| Version du manifeste | 7.26.0 | 7.26.1 |
| URL Windows du manifeste | Identique à l’EXE de la release | Identique à l’EXE de la release |
| Signature du manifeste | Identique au fichier `.sig` | Identique au fichier `.sig` |

La référence du client examinée en lecture seule, commit `ecdc76639fadca5314f64a77b3cf9634e9e0a3d7`, conserve cet endpoint :

`https://github.com/LuidjyBleach/clash-of-soul-updates/releases/latest/download/latest.json`

Il répond publiquement HTTP 200 et annonce `7.26.1`. Aucun endpoint, mécanisme de signature ou fichier du client n’a été modifié. L’API publique de la dernière release et le site utilisent la v7.26.1 au moment du contrôle.

## Portée et limites

Contrôle des branches/tags annoncés et de tout leur historique atteignable, des fichiers et des archives automatiques. Aucun installateur Windows n’a été téléchargé en entier, exécuté ou rétroanalysé ; aucune validation cryptographique en cours d’exécution dans Tauri n’est revendiquée. Le rapprochement vérifie la cohérence des fichiers de signature et des URL, sans remplacer un test fonctionnel de mise à jour sur un client installé.

Aucune écriture sur le dépôt de distribution, aucun changement de visibilité, tag, release, historique ou clé. Aucun changement au dépôt privé du jeu, à Render ou à Supabase. Le contenu d’une future release devra faire l’objet des mêmes précautions ; ce rapport décrit l’état observé le 7 novembre 2026.
