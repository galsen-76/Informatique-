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
# git reset

> [!info] Git
> Déplace la branche vers un autre commit, en gardant ou non les changements.

## Pourquoi l'utiliser
Défaire des commits locaux.

## Dans quel contexte
Commit de trop, mauvais commit pas encore poussé.

## Syntaxe
```bash
git reset [--soft | --mixed | --hard] commit
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `--soft` | défait les commits, garde les changements indexés |
| `--mixed` (défaut) | garde les changements, non indexés |
| `--hard` | **efface** les changements |
| `HEAD~1` | le commit d'avant |

## Exemple concret
```bash
git reset --soft HEAD~1
```

## Résultat attendu
La branche recule ; les fichiers restent (sauf `--hard`).

## Variantes utiles
- `git reflog` pour revenir après un mauvais reset

> [!warning] Erreurs fréquentes
> - Reset sur des commits déjà poussés
> - `--hard` avec du travail non commité

## Relier
- **Commandes complémentaires** : [[git revert]] · [[git restore]]
- **Concepts associés** : [[Annuler dans Git]]
