---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/nestjs/prisma
aliases:
  - "Prisma avec NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]]"
  - "[[ORM-02-Prisma-Client-Requetes-Relations|Prisma Client Requêtes et Relations]]"
related_snippets:
  - "[[04_Snippets/nest-09-prisma-base-de-donnees]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/recipes/prisma"
---

# Prisma avec NestJS

> [!abstract] Introduction
> Brancher Prisma dans NestJS : un `PrismaService` injectable, utilisé par les services métier (ou des repositories) pour lire et écrire en base PostgreSQL de façon typée.

> [!warning]- Prérequis
> [[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]], [[NEST-04-Providers-DI|Providers et Injection de Dépendances NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @Injectable()
> export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
>   async onModuleInit() { await this.$connect(); }
>   async onModuleDestroy() { await this.$disconnect(); }
> }
> @Injectable()
> export class FilmsService {
>   constructor(private prisma: PrismaService) {}
>   lister({ q, page, taille }: FiltresFilmsDto) {
>     return this.prisma.film.findMany({
>       where: q ? { titre: { contains: q, mode: 'insensitive' } } : undefined,
>       orderBy: { annee: 'desc' },
>       skip: (page - 1) * taille, take: taille,
>       select: { id: true, titre: true, annee: true },
>     });
>   }
> }
> ```

> [!example]- Analogie
> PrismaService est l'unique guichet vers les archives (la BDD) ; les services métier y déposent leurs demandes au lieu d'aller fouiller eux-mêmes dans les rayonnages.

> [!question]- Pourquoi l'utiliser ?
> Requêtes typées à partir du schéma, une seule connexion (pool) partagée, services testables (on mocke PrismaService ou on utilise une BDD de test).

> [!question]- Comment ça marche ?
> - `PrismaModule` global exportant `PrismaService`
> - Transactions : `this.prisma.$transaction([...])` ou interactive `$transaction(async tx => {...})`
> - Option « repository » : `FilmsRepository` qui encapsule Prisma → le service ne dépend plus de l'ORM (architecture hexagonale)

> [!question]- Quand l'utiliser ?
> Toute API Nest + base relationnelle. Alternatives : TypeORM, MikroORM, Drizzle (voir [[ORM-03-Comparatif-ORM-TypeScript|Comparatif ORM TypeScript]]).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Requêtes très complexes (reporting, window functions) → `$queryRaw` avec paramètres (jamais de concaténation).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Pool de connexions | Ensemble de connexions BDD réutilisées |
| Repository | Classe qui encapsule l'accès aux données d'un agrégat |
| Transaction | Groupe d'opérations tout-ou-rien |

---

## Points clés

- Un seul PrismaClient pour toute l'app
- `select` pour ne renvoyer que le nécessaire
- Pagination systématique
- Transactions pour les écritures multiples liées

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Instancier `new PrismaClient()` dans chaque service → épuisement des connexions
> - Problème N+1 : boucles de requêtes au lieu d'`include`
> - Oublier les index sur les colonnes filtrées

---

## Exemple minimal

```typescript
async ajouterFavori(userId: number, filmId: number) {
  return this.prisma.$transaction(async (tx) => {
    const film = await tx.film.findUniqueOrThrow({ where: { id: filmId } });
    await tx.favori.create({ data: { userId, filmId: film.id } });
    return tx.user.update({ where: { id: userId }, data: { nbFavoris: { increment: 1 } } });
  });
}
```

> [!note] Ce que j'en retiens
> Tout ou rien : si une étape échoue, rien n'est écrit.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Tests d'intégration sur une vraie BDD (Testcontainers)
> - Surveiller les requêtes lentes (logs Prisma, `EXPLAIN`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ARCH-03-Architecture-en-Couches|Architecture en Couches]]

**Pratique :**
- Extrait de code → [[04_Snippets/nest-09-prisma-base-de-donnees]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un seul PrismaClient ?

---

## Tâches

- [ ] #task Brancher Prisma sur l'API CinéTrack avec PostgreSQL en Docker
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
