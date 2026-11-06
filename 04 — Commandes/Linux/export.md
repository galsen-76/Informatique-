---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Variable d'environnement]]"
tags:
  - commande
  - linux
---
# export

> [!info] Linux
> Crée une variable d'environnement transmise aux programmes lancés ensuite.

## Pourquoi l'utiliser
Configurer un programme (proxy, chemin, niveau de log).

## Dans quel contexte
Avant de lancer un script, dans `~/.bashrc`.

## Syntaxe
```bash
export NOM=valeur
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `NOM=valeur` | sans espaces autour du = |
| (seul) | liste les variables exportées |

## Exemple concret
```bash
export NIVEAU_LOG=DEBUG
export PATH="$HOME/.local/bin:$PATH"
```

## Résultat attendu
Les programmes lancés depuis ce terminal voient la variable.

## Variantes utiles
- `env` : toutes les variables
- `unset NOM` : la supprimer
- PowerShell : `$env:NOM = "valeur"`

> [!warning] Erreurs fréquentes
> - La variable disparaît en fermant le terminal : la mettre dans `~/.bashrc` pour la garder
> - Écraser `PATH` au lieu de l'allonger

## Relier
- **Commandes complémentaires** : [[which]]
- **Concepts associés** : [[Variable d'environnement]]
