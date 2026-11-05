---
tags:
  - index
---
# Cours

Un dossier par module du [[Parcours]], un cours par chapitre (template **Cours**).

```dataview
LIST rows.file.link
FROM "02 — Cours"
WHERE type = "course"
GROUP BY module
```
