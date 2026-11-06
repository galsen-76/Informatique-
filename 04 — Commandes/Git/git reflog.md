---
type: command
tool: Git
level: intermediaire
concepts:
  - "[[Annuler dans Git]]"
tags:
  - commande
  - git
---
# git reflog

> [!info] Git
> Liste tous les endroits où HEAD a pointé : le journal de tes actions Git.

## Pourquoi l'utiliser
Retrouver un commit « perdu » après un reset ou un rebase raté.

## Dans quel contexte
Après une fausse manœuvre.

## Syntaxe
```bash
git reflog
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (seul) | l'historique de HEAD |
| `HEAD@{2}` | l'état d'il y a 2 actions |

## Exemple concret
```bash
git reflog
git reset --hard HEAD@{1}
```

## Résultat attendu
Une liste `a1b2c3d HEAD@{0}: reset: moving to HEAD~1`…

## Variantes utiles
- `git branch secours HEAD@{3}` : recréer une branche sur un ancien état

> [!warning] Erreurs fréquentes
> - Le reflog est local et expire (90 jours par défaut)

## Relier
- **Commandes complémentaires** : [[git reset]] · [[git log]]
- **Concepts associés** : [[Annuler dans Git]]
