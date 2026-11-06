---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Variable d'environnement]]"
  - "[[Bash]]"
tags:
  - commande
  - linux
---
# which

> [!info] Linux
> Indique le chemin du programme qui sera lancé pour une commande.

## Pourquoi l'utiliser
Savoir quel `python` ou quel `git` tu utilises vraiment.

## Dans quel contexte
Plusieurs versions installées, venv, Windows et WSL.

## Syntaxe
```bash
which commande
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-a` | toutes les occurrences dans le PATH |

## Exemple concret
```bash
which python3
which -a python
```

## Résultat attendu
`/home/oumar/projets/essai-zip/.venv/bin/python` si le venv est actif.

## Variantes utiles
- `type commande` : dit aussi si c'est une commande intégrée ou un alias
- PowerShell : `Get-Command`

> [!warning] Erreurs fréquentes
> - Ne rien obtenir : la commande n'est pas dans le PATH

## Relier
- **Commandes complémentaires** : [[export]]
- **Concepts associés** : [[Variable d'environnement]] · [[Bash]]
