---
type: command
tool: Git
level: debutant
concepts:
  - "[[Dépôt Git]]"
tags:
  - commande
  - git
---
# git grep

> [!info] Git
> Cherche un texte dans tous les fichiers suivis par Git.

## Pourquoi l'utiliser
Trouver vite où une variable, une image ou une fonction est utilisée dans un gros projet.

## Dans quel contexte
Explorer CVAT : où est défini `CVAT_HOST`, quelles lignes `FROM`, quel job utilise une image.

## Syntaxe
```bash
git grep [options] "texte" [commit] [-- chemins]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-n` | affiche les numéros de ligne |
| `-i` | ignore majuscules et minuscules |
| `-l` | seulement les noms de fichiers |
| `-w` | mot entier |
| `commit` | cherche dans une autre version, ex. `v2.20.0` |

## Exemple concret
```bash
git grep -n "^FROM" -- "*Dockerfile*"
```

## Résultat attendu
Chaque résultat sous la forme `fichier:ligne:contenu`.

## Variantes utiles
- `git grep -n CVAT_HOST v2.20.0` : dans une version précise
- `git grep -l "docker:dind"`
- `git grep -c TODO` : nombre de résultats par fichier

> [!warning] Erreurs fréquentes
> - Ne trouve pas un fichier non suivi par Git (nouveau, ignoré) : normal, c'est voulu
> - Sous PowerShell, mettre le motif entre guillemets doubles

## Relier
- **Commandes complémentaires** : [[git diff]] · [[git status]]
- **Concepts associés** : [[Dépôt Git]]
