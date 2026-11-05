---
tags:
  - index
---
# Exercices et projets

Statuts : `a-faire` · `en-cours` · `reussi` (templates **Exercice** et **Projet**).

## En cours et à faire
```dataview
LIST WITHOUT ID file.link + " · " + status + " · " + difficulty
FROM "07 — Exercices et projets"
WHERE (type = "exercise" OR type = "project") AND status != "reussi"
SORT status DESC
```

## Réussis
```dataview
LIST
FROM "07 — Exercices et projets"
WHERE (type = "exercise" OR type = "project") AND status = "reussi"
```
