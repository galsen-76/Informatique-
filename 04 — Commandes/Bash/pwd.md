---
type: command
tool: Bash
level: debutant
concepts:
  - "[[Bash]]"
  - "[[Système de fichiers]]"
tags:
  - commande
  - bash
---
# pwd

> [!info] Bash
> Affiche le chemin complet du dossier courant (print working directory).

## Pourquoi l'utiliser
Savoir exactement où tu es avant une commande qui touche des fichiers.

## Dans quel contexte
Avant `rm`, `cp`, `git`, ou quand l'invite est raccourcie.

## Syntaxe
```bash
pwd
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| (aucun) | affiche le chemin absolu |

## Exemple concret
```bash
pwd
```

## Résultat attendu
Par exemple `/home/oumar/projets/essai-zip`.

## Variantes utiles
- PowerShell : `Get-Location` (alias `pwd`)
- `echo $PWD` : la même chose, en variable

> [!warning] Erreurs fréquentes
> - Confondre `~` (dossier personnel) et le dossier courant

## Relier
- **Commandes complémentaires** : [[cd]] · [[ls]]
- **Concepts associés** : [[Bash]] · [[Système de fichiers]]
