---
type: command
tool: Bash
level: debutant
concepts:
  - "[[Redirection et pipe]]"
tags:
  - commande
  - bash
---
# wc

> [!info] Bash
> Compte les lignes, les mots et les octets d'un fichier ou de ce qu'on lui envoie par un pipe.

## Pourquoi l'utiliser
Compter des fichiers, des lignes de log ou des résultats de recherche.

## Dans quel contexte
Presque toujours au bout d'un pipe : `… | wc -l`.

## Syntaxe
```bash
wc [-l|-w|-c] [fichier]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-l` | nombre de lignes |
| `-w` | nombre de mots |
| `-c` | nombre d'octets |
| (sans option) | les trois |

## Exemple concret
```bash
wc -l notes/git.md
ls *.png | wc -l
find ~/labo -name "*.png" | wc -l
grep -r "ERROR" logs/ | wc -l
```

## Résultat attendu
Un nombre, par exemple `4` (suivi du nom du fichier s'il est donné en argument).

## Variantes utiles
- PowerShell : `(Get-ChildItem *.png).Count` ou `Get-Content f | Measure-Object -Line`

> [!warning] Erreurs fréquentes
> - `wc -l` compte les retours à la ligne : un fichier dont la dernière ligne n'en a pas compte une ligne de moins

## Relier
- **Commandes complémentaires** : [[ls]] · [[find]] · [[grep]]
- **Concepts associés** : [[Redirection et pipe]]
