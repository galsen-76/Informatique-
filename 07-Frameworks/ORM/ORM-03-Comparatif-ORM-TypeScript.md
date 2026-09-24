---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/orm/comparatif
aliases:
  - "Comparatif ORM TypeScript"
parent: "[[ORM]]"
children: []
related_theory:
  - "[[BDD-08-ORM-Concepts-N-plus-1|ORM Concepts et Problème N+1]]"
related_snippets:
  - "[[04_Snippets/orm-03-comparatif-orm-typescript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://orm.drizzle.team"
---

# Comparatif ORM TypeScript

> [!abstract] Introduction
> Panorama des outils d'accès aux données en TypeScript (Prisma, TypeORM, Drizzle, MikroORM, Kysely) pour savoir lire un projet existant et argumenter un choix.

> [!warning]- Prérequis
> [[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]]

---

## Théorie

> [!question]- C'est quoi ?
> | Outil | Style | Points forts | Points faibles |
> |---|---|---|---|
> | Prisma | Schéma dédié + client généré | DX, types, migrations | SQL moins contrôlable |
> | TypeORM | Entités décorées (≈ JPA/Hibernate) | Historique Nest, familier Java | Bugs/typage plus faibles |
> | Drizzle | Schéma en TS, proche du SQL | Léger, SQL-like, performant | Plus bas niveau |
> | MikroORM | Unit of Work, Data Mapper | Modèle DDD riche | Moins répandu |
> | Kysely | Query builder typé | Contrôle total du SQL | Pas d'ORM (pas de relations auto) |

> [!example]- Analogie
> ORM = boîte automatique (confort), query builder = boîte manuelle (contrôle), SQL brut = conduire la moto sans aides.

> [!question]- Pourquoi l'utiliser ?
> En entreprise, tu hériteras souvent d'un choix existant (TypeORM est très présent dans les vieux projets Nest).

> [!question]- Comment ça marche ?
> Critères : typage, migrations, performance, contrôle du SQL, écosystème, compétence de l'équipe.
> Patterns : **Active Record** (l'entité se sauvegarde elle-même : `film.save()`) vs **Data Mapper** (un repository sauvegarde l'entité).

> [!question]- Quand l'utiliser ?
> Nouveau projet Nest : Prisma ou Drizzle. Équipe venant de Java : TypeORM/MikroORM paraîtront familiers.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Aucun ORM ne dispense de connaître SQL, les index et les transactions.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Active Record | L'objet porte ses propres méthodes de persistance |
| Data Mapper | Un repository persiste des objets simples |
| Query builder | API pour construire du SQL typé |
| Unit of Work | Regroupe les changements et les écrit en une transaction |

---

## Points clés

- Connaître SQL avant l'ORM
- Choisir selon l'équipe et l'existant
- Savoir lire le SQL généré

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Changer d'ORM en cours de projet sans raison forte

---

## Exemple minimal

```typescript
// Drizzle : très proche du SQL
const res = await db.select({ id: films.id, titre: films.titre })
  .from(films).where(gte(films.annee, 2000)).orderBy(desc(films.annee)).limit(20);
```

> [!note] Ce que j'en retiens
> Même requête qu'en Prisma, style plus proche du SQL.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Argumenter Active Record vs Data Mapper selon la complexité du domaine

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[ORM]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/orm-03-comparatif-orm-typescript]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre Active Record et Data Mapper ?

---

## Tâches

- [ ] #task Refaire une requête CinéTrack en Drizzle pour comparer
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
