---
tags:
  - index
---
# Exercices et projets

Statuts : `a-faire` · `en-cours` · `reussi` (templates **Exercice** et **Projet**).

Les exercices écrits sont archivés (« 99 — Archives/Anciens exercices »). On pratique maintenant avec les **exercices visuels** de chaque fiche (section 3) et le **fil rouge** de son niveau ([[Niveaux]]). Les projets de travail (CVAT) sont dans [[Hors parcours]].

## Fil rouge, par niveau
```dataview
TABLE WITHOUT ID file.link AS Étape, niveau AS Niveau, status AS Statut
FROM "07 — Exercices et projets"
WHERE type = "exercise" AND niveau != null
SORT niveau ASC, file.name ASC
```

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
