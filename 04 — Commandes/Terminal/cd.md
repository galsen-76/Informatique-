---
type: command
tool: Terminal
level: debutant
concepts:
  - "[[Terminal]]"
  - "[[Système de fichiers]]"
tags:
  - commande
  - terminal
---
# cd

> [!info] Terminal
> Change le dossier courant (change directory). Fonctionne en PowerShell, Bash et Zsh.

## Pourquoi l'utiliser
Toutes les commandes s'exécutent dans le dossier courant : être au bon endroit évite la moitié des erreurs.

## Dans quel contexte
Avant de lancer une commande sur un projet.

## Syntaxe
```bash
cd <chemin>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `chemin` | Dossier cible, absolu ou relatif |
| `..` | Remonte au dossier parent |
| `~` | Dossier personnel |
| `-` | Revient au dossier précédent |

## Exemple concret
```bash
cd ~/projets/api-notes
cd ..
```

## Résultat attendu
Le chemin affiché dans l'invite change. `pwd` affiche le dossier courant.

> [!warning] Erreurs fréquentes
> - Chemin avec espaces : mettre des guillemets, `cd "Mes projets"`.


## Relier
- **Commandes complémentaires** : [[ls]] · [[mkdir]]
- **Concepts associés** : [[Terminal]] · [[Système de fichiers]]
