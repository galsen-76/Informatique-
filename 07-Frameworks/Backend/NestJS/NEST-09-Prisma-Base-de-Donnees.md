---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/nestjs/prisma
aliases:
  - "Prisma avec NestJS"
parent: "[[NestJS]]"
related_theory:
  - "[[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]]"
  - "[[ORM-02-Prisma-Client-Requetes-Relations|Prisma Client Requêtes et Relations]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/recipes/prisma"
---

# Prisma et Base de Données NestJS

> [!abstract] En bref
> Comment brancher **Prisma** (l'outil qui parle à PostgreSQL) dans NestJS : un `PrismaService` injectable, utilisé par tes services pour lire et écrire. Le schéma et les requêtes Prisma sont détaillés dans [[ORM-01-Prisma-Schema-Migrations|Schéma et migrations]] et [[ORM-02-Prisma-Client-Requetes-Relations|Requêtes]].

## Le service Prisma

```ts
// database/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() { await this.$connect(); }       // connexion au démarrage
  async onModuleDestroy() { await this.$disconnect(); } // fermeture propre
}
```

```ts
// database/prisma.module.ts
@Global()
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}
```

Importé une fois dans `AppModule`, il est disponible partout.

## L'utiliser dans un service

```ts
@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { movie: true },            // avec les infos du film
      orderBy: { createdAt: 'desc' },
    });
  }

  add(userId: number, movieId: number) {
    return this.prisma.favorite.upsert({   // pas de doublon
      where: { userId_movieId: { userId, movieId } },
      create: { userId, movieId },
      update: {},
    });
  }

  remove(userId: number, movieId: number) {
    return this.prisma.favorite.delete({ where: { userId_movieId: { userId, movieId } } });
  }
}
```

## Plusieurs écritures qui doivent réussir ensemble : la transaction

```ts
await this.prisma.$transaction(async (tx) => {
  const review = await tx.review.create({ data: { userId, movieId, rating, comment } });
  await tx.movie.update({
    where: { id: movieId },
    data: { reviewCount: { increment: 1 } },
  });
  return review;
});
```

Si la deuxième écriture échoue, la première est **annulée**. Voir [[BDD-03-Transactions-ACID|Transactions]].

## Un repository : quand ?

Au début, les services utilisent Prisma directement : c'est simple. Quand un service devient gros, ou que tu veux pouvoir tester sans base, tu déplaces les requêtes dans un `movies.repository.ts`. Voir [[ARCH-03-Architecture-en-Couches|Architecture en couches]].

## Lancer une base en local

```bash
docker run --name cinetrack-db -e POSTGRES_USER=cinetrack -e POSTGRES_PASSWORD=motdepasse \
  -e POSTGRES_DB=cinetrack -p 5432:5432 -d postgres:17
```

Puis `npx prisma migrate dev` pour créer les tables.

## Pièges

- **Créer un `new PrismaClient()` dans chaque service** : trop de connexions ouvertes. Un seul `PrismaService`.
- **Renvoyer directement l'utilisateur de la base** : son mot de passe haché part dans la réponse. Utilise `select` / `omit`.
- **Requêtes dans une boucle** (`for (const f of favs) await prisma.movie.findUnique(…)`) : le problème « N+1 », voir [[BDD-08-ORM-Concepts-N-plus-1|N+1]]. Utilise `include`.
