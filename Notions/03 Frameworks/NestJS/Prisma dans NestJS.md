---
type: notion
statut: a apprendre
resume: "Comment brancher Prisma (l'outil qui parle à PostgreSQL) dans NestJS : un PrismaService injectable, utilisé par tes services pour lire et écrire."
revu:
sources:
  - "https://docs.nestjs.com/recipes/prisma"
---
# Prisma dans NestJS

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Comment brancher **Prisma** (l'outil qui parle à PostgreSQL) dans NestJS : un `PrismaService` injectable, utilisé par tes services pour lire et écrire.

## Le problème

**Pourquoi c'est utile ?**
Pour brancher la base de données dans NestJS via un service injectable.

**Qu'est-ce qui se passait sans ça ?**
Chaque service ouvrait sa propre connexion à la base, avec des connexions qui s'accumulaient.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Le schéma et les requêtes Prisma sont détaillés dans [[Prisma schéma et migrations|Schéma et migrations]] et [[Prisma Client requêtes et relations|Requêtes]].

### Le service Prisma

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

### Plusieurs écritures qui doivent réussir ensemble : la transaction

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

Si la deuxième écriture échoue, la première est **annulée**. Voir [[Transactions et ACID|Transactions]].

### Un repository : quand ?

Au début, les services utilisent Prisma directement : c'est simple. Quand un service devient gros, ou que tu veux pouvoir tester sans base, tu déplaces les requêtes dans un `movies.repository.ts`. Voir [[MVC et architecture en couches|Architecture en couches]].

### Lancer une base en local

```bash
docker run --name cinetrack-db -e POSTGRES_USER=cinetrack -e POSTGRES_PASSWORD=motdepasse \
  -e POSTGRES_DB=cinetrack -p 5432:5432 -d postgres:17
```

Puis `npx prisma migrate dev` pour créer les tables.

## 🧪 Exemple

### L'utiliser dans un service

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

## ⚠️ Limites et pièges

- **Créer un `new PrismaClient()` dans chaque service** : trop de connexions ouvertes. Un seul `PrismaService`.
- **Renvoyer directement l'utilisateur de la base** : son mot de passe haché part dans la réponse. Utilise `select` / `omit`.
- **Requêtes dans une boucle** (`for (const f of favs) await prisma.movie.findUnique(…)`) : le problème « N+1 », voir [[ORM et problème N+1|N+1]]. Utilise `include`.

## 🔗 Liens

- **Prérequis :** [[Fondamentaux NestJS]]
- **Voir aussi :** [[Prisma schéma et migrations]], [[Prisma Client requêtes et relations]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.nestjs.com/recipes/prisma
