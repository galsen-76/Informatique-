---
type: command
tool: Git
level: debutant
concepts:
  - "[[Stash]]"
tags:
  - commande
  - git
---
# git stash

> [!info] Git
> Met de côté les modifications non commitées et nettoie la copie de travail.

## Pourquoi l'utiliser
Changer de branche sans committer un travail inachevé.

## Dans quel contexte
Urgence, pull avec des fichiers modifiés.

## Syntaxe
```bash
git stash [push -m msg | list | pop | apply | drop]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `push -m "msg"` | mettre de côté avec un nom |
| `-u` | inclure les fichiers non suivis |
| `list` | la pile |
| `pop` | réappliquer et retirer |
| `apply` | réappliquer en gardant |
| `drop` | supprimer |

## Exemple concret
```bash
git stash push -m "dry-run en cours"
git stash list
git stash pop
```

## Résultat attendu
`git status` est propre ; `pop` ramène les modifications.

## Variantes utiles
- `git stash show -p stash@{0}` : voir le contenu

> [!warning] Erreurs fréquentes
> - Oublier un stash pendant des semaines

## Relier
- **Commandes complémentaires** : [[git switch]]
- **Concepts associés** : [[Stash]]
