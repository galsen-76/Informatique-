---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - backend/sql/ddl
aliases:
  - "DDL Contraintes et Types SQL"
parent: "[[SQL]]"
children: []
related_theory:
  - "[[BDD-02-Modelisation-Normalisation|Modélisation Relationnelle et Normalisation]]"
  - "[[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]]"
related_snippets:
  - "[[04_Snippets/sql-07-ddl-contraintes-types]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/ddl-constraints.html"
---

# DDL Contraintes et Types SQL

> [!abstract] Introduction
> Le DDL (`CREATE`, `ALTER`, `DROP`) définit la structure des tables ; types et contraintes (PK, FK, UNIQUE, NOT NULL, CHECK) garantissent l'intégrité des données au niveau de la base elle-même.

> [!warning]- Prérequis
> [[SQL-01-Fondamentaux-SELECT|Fondamentaux SQL SELECT]]

---

## Théorie

> [!question]- C'est quoi ?
> ```sql
> CREATE TABLE films (
>   id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
>   titre       TEXT NOT NULL CHECK (length(titre) > 0),
>   annee       INT  NOT NULL CHECK (annee >= 1888),
>   budget      NUMERIC(12,2),
>   created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
> );
> CREATE TABLE favoris (
>   user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
>   film_id BIGINT REFERENCES films(id) ON DELETE RESTRICT,
>   PRIMARY KEY (user_id, film_id)
> );
> ```

> [!example]- Analogie
> Les contraintes sont les règles du cadastre : on ne peut pas enregistrer une maison sans adresse ni la rattacher à une rue qui n'existe pas.

> [!question]- Pourquoi l'utiliser ?
> La base est la dernière ligne de défense : même si le code a un bug, elle refuse les données incohérentes.

> [!question]- Comment ça marche ?
> Types PostgreSQL courants : `INT/BIGINT`, `NUMERIC` (argent), `TEXT/VARCHAR(n)`, `BOOLEAN`, `TIMESTAMPTZ` (toujours avec fuseau), `DATE`, `UUID`, `JSONB`, `ENUM`.
> Contraintes : `PRIMARY KEY`, `FOREIGN KEY ... ON DELETE CASCADE|RESTRICT|SET NULL`, `UNIQUE`, `NOT NULL`, `CHECK`, `DEFAULT`.

> [!question]- Quand l'utiliser ?
> À la conception, puis via migrations (jamais de modif manuelle en prod).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Trop de logique métier dans des CHECK/triggers devient difficile à tester et à faire évoluer.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| DDL | Data Definition Language |
| Contrainte | Règle d'intégrité vérifiée par le SGBD |
| IDENTITY | Colonne auto-incrémentée standard |
| TIMESTAMPTZ | Horodatage avec fuseau horaire |

---

## Points clés

- `NOT NULL` par défaut sauf raison
- `TIMESTAMPTZ` pour les dates-heures
- `NUMERIC` pour l'argent
- Choisir `ON DELETE` consciemment

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `FLOAT` pour des montants
> - `TIMESTAMP` sans fuseau → bugs d'heure d'été et de fuseau
> - Unicité vérifiée seulement dans le code (race condition) → contrainte UNIQUE

---

## Exemple minimal

```sql
ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);
```

> [!note] Ce que j'en retiens
> Même si deux requêtes s'inscrivent en même temps, la base garantit l'unicité.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Contraintes d'exclusion, index partiels uniques (`WHERE deleted_at IS NULL`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[SQL]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sql-07-ddl-contraintes-types]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi une vérification d'unicité dans le code ne suffit-elle pas ?

---

## Tâches

- [ ] #task Écrire le DDL complet de CinéTrack à la main avant de le faire avec Prisma
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
