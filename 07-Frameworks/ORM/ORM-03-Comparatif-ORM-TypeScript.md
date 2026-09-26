---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/orm/comparatif
aliases:
  - "Comparatif ORM TypeScript"
parent: "[[ORM]]"
related_theory:
  - "[[BDD-08-ORM-Concepts-N-plus-1|ORM Concepts et Problème N+1]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://orm.drizzle.team"
---

# Comparatif ORM TypeScript

> [!abstract] En bref
> Un **ORM** fait le lien entre ta base SQL et ton code TypeScript : tu manipules des objets, il écrit le SQL. Prisma est ton choix principal, mais tu croiseras d'autres outils dans les projets existants. Cette note t'aide à les **reconnaître** et à **justifier** un choix.

## Les principaux

| Outil | Style | Le reconnaître | Points forts | Points faibles |
|---|---|---|---|---|
| **Prisma** | schéma dans un fichier `.prisma` | `prisma.user.findMany()` | typage excellent, simple, migrations incluses | SQL très avancé moins naturel |
| **TypeORM** | classes décorées | `@Entity()`, `@Column()`, `repository.find()` | ressemble à Java / Spring, très répandu avec NestJS | typage moins sûr, pièges connus |
| **Drizzle** | schéma en TypeScript, proche du SQL | `db.select().from(users).where(eq(users.id, 1))` | léger, rapide, proche du SQL | plus jeune |
| **MikroORM** | classes décorées | `em.find(User, …)` | modèle riche, unité de travail | plus complexe |
| **Kysely** | générateur de requêtes typé | `db.selectFrom('user').selectAll()` | SQL typé, aucune magie | pas un ORM complet |
| SQL brut (`pg`) | requêtes écrites à la main | `pool.query('SELECT …')` | contrôle total | pas de typage, tout à la main |

## Le même besoin, trois écritures

```ts
// Prisma
await prisma.review.findMany({ where: { movieId: 42 }, include: { user: true } });

// TypeORM
await reviewRepo.find({ where: { movieId: 42 }, relations: { user: true } });

// Drizzle
await db.select().from(reviews).innerJoin(users, eq(reviews.userId, users.id)).where(eq(reviews.movieId, 42));
```

## Comment choisir

| Situation | Choix |
|---|---|
| nouveau projet, priorité à la simplicité et au typage | **Prisma** |
| tu veux rester proche du SQL, projet léger | Drizzle |
| projet NestJS existant en TypeORM | TypeORM (suis l'existant) |
| requêtes SQL très complexes (rapports, statistiques) | SQL brut ou Kysely, **en plus** de l'ORM |

**Quel que soit l'ORM, connaître le SQL reste indispensable** : pour comprendre ce qui est exécuté, écrire les requêtes complexes et déboguer les lenteurs. Voir [[SQL-01-Fondamentaux-SELECT|SQL]].

## Pièges

- **Changer d'ORM en cours de projet** « parce qu'un autre est à la mode » : coût énorme, gain faible.
- **Croire que l'ORM dispense de réfléchir aux index et aux jointures** : les lenteurs viennent de la base, pas de l'ORM.
