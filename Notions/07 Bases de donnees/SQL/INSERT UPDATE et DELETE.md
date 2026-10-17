---
type: notion
statut: a apprendre
resume: "Les trois commandes pour modifier les données : INSERT ajoute des lignes, UPDATE les modifie, DELETE les supprime."
revu:
sources:
  - "https://www.postgresql.org/docs/current/dml.html"
---
# INSERT UPDATE et DELETE

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Les trois commandes pour **modifier** les données : `INSERT` ajoute des lignes, `UPDATE` les modifie, `DELETE` les supprime.

## Le problème

**Pourquoi c'est utile ?**
Pour ajouter, modifier et supprimer des données en sécurité.

**Qu'est-ce qui se passait sans ça ?**
Un UPDATE ou un DELETE oublié sans WHERE modifiait toute la table.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Les deux dernières sont **dangereuses** : sans `WHERE`, elles touchent **toute** la table.

### `INSERT` : ajouter

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

### `UPDATE` : modifier

```sql
UPDATE reviews
SET rating = 8, updated_at = NOW()
WHERE id = 7 AND user_id = 42;          -- seulement SA critique
```

### `DELETE` : supprimer

```sql
DELETE FROM favorites
WHERE user_id = 42 AND movie_id = 27205;
```

### ⚠️ La règle de survie

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

Voir [[Transactions et ACID|Transactions]].

### Suppression « douce »

Plutôt que supprimer vraiment, on marque la ligne :

```sql
UPDATE reviews SET deleted_at = NOW() WHERE id = 7;
-- et toutes les lectures filtrent : WHERE deleted_at IS NULL
```

Utile pour pouvoir restaurer, ou garder un historique.

## 🧪 Exemple

### « Créer ou mettre à jour » (upsert)

```sql
INSERT INTO movies (id, title) VALUES (27205, 'Inception')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;
```

Si le film existe déjà (même `id`), on met à jour son titre au lieu d'échouer. C'est `upsert` en Prisma.

## ⚠️ Limites et pièges

- **Oublier le `WHERE`** : voir ci-dessus.
- **Supprimer une ligne référencée ailleurs** (un utilisateur qui a des critiques) : refusé par la clé étrangère, sauf si `ON DELETE CASCADE` est prévu. Voir [[DDL contraintes et types|Contraintes]].
- **Coller des valeurs d'utilisateur dans la requête** : injection SQL. Toujours des requêtes paramétrées (Prisma le fait pour toi).

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Ajouter, modifier, supprimer

Écris les 3 requêtes :
1. ajouter un favori pour l'utilisateur 1 et le film 438631 dans `favorites (user_id, movie_id)` ;
2. passer la note de la critique 12 à 5 ;
3. supprimer toutes les critiques de l'utilisateur 7.

> [!success]- Solution
> ```sql
> INSERT INTO favorites (user_id, movie_id) VALUES (1, 438631);
>
> UPDATE reviews SET rating = 5 WHERE id = 12;
>
> DELETE FROM reviews WHERE user_id = 7;
> ```
>
> Avant un `UPDATE` ou `DELETE`, lance d'abord un `SELECT` avec le même `WHERE` pour vérifier les lignes touchées.

#### Exercice 2 · Ne pas créer de doublon

L'utilisateur clique deux fois sur « favori ». Écris l'insertion qui ne fait rien si le favori existe déjà (la paire `user_id, movie_id` est unique).

> [!success]- Solution
> ```sql
> INSERT INTO favorites (user_id, movie_id)
> VALUES (1, 438631)
> ON CONFLICT (user_id, movie_id) DO NOTHING;
> ```

## 🔗 Liens

- **Prérequis :** [[Fondamentaux SQL et SELECT]]
- **Voir aussi :** [[Transactions et ACID]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.postgresql.org/docs/current/dml.html
