---
type: command
tool: PowerShell
level: debutant
concepts:
  - "[[Terminal]]"
  - "[[Système de fichiers]]"
tags:
  - commande
  - powershell
---
# Get-ChildItem

> [!info] PowerShell
> Liste le contenu d'un dossier en PowerShell (alias : `ls`, `dir`).

## Pourquoi l'utiliser
Sous Windows, c'est la commande native ; elle renvoie des objets qu'on peut filtrer.

## Dans quel contexte
Explorer un projet, chercher des fichiers.

## Syntaxe
```powershell
Get-ChildItem [-Path <dossier>] [-Force] [-Recurse] [-Filter <motif>]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-Force` | Affiche les fichiers cachés |
| `-Recurse` | Parcourt les sous-dossiers |
| `-Filter` | Filtre par motif, ex. `*.js` |

## Exemple concret
```powershell
Get-ChildItem -Recurse -Filter *.js
```

## Résultat attendu
La liste des fichiers `.js` du dossier et de ses sous-dossiers.



## Relier
- **Commandes complémentaires** : [[ls]] · [[cd]]
- **Concepts associés** : [[Terminal]] · [[Système de fichiers]]
