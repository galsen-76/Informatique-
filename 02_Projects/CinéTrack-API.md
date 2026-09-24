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
