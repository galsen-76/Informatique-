---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Arborescence Linux]]"
tags:
  - commande
  - linux
---
# find

> [!info] Linux
> Cherche des fichiers et dossiers selon leur nom, type, taille ou date.

## Pourquoi l'utiliser
Retrouver des fichiers dans une arborescence.

## Dans quel contexte
Fichiers à nettoyer, configuration à localiser.

## Syntaxe
```bash
find [dossier] [critères] [action]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-name "*.log"` | par nom (`-iname` : sans casse) |
| `-type f` / `-type d` | fichiers / dossiers |
| `-size +100M` | plus de 100 Mo |
| `-mtime +7` | modifiés il y a plus de 7 jours |
| `-delete` | supprime ce qui est trouvé (prudence) |
| `-exec cmd {} \;` | lance une commande sur chaque résultat |

## Exemple concret
```bash
find ~/projets -name "*.py" -type f
find /tmp -name "*.zip" -mtime +7
```

## Résultat attendu
Un chemin par ligne.

## Variantes utiles
- `find . -name "*.pyc" -delete`
- `find . -type f | wc -l`

> [!warning] Erreurs fréquentes
> - Lancer `-delete` sans avoir d'abord vérifié la liste

## Relier
- **Commandes complémentaires** : [[grep]] · [[ls]]
- **Concepts associés** : [[Arborescence Linux]]
