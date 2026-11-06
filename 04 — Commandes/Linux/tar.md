---
type: command
tool: Linux
level: debutant
concepts:
  - "[[Archive tar et compression]]"
tags:
  - commande
  - linux
---
# tar

> [!info] Linux
> Crée, liste et extrait des archives (.tar, .tar.gz).

## Pourquoi l'utiliser
Sauvegarder ou transférer un dossier avec ses droits.

## Dans quel contexte
Sauvegardes, installation d'outils livrés en archive.

## Syntaxe
```bash
tar -czf archive.tar.gz dossier
tar -xzf archive.tar.gz
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `c` / `x` / `t` | créer / extraire / lister |
| `z` | compression gzip (`J` : xz) |
| `f` | nom du fichier archive (toujours en dernier des options) |
| `-C dossier` | extraire dans ce dossier |
| `v` | affiche chaque fichier |

## Exemple concret
```bash
tar -czf sauvegarde.tar.gz projets/
tar -tzf sauvegarde.tar.gz | head
tar -xzf sauvegarde.tar.gz -C /tmp
```

## Résultat attendu
L'archive est créée ou extraite.

## Variantes utiles
- `tar -xf` détecte souvent la compression tout seul

> [!warning] Erreurs fréquentes
> - Inverser `c` et `x`
> - Extraire sans `-t` d'abord une archive inconnue

## Relier
- **Commandes complémentaires** : [[find]]
- **Concepts associés** : [[Archive tar et compression]]
