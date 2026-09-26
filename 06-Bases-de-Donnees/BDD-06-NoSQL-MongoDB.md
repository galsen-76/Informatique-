---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M08
tags:
  - backend/bdd/nosql
aliases:
  - "NoSQL et MongoDB"
parent: "[[Bases de Données]]"
related_theory:
  - "[[BDD-01-Fondamentaux-SGBD|Fondamentaux des Bases de Données]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://www.mongodb.com/docs/manual/"
---

# NoSQL et MongoDB

> [!abstract] En bref
> **NoSQL** regroupe les bases qui ne rangent pas les données en tables liées. La plus connue, **MongoDB**, stocke des **documents** JSON dont la forme peut varier. Utile dans certains cas précis, mais pour une application classique (utilisateurs, films, critiques), **PostgreSQL reste le meilleur choix**. À connaître pour le lire et savoir quand le choisir.

## Un document MongoDB

```json
{
  "_id": "66f5a1…",
  "title": "Inception",
  "year": 2010,
  "genres": ["SF", "Thriller"],
  "cast": [
    { "name": "Leonardo DiCaprio", "role": "Cobb" },
    { "name": "Elliot Page", "role": "Ariadne" }
  ]
}
```

Les listes et objets imbriqués sont **dans** le document : pas besoin de jointure pour les lire.

```js
db.movies.find({ genres: 'SF', year: { $gte: 2000 } }).sort({ year: -1 }).limit(10);
db.movies.insertOne({ title: 'Dune', year: 2021 });
db.movies.updateOne({ _id: id }, { $set: { rating: 7.8 } });
```

## SQL ou NoSQL ?

| | PostgreSQL (relationnel) | MongoDB (document) |
|---|---|---|
| Structure | tables et colonnes strictes | documents libres |
| Liens entre données | jointures, clés étrangères | données imbriquées ou références manuelles |
| Cohérence | forte (contraintes, transactions) | à gérer davantage dans le code |
| Idéal pour | données **liées** : utilisateurs, commandes, critiques | données **variables** ou lues d'un bloc : catalogue aux attributs divers, logs, événements |

## Quand MongoDB a du sens

- Des fiches produits avec des attributs **très différents** selon la catégorie.
- Des **journaux d'événements** qu'on écrit en masse et lit rarement.
- Des données qu'on lit **toujours d'un bloc** (un document complet).

Et même dans ces cas, PostgreSQL sait stocker du JSON avec une colonne **`JSONB`** interrogeable :

```sql
SELECT title FROM movies WHERE details->>'studio' = 'Warner';
```

## Les autres familles NoSQL

| Type | Exemple | Pour |
|---|---|---|
| Clé-valeur | [[BDD-07-Redis-Cle-Valeur\|Redis]] | cache, sessions |
| Colonnes larges | Cassandra | énormes volumes d'écriture |
| Graphe | Neo4j | réseaux de relations (amis d'amis) |

## Pièges

- **Choisir MongoDB pour éviter d'apprendre le SQL** : les données liées deviennent un casse-tête (recopies, incohérences).
- **Tout imbriquer** (les critiques dans le film) : un document qui grossit sans limite, difficile à mettre à jour.
