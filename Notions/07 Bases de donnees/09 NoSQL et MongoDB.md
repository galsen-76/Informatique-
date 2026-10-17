---
type: notion
statut: a apprendre
resume: "NoSQL regroupe les bases qui ne rangent pas les données en tables liées."
revu:
sources:
  - "https://www.mongodb.com/docs/manual/"
---
# NoSQL et MongoDB

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **NoSQL** regroupe les bases qui ne rangent pas les données en tables liées.

## Le problème

**Pourquoi c'est utile ?**
Pour stocker des données dont la forme varie, sous forme de documents.

**Qu'est-ce qui se passait sans ça ?**
On forçait des données très variables dans des tables rigides, avec des dizaines de colonnes vides.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

La plus connue, **MongoDB**, stocke des **documents** JSON dont la forme peut varier. Utile dans certains cas précis, mais pour une application classique (utilisateurs, films, critiques), **PostgreSQL reste le meilleur choix**. À connaître pour le lire et savoir quand le choisir.

### Un document MongoDB

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

### SQL ou NoSQL ?

| | PostgreSQL (relationnel) | MongoDB (document) |
|---|---|---|
| Structure | tables et colonnes strictes | documents libres |
| Liens entre données | jointures, clés étrangères | données imbriquées ou références manuelles |
| Cohérence | forte (contraintes, transactions) | à gérer davantage dans le code |
| Idéal pour | données **liées** : utilisateurs, commandes, critiques | données **variables** ou lues d'un bloc : catalogue aux attributs divers, logs, événements |

### Les autres familles NoSQL

| Type | Exemple | Pour |
|---|---|---|
| Clé-valeur | Redis | cache, sessions |
| Colonnes larges | Cassandra | énormes volumes d'écriture |
| Graphe | Neo4j | réseaux de relations (amis d'amis) |

## 🧪 Exemple

### Quand MongoDB a du sens

- Des fiches produits avec des attributs **très différents** selon la catégorie.
- Des **journaux d'événements** qu'on écrit en masse et lit rarement.
- Des données qu'on lit **toujours d'un bloc** (un document complet).

Et même dans ces cas, PostgreSQL sait stocker du JSON avec une colonne **`JSONB`** interrogeable :

```sql
SELECT title FROM movies WHERE details->>'studio' = 'Warner';
```

## ⚠️ Limites et pièges

- **Choisir MongoDB pour éviter d'apprendre le SQL** : les données liées deviennent un casse-tête (recopies, incohérences).
- **Tout imbriquer** (les critiques dans le film) : un document qui grossit sans limite, difficile à mettre à jour.

## 🔗 Liens

- **Prérequis :** [[01 Modèle relationnel et SGBD|Modèle relationnel et SGBD]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.mongodb.com/docs/manual/
