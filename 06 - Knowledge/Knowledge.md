---
tags:
  - index
---
# Knowledge

Veille, IA, outils, apprentissages, tutoriels, références (template **Knowledge Note**).

## Ajouts récents
```dataview
LIST WITHOUT ID file.link + " · " + category
FROM "06 - Knowledge"
WHERE type = "knowledge"
SORT file.ctime DESC
LIMIT 15
```

## Par rubrique
```dataview
LIST rows.file.link
FROM "06 - Knowledge"
WHERE type = "knowledge"
GROUP BY category
```
