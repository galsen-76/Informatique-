---
type: command
tool: Git
level: debutant
concepts:
  - "[[Annuler dans Git]]"
  - "[[Index Git (staging)]]"
tags:
  - commande
  - git
---
# git restore

> [!info] Git
> Annule les modifications d'un fichier ou le retire de l'index.

## Pourquoi l'utiliser
Revenir en arrière sur un fichier.

## Dans quel contexte
Fichier cassé par erreur, mauvais `git add`.

## Syntaxe
```bash
git restore [--staged] fichier
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `fichier` | revient à la version du dernier commit (perd les modifications) |
| `--staged` | retire de l'index sans perdre les modifications |
| `--source=commit` | prend la version d'un autre commit |

## Exemple concret
```bash
git restore zipper.py
git restore --staged .env
```

## Résultat attendu
`git status` montre le fichier propre ou de nouveau non indexé.

## Variantes utiles
- `git restore --source=v1.0.0 Dockerfile`

> [!warning] Erreurs fréquentes
> - `git restore` sans `--staged` efface les modifications sans retour

## Relier
- **Commandes complémentaires** : [[git reset]] · [[git status]]
- **Concepts associés** : [[Annuler dans Git]] · [[Index Git (staging)]]
