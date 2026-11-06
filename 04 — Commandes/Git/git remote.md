---
type: command
tool: Git
level: debutant
concepts:
  - "[[Dépôt distant (remote)]]"
  - "[[Dépôt upstream]]"
tags:
  - commande
  - git
---
# git remote

> [!info] Git
> Liste et gère les dépôts distants connus de ton dépôt.

## Pourquoi l'utiliser
Savoir où tu pousses, ajouter un upstream.

## Dans quel contexte
Projet repris, changement d'URL.

## Syntaxe
```bash
git remote [-v | add nom URL | set-url nom URL | remove nom]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-v` | liste avec les URL |
| `add upstream URL` | ajoute un remote |
| `set-url origin URL` | change l'URL |

## Exemple concret
```bash
git remote -v
git remote add upstream https://github.com/cvat-ai/cvat.git
```

## Résultat attendu
`origin  git@gitlab… (fetch/push)`.

## Variantes utiles
- `git remote set-url origin git@gitlab.com:…` : passer de HTTPS à SSH

> [!warning] Erreurs fréquentes
> - Pousser par erreur vers `upstream`

## Relier
- **Commandes complémentaires** : [[git fetch]] · [[git push]]
- **Concepts associés** : [[Dépôt distant (remote)]] · [[Dépôt upstream]]
