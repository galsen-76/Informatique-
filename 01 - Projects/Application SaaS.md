---
type: project
status: active
start: 2026-09-01
deadline: 2026-12-15
stack:
  - Next.js
  - NestJS
  - PostgreSQL
  - Docker
repo: "https://github.com/votre-org/saas-platform"
tags:
  - project
  - demo
---
# Application SaaS

> [!info] En une phrase
> Application SaaS de gestion de projets pour PME — MVP en production avant mi-décembre.

## Objectifs
- Authentification et gestion des rôles
- Paiement en ligne
- MVP en production

## Roadmap
- [x] Cadrage & architecture → [[Architecture - Application SaaS]]
- [x] Socle Docker + CI/CD
- [ ] MVP (auth, rôles, paiement)
- [ ] Recette & mise en production

## Tâches
```dataviewjs
await dv.view("07 - Resources/Scripts/workspace", { view: "board" })
```

## Journal
```dataviewjs
await dv.view("07 - Resources/Scripts/workspace", { view: "project-log" })
```

## Réunions
```dataview
LIST WITHOUT ID file.link + " · " + dateformat(date, "dd/MM/yyyy")
FROM "04 - Meetings"
WHERE type = "meeting" AND project = this.file.link
SORT date DESC
```

## Documentation & décisions
```dataview
LIST WITHOUT ID file.link + " · " + kind
FROM "05 - Engineering"
WHERE type = "engineering" AND project = this.file.link
SORT kind ASC
```

## Risques
- Le retard sur l'auth bloque les rôles → découper en deux PR
- Coût du stockage → [[ADR-001 Stockage des fichiers sur S3]]
