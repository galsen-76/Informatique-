---
type: command
tool: SQL
level: debutant
concepts:
  - "[[SQL]]"
  - "[[Base de données relationnelle]]"
tags:
  - commande
  - sql
---
# SELECT

> [!info] SQL
> Lit des données dans une ou plusieurs tables.

## Pourquoi l'utiliser
C'est la requête la plus utilisée : toute lecture de données passe par elle.

## Dans quel contexte
Afficher, filtrer, trier, compter des enregistrements ; derrière chaque `GET` d'une API.

## Syntaxe
```sql
SELECT colonnes
FROM table
WHERE condition
ORDER BY colonne [ASC|DESC]
LIMIT n;
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `colonnes` | Colonnes à renvoyer (`*` pour toutes) |
| `WHERE` | Filtre les lignes |
| `ORDER BY` | Trie le résultat |
| `LIMIT` | Limite le nombre de lignes |

## Exemple concret
```sql
SELECT id, title
FROM notes
WHERE done = false
ORDER BY id DESC
LIMIT 10;
```

## Résultat attendu
Un tableau des 10 dernières notes non terminées.
## Variantes utiles
```sql
SELECT COUNT(*) FROM notes WHERE done = true;
SELECT n.title, u.email FROM notes n JOIN users u ON u.id = n.user_id;
```

> [!warning] Erreurs fréquentes
> - Comparer à `NULL` avec `=` : utiliser `IS NULL`.
> - Chaînes entre guillemets doubles : en SQL standard, les chaînes vont entre apostrophes `'...'`.


## Relier
- **Commandes complémentaires** : —
- **Concepts associés** : [[SQL]] · [[Base de données relationnelle]]
