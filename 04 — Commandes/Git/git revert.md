---
type: command
tool: Git
level: debutant
concepts:
  - "[[Annuler dans Git]]"
tags:
  - commande
  - git
---
# git revert

> [!info] Git
> Crée un nouveau commit qui annule les changements d'un commit précédent.

## Pourquoi l'utiliser
Annuler un commit déjà poussé, sans réécrire l'historique.

## Dans quel contexte
Un commit sur `main` qui casse la CI.

## Syntaxe
```bash
git revert commit
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `commit` | le hash du commit à annuler |
| `--no-edit` | garde le message proposé |

## Exemple concret
```bash
git revert a1b2c3d --no-edit
git push
```

## Résultat attendu
Un commit « Revert … » apparaît dans l'historique.

## Variantes utiles
- `git revert -m 1 <merge>` : annuler un commit de fusion

> [!warning] Erreurs fréquentes
> - Confondre avec `reset` (qui réécrit)

## Relier
- **Commandes complémentaires** : [[git reset]] · [[git log]]
- **Concepts associés** : [[Annuler dans Git]]
