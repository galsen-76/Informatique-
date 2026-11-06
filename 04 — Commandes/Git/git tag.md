---
type: command
tool: Git
level: debutant
concepts:
  - "[[Tag Git]]"
tags:
  - commande
  - git
---
# git tag

> [!info] Git
> Liste, crée ou supprime des tags, des étiquettes fixes posées sur des commits.

## Pourquoi l'utiliser
Marquer une version, ou se repérer dans les versions d'un projet.

## Dans quel contexte
Choisir la version de CVAT de départ ; publier une version de ton projet.

## Syntaxe
```bash
git tag [-a nom -m "message"] [commit]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (sans option) | liste les tags |
| `-l "v2.*"` | liste ceux qui correspondent |
| `-a nom -m msg` | crée un tag annoté |
| `-d nom` | supprime en local |

## Exemple concret
```bash
git tag -l "v2.2*"
git tag -a v1.0.0 -m "Première version du script"
git push origin v1.0.0
```

## Résultat attendu
Le tag apparaît dans `git tag` et, après le push, dans GitLab (*Code > Tags*).

## Variantes utiles
- `git switch --detach v2.20.0` : se placer sur la version
- `git push origin --tags` : pousser tous les tags
- `git fetch --tags` : récupérer ceux du serveur

> [!warning] Erreurs fréquentes
> - Oublier de pousser le tag
> - Modifier du code en étant placé sur un tag : on est en *detached HEAD*, créer une branche d'abord (`git switch -c`)

## Relier
- **Commandes complémentaires** : [[git diff]] · [[git switch]]
- **Concepts associés** : [[Tag Git]]
