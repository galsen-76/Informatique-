---
type: command
tool: Git
level: intermediaire
concepts:
  - "[[Rebase]]"
tags:
  - commande
  - git
---
# git rebase

> [!info] Git
> Rejoue tes commits par-dessus une autre branche.

## Pourquoi l'utiliser
Mettre ta branche à jour avec un historique linéaire.

## Dans quel contexte
Avant une merge request, ou `git pull --rebase`.

## Syntaxe
```bash
git rebase branche
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `origin/main` | la base sur laquelle rejouer |
| `--continue` | après avoir résolu un conflit |
| `--abort` | tout annuler et revenir à l'état d'avant |
| `-i HEAD~3` | réorganiser ses 3 derniers commits (interactif) |

## Exemple concret
```bash
git fetch
git rebase origin/main
git push --force-with-lease
```

## Résultat attendu
Ta branche part maintenant du bout de `main`.

## Variantes utiles
- `git pull --rebase`

> [!warning] Erreurs fréquentes
> - Rebase d'une branche partagée
> - Oublier `--force-with-lease` après un rebase d'une branche déjà poussée

## Relier
- **Commandes complémentaires** : [[git fetch]] · [[git merge]]
- **Concepts associés** : [[Rebase]]
