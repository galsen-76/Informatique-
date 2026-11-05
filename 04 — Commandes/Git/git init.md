---
type: command
tool: Git
level: debutant
concepts:
  - "[[Dépôt Git]]"
  - "[[Git]]"
tags:
  - commande
  - git
---
# git init

> [!info] Git
> Transforme le dossier courant en dépôt Git.

## Pourquoi l'utiliser
Pour commencer à historiser un projet qui n'est pas encore suivi par Git.

## Dans quel contexte
Une seule fois, au début d'un projet local (si le projet existe déjà sur GitHub, on utilise plutôt `git clone`).

## Syntaxe
```bash
git init [dossier]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `dossier` | Facultatif : crée le dépôt dans ce dossier plutôt que dans le dossier courant |
| `-b main` | Nomme la première branche `main` |

## Exemple concret
```bash
mkdir api-notes && cd api-notes
git init -b main
```

## Résultat attendu
`Initialized empty Git repository in .../api-notes/.git/` — un dossier caché `.git` apparaît.

> [!warning] Erreurs fréquentes
> - Lancer `git init` dans ton dossier utilisateur entier : tout ton disque devient « suivi ». Vérifie le dossier courant avant (`pwd`).


## Relier
- **Commandes complémentaires** : [[git status]] · [[git add]] · [[git commit]]
- **Concepts associés** : [[Dépôt Git]] · [[Git]]
