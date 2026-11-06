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
# mv

> [!info] Bash
> Déplace ou renomme des fichiers et des dossiers.

## Pourquoi l'utiliser
Ranger des fichiers, renommer.

## Dans quel contexte
Organiser un projet, déplacer des fichiers traités.

## Syntaxe
```bash
mv [options] source destination
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-i` | demande avant d'écraser |
| `-v` | affiche ce qui est déplacé |

## Exemple concret
```bash
mv rapport.txt archives/
mv ancien_nom.py nouveau_nom.py
```

## Résultat attendu
Le fichier n'est plus à l'ancien endroit.

## Variantes utiles
- Dans un dépôt Git, préférer `git mv` (garde l'historique lisible)
- PowerShell : `Move-Item`

> [!warning] Erreurs fréquentes
> - Écraser un fichier du même nom à la destination

## Relier
- **Commandes complémentaires** : [[cp]] · [[rm]]
- **Concepts associés** : [[Bash]] · [[Système de fichiers]]
