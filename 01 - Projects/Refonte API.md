---
type: project
status: active
start: 2026-10-01
deadline: 2027-01-31
stack:
  - NestJS
  - OpenAPI
repo: "https://github.com/votre-org/api-v2"
tags:
  - project
  - demo
---
# Refonte API

> [!info] En une phrase
> Remplacer l'API historique par une API v2 documentée et testée.

## Objectifs
- Contrat OpenAPI v2
- Migration des endpoints critiques
- Arrêt de la v1

## Roadmap
- [x] Audit de l'existant
- [ ] Architecture des services
- [ ] Migration progressive

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
- Clients non migrés à temps → période de double run
