---
created: 2026-09-24
modified: 2026-09-24
type: project
status: "🔴 Not Started"
tags:
  - projet
aliases:
  - "CinéTrack-Fullstack"
---

# 🎬 CinéTrack-Fullstack

> [!abstract] Objectif
> Industrialiser CinéTrack comme un vrai projet d'entreprise : qualité, architecture documentée, CI/CD et mise en production.

**Période :** M10 → M11 de la [[Roadmap-12-mois|Roadmap 12 mois]]  
**Stack :** Monorepo (npm workspaces ou Nx), Docker multi-stage, docker compose, GitLab CI/CD, Traefik/Nginx, Playwright, Sentry, pino

---

## Jalons

### M10
- [ ] #task Monorepo front + api + package de types partagés
- [ ] #task ADR (backend, BDD, structure, auth)
- [ ] #task Diagrammes : cas d'utilisation, classes, séquence login
- [ ] #task Module favoris en architecture hexagonale
- [ ] #task 3 tests E2E Playwright + quality gate (lint, types, couverture)
- [ ] #task README et doc d'architecture

### M11
- [ ] #task Dockerfiles multi-stage (front Nginx, API Node non root)
- [ ] #task docker compose dev + prod (Traefik HTTPS, PostgreSQL, Redis)
- [ ] #task Pipeline GitLab : lint → tests (PostgreSQL service) → build images → deploy recette → prod manuelle
- [ ] #task Déploiement sur VPS ou PaaS avec HTTPS
- [ ] #task Logs JSON + requestId, Sentry front/back, healthchecks
- [ ] #task Sauvegarde quotidienne de la BDD testée

---

## Notes à mobiliser

- [[CICD-02-Pipeline-Full-Stack|Pipeline CI/CD Full Stack]]
- [[CLOUD-03-Heberger-API-BDD|Héberger une API et une Base de Données]]
- [[ARCH-12-Clean-Architecture-Hexagonale|Architecture Hexagonale et Clean Architecture]]
- [[TEST-05-Tests-E2E-Playwright|Tests End-to-End Playwright et Cypress]]

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
