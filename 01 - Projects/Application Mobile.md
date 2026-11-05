---
type: project
status: paused
start: 2026-10-15
deadline: 2027-03-31
stack:
  - React Native
repo: "https://github.com/votre-org/mobile-app"
tags:
  - project
  - demo
---
# Application Mobile

> [!info] En une phrase
> Client mobile de l'Application SaaS — en pause en attendant l'API v2.

## Objectifs
- Connexion
- Consultation hors-ligne

## Roadmap
- [x] Maquettes
- [ ] Reprise après la Refonte API

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
- Dépend entièrement de la [[Refonte API]]
