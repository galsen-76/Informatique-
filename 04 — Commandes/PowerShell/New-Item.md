---
type: command
tool: PowerShell
level: debutant
concepts:
  - "[[Système de fichiers]]"
tags:
  - commande
  - powershell
---
# New-Item

> [!info] PowerShell
> Crée un fichier ou un dossier en PowerShell (l'équivalent de `touch` et `mkdir`).

## Pourquoi l'utiliser
Créer un fichier vide ou déjà rempli, ou un dossier, sous Windows.

## Dans quel contexte
Préparer un exercice, créer un fichier de configuration côté Windows.

## Syntaxe
```bash
New-Item fichier
New-Item -ItemType Directory dossier
New-Item fichier -Value "texte"
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-ItemType File` | un fichier (par défaut) |
| `-ItemType Directory` | un dossier |
| `-Value "…"` | le contenu de départ |
| `-Force` | écrase un fichier existant, crée les dossiers parents |
| `ni` | alias court |

## Exemple concret
```bash
New-Item labo\notes\git.md
New-Item labo\notes\todo.md -Value "# À faire"
New-Item -ItemType Directory -Force labo\code\api
Get-Content labo\notes\todo.md
```

## Résultat attendu
PowerShell affiche un tableau `Mode  LastWriteTime  Length  Name` pour chaque élément créé.

## Variantes utiles
- Bash : [[touch]] pour un fichier, [[mkdir]] pour un dossier
- Écrire ensuite dedans : [[Set-Content]], ou `notepad fichier` pour l'ouvrir dans le Bloc-notes, ou `code fichier`

> [!warning] Erreurs fréquentes
> - `New-Item : Le fichier existe déjà` : sans `-Force`, il refuse ; **avec** `-Force`, il **vide** le fichier (contrairement à `touch`)
> - Le dossier parent n'existe pas : crée-le d'abord, ou ajoute `-Force`
> - Taper `touch` dans PowerShell : la commande n'existe pas

## Relier
- **Commandes complémentaires** : [[Set-Content]] · [[Get-ChildItem]] · [[touch]]
- **Concepts associés** : [[Système de fichiers]]
