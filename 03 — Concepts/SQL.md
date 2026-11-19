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

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine une requête `SELECT categorie, SUM(montant) FROM depenses GROUP BY categorie` comme un entonnoir : la table, le regroupement, le résultat.

> [!example] 🔄 Change de contexte
> C'est ce que fait la route `/totaux`. Redessine le même calcul fait en Python sur une liste. Qui fait le travail dans chaque cas ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - SQL » et je l'intègre ici avec `![[Schéma - SQL.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

Pour m'aider :
- [[Projet - API Notes]] (étape base de données)

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Base de données relationnelle]]
- **Complémentaires** : [[API REST]] (chaque endpoint déclenche une requête SQL)
- **Commandes** : [[SELECT]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
