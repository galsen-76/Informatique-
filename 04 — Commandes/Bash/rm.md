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
# rm

> [!info] Bash
> Supprime des fichiers ou des dossiers, définitivement (pas de corbeille).

## Pourquoi l'utiliser
Nettoyer des fichiers temporaires ou générés.

## Dans quel contexte
Après avoir vérifié avec `pwd` et `ls` ce qui va être supprimé.

## Syntaxe
```bash
rm [options] chemin
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-r` | supprime un dossier et son contenu |
| `-f` | sans confirmation ni erreur si absent |
| `-i` | demande pour chaque fichier |

## Exemple concret
```bash
rm sortie.zip
rm -r __pycache__/
```

## Résultat attendu
Les fichiers ont disparu, sans récupération possible.

## Variantes utiles
- `rm -ri dossier` : supprimer en confirmant
- `rmdir` : supprime un dossier **vide**
- PowerShell : `Remove-Item -Recurse -Force`

> [!warning] Erreurs fréquentes
> - `rm -rf` avec une variable vide : `rm -rf "$DOSSIER/"` peut viser `/`
> - Supprimer dans le mauvais dossier : toujours `pwd` avant

## Relier
- **Commandes complémentaires** : [[pwd]] · [[ls]]
- **Concepts associés** : [[Bash]] · [[Système de fichiers]]
