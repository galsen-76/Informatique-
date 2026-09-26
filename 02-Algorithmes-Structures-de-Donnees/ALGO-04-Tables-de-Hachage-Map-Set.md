---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - algo/hash
aliases:
  - "Tables de Hachage Map et Set"
parent: "[[Algorithmes]]"
related_theory:
  - "[[ALGO-01-Complexite-Big-O|Complexité Big O]]"
  - "[[BDD-07-Redis-Cle-Valeur|Redis Cache Clé-Valeur]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map"
---

# Tables de Hachage Map et Set

> [!abstract] En bref
> Une **table de hachage** fonctionne comme un **vestiaire** : avec ton ticket (la **clé**), on trouve **directement** ton manteau (la **valeur**), sans passer en revue tous les crochets. En JavaScript, ce sont `Map`, `Set` et les objets. C'est l'outil n°1 pour rendre un code rapide : une recherche qui parcourait toute la liste devient **instantanée**.

## Map et Set

```ts
// Map : clé → valeur
const moviesById = new Map<number, Movie>();
moviesById.set(438631, dune);
moviesById.get(438631);    // dune, instantané
moviesById.has(438631);    // true
moviesById.delete(438631);
moviesById.size;

// Set : une collection de valeurs uniques
const seen = new Set<number>([1, 2, 2, 3]);   // {1, 2, 3}
seen.has(2);                                  // true, instantané
seen.add(4);
```

| | `Map` | `Set` | Objet `{}` |
|---|---|---|---|
| Contient | des paires clé → valeur | des valeurs uniques | des propriétés |
| Type des clés | **n'importe lequel** | – | chaînes seulement |
| Taille | `.size` | `.size` | `Object.keys(o).length` |
| Idéal pour | index, compteurs, cache | dédoublonner, « déjà vu ? » | données fixes connues d'avance |

## Les 4 usages du quotidien

**1. Indexer par identifiant**

```ts
const byId = new Map(movies.map((m) => [m.id, m]));
const movie = byId.get(reviewMovieId);        // au lieu de movies.find(...)
```

**2. Compter**

```ts
const countByGenre = new Map<string, number>();
for (const m of movies) countByGenre.set(m.genre, (countByGenre.get(m.genre) ?? 0) + 1);
```

**3. Dédoublonner**

```ts
const uniqueGenres = [...new Set(movies.map((m) => m.genre))];
```

**4. Vérifier l'appartenance**

```ts
const favorites = new Set(favoriteIds);
movies.map((m) => ({ ...m, favorite: favorites.has(m.id) }));
```

Tous passent de O(n²) à O(n) (voir [[ALGO-01-Complexite-Big-O|Big O]]).

## Comment ça marche (juste l'idée)

Une **fonction de hachage** transforme la clé en numéro de case. On va directement à cette case. Si deux clés tombent sur la même case (collision), le moteur JavaScript s'en occupe.

C'est aussi le principe de **Redis** (voir [[BDD-07-Redis-Cle-Valeur|Redis]]) : une énorme `Map` en mémoire, partagée par tes serveurs.

## Pièges

- **Les objets comme clés** sont comparés par **référence** :
  ```ts
  new Map([[{ id: 1 }, 'x']]).get({ id: 1 });   // undefined : ce n'est pas le même objet
  ```
  Utilise plutôt l'`id` comme clé.
- **Un objet `{}` avec des clés venant de l'utilisateur** (`__proto__`…) : préfère `Map`.
- **`Map` et `Set` ne passent pas en JSON** tels quels : convertis en tableau (`[...map]`) avant `JSON.stringify`.
