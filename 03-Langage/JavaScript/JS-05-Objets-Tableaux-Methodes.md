---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/javascript/objets-tableaux
aliases:
  - "Objets et Tableaux JavaScript"
parent: "[[JavaScript]]"
related_theory:
  - "[[JS-02-Types-Coercition-Egalite|Types et Coercition JavaScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array"
---

# Objets et Tableaux JavaScript

> [!abstract] En bref
> Les objets (une fiche avec des champs) et les tableaux (une liste) sont les données de toutes tes applications. Tu passeras ton temps à les **transformer** pour l'affichage : filtrer une liste de films, calculer une moyenne, trier. Cette note est ton aide-mémoire.

## Objets et tableaux

```js
const film = { id: 1, titre: 'Inception', annee: 2010 };   // un objet
const films = [film, { id: 2, titre: 'Dune', annee: 2021 }]; // un tableau d'objets

film.titre        // 'Inception'
films[0]          // le premier film
films.length      // 2
```

## Les méthodes de tableau à connaître

Image : `map` est une **chaîne de montage** (chaque pièce entre, une pièce transformée sort), `filter` un **tamis**, `reduce` un **entonnoir** qui combine tout en un résultat.

| Méthode | Sert à | Exemple | Résultat |
|---|---|---|---|
| `map` | transformer chaque élément | `films.map(f => f.titre)` | `['Inception', 'Dune']` |
| `filter` | garder certains éléments | `films.filter(f => f.annee > 2015)` | `[Dune]` |
| `find` | trouver le premier qui correspond | `films.find(f => f.id === 2)` | `Dune` ou `undefined` |
| `some` | « au moins un ? » | `films.some(f => f.annee < 2000)` | `false` |
| `every` | « tous ? » | `films.every(f => f.annee > 2000)` | `true` |
| `includes` | contient cette valeur ? | `['vue','angular'].includes('vue')` | `true` |
| `reduce` | combiner en une valeur | `notes.reduce((s, n) => s + n, 0)` | la somme |
| `toSorted` | trier (copie) | `films.toSorted((a, b) => a.annee - b.annee)` | nouveau tableau trié |

On les enchaîne :

```js
const titresRecents = films
  .filter(f => f.annee > 2015)
  .map(f => f.titre);            // ['Dune']
```

## Ne pas modifier l'original

Vue et Angular détectent les changements plus facilement quand on **crée une nouvelle liste** au lieu de modifier l'ancienne.

| Ne modifie pas l'original ✅ | Modifie l'original ⚠️ |
|---|---|
| `map`, `filter`, `find`, `reduce`, `toSorted`, `concat`, `slice` | `push`, `pop`, `splice`, `sort`, `reverse` |

```js
const avecNouveau = [...films, nouveauFilm];            // ajouter sans modifier
const sansDune = films.filter(f => f.id !== 2);          // supprimer sans modifier
const renomme = films.map(f => f.id === 1 ? { ...f, titre: 'Inception (VO)' } : f); // modifier un élément
```

## Déstructuration et spread

```js
// Déstructuration : sortir des champs dans des variables
const { titre, annee } = film;
const [premier, ...autres] = films;

// Spread (...) : étaler dans un nouvel objet / tableau
const copie = { ...film, annee: 2011 };   // copie + un champ changé
const tous = [...films, ...autresFilms];
```

## Parcourir un objet

```js
Object.keys(film)     // ['id', 'titre', 'annee']
Object.values(film)   // [1, 'Inception', 2010]
Object.entries(film)  // [['id', 1], ['titre', 'Inception'], …]
```

## Pièges

- **`sort()` sans fonction trie comme du texte** : `[10, 9, 1].sort()` donne `[1, 10, 9]`. Écris `sort((a, b) => a - b)`, ou mieux `toSorted`.
- **`sort()` modifie le tableau d'origine** : dans un `computed`, utilise `toSorted()`.
- **La copie avec `...` est superficielle** : les objets imbriqués restent partagés. Pour une copie complète : `structuredClone(obj)`.
- **`reduce` sans valeur de départ** plante sur un tableau vide : mets toujours le `0` (ou `[]`) final.
