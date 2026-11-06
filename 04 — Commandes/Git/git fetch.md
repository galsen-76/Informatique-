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
# git fetch

> [!info] Git
> Télécharge les nouveautés du serveur sans modifier tes fichiers ni ta branche.

## Pourquoi l'utiliser
Voir ce que les autres ont poussé, sans risque.

## Dans quel contexte
Avant un rebase, avant de commencer la journée.

## Syntaxe
```bash
git fetch [remote]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (seul) | depuis origin |
| `--all` | tous les remotes |
| `--tags` | les tags aussi |
| `--prune` | oublie les branches supprimées sur le serveur |

## Exemple concret
```bash
git fetch
git log --oneline main..origin/main
```

## Résultat attendu
Les branches `origin/...` sont à jour ; ta branche n'a pas bougé.

## Variantes utiles
- `git fetch upstream --tags`

> [!warning] Erreurs fréquentes
> - Croire que `fetch` a mis à jour ses fichiers (c'est `pull`)

## Relier
- **Commandes complémentaires** : [[git pull]] · [[git rebase]]
- **Concepts associés** : [[Dépôt distant (remote)]]
