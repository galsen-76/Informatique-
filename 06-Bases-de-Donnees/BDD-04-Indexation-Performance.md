---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/bdd/index
aliases:
  - "Indexation et Performance SQL"
parent: "[[Bases de Données]]"
children: []
related_theory:
  - "[[ARCH-09-Cache-Performance|Cache et Performance]]"
  - "[[SQL-02-Filtrer-Trier-Paginer|Filtrer Trier et Paginer en SQL]]"
related_snippets:
  - "[[04_Snippets/bdd-04-indexation-performance]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://use-the-index-luke.com/fr"
---

# Indexation et Performance SQL

> [!abstract] Introduction
> Un index est une structure (souvent un arbre B) qui permet de retrouver des lignes sans parcourir toute la table ; `EXPLAIN ANALYZE` montre comment la base exécute réellement une requête.

> [!warning]- Prérequis
> [[SQL-02-Filtrer-Trier-Paginer|Filtrer Trier et Paginer en SQL]]

---

## Théorie

> [!question]- C'est quoi ?
> ```sql
> CREATE INDEX idx_films_annee ON films (annee);
> CREATE INDEX idx_favoris_film ON favoris (film_id);
> CREATE INDEX idx_films_genre_annee ON films (genre, annee DESC);   -- composite
> EXPLAIN ANALYZE SELECT * FROM films WHERE genre = 'SF' ORDER BY annee DESC LIMIT 20;
> ```

> [!example]- Analogie
> L'index d'un livre : pour trouver « transaction », tu vas à l'index plutôt que de lire les 800 pages.

> [!question]- Pourquoi l'utiliser ?
> La différence entre 2 ms et 20 secondes sur une table de plusieurs millions de lignes.

> [!question]- Comment ça marche ?
> - Index B-tree (défaut) : égalité, plages, tri
> - Composite : l'ordre des colonnes compte (règle du préfixe gauche)
> - GIN : JSONB, tableaux, plein texte ; trigram (`pg_trgm`) pour `ILIKE '%x%'`
> - Unique, partiel (`WHERE deleted_at IS NULL`)
> - Lire EXPLAIN : `Seq Scan` (parcours complet) vs `Index Scan`, coût estimé vs réel, lignes

> [!question]- Quand l'utiliser ?
> Colonnes de FK, de filtre fréquent, de tri et de jointure. Mesurer avant/après.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Chaque index ralentit les écritures et consomme de l'espace ; un index inutilisé est un coût pur.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| B-tree | Arbre équilibré, index par défaut |
| Seq Scan | Lecture de toute la table |
| Index composite | Index sur plusieurs colonnes |
| Sélectivité | Proportion de lignes filtrées |
| Plan d'exécution | Stratégie choisie par le moteur |

---

## Points clés

- Indexer les clés étrangères
- L'ordre des colonnes d'un index composite compte
- EXPLAIN ANALYZE avant d'optimiser
- Une fonction sur la colonne (`lower(email)`) empêche l'index sauf index d'expression

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Indexer toutes les colonnes « au cas où »
> - `WHERE lower(email) = …` sans index sur `lower(email)`
> - Problème N+1 côté ORM confondu avec un manque d'index

---

## Exemple minimal

```sql
CREATE INDEX idx_users_email_lower ON users (lower(email));
SELECT * FROM users WHERE lower(email) = lower('Ali@Mail.com');   -- utilise l'index
```

> [!note] Ce que j'en retiens
> Un index d'expression rend la recherche insensible à la casse rapide.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Surveiller `pg_stat_statements`, index inutilisés, bloat

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Bases de Données]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/bdd-04-indexation-performance]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi un index composite (genre, annee) n'aide-t-il pas un filtre sur annee seule ?

> [!faq]- Questions d'entretien
> - Comment diagnostiquez-vous une requête lente ?

---

## Tâches

- [ ] #task Générer 1 million de films factices et comparer EXPLAIN avec/sans index
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
