---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
tags:
  - backend/sql/cte
aliases:
  - "Sous-requêtes et CTE"
parent: "[[SQL]]"
children: []
related_theory:
  - "[[SQL-04-Agregation-GROUP-BY|Agrégation et GROUP BY]]"
related_snippets:
  - "[[04_Snippets/sql-05-sous-requetes-cte]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/queries-with.html"
---

# Sous-requêtes et CTE

> [!abstract] Introduction
> Une sous-requête est une requête imbriquée dans une autre ; une CTE (`WITH`) nomme une sous-requête pour rendre les requêtes complexes lisibles, étape par étape.

> [!warning]- Prérequis
> [[SQL-04-Agregation-GROUP-BY|Agrégation et GROUP BY]]

---

## Théorie

> [!question]- C'est quoi ?
> ```sql
> -- sous-requête
> SELECT titre FROM films WHERE note > (SELECT AVG(note) FROM films);
> -- CTE
> WITH moyennes AS (
>   SELECT genre, AVG(note) AS moy FROM films GROUP BY genre
> )
> SELECT f.titre, f.genre, f.note
> FROM films f JOIN moyennes m ON m.genre = f.genre
> WHERE f.note > m.moy;
> ```

> [!example]- Analogie
> Une CTE, c'est poser un calcul intermédiaire sur un brouillon et lui donner un nom, avant de l'utiliser dans le calcul final.

> [!question]- Pourquoi l'utiliser ?
> Lisibilité, réutilisation d'un résultat intermédiaire, requêtes récursives (arborescences : catégories, commentaires imbriqués).

> [!question]- Comment ça marche ?
> - Sous-requête scalaire (1 valeur), de liste (`IN (...)`), corrélée (dépend de la ligne externe), `EXISTS`
> - `WITH RECURSIVE` pour parcourir des hiérarchies
> - `EXISTS` est souvent plus efficace que `IN` sur de gros volumes

> [!question]- Quand l'utiliser ?
> Requêtes de reporting à plusieurs étapes, hiérarchies.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Sous-requêtes corrélées exécutées par ligne → potentiellement lentes (vérifier EXPLAIN).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Sous-requête | Requête imbriquée |
| CTE | Common Table Expression, sous-requête nommée |
| Corrélée | Qui référence la requête externe |
| `EXISTS` | Vrai si la sous-requête renvoie au moins une ligne |

---

## Points clés

- CTE pour découper une requête complexe
- `NOT EXISTS` pour « ceux qui n'ont pas »
- `WITH RECURSIVE` pour les arbres

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `NOT IN` avec une sous-requête contenant NULL → aucun résultat

---

## Exemple minimal

```sql
SELECT u.email FROM users u
WHERE NOT EXISTS (SELECT 1 FROM favoris fav WHERE fav.user_id = u.id);
```

> [!note] Ce que j'en retiens
> Les utilisateurs sans favori, sans piège des NULL.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir réécrire une sous-requête corrélée en jointure pour la performance

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[SQL]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sql-05-sous-requetes-cte]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `NOT IN` peut-il renvoyer 0 ligne de façon inattendue ?

---

## Tâches

- [ ] #task Écrire une requête récursive pour des commentaires imbriqués
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
