---
type: module
order: 14
title: "DevOps et déploiement"
prerequisites:
  - "[[Module 03 - Git et GitHub]]"
  - "[[Module 12 - Tests]]"
  - "[[Module 13 - Docker]]"
why: "Automatiser tests et mise en ligne : il faut Git (déclencheur), des tests et des images Docker."
tags:
  - module
---
# 14 · DevOps et déploiement

> [!tip] Pourquoi à cette place dans le parcours
> Automatiser tests et mise en ligne : il faut Git (déclencheur), des tests et des images Docker.

## Objectifs
- Écrire des pipelines GitLab CI complètes (lint, tests, build, déploiement)
- Construire et publier des images dans un registre (Nexus)
- Gérer plusieurs environnements et le retour arrière
- Superviser une application en production

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "module" })
```
