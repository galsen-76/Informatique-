---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Utilisateur et groupe]]"
  - "[[Permissions Linux]]"
tags:
  - commande
  - linux
---
# chown

> [!info] Linux
> Change le propriétaire (et le groupe) d'un fichier ou d'un dossier.

## Pourquoi l'utiliser
Rendre un fichier à son vrai propriétaire.

## Dans quel contexte
Fichiers créés par root ou par un conteneur dans un dossier monté.

## Syntaxe
```bash
sudo chown utilisateur[:groupe] chemin
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-R` | récursif (tout le dossier) |
| `user:group` | propriétaire et groupe |

## Exemple concret
```bash
sudo chown -R oumar:oumar ~/projets/essai-zip/sortie
```

## Résultat attendu
`ls -l` affiche le nouveau propriétaire.

## Variantes utiles
- `chgrp groupe fichier` : seulement le groupe

> [!warning] Erreurs fréquentes
> - `chown -R` sur un mauvais chemin système (`/`) : catastrophique

## Relier
- **Commandes complémentaires** : [[chmod]] · [[sudo]]
- **Concepts associés** : [[Utilisateur et groupe]] · [[Permissions Linux]]
