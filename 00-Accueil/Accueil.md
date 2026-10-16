---
created: 2026-09-24
modified: 2026-10-16
type: home
tags:
  - accueil
aliases:
  - "Accueil"
  - "Home"
---

# 🏠 Accueil

```dataviewjs
await dv.view("_Systeme/boutons")
```

```dataviewjs
await dv.view("_Systeme/calendrier")
```

## ☀️ Aujourd'hui
```dataviewjs
await dv.view("_Systeme/jour", { aujourdhui: true })
```

## 📈 Ma progression
```dataviewjs
await dv.view("_Systeme/progression")
```

## 🛠️ Mes projets
```dataview
TABLE WITHOUT ID file.link AS "Projet", status AS "Statut"
FROM "02_Projects"
WHERE type = "project"
SORT status DESC, file.name ASC
```

## 📆 Mes dernières revues de semaine
```dataview
LIST FROM "01_Daily/Semaines" SORT file.name DESC LIMIT 4
```

## 📚 Domaines

| # | Domaine | Index |
|---|---|---|
| 00 | Conception | [[Conception]] |
| 01 | Méthodologie | [[Méthodologie]] |
| 02 | Algorithmes & structures de données | [[Algorithmes]] |
| 03 | Langages | [[HTML-CSS]] · [[JavaScript]] · [[TypeScript]] · [[SQL]] · [[Théorie Générale]] · [[Python]] |
| 04 | Versionning | [[Git]] · [[GitLab]] |
| 05 | Outils | [[Outils]] · [[IntelliJ IDEA]] |
| 06 | Bases de données | [[Bases de Données]] |
| 07 | Frameworks | [[Angular]] · [[Vue]] · [[Frameworks]] · [[Backend]] · [[NestJS]] · [[ORM]] |
| 08 | Architecture | [[Architecture Logicielle]] |
| 09 | Sécurité | [[Sécurité]] |
| 10 | Tests & qualité | [[Tests et Qualité]] |
| 11 | Réseaux | [[Réseaux]] |
| 12 | Infrastructure | [[Infrastructure]] · [[Docker]] |
| 13 | Intelligence artificielle | [[Intelligence Artificielle]] |

## 🧭 Repères
- [[Guide]] : la routine et les règles du coffre (à lire en premier)
- [[Methode-d-apprentissage|Méthode d'apprentissage]] et [[Methode-du-coach|Méthode du coach]] : comment apprendre
- [[Roadmap-12-mois|Roadmap 12 mois]] : le plan d'ensemble
- [[Tableau-de-bord|Tableau de bord]] : la progression détaillée par mois
- [[Conventions-du-coffre|Conventions du coffre]] : format des notes, statuts, tags, modèles
