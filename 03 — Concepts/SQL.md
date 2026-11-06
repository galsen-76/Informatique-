---
type: concept
domain: database
module: "[[Module 09 - Bases de données et SQL]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Base de données relationnelle]]"
parents: []
related:
  - "[[API REST]]"
next_review: 
method: []
tags:
  - concept
  - database
---
# SQL

> [!info] En une phrase
> Le langage standard pour interroger et modifier les données d'une base relationnelle.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**SQL** (Structured Query Language) est **déclaratif** : tu décris *quelles* données tu veux, la base décide *comment* les obtenir. Il sert à lire (`SELECT`), créer (`INSERT`), modifier (`UPDATE`), supprimer (`DELETE`) et définir la structure (`CREATE TABLE`).

### Pourquoi ça existe
Interroger de grandes quantités de données efficacement, avec un langage commun à la plupart des bases relationnelles.

### Le problème résolu
Parcourir des fichiers à la main pour retrouver « toutes les notes non terminées de l'utilisateur 3, triées par date » serait lent et fragile.

## 2 · Explorer
### Comment ça fonctionne
Correspondance avec une [[API REST]] :

| HTTP | SQL |
| --- | --- |
| `GET /notes` | `SELECT * FROM notes;` |
| `POST /notes` | `INSERT INTO notes (title) VALUES ('Courses');` |
| `PATCH /notes/42` | `UPDATE notes SET done = true WHERE id = 42;` |
| `DELETE /notes/42` | `DELETE FROM notes WHERE id = 42;` |

Ordre d'écriture d'une requête : `SELECT` → `FROM` → `WHERE` → `ORDER BY` → `LIMIT`.

### Exemple concret
```sql
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done BOOLEAN DEFAULT false
);

INSERT INTO notes (title) VALUES ('Courses'), ('Réviser SQL');

SELECT id, title FROM notes WHERE done = false ORDER BY id DESC;
```

### Cas d'utilisation
- Stocker les ressources d'une API
- Statistiques, filtres, recherches
- Relier des données (`JOIN`)

> [!warning] À ne pas confondre
> **SQL** (le langage) et **PostgreSQL/MySQL** (des logiciels qui le comprennent, avec quelques différences). Et attention : un `UPDATE` ou `DELETE` **sans `WHERE`** touche toute la table.

## 3 · Pratiquer
- [[Projet - API Notes]] (étape base de données)
- [[Fiche - Lancer PostgreSQL avec Docker]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Base de données relationnelle]]
- **Complémentaires** : [[API REST]] (chaque endpoint déclenche une requête SQL)
- **Commandes** : [[SELECT]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
