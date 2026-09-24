---
created: 2026-09-24
modified: 2026-09-24
type: dashboard
tags:
  - accueil/dashboard
aliases:
  - "Tableau de bord"
  - "Dashboard"
---

# 📊 Tableau de bord

> [!info] Nécessite le plugin **Dataview** (déjà installé). Mettre à jour le champ `status` de chaque note : `🔴 Not Started` → `🟡 In Progress` → `🟢 Done`.

## Progression globale

```dataview
TABLE WITHOUT ID
  status AS "Statut",
  length(rows) AS "Notes"
FROM "00-Conception" OR "01-Methodologie" OR "02-Algorithmes-Structures-de-Donnees" OR "03-Langage" OR "04-Versionning" OR "05-Outils" OR "06-Bases-de-Donnees" OR "07-Frameworks" OR "08_Architecture" OR "09-Securite" OR "10-Tests-Qualite" OR "11-Reseaux" OR "12-Infrastructure" OR "13-Intelligence-Artificielle"
WHERE type = "knowledge"
GROUP BY status
```

## Notes du mois en cours
> Remplacer `"M01"` par le mois en cours de la [[Roadmap-12-mois|Roadmap 12 mois]].

```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  level AS "Niveau",
  status AS "Statut"
WHERE type = "knowledge" AND month = "M01"
SORT file.folder ASC, file.name ASC
```

## Avancement par mois

```dataview
TABLE WITHOUT ID
  month AS "Mois",
  length(rows) AS "Total",
  length(filter(rows, (r) => r.status = "🟢 Done")) AS "✅ Maîtrisées",
  length(filter(rows, (r) => r.status = "🟡 In Progress")) AS "🟡 En cours"
WHERE type = "knowledge" AND month
GROUP BY month
SORT month ASC
```

## En cours

```dataview
LIST
WHERE type = "knowledge" AND status = "🟡 In Progress"
SORT file.mtime DESC
```

## Récemment modifiées

```dataview
TABLE WITHOUT ID file.link AS "Note", file.mtime AS "Modifiée"
WHERE type = "knowledge"
SORT file.mtime DESC
LIMIT 10
```

## Tâches ouvertes des projets

```tasks
not done
path includes 02_Projects
group by filename
```

## Tâches ouvertes des notes en cours
```tasks
not done
path includes 07-Frameworks
limit 20
```
