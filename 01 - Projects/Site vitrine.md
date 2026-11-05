---
type: project
status: done
start: 2026-08-01
deadline: 2026-10-15
stack:
  - Astro
repo: "https://github.com/votre-org/site-vitrine"
tags:
  - project
  - demo
---
# Site vitrine

> [!info] En une phrase
> Site de présentation de l'offre.

## Objectifs
- Site en ligne

## Roadmap
- [x] Conception
- [x] Mise en ligne

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
- Aucun
