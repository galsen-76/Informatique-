---
type: command
tool: Git
level: debutant
concepts:
  - "[[Branche Git]]"
tags:
  - commande
  - git
---
# git branch

> [!info] Git
> Liste, crée ou supprime des branches.

## Pourquoi l'utiliser
Pour voir où tu en es et gérer tes lignes de développement.

## Dans quel contexte
Avant de commencer une fonctionnalité, ou pour faire le ménage après un merge.

## Syntaxe
```bash
git branch [nom]
git branch -d <nom>
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `(sans argument)` | Liste les branches ; `*` indique la branche courante |
| `nom` | Crée la branche sans s'y déplacer |
| `-d` | Supprime une branche déjà fusionnée |
| `-D` | Force la suppression (perte possible de commits) |

## Exemple concret
```bash
git branch
git branch -d feature/login
```

## Résultat attendu
```text
  feature/login
* main
```



## Relier
- **Commandes complémentaires** : [[git switch]] · [[git merge]]
- **Concepts associés** : [[Branche Git]]
