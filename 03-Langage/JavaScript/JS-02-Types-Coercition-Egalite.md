---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/javascript/types
aliases:
  - "Types et Coercition JavaScript"
parent: "[[JavaScript]]"
related_theory:
  - "[[JS-01-Fondamentaux|Fondamentaux JavaScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Data_structures"
---

# Types et Coercition JavaScript

> [!abstract] En bref
> Chaque valeur a un **type** (texte, nombre, booléen…). JavaScript convertit parfois les types tout seul, sans prévenir : c'est la **coercition**, source de bugs célèbres. Deux réflexes suffisent à les éviter : `===` et `??`.

## Les types

| Type | Exemple | À savoir |
|---|---|---|
| `string` | `'Inception'` | du texte |
| `number` | `42`, `3.14` | entiers et décimaux, un seul type |
| `boolean` | `true`, `false` | |
| `undefined` | | « pas encore de valeur » |
| `null` | | « volontairement vide » |
| objet | `{ titre: 'Dune' }`, `[1, 2]`, fonctions, `Date` | tout le reste |

(`bigint` et `symbol` existent aussi, mais tu les croiseras rarement.)

### Valeur vs référence

```js
let a = 5;
let b = a;   // b reçoit une COPIE de 5
b = 10;      // a vaut toujours 5

const film1 = { titre: 'Dune' };
const film2 = film1;      // film2 pointe vers LE MÊME objet
film2.titre = 'Heat';     // film1.titre vaut aussi 'Heat' !
```

Les nombres, textes et booléens sont **copiés**. Les objets et tableaux sont **partagés** : les deux variables désignent le même objet. C'est pour ça que `{ a: 1 } === { a: 1 }` vaut `false` : ce sont deux objets différents, même s'ils se ressemblent.

## La coercition : JavaScript traduit à ta place

Image : un traducteur trop zélé. Tu mélanges deux langues, et au lieu de te prévenir, il invente une traduction.

```js
'5' + 1   // '51'  → + avec du texte = on colle les textes
'5' - 1   // 4     → - force la conversion en nombre
```

### Vrai ou faux dans un `if`

Ces valeurs sont considérées comme **fausses** (« falsy ») : `false`, `0`, `''` (texte vide), `null`, `undefined`, `NaN`.
**Tout le reste est vrai**, y compris `'0'`, `[]` et `{}`.

## Les deux réflexes

### 1. Toujours `===`

```js
0 == ''    // true  😱 (== convertit avant de comparer)
0 === ''   // false ✅ (=== compare aussi le type)
```

Utilise toujours `===` et `!==`. Oublie `==`.

### 2. `??` pour les valeurs par défaut

```js
const quantite = saisie || 1;   // si saisie vaut 0 → 1 😱
const quantite = saisie ?? 1;   // si saisie vaut 0 → 0 ✅
```

- `||` remplace **toute valeur fausse** (0, '', false…).
- `??` remplace **seulement** `null` et `undefined`.

Et son cousin `?.` pour lire une propriété sans planter si l'objet est vide :

```js
film?.realisateur?.nom   // undefined au lieu d'une erreur si realisateur n'existe pas
```

## Pièges

- `typeof null` renvoie `'object'` (vieux bug du langage) : teste `x === null`.
- `0.1 + 0.2 === 0.3` est `false` (les décimaux sont approximatifs) : pour de l'argent, compte en **centimes**.
- `NaN === NaN` est `false` : utilise `Number.isNaN(x)`.

TypeScript attrape la plupart de ces erreurs avant même l'exécution : voir [[TS-01-Fondamentaux|Fondamentaux TypeScript]].
