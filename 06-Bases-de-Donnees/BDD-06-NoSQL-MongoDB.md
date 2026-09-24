---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/bdd/nosql
aliases:
  - "NoSQL et MongoDB"
parent: "[[Bases de Données]]"
children: []
related_theory:
  - "[[BDD-01-Fondamentaux-SGBD|Fondamentaux des Bases de Données]]"
related_snippets:
  - "[[04_Snippets/bdd-06-nosql-mongodb]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.mongodb.com/docs/manual/"
---

# NoSQL et MongoDB

> [!abstract] Introduction
> Les bases NoSQL abandonnent le modèle tabulaire strict ; MongoDB stocke des documents JSON (BSON) flexibles, pratiques quand la structure varie ou que les données sont lues d'un bloc.

> [!warning]- Prérequis
> [[BDD-01-Fondamentaux-SGBD|Fondamentaux des Bases de Données]]

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> db.films.insertOne({
>   titre: "Dune", annee: 2021,
>   genres: ["SF"],
>   casting: [{ nom: "Timothée Chalamet", role: "Paul" }],
> });
> db.films.find({ annee: { $gte: 2000 }, genres: "SF" }).sort({ annee: -1 }).limit(20);
> ```

> [!example]- Analogie
> Une base relationnelle range les pièces d'un meuble dans des tiroirs séparés à réassembler ; MongoDB range le meuble monté dans un carton.

> [!question]- Pourquoi l'utiliser ?
> Schéma flexible, lecture d'un agrégat en une requête, scalabilité horizontale native (sharding).

> [!question]- Comment ça marche ?
> Modélisation guidée par les requêtes : **imbriquer** ce qui est lu ensemble et borné (casting d'un film), **référencer** ce qui est partagé ou illimité (utilisateurs, critiques).
> Théorème CAP : en cas de partition réseau, un système distribué choisit entre cohérence et disponibilité.

> [!question]- Quand l'utiliser ?
> Catalogues à attributs variables, logs, contenus, prototypes rapides. PostgreSQL + JSONB couvre souvent ces besoins tout en gardant le relationnel.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Jointures limitées (`$lookup`), risques de duplication et d'incohérence, transactions multi-documents plus coûteuses.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Document | Objet JSON stocké |
| Collection | Ensemble de documents (≈ table) |
| Embedding | Imbriquer des sous-documents |
| Sharding | Répartition des données sur plusieurs serveurs |
| CAP | Cohérence, Disponibilité, Tolérance au partitionnement |

---

## Points clés

- Modéliser selon les accès
- Imbriquer le borné, référencer le partagé
- PostgreSQL JSONB = alternative sérieuse

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Tableaux imbriqués qui grossissent sans limite (limite 16 Mo par document)
> - Choisir Mongo pour éviter d'apprendre SQL

---

## Exemple minimal

```sql
-- L'équivalent « documents » dans PostgreSQL
ALTER TABLE films ADD COLUMN meta JSONB;
SELECT titre FROM films WHERE meta @> '{"langue": "fr"}';
```

> [!note] Ce que j'en retiens
> Le meilleur des deux mondes est souvent un relationnel avec une colonne JSONB.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Argumenter SQL vs NoSQL selon cohérence, requêtes et volume

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Bases de Données]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[BDD-02-Modelisation-Normalisation|Modélisation Relationnelle et Normalisation]]

**Pratique :**
- Extrait de code → [[04_Snippets/bdd-06-nosql-mongodb]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quand imbriquer et quand référencer dans MongoDB ?

> [!faq]- Questions d'entretien
> - SQL ou NoSQL pour un projet donné : comment choisissez-vous ?

---

## Tâches

- [ ] #task Modéliser CinéTrack en documents et comparer avec le modèle relationnel
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
