---
type: bonnes-pratiques
sujet: "SQL et bases de données"
concepts:
  - "[[SQL]]"
  - "[[Base de données relationnelle]]"
  - "[[Clé primaire et clé étrangère]]"
  - "[[Transaction]]"
  - "[[Index de base de données]]"
  - "[[Migration de base de données]]"
  - "[[Injection SQL]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - SQL et bases de données

> [!info] À quoi sert cette fiche
> Des données cohérentes, des requêtes sûres et une base qui reste rapide quand elle grossit.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Toujours des requêtes paramétrées
La seule protection fiable contre l'injection SQL. Voir [[Injection SQL]].

```sql
cur.execute("SELECT * FROM tache WHERE nom = %s", (nom,))
```

### 2. Des contraintes dans la base
`NOT NULL`, `UNIQUE`, `CHECK`, clés étrangères : la base protège la cohérence même si le code a un bug. Voir [[Clé primaire et clé étrangère]].

### 3. Écrire le SELECT avant le UPDATE ou le DELETE
Même `WHERE` : tu vois les lignes qui seront touchées.

```sql
SELECT count(*) FROM tache WHERE projet_id = 3;
BEGIN;
DELETE FROM tache WHERE projet_id = 3;
COMMIT;
```

### 4. Grouper les opérations liées dans une transaction
Tout ou rien. Voir [[Transaction]].

### 5. Faire évoluer le schéma par migrations versionnées
Jamais à la main en production. Voir [[Migration de base de données]].

### 6. Indexer les colonnes filtrées ou jointes souvent, après avoir mesuré
`EXPLAIN ANALYZE` d'abord. Voir [[Index de base de données]].

### 7. Sélectionner seulement les colonnes utiles et limiter
`SELECT id, nom … LIMIT 50` plutôt que `SELECT *` sur une grosse table.

### 8. Sauvegarder et tester la restauration
Une sauvegarde jamais restaurée n'est pas une sauvegarde.

## À éviter

### 1. Concaténer des valeurs dans une requête
**Pourquoi c'est un problème :** injection SQL.
**À la place :** paramètres.

### 2. `UPDATE` ou `DELETE` sans `WHERE`
**Pourquoi c'est un problème :** toute la table est modifiée.
**À la place :** toujours un `WHERE`, et une transaction pour vérifier avant de valider.

### 3. Recopier la même information dans plusieurs tables
**Pourquoi c'est un problème :** les copies finissent par diverger.
**À la place :** une table, une clé étrangère, une jointure.

### 4. Le problème N+1 avec un ORM
**Pourquoi c'est un problème :** une requête par élément : des centaines de requêtes pour une page.
**À la place :** demander la jointure (`include`, `select_related`).

### 5. Stocker des dates sans fuseau
**Pourquoi c'est un problème :** décalages au changement d'heure ou entre serveurs.
**À la place :** `TIMESTAMPTZ` en PostgreSQL, et l'UTC partout.

### 6. Modifier une migration déjà appliquée ailleurs
**Pourquoi c'est un problème :** les autres bases ne la rejouent pas.
**À la place :** une nouvelle migration.

## Avant de valider mon travail
- [ ] Aucune requête construite par concaténation
- [ ] Les tables ont leurs contraintes et clés
- [ ] Les changements de schéma sont des migrations
- [ ] Les requêtes lentes ont été mesurées
- [ ] Une sauvegarde existe et a été restaurée au moins une fois

## Notions liées
[[SQL]] · [[Base de données relationnelle]] · [[Clé primaire et clé étrangère]] · [[Transaction]] · [[Index de base de données]] · [[Migration de base de données]] · [[Injection SQL]]
