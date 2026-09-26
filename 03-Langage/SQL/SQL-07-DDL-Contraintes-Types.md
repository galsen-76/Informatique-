---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - backend/sql/ddl
aliases:
  - "DDL Contraintes et Types SQL"
parent: "[[SQL]]"
related_theory:
  - "[[BDD-02-Modelisation-Normalisation|Modélisation Relationnelle et Normalisation]]"
  - "[[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/ddl-constraints.html"
---

# DDL Contraintes et Types

> [!abstract] En bref
> Le **DDL** (*Data Definition Language*) crée et modifie la **structure** de la base : les tables, leurs colonnes, leurs types et leurs **contraintes** (règles que la base fait respecter elle-même). Avec Prisma, c'est le schéma qui génère ce SQL, mais tu dois savoir le lire dans les fichiers de migration.

## Créer une table

```sql
CREATE TABLE reviews (
  id          SERIAL PRIMARY KEY,                               -- numéro auto, identifiant
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  movie_id    INTEGER NOT NULL REFERENCES movies(id),
  rating      SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 10),
  comment     TEXT NOT NULL,
  spoiler     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, movie_id)                                    -- une critique par film et par utilisateur
);
```

## Les contraintes : la base te protège

| Contrainte | Garantit |
|---|---|
| `PRIMARY KEY` | chaque ligne a un identifiant unique et non vide |
| `NOT NULL` | la valeur est obligatoire |
| `UNIQUE` | pas de doublon (e-mail, couple utilisateur-film) |
| `REFERENCES autre(id)` (clé étrangère) | la valeur existe dans l'autre table |
| `CHECK (…)` | une règle (note entre 1 et 10) |
| `DEFAULT …` | une valeur si rien n'est fourni |

**Pourquoi les mettre en base, alors que l'API valide déjà ?** Parce que la base est le **dernier rempart** : un bug, un script, un autre service qui écrit directement… Même dans ce cas, une note de 15 ou une critique orpheline sont refusées.

### Que faire à la suppression du parent ?

| Option | Si on supprime l'utilisateur… |
|---|---|
| `ON DELETE CASCADE` | ses critiques sont supprimées aussi |
| `ON DELETE SET NULL` | la colonne passe à `NULL` (critique « anonyme ») |
| `ON DELETE RESTRICT` (défaut) | la suppression est refusée |

## Les types PostgreSQL utiles

| Type | Pour |
|---|---|
| `INTEGER`, `BIGINT` | nombres entiers |
| `SERIAL` / `GENERATED ALWAYS AS IDENTITY` | identifiant auto-incrémenté |
| `UUID` | identifiant aléatoire non devinable |
| `NUMERIC(10, 2)` | montants (exact, pas d'erreur d'arrondi) |
| `TEXT`, `VARCHAR(n)` | texte (en PostgreSQL, `TEXT` convient presque toujours) |
| `BOOLEAN` | vrai / faux |
| `TIMESTAMPTZ` | date et heure **avec fuseau** (à préférer) |
| `DATE` | une date sans heure |
| `JSONB` | données JSON, interrogeables |
| `TEXT[]` | un tableau de textes |

## Modifier une table

```sql
ALTER TABLE movies ADD COLUMN runtime INTEGER;
ALTER TABLE movies ALTER COLUMN title SET NOT NULL;
ALTER TABLE movies DROP COLUMN old_field;
CREATE INDEX idx_reviews_movie ON reviews (movie_id);
```

Ces modifications passent par des **migrations** versionnées, jamais à la main en production. Voir [[BDD-05-Migrations|Migrations]].

## Pièges

- **`FLOAT` pour de l'argent** : erreurs d'arrondi. Utilise `NUMERIC` ou des centimes en entier.
- **`TIMESTAMP` sans fuseau** : les heures deviennent fausses dès qu'il y a plusieurs fuseaux ou un changement d'heure. Utilise `TIMESTAMPTZ`.
- **Pas de contrainte parce que « l'API vérifie »** : un jour, quelque chose passera à côté de l'API.
