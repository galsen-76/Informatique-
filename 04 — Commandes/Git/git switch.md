---
type: command
tool: Git
level: debutant
concepts:
  - "[[Branche Git]]"
tags:
  - commande
  - git
---
# git switch

> [!info] Git
> Change de branche (et peut en créer une).

## Pourquoi l'utiliser
Commande moderne et dédiée au changement de branche, plus claire que l'ancien `git checkout` qui faisait beaucoup de choses.

## Dans quel contexte
Pour commencer une fonctionnalité, ou revenir sur `main` avant un merge.

## Syntaxe
```bash
git switch <branche>
git switch -c <nouvelle-branche>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `branche` | Branche à rejoindre |
| `-c` | Crée la branche puis s'y déplace |

## Exemple concret
```bash
git switch -c feature/login
git switch main
```

## Résultat attendu
`Switched to a new branch 'feature/login'` — tes fichiers reflètent maintenant cette branche.

> [!warning] Erreurs fréquentes
> - `Your local changes would be overwritten` : tu as des modifications non commitées qui entrent en conflit. Commite-les (ou `git stash`) avant de changer de branche.


## Relier
- **Commandes complémentaires** : [[git branch]] · [[git merge]]
- **Concepts associés** : [[Branche Git]]
