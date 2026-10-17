---
type: notion
statut: a apprendre
resume: "Au quotidien, tu ne coderas jamais un algorithme de tri : tu utiliseras sort ou toSorted en JavaScript, et ORDER BY en SQL."
revu:
sources:
  - "https://visualgo.net/fr/sorting"
---
# Algorithmes de tri

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Au quotidien, tu ne coderas **jamais** un algorithme de tri : tu utiliseras `sort` ou `toSorted` en JavaScript, et `ORDER BY` en SQL.

## Le problème

**Pourquoi c'est utile ?**
Pour trier correctement des données avec les outils existants et éviter leurs pièges.

**Qu'est-ce qui se passait sans ça ?**
On écrivait des fonctions de comparaison fausses ou on modifiait le tableau d'origine sans le vouloir : des listes mal triées et des bugs d'affichage.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Ce qu'il faut maîtriser : **bien écrire la fonction de comparaison**, éviter les pièges de `sort`, et savoir **où** trier (dans le navigateur ou dans la base). Les tris classiques servent surtout à comprendre et aux entretiens.

### Trier correctement en JavaScript

```ts
// Nombres : du plus petit au plus grand
movies.toSorted((a, b) => a.year - b.year);

// Nombres : du plus grand au plus petit
movies.toSorted((a, b) => b.rating - a.rating);

// Texte, avec les accents français
movies.toSorted((a, b) => a.title.localeCompare(b.title, 'fr'));

// Plusieurs critères : par genre, puis par note décroissante
movies.toSorted((a, b) => a.genre.localeCompare(b.genre) || b.rating - a.rating);
```

La fonction de comparaison renvoie :
- un **négatif** → `a` avant `b` ;
- un **positif** → `b` avant `a` ;
- **0** → on garde l'ordre actuel.

### Trier dans le navigateur ou dans la base ?

| Situation | Où trier |
|---|---|
| petite liste déjà entièrement chargée | navigateur (`toSorted`) |
| résultats **paginés** | **base** (`ORDER BY` + `LIMIT`), sinon seule la page affichée est triée |
| gros volume | base, avec un index sur la colonne triée |

```sql
SELECT * FROM movies ORDER BY rating DESC, title ASC LIMIT 20 OFFSET 40;
```

Voir [[Filtrer trier et paginer en SQL|Filtrer, trier, paginer]].

### Les tris classiques (culture et entretiens)

| Tri | Idée | Rapidité |
|---|---|---|
| **À bulles** | échanger les voisins mal rangés, recommencer | lent, O(n²) |
| **Par insertion** | ranger chaque carte à sa place dans ta main | O(n²), mais rapide si presque trié |
| **Fusion** | couper en deux, trier chaque moitié, fusionner | O(n log n) toujours |
| **Rapide** (*quicksort*) | choisir un pivot, petits à gauche, grands à droite | O(n log n) en moyenne |

`sort` en JavaScript utilise un mélange fusion + insertion : O(n log n), et **stable** (deux films à égalité gardent leur ordre d'avant).

## 🧪 Exemple

### Les 3 pièges de `sort`

```ts
[10, 2, 1].sort();                 // [1, 10, 2] ! sans comparateur, trie comme du texte
[10, 2, 1].sort((a, b) => a - b);  // [1, 2, 10] ✅
```

1. **Sans comparateur**, tout est trié comme du texte.
2. **`sort` modifie le tableau d'origine** : dans un signal, un `computed` ou un store, utilise **`toSorted`** qui renvoie une copie.
3. **`localeCompare`** pour le texte, sinon « É » se retrouve après « Z ».

## ⚠️ Limites et pièges

- **`sort()` sans comparateur** sur des nombres.
- **Trier en place** des données réactives.
- **Trier côté client** une liste paginée.

## 🔗 Liens

- **Prérequis :** [[Complexité Big O]]
- **Voir aussi :** [[Tableaux et chaînes]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://visualgo.net/fr/sorting
