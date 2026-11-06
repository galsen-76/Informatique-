---
type: command
tool: Git
level: debutant
concepts:
  - "[[Commit]]"
tags:
  - commande
  - git
---
# git log

> [!info] Git
> Affiche l'historique des commits.

## Pourquoi l'utiliser
Comprendre ce qui a changé, quand, par qui.

## Dans quel contexte
Avant un rebase, pour trouver un commit à annuler.

## Syntaxe
```bash
git log [options] [chemin]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `--oneline` | une ligne par commit |
| `--graph --all` | dessin des branches |
| `-p` | avec les différences |
| `--author=nom` | par auteur |
| `-- fichier` | l'historique d'un fichier |
| `-n 5` | les 5 derniers |

## Exemple concret
```bash
git log --oneline --graph --all -n 20
```

## Résultat attendu
`a1b2c3d (HEAD -> main, origin/main) fix: …`.

## Variantes utiles
- `git log -S "CVAT_HOST"` : les commits qui ajoutent ou retirent ce texte
- `git show a1b2c3d` : un commit en détail
- `git blame fichier` : qui a écrit chaque ligne

> [!warning] Erreurs fréquentes
> - Rester bloqué dans le pager : `q`

## Relier
- **Commandes complémentaires** : [[git diff]] · [[git reflog]]
- **Concepts associés** : [[Commit]]
