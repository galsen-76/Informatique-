---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - backend/sql/group-by
aliases:
  - "Agrégation et GROUP BY"
parent: "[[SQL]]"
children: []
related_theory:
  - "[[SQL-03-Jointures|Jointures SQL]]"
related_snippets:
  - "[[04_Snippets/sql-04-agregation-group-by]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/tutorial-agg.html"
---

# Agrégation et GROUP BY

> [!abstract] Introduction
> Les fonctions d'agrégation (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) calculent une valeur sur un groupe de lignes ; `GROUP BY` définit les groupes, `HAVING` filtre les groupes.

> [!warning]- Prérequis
> [[SQL-03-Jointures|Jointures SQL]]

---

## Théorie

> [!question]- C'est quoi ?
> ```sql
> SELECT genre, COUNT(*) AS nb, ROUND(AVG(note), 1) AS moyenne
> FROM films
> GROUP BY genre
> HAVING COUNT(*) >= 5
> ORDER BY moyenne DESC;
> ```

> [!example]- Analogie
> Trier des copies d'examen par classe (GROUP BY), calculer la moyenne de chaque classe (AVG), ne garder que les classes de plus de 5 élèves (HAVING).

> [!question]- Pourquoi l'utiliser ?
> Statistiques, tableaux de bord, compteurs (nombre de favoris, notes moyennes).

> [!question]- Comment ça marche ?
> - Chaque colonne du SELECT doit être agrégée OU présente dans le GROUP BY
> - `WHERE` filtre les lignes AVANT regroupement, `HAVING` filtre les groupes APRÈS
> - `COUNT(*)` compte les lignes, `COUNT(col)` ignore les NULL, `COUNT(DISTINCT col)`
> - PostgreSQL : `FILTER (WHERE …)` pour des agrégats conditionnels

> [!question]- Quand l'utiliser ?
> Reporting, compteurs, classements.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Calculer des agrégats à chaque affichage sur des tables énormes coûte cher → vues matérialisées ou compteurs dénormalisés.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Agrégat | Fonction qui résume plusieurs lignes |
| Groupe | Ensemble de lignes partageant les mêmes valeurs de regroupement |
| HAVING | Filtre sur les groupes |

---

## Points clés

- WHERE avant, HAVING après
- Colonnes non agrégées dans le GROUP BY
- `COUNT(col)` ignore NULL

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mettre une condition sur agrégat dans le WHERE (erreur)
> - AVG sur des entiers dans certains SGBD → division entière

---

## Exemple minimal

```sql
SELECT date_trunc('month', created_at) AS mois,
       COUNT(*) AS inscriptions,
       COUNT(*) FILTER (WHERE role = 'ADMIN') AS admins
FROM users
GROUP BY mois ORDER BY mois;
```

> [!note] Ce que j'en retiens
> Un tableau de bord mensuel en une requête.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - GROUPING SETS / ROLLUP pour les sous-totaux

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[SQL]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sql-04-agregation-group-by]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `WHERE COUNT(*) > 5` est-il invalide ?

---

## Tâches

- [ ] #task Écrire les requêtes du futur tableau de bord admin de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
