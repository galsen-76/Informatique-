---
type: command
tool: SQL
level: debutant
concepts:
  - "[[SQL]]"
  - "[[Clé primaire et clé étrangère]]"
tags:
  - commande
  - sql
---
# DELETE

> [!info] SQL
> Supprime des lignes d'une table.

## Pourquoi l'utiliser
Retirer des données.

## Dans quel contexte
Suppression d'une ressource, nettoyage.

## Syntaxe
```bash
DELETE FROM table WHERE condition;
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `WHERE` | quelles lignes (sans lui : TOUTES) |
| `RETURNING id` | renvoie ce qui est supprimé |
| `TRUNCATE table` | vide toute la table, très vite |

## Exemple concret
```bash
DELETE FROM tache WHERE projet_id = 3 RETURNING id;
```

## Résultat attendu
`DELETE 3`.

## Variantes utiles
- suppression « douce » : une colonne `supprime_le` au lieu d'effacer

> [!warning] Erreurs fréquentes
> - Oublier le `WHERE`
> - Erreur de clé étrangère : d'autres lignes pointent encore vers celle-ci

## Relier
- **Commandes complémentaires** : [[UPDATE]]
- **Concepts associés** : [[SQL]] · [[Clé primaire et clé étrangère]]
