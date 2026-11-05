---
type: engineering
kind: architecture
project: "[[Application SaaS]]"
created: 2026-11-03
tags:
  - tech
  - demo
---
# Architecture — Application SaaS

> [!info] Vue d'ensemble
> Un front Next.js, une API NestJS, PostgreSQL pour les données, Redis pour le cache, S3 pour les fichiers.

## Schéma
```mermaid
flowchart LR
  U[Utilisateur] --> FE[Next.js]
  FE --> API[API NestJS]
  API --> DB[(PostgreSQL)]
  API --> R[(Redis)]
  API --> S3[(S3 - fichiers)]
  API --> KC[Keycloak]
```

## Composants
| Composant | Technologie | Rôle |
| --- | --- | --- |
| Frontend | Next.js | Interface |
| API | NestJS | Logique métier, auth |
| Base de données | PostgreSQL | Données |
| Cache | Redis | Sessions |
| Stockage | S3 | Fichiers |

## Décisions liées
- [[ADR-001 Stockage des fichiers sur S3]]
- [[ADR-002 Authentification JWT avec Keycloak]]
