---
type: notion
statut: a apprendre
resume: "Le DDL (Data Definition Language) crée et modifie la structure de la base : les tables, leurs colonnes, leurs types et leurs contraintes (règles que la base fait respecter elle-même)."
revu:
sources:
  - "https://www.postgresql.org/docs/current/ddl-constraints.html"
---
# DDL contraintes et types

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Le **DDL** (*Data Definition Language*) crée et modifie la **structure** de la base : les tables, leurs colonnes, leurs types et leurs **contraintes** (règles que la base fait respecter elle-même).

## Le problème

**Pourquoi c'est utile ?**
Pour créer la structure de la base et lui faire respecter des règles (unicité, champ obligatoire, lien valide).

**Qu'est-ce qui se passait sans ça ?**
Les règles n'étaient vérifiées que dans le code : un bug ou un script manuel suffisait à mettre des données incohérentes en base.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Avec Prisma, c'est le schéma qui génère ce SQL, mais tu dois savoir le lire dans les fichiers de migration.

### Créer une table

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

### Les contraintes : la base te protège

| Contrainte | Garantit |
|---|---|
| `PRIMARY KEY` | chaque ligne a un identifiant unique et non vide |
| `NOT NULL` | la valeur est obligatoire |
| `UNIQUE` | pas de doublon (e-mail, couple utilisateur-film) |
| `REFERENCES autre(id)` (clé étrangère) | la valeur existe dans l'autre table |
| `CHECK (…)` | une règle (note entre 1 et 10) |
| `DEFAULT …` | une valeur si rien n'est fourni |

**Pourquoi les mettre en base, alors que l'API valide déjà ?** Parce que la base est le **dernier rempart** : un bug, un script, un autre service qui écrit directement… Même dans ce cas, une note de 15 ou une critique orpheline sont refusées.

#### Que faire à la suppression du parent ?

| Option | Si on supprime l'utilisateur… |
|---|---|
| `ON DELETE CASCADE` | ses critiques sont supprimées aussi |
| `ON DELETE SET NULL` | la colonne passe à `NULL` (critique « anonyme ») |
| `ON DELETE RESTRICT` (défaut) | la suppression est refusée |

### Les types PostgreSQL utiles

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

## 🧪 Exemple

### Modifier une table

```sql
ALTER TABLE movies ADD COLUMN runtime INTEGER;
ALTER TABLE movies ALTER COLUMN title SET NOT NULL;
ALTER TABLE movies DROP COLUMN old_field;
CREATE INDEX idx_reviews_movie ON reviews (movie_id);
```

Ces modifications passent par des **migrations** versionnées, jamais à la main en production. Voir [[Migrations]].

## ⚠️ Limites et pièges

- **`FLOAT` pour de l'argent** : erreurs d'arrondi. Utilise `NUMERIC` ou des centimes en entier.
- **`TIMESTAMP` sans fuseau** : les heures deviennent fausses dès qu'il y a plusieurs fuseaux ou un changement d'heure. Utilise `TIMESTAMPTZ`.
- **Pas de contrainte parce que « l'API vérifie »** : un jour, quelque chose passera à côté de l'API.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Créer la table des critiques

Écris le `CREATE TABLE reviews` : id auto-incrémenté, auteur et film obligatoires (clés étrangères), note entière entre 1 et 5, texte facultatif, date de création par défaut. Un utilisateur ne peut critiquer un film qu'une fois.

> [!success]- Solution
> ```sql
> CREATE TABLE reviews (
>   id          SERIAL PRIMARY KEY,
>   user_id     INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
>   movie_id    INT NOT NULL REFERENCES movies(id),
>   rating      INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
>   content     TEXT,
>   created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
>   UNIQUE (user_id, movie_id)
> );
> ```

#### Exercice 2 · Choisir les types

Quel type PostgreSQL choisis-tu pour : un prix, une date + heure de création, un e-mail, une liste de genres, un booléen « spoiler » ?

> [!success]- Solution
> | Donnée | Type |
> |---|---|
> | prix | `NUMERIC(10, 2)` (jamais de nombre à virgule flottante pour l'argent) |
> | date + heure | `TIMESTAMPTZ` (avec fuseau horaire) |
> | e-mail | `TEXT` avec une contrainte `UNIQUE` |
> | liste de genres | une table de liaison `movie_genres` (ou `TEXT[]` si c'est simple) |
> | spoiler | `BOOLEAN NOT NULL DEFAULT false` |

## 🔗 Liens

- **Prérequis :** [[Fondamentaux SQL et SELECT]]
- **Voir aussi :** [[Normalisation]], [[Prisma schéma et migrations]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.postgresql.org/docs/current/ddl-constraints.html
