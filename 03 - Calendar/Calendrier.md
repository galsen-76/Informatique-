---
cssclasses:
  - dw-wide
tags:
  - index
---
# Calendrier

```dataviewjs
await dv.view("07 - Resources/Scripts/workspace", { view: "calendar" })
```

## Notes du jour récentes
```dataview
LIST
FROM "03 - Calendar/Daily"
WHERE type = "daily"
SORT date DESC
LIMIT 7
```

## Revues de la semaine
```dataview
LIST
FROM "03 - Calendar/Weekly"
WHERE type = "weekly"
SORT week DESC
LIMIT 6
```

> [!warning] Agenda externe
> Pas de synchronisation Google Calendar / Outlook (voir le [[Guide]]).
