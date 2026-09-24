---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - backend/sql/where
aliases:
  - "Filtrer Trier et Paginer en SQL"
parent: "[[SQL]]"
children: []
related_theory:
  - "[[SQL-01-Fondamentaux-SELECT|Fondamentaux SQL SELECT]]"
related_snippets:
  - "[[04_Snippets/sql-02-filtrer-trier-paginer]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/functions-comparison.html"
---

# Filtrer Trier et Paginer en SQL

> [!abstract] Introduction
> `WHERE` filtre les lignes avec des conditions, `ORDER BY` les trie, `LIMIT/OFFSET` (ou la pagination par curseur) les découpe en pages.

> [!warning]- Prérequis
> [[SQL-01-Fondamentaux-SELECT|Fondamentaux SQL SELECT]]

---

## Théorie

> [!question]- C'est quoi ?
> ```sql
> SELECT * FROM films
> WHERE annee BETWEEN 2000 AND 2020
>   AND genre IN ('SF', 'Thriller')
>   AND titre ILIKE '%star%'          -- ILIKE : insensible à la casse (PostgreSQL)
> ORDER BY note DESC NULLS LAST, titre
> LIMIT 20 OFFSET 40;                 -- page 3 de 20
> ```

> [!example]- Analogie
> WHERE est un tamis, ORDER BY un classement, LIMIT le nombre d'éléments que tu prends dans le panier.

> [!question]- Pourquoi l'utiliser ?
> Toutes les listes d'une application (recherche, filtres, pagination) se traduisent en ces clauses.

> [!question]- Comment ça marche ?
> Opérateurs : `= <> < > <= >=`, `AND OR NOT`, `IN`, `BETWEEN`, `LIKE` (`%` n'importe quoi, `_` un caractère), `IS NULL`, `COALESCE(x, défaut)`.
> Pagination :
> - **Offset** : simple mais lente sur des pages lointaines et instable si des lignes sont insérées
> - **Curseur (keyset)** : `WHERE (annee, id) < (2010, 523) ORDER BY annee DESC, id DESC LIMIT 20` → rapide et stable

> [!question]- Quand l'utiliser ?
> Offset pour de petites tables/back-offices ; curseur pour du scroll infini ou de gros volumes.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `LIKE '%texte%'` ne peut pas utiliser un index B-tree classique → recherche plein texte (`tsvector`) ou index trigram.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Prédicat | Condition booléenne |
| Pagination offset | Sauter N lignes |
| Pagination curseur | Reprendre après la dernière valeur vue |
| `COALESCE` | Première valeur non nulle |

---

## Points clés

- Trier de façon déterministe (ajouter `id` en dernier critère)
- Paginer toujours les listes
- Préférer le curseur pour les grands volumes

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `OR` sans parenthèses avec `AND` (priorité)
> - Pagination sans ORDER BY → ordre non garanti

---

## Exemple minimal

```sql
-- page suivante après le dernier film affiché (annee=2012, id=87)
SELECT id, titre, annee FROM films
WHERE (annee, id) < (2012, 87)
ORDER BY annee DESC, id DESC
LIMIT 20;
```

> [!note] Ce que j'en retiens
> La page suivante ne dépend plus de l'offset : même vitesse à la page 1 ou 1000.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Recherche plein texte PostgreSQL (`to_tsvector`, index GIN)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[SQL]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sql-02-filtrer-trier-paginer]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi ajouter `id` dans l'ORDER BY ?

---

## Tâches

- [ ] #task Implémenter la recherche + pagination curseur dans l'API
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
