---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M10
tags:
  - backend/sql/window
aliases:
  - "Window Functions SQL"
parent: "[[SQL]]"
children: []
related_theory:
  - "[[SQL-04-Agregation-GROUP-BY|Agrégation et GROUP BY]]"
related_snippets:
  - "[[04_Snippets/sql-08-window-functions]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/tutorial-window.html"
---

# Window Functions SQL

> [!abstract] Introduction
> Les fonctions de fenêtre calculent des valeurs sur un ensemble de lignes liées (classement, cumul, comparaison avec la ligne précédente) SANS regrouper les lignes comme le fait GROUP BY.

> [!warning]- Prérequis
> [[SQL-04-Agregation-GROUP-BY|Agrégation et GROUP BY]]

---

## Théorie

> [!question]- C'est quoi ?
> ```sql
> SELECT titre, genre, note,
>        RANK() OVER (PARTITION BY genre ORDER BY note DESC) AS rang_dans_genre,
>        AVG(note) OVER (PARTITION BY genre) AS moyenne_genre
> FROM films;
> ```

> [!example]- Analogie
> GROUP BY fusionne les élèves d'une classe en une seule ligne « moyenne » ; une window function garde chaque élève et écrit à côté son rang et la moyenne de sa classe.

> [!question]- Pourquoi l'utiliser ?
> Classements (top 3 par catégorie), cumuls, évolutions (vs mois précédent) : impossibles ou très lourds autrement.

> [!question]- Comment ça marche ?
> `fonction() OVER (PARTITION BY … ORDER BY … ROWS BETWEEN …)`
> Fonctions : `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`, `LEAD`, `SUM() OVER`, `NTILE`.

> [!question]- Quand l'utiliser ?
> Reporting, tableaux de bord, dédoublonnage (garder la dernière version par clé).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Non accessible dans le WHERE directement → CTE puis filtre.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Fenêtre | Ensemble de lignes considérées pour le calcul |
| PARTITION BY | Découpe en groupes sans fusionner |
| LAG / LEAD | Valeur de la ligne précédente / suivante |

---

## Points clés

- Les lignes sont conservées
- PARTITION BY ≈ GROUP BY sans fusion
- Filtrer via CTE

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Confondre RANK (trous) et DENSE_RANK (sans trou)

---

## Exemple minimal

```sql
WITH classes AS (
  SELECT titre, genre, note, ROW_NUMBER() OVER (PARTITION BY genre ORDER BY note DESC) AS rn
  FROM films
)
SELECT * FROM classes WHERE rn <= 3;
```

> [!note] Ce que j'en retiens
> Le top 3 de chaque genre en une requête.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Optimiser les fenêtres avec des index adaptés à l'ORDER BY

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[SQL]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sql-08-window-functions]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Différence entre ROW_NUMBER, RANK et DENSE_RANK ?

---

## Tâches

- [ ] #task Top 3 des films par genre dans l'API (via `$queryRaw`)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
