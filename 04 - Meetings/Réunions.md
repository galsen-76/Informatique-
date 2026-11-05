---
tags:
  - index
---
# Réunions

Une réunion = une note `AAAA-MM-JJ Sujet` (template **Meeting**). Participants en liens (`[[Alice]]`) : la réunion apparaît alors sur leur fiche.

## À venir
```dataview
LIST WITHOUT ID file.link + " · " + dateformat(date, "dd/MM HH:mm") + choice(project, " · " + project, "")
FROM "04 - Meetings"
WHERE type = "meeting" AND date >= date(now)
SORT date ASC
```

## Passées
```dataview
LIST WITHOUT ID file.link + " · " + dateformat(date, "dd/MM") + choice(project, " · " + project, "")
FROM "04 - Meetings"
WHERE type = "meeting" AND date < date(now)
SORT date DESC
LIMIT 20
```

## Par projet
```dataview
LIST rows.file.link
FROM "04 - Meetings"
WHERE type = "meeting"
GROUP BY project
```
