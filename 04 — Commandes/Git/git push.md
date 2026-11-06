---
type: command
tool: Git
level: debutant
concepts:
  - "[[Dépôt distant (remote)]]"
  - "[[Merge request]]"
tags:
  - commande
  - git
---
# git push

> [!info] Git
> Envoie tes commits vers le dépôt distant.

## Pourquoi l'utiliser
Partager son travail, déclencher la CI, ouvrir une merge request.

## Dans quel contexte
Après des commits sur ta branche.

## Syntaxe
```bash
git push [-u] [remote] [branche]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-u origin branche` | première fois : lie la branche locale à celle du serveur |
| `--tags` / `origin v1.0.0` | envoie les tags |
| `--force-with-lease` | réécrit la branche distante si personne n'a poussé entre-temps |

## Exemple concret
```bash
git push -u origin feat/dry-run
git push
```

## Résultat attendu
GitLab affiche souvent un lien pour créer une merge request.

## Variantes utiles
- `git push origin --delete branche` : supprimer une branche distante

> [!warning] Erreurs fréquentes
> - `rejected (fetch first)` : faire `git pull` d'abord
> - `--force` sur une branche partagée : écrase le travail des autres

## Relier
- **Commandes complémentaires** : [[git pull]]
- **Concepts associés** : [[Dépôt distant (remote)]] · [[Merge request]]
