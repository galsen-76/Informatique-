---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M07
tags:
  - backend/sql/dml
aliases:
  - "INSERT UPDATE DELETE"
parent: "[[SQL]]"
children: []
related_theory:
  - "[[BDD-03-Transactions-ACID|Transactions et ACID]]"
related_snippets:
  - "[[04_Snippets/sql-06-insert-update-delete]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.postgresql.org/docs/current/dml.html"
---

# INSERT UPDATE DELETE

> [!abstract] Introduction
> Les instructions de modification (DML) : insérer, mettre à jour, supprimer des lignes — avec les précautions indispensables (WHERE, transactions, RETURNING, upsert).

> [!warning]- Prérequis
> [[SQL-01-Fondamentaux-SELECT|Fondamentaux SQL SELECT]]

---

## Théorie

> [!question]- C'est quoi ?
> ```sql
> INSERT INTO films (titre, annee) VALUES ('Dune', 2021) RETURNING id;
> UPDATE films SET note = 9 WHERE id = 12;
> DELETE FROM films WHERE id = 12;
> INSERT INTO favoris (user_id, film_id) VALUES (1, 12)
> ON CONFLICT (user_id, film_id) DO NOTHING;      -- upsert PostgreSQL
> ```

> [!example]- Analogie
> UPDATE sans WHERE, c'est repeindre tout l'immeuble alors que tu voulais repeindre une seule porte.

> [!question]- Pourquoi l'utiliser ?
> Toutes les écritures de l'application (même via ORM) se traduisent en ces instructions.

> [!question]- Comment ça marche ?
> - `RETURNING` (PostgreSQL) récupère les lignes écrites
> - `ON CONFLICT ... DO UPDATE/NOTHING` pour les upserts
> - Suppression logique (`deleted_at`) vs physique
> - Toujours tester le WHERE avec un SELECT avant un UPDATE/DELETE manuel en production

> [!question]- Quand l'utiliser ?
> Écritures applicatives, scripts de correction de données (dans une transaction !).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les suppressions en cascade peuvent effacer beaucoup plus que prévu.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| DML | Data Manipulation Language |
| Upsert | Insérer ou mettre à jour |
| Soft delete | Marquer comme supprimé au lieu de supprimer |
| RETURNING | Renvoie les lignes modifiées |

---

## Points clés

- Jamais d'UPDATE/DELETE sans WHERE (sauf intention)
- Corrections manuelles dans une transaction (`BEGIN … ROLLBACK/COMMIT`)
- Upsert pour l'idempotence

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - UPDATE sans WHERE en production
> - Insérer ligne par ligne 10 000 lignes → utiliser un INSERT multiple ou COPY

---

## Exemple minimal

```sql
BEGIN;
UPDATE films SET genre = 'Science-fiction' WHERE genre = 'SF';
SELECT COUNT(*) FROM films WHERE genre = 'SF';   -- vérification : 0
COMMIT;   -- ou ROLLBACK si le résultat est inattendu
```

> [!note] Ce que j'en retiens
> Une transaction transforme une commande dangereuse en opération réversible jusqu'au COMMIT.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Écrire des migrations de données idempotentes et par lots

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[SQL]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/sql-06-insert-update-delete]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi faire un SELECT avant un DELETE manuel ?

---

## Tâches

- [ ] #task Écrire le seed SQL de CinéTrack avec upserts
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
