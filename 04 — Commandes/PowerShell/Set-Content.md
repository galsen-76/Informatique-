---
type: command
tool: PowerShell
level: debutant
concepts:
  - "[[Système de fichiers]]"
  - "[[Redirection et pipe]]"
tags:
  - commande
  - powershell
---
# Set-Content

> [!info] PowerShell
> Écrit du texte dans un fichier en PowerShell (le crée ou remplace son contenu). `Add-Content` ajoute à la fin.

## Pourquoi l'utiliser
Écrire ou compléter un fichier depuis PowerShell, sans éditeur.

## Dans quel contexte
Scripts PowerShell, fichiers de configuration, l'équivalent de `echo … >` et `>>`.

## Syntaxe
```bash
Set-Content fichier "texte"      # remplace
Add-Content fichier "texte"      # ajoute à la fin
Get-Content fichier              # lire
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-Path` | le fichier (premier argument) |
| `-Value` | le texte (deuxième argument) |
| `-Encoding utf8` | forcer l'UTF-8 |

## Exemple concret
```bash
Set-Content notes\git.md "# Mes notes Git"
Add-Content notes\git.md "git status montre l'état"
Get-Content notes\git.md
```

## Résultat attendu
Rien ne s'affiche à l'écriture ; `Get-Content` montre les deux lignes.

## Variantes utiles
- `"texte" > fichier` et `>> fichier` marchent aussi en PowerShell
- Bash : [[echo]] avec `>` et `>>`

> [!warning] Erreurs fréquentes
> - Confondre `Set-Content` (efface) et `Add-Content` (ajoute)
> - Fichier lu avec des accents cassés sous Linux : ajoute `-Encoding utf8`
> - Un script `.sh` écrit depuis Windows a des fins de ligne CRLF : écris-le plutôt dans WSL

## Relier
- **Commandes complémentaires** : [[New-Item]] · [[echo]]
- **Concepts associés** : [[Système de fichiers]] · [[Redirection et pipe]]
