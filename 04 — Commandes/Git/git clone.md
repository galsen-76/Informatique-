---
type: command
tool: Git
level: debutant
concepts:
  - "[[Dépôt distant (remote)]]"
tags:
  - commande
  - git
---
# git clone

> [!info] Git
> Copie complète d'un dépôt distant sur ta machine.

## Pourquoi l'utiliser
Récupérer un projet pour la première fois.

## Dans quel contexte
Début de travail sur un projet existant.

## Syntaxe
```bash
git clone URL [dossier]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `URL` | HTTPS (`https://…`) ou SSH (`git@…`) |
| `dossier` | nom du dossier créé |
| `--depth 1` | seulement le dernier commit (plus rapide) |
| `--branch v2.20.0` | se placer sur une branche ou un tag |

## Exemple concret
```bash
git clone git@gitlab.com:equipe/projet.git
cd projet
```

## Résultat attendu
Un dossier avec tout l'historique et le remote `origin`.

## Variantes utiles
- `git clone --depth 1 --branch v2.20.0 URL` : une version précise, léger

> [!warning] Erreurs fréquentes
> - Cloner dans `/mnt/c` depuis WSL : lent (cloner dans `~/projets`)
> - HTTPS qui demande un mot de passe : utiliser un jeton ou SSH

## Relier
- **Commandes complémentaires** : [[git pull]] · [[git remote]]
- **Concepts associés** : [[Dépôt distant (remote)]]
