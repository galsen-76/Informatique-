---
type: command
tool: SQL
level: debutant
concepts:
  - "[[SQL]]"
  - "[[Transaction]]"
tags:
  - commande
  - sql
---
# UPDATE

> [!info] SQL
> Modifie des lignes existantes.

## Pourquoi l'utiliser
Changer des valeurs en base.

## Dans quel contexte
Marquer une tâche finie, corriger des données.

## Syntaxe
```bash
UPDATE table SET col = valeur WHERE condition;
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `WHERE` | quelles lignes (sans lui : TOUTES) |
| `RETURNING *` | renvoie les lignes modifiées |
| `SET a = a + 1` | calcul à partir de l'ancienne valeur |

## Exemple concret
```bash
UPDATE tache SET fini = true WHERE id = 12 RETURNING *;
```

## Résultat attendu
`UPDATE 1` : nombre de lignes modifiées.

## Variantes utiles
- tester d'abord avec `SELECT … WHERE` la même condition

> [!warning] Erreurs fréquentes
> - Oublier le `WHERE` : toute la table est modifiée (d'où le réflexe `BEGIN` … vérifier … `COMMIT`)

## Relier
- **Commandes complémentaires** : [[INSERT]] · [[DELETE]]
- **Concepts associés** : [[SQL]] · [[Transaction]]
