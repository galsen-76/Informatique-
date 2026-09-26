---
created: 2026-09-24
modified: 2026-09-24
type: project
status: "🔴 Not Started"
tags:
  - projet
aliases:
  - "CinéTrack-API"
---

## Prérequis

> [!warning] Avant de démarrer
> Comprendre le web côté serveur : HTTP, bases de données, SQL.

**À maîtriser avant de commencer :**
- [[NET-05-HTTP-Approfondi|HTTP Approfondi]]
- [[ARCH-04-API-REST-Design|Conception d'API REST]]
- [[SQL-01-Fondamentaux-SELECT|Fondamentaux SQL SELECT]]
- [[SQL-03-Jointures|Jointures SQL]]
- [[SQL-04-Agregation-GROUP-BY|Agrégation et GROUP BY]]
- [[BDD-01-Fondamentaux-SGBD|Fondamentaux des Bases de Données]]
- [[CONC-07-Modelisation-Donnees-MCD-MLD|Modélisation des Données MCD MLD]]
- [[TS-14-Decorators|Decorators]]
- [[ANG-05-Services-DI|Services & Injection de Dépendances (DI) Angular]]

**À apprendre pendant le projet :**
- [[BACK-00-Choisir-son-Backend|Choisir son Backend]]
- [[NODE-01-Node-npm|Node.js et npm]]
- [[NODE-02-Express-Middleware|Express et Middleware]]
- [[NEST-01-Fondamentaux|Fondamentaux NestJS]]
- [[NEST-02-Modules|Modules NestJS]]
- [[NEST-03-Controllers|Controllers NestJS]]
- [[NEST-04-Providers-DI|Providers et Injection de Dépendances NestJS]]
- [[NEST-05-DTO-Validation-Pipes|DTO et Validation NestJS]]
- [[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]]
- [[NEST-09-Prisma-Base-de-Donnees|Prisma avec NestJS]]
- [[NEST-10-Authentification-JWT|Authentification JWT NestJS]]
- [[SEC-02-OWASP-Top-10|Vulnérabilités OWASP Top 10]]
- [[NEST-11-Tests-NestJS|Tests NestJS]]

**Architecture :**
- [[ARCH-03-Architecture-en-Couches|Architecture en Couches (Layered)]]
- [[BDD-03-Transactions-ACID|Transactions et ACID]]
- [[BDD-04-Indexation-Performance|Indexation et Performance SQL]]

---

# 🎬 CinéTrack-API

> [!abstract] Objectif
> Le back-end de CinéTrack : utilisateurs, films, critiques, favoris, authentification et rôles — consommé par les fronts Angular ET Vue.

**Période :** M07 → M09 de la [[Roadmap-12-mois|Roadmap 12 mois]]  
**Stack :** Node.js, NestJS, Prisma, PostgreSQL, Redis, class-validator, JWT/argon2, Swagger, Jest/Vitest + Supertest

---

## Jalons

### M07
- [ ] #task MCD/MLD + diagramme erDiagram
- [ ] #task PostgreSQL en Docker + requêtes SQL à la main
- [ ] #task Mini-API Express en mémoire (comprendre ce que Nest abstrait)
- [ ] #task Collection Bruno/`.http`

### M08
- [ ] #task `nest new` + modules films, users, critiques, favoris, prisma
- [ ] #task Schéma Prisma, migrations, seed
- [ ] #task DTO validés, pagination, filtres, tri en liste blanche
- [ ] #task Filtre d'exceptions Prisma, logs
- [ ] #task Front Angular branché sur l'API (proxy de dev)

### M09
- [ ] #task Inscription/connexion (argon2, JWT court + refresh cookie HttpOnly)
- [ ] #task Guard global + `@Public()` + `@Roles()` + vérification de propriété
- [ ] #task Rate limiting, Helmet, CORS strict
- [ ] #task Swagger + client TypeScript généré pour les fronts
- [ ] #task Cache Redis des films populaires, queue d'emails
- [ ] #task Tests e2e (auth, droits 401/403, validation 400)
- [ ] #task Front Vue branché sur l'auth

---

## Notes à mobiliser

- [[BACK-00-Choisir-son-Backend|Choisir son Backend]]
- [[NEST-01-Fondamentaux|Fondamentaux NestJS]]
- [[ORM-01-Prisma-Schema-Migrations|Prisma Schéma et Migrations]]
- [[NEST-10-Authentification-JWT|Authentification JWT NestJS]]
- [[SEC-02-OWASP-Top-10|Vulnérabilités OWASP Top 10]]

---

## Définition de « terminé »

- Code sur GitLab, MR relues (par toi-même au minimum), pipeline vert
- README : objectif, captures, démarrage en 5 minutes, choix techniques
- Tests sur la logique importante
- Accessible et responsive (pour les fronts)

---

## Journal

- 2026-09-24 : projet créé

## Notes libres

- ?
