---
type: command
tool: Git
level: debutant
concepts:
  - "[[Dépôt distant (remote)]]"
tags:
  - commande
  - git
---
# git pull

> [!info] Git
> Récupère les nouveautés du serveur et les intègre à ta branche.

## Pourquoi l'utiliser
Mettre sa branche à jour.

## Dans quel contexte
Avant de travailler, après un push refusé.

## Syntaxe
```bash
git pull [--rebase]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (seul) | fetch + merge |
| `--rebase` | fetch + rebase (historique linéaire) |

## Exemple concret
```bash
git switch main
git pull
```

## Résultat attendu
`Fast-forward` ou un commit de fusion ; ou un conflit à résoudre.

## Variantes utiles
- `git config --global pull.rebase true` : rebase par défaut

> [!warning] Erreurs fréquentes
> - Faire un pull avec des fichiers modifiés non commités : stash d'abord

## Relier
- **Commandes complémentaires** : [[git fetch]] · [[git push]]
- **Concepts associés** : [[Dépôt distant (remote)]]
