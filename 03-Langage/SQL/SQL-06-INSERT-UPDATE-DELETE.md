---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - backend/sql/dml
aliases:
  - "INSERT UPDATE DELETE"
parent: "[[SQL]]"
related_theory:
  - "[[BDD-03-Transactions-ACID|Transactions et ACID]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/dml.html"
---

# INSERT UPDATE DELETE

> [!abstract] En bref
> Les trois commandes pour **modifier** les données : `INSERT` ajoute des lignes, `UPDATE` les modifie, `DELETE` les supprime. Les deux dernières sont **dangereuses** : sans `WHERE`, elles touchent **toute** la table.

## `INSERT` : ajouter

```sql
INSERT INTO reviews (user_id, movie_id, rating, comment)
VALUES (42, 27205, 9, 'Un chef-d''œuvre, à revoir plusieurs fois.')
RETURNING id, created_at;               -- PostgreSQL : renvoie la ligne créée
```

Plusieurs lignes d'un coup :

```sql
INSERT INTO movies (id, title, release_year) VALUES
  (27205, 'Inception', 2010),
  (438631, 'Dune', 2021);
```

Une apostrophe dans un texte se double : `'d''œuvre'`.

## « Créer ou mettre à jour » (upsert)

```sql
INSERT INTO movies (id, title) VALUES (27205, 'Inception')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;
```

Si le film existe déjà (même `id`), on met à jour son titre au lieu d'échouer. C'est `upsert` en Prisma.

## `UPDATE` : modifier

```sql
UPDATE reviews
SET rating = 8, updated_at = NOW()
WHERE id = 7 AND user_id = 42;          -- seulement SA critique
```

## `DELETE` : supprimer

```sql
DELETE FROM favorites
WHERE user_id = 42 AND movie_id = 27205;
```

## ⚠️ La règle de survie

```sql
UPDATE users SET role = 'ADMIN';        -- 💀 TOUS les utilisateurs deviennent admin
DELETE FROM reviews;                    -- 💀 toutes les critiques disparaissent
```

**Avant un `UPDATE` ou un `DELETE` à la main :**
1. Écris d'abord le `SELECT` avec le même `WHERE` et vérifie les lignes concernées.
2. Travaille dans une transaction, pour pouvoir annuler :

```sql
BEGIN;
DELETE FROM reviews WHERE movie_id = 999;
-- vérifier le nombre de lignes supprimées…
ROLLBACK;   -- annuler   (ou COMMIT; pour valider)
```

Voir [[BDD-03-Transactions-ACID|Transactions]].

## Suppression « douce »

Plutôt que supprimer vraiment, on marque la ligne :

```sql
UPDATE reviews SET deleted_at = NOW() WHERE id = 7;
-- et toutes les lectures filtrent : WHERE deleted_at IS NULL
```

Utile pour pouvoir restaurer, ou garder un historique.

## Pièges

- **Oublier le `WHERE`** : voir ci-dessus.
- **Supprimer une ligne référencée ailleurs** (un utilisateur qui a des critiques) : refusé par la clé étrangère, sauf si `ON DELETE CASCADE` est prévu. Voir [[SQL-07-DDL-Contraintes-Types|Contraintes]].
- **Coller des valeurs d'utilisateur dans la requête** : injection SQL. Toujours des requêtes paramétrées (Prisma le fait pour toi).
