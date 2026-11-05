---
type: command
tool: Terminal
level: debutant
concepts:
  - "[[Terminal]]"
  - "[[Système de fichiers]]"
tags:
  - commande
  - terminal
---
# ls

> [!info] Terminal
> Liste le contenu d'un dossier (Linux/macOS ; alias disponible en PowerShell).

## Pourquoi l'utiliser
Pour voir ce qu'il y a avant d'agir.

## Dans quel contexte
Après un `cd`, pour vérifier qu'on est au bon endroit.

## Syntaxe
```bash
ls [options] [dossier]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-l` | Format long : droits, taille, date (Bash) |
| `-a` | Affiche aussi les fichiers cachés (`.git`, `.env`) (Bash) |

## Exemple concret
```bash
ls -la
```

## Résultat attendu
La liste des fichiers et dossiers, y compris `.git` avec `-a`.

> [!warning] Erreurs fréquentes
> - En PowerShell, `ls` est un alias de [[Get-ChildItem]] : les options Bash (`-la`) ne fonctionnent pas, utiliser `-Force` pour les fichiers cachés.


## Relier
- **Commandes complémentaires** : [[cd]] · [[Get-ChildItem]]
- **Concepts associés** : [[Terminal]] · [[Système de fichiers]]
