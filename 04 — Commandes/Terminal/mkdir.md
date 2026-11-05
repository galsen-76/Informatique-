---
type: command
tool: Terminal
level: debutant
concepts:
  - "[[Système de fichiers]]"
tags:
  - commande
  - terminal
---
# mkdir

> [!info] Terminal
> Crée un dossier (make directory).

## Pourquoi l'utiliser
Créer une arborescence de projet rapidement.

## Dans quel contexte
En début de projet ou pour organiser des fichiers.

## Syntaxe
```bash
mkdir <nom>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `nom` | Nom ou chemin du dossier |
| `-p` | Crée aussi les dossiers parents manquants (Bash) |

## Exemple concret
```bash
mkdir -p api-notes/src/routes
```

## Résultat attendu
Les dossiers existent ; vérifier avec `ls`.



## Relier
- **Commandes complémentaires** : [[cd]] · [[ls]]
- **Concepts associés** : [[Système de fichiers]]
