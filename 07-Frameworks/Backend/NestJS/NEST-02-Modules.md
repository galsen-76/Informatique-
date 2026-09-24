---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M08
tags:
  - backend/nestjs/modules
aliases:
  - "Modules NestJS"
parent: "[[NestJS]]"
children: []
related_theory:
  - "[[NEST-01-Fondamentaux|Fondamentaux NestJS]]"
related_snippets:
  - "[[04_Snippets/nest-02-modules]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.nestjs.com/modules"
---

# Modules NestJS

> [!abstract] Introduction
> Un module Nest regroupe les controllers et providers d'un domaine fonctionnel et déclare ce qu'il expose aux autres modules — l'équivalent backend d'un NgModule.

> [!warning]- Prérequis
> [[NEST-01-Fondamentaux|Fondamentaux NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> @Module({
>   imports: [PrismaModule, UsersModule],     // modules dont on a besoin
>   controllers: [FilmsController],
>   providers: [FilmsService],
>   exports: [FilmsService],                  // utilisable par les modules qui importent FilmsModule
> })
> export class FilmsModule {}
> ```

> [!example]- Analogie
> Chaque module est un département d'entreprise : il a ses employés (providers), son guichet (controller), et ne prête un employé à un autre département que s'il l'a officiellement « détaché » (exports).

> [!question]- Pourquoi l'utiliser ?
> Découper l'application par domaine (films, users, auth), maîtriser les dépendances, préparer un éventuel découpage en microservices.

> [!question]- Comment ça marche ?
> - Les providers sont **privés** au module sauf s'ils sont dans `exports`
> - Les providers sont singletons au sein de l'application (par défaut)
> - `@Global()` : module disponible partout sans import (à réserver à la config, prisma…)
> - Modules dynamiques : `ConfigModule.forRoot()`, `JwtModule.registerAsync()`

> [!question]- Quand l'utiliser ?
> Un module par domaine métier + modules techniques (Prisma, Config, Auth).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Imports circulaires (A importe B qui importe A) → `forwardRef()` = symptôme d'un mauvais découpage.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `imports` | Modules dont celui-ci dépend |
| `exports` | Providers rendus visibles aux importateurs |
| Module dynamique | Module configurable (`forRoot`) |
| Module global | Disponible partout sans import |

---

## Points clés

- Un module = un domaine
- Exporter explicitement ce qui est partagé
- Modules techniques globaux avec parcimonie

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - « Nest can't resolve dependencies of X » → provider non exporté/importé
> - Tout mettre dans AppModule

---

## Exemple minimal

```typescript
@Global()
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}
```

> [!note] Ce que j'en retiens
> Le client BDD, utilisé partout, est un bon candidat au module global.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Concevoir des frontières de modules alignées sur les bounded contexts (DDD)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[NestJS]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-13-Modules-NgModules|Modules (NgModules) Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/nest-02-modules]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi l'erreur « can't resolve dependencies » apparaît-elle ?

---

## Tâches

- [ ] #task Créer les modules films, users, auth et prisma
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
