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

## Pourquoi ça marche

Ces méthodes prennent une **fonction** en paramètre (voir [[JS-03-Fonctions-Scope-Closures|Fonctions]]) : tu décris **quoi** faire avec un élément, la méthode s'occupe de parcourir la liste.

Elles **renvoient un nouveau tableau** au lieu de modifier l'ancien. Angular et Vue repèrent un changement en comparant les **références** : une nouvelle liste = une nouvelle référence = l'écran se met à jour. Modifier l'ancienne liste avec `push` ne change pas sa référence, et le changement peut passer inaperçu.

## Contre-exemple

**Intuition fausse : « `find` renvoie une liste, comme `filter` ».**

```js
const found = movies.find((m) => m.year > 3000);
found.title;   // ❌ TypeError : found vaut undefined
```

`find` renvoie **un seul élément**, ou `undefined` s'il n'y en a aucun. `filter` renvoie toujours un **tableau**, éventuellement vide. Avec `find`, il faut prévoir le cas « rien trouvé ».

## Pièges

- **`sort()` sans fonction trie comme du texte** : `[10, 9, 1].sort()` donne `[1, 10, 9]`. Écris `sort((a, b) => a - b)`, ou mieux `toSorted`.
- **`sort()` modifie le tableau d'origine** : dans un `computed`, utilise `toSorted()`.
- **La copie avec `...` est superficielle** : les objets imbriqués restent partagés. Pour une copie complète : `structuredClone(obj)`.
- **`reduce` sans valeur de départ** plante sur un tableau vide : mets toujours le `0` (ou `[]`) final.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quelle méthode utiliser pour : transformer chaque élément ? en garder certains ? en trouver un seul ? calculer un total ?**

> [!check]- Réponse
> `map`, `filter`, `find`, `reduce`.

**2. Pourquoi préférer `toSorted` à `sort` dans un composant ?**

> [!check]- Réponse
> `sort` modifie le tableau d'origine ; `toSorted` renvoie une copie triée, donc une nouvelle référence que le framework détecte.

**3. Que fait `{ ...film, annee: 2011 }` ?**

> [!check]- Réponse
> Il crée un nouvel objet avec tous les champs de `film`, puis remplace `annee` par 2011. `film` n'est pas modifié.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Transformer une liste de films

À partir de ce tableau, obtiens en **une chaîne de méthodes** : les titres (en majuscules) des films sortis à partir de 2000, triés par note décroissante.

```js
const movies = [
  { title: 'Dune', year: 2021, rating: 4.5 },
  { title: 'Alien', year: 1979, rating: 4.8 },
  { title: 'Inception', year: 2010, rating: 4.7 },
];
```

> [!tip]- Indice 1
> Trois étapes : garder (≥ 2000), trier (note décroissante), transformer (titre en majuscules). Dans quel ordre ?

> [!tip]- Indice 2
> Pour un tri décroissant sur des nombres : `(a, b) => b.rating - a.rating`.

> [!success]- Solution
> ```js
> const titles = movies
>   .filter((m) => m.year >= 2000)
>   .toSorted((a, b) => b.rating - a.rating)
>   .map((m) => m.title.toUpperCase());
>
> // ["INCEPTION", "DUNE"]
> ```
>
> `toSorted` plutôt que `sort` pour ne pas modifier le tableau d'origine.

### Exercice 2 · Mettre à jour sans modifier l'original

Écris une fonction `rate(movies, title, rating)` qui renvoie un **nouveau** tableau où le film concerné a sa nouvelle note, sans toucher au tableau d'origine.

> [!tip]- Indice 1
> Quelle méthode crée un nouveau tableau de la même taille, où chaque élément peut être transformé ?

> [!tip]- Indice 2
> Pour l'élément concerné, crée un nouvel objet avec `{ ...m, rating }` ; pour les autres, renvoie-les tels quels.

> [!success]- Solution
> ```js
> function rate(movies, title, rating) {
>   return movies.map((m) => (m.title === title ? { ...m, rating } : m));
> }
>
> const updated = rate(movies, 'Dune', 5);
> movies[0].rating;   // 4.5 → l'original est intact
> updated[0].rating;  // 5
> ```
>
> `map` crée un nouveau tableau, et `{ ...m, rating }` un nouvel objet.

### Transfert · La moyenne par genre

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

À partir d'une liste de films `{ title, genre, rating }`, calcule un objet qui donne la note moyenne de chaque genre, par exemple `{ SF: 4.5, Policier: 3 }`.

> [!tip]- Indice 1
> Commence par regrouper les notes par genre : un objet dont chaque clé est un genre et chaque valeur un tableau de notes.

> [!tip]- Indice 2
> Ensuite, parcours cet objet avec `Object.entries` et calcule la moyenne de chaque tableau.

> [!success]- Solution
> ```js
> const ratingsByGenre = {};
> for (const m of movies) {
>   (ratingsByGenre[m.genre] ??= []).push(m.rating);
> }
>
> const averages = Object.fromEntries(
>   Object.entries(ratingsByGenre).map(([genre, ratings]) => [
>     genre,
>     ratings.reduce((sum, r) => sum + r, 0) / ratings.length,
>   ]),
> );
> ```

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer à quoi servent `map`, `filter`, `find`, `reduce` avec les images de la note
- [ ] **Rappeler** : Choisir de mémoire la bonne méthode pour un besoin donné
- [ ] **Utiliser** : Enchaîner plusieurs méthodes pour transformer une liste sans modèle
- [ ] **Résoudre un problème nouveau** : Prédire si une méthode modifie l'original ou crée une copie
- [ ] **Repérer les erreurs** : Repérer un `sort` ou un `push` qui empêche l'écran de se mettre à jour
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand une boucle `for` simple est plus claire qu'un `reduce` compliqué
