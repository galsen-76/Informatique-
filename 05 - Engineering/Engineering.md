---
tags:
  - index
---
# Engineering

| Dossier | Contenu |
| --- | --- |
| Architecture | Vues d'ensemble et schémas |
| Backend · Frontend · Database · DevOps | Notes techniques |
| API | Contrats et endpoints |
| Debugging | Enquêtes de bugs |
| Snippets | Code réutilisable |
| ADR | Décisions d'architecture |

## Décisions (ADR)
```dataview
LIST WITHOUT ID file.link + " · " + status + choice(project, " · " + project, "")
FROM "05 - Engineering/ADR"
SORT file.name DESC
```

## Par dossier
```dataview
LIST rows.file.link
FROM "05 - Engineering"
WHERE type = "engineering"
GROUP BY file.folder
```
