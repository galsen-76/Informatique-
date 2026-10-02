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

## Pourquoi ça marche

JavaScript a été pensé pour **ne jamais s'arrêter** sur une page web : plutôt que d'afficher une erreur quand on mélange un texte et un nombre, il **devine** une conversion. Pratique au début, dangereux ensuite.

- `==` convertit les deux valeurs **avant** de les comparer, avec des règles compliquées. `===` ne convertit rien : si les types sont différents, c'est `false`. Le résultat est donc prévisible.
- `||` teste si la valeur est « fausse » (et `0`, `''` le sont). `??` teste seulement si elle est **absente** (`null` ou `undefined`). C'est pour ça que `??` est le bon choix pour une valeur par défaut.

## Contre-exemple

**Intuition fausse : « un tableau vide, c'est faux ».**

```js
const results = [];
if (results) {
  console.log('Il y a des résultats');   // s'affiche quand même !
}
```

Un tableau, même vide, est un objet, donc « vrai ». Pour tester s'il est vide : `if (results.length > 0)`.

## Pièges

- `typeof null` renvoie `'object'` (vieux bug du langage) : teste `x === null`.
- `0.1 + 0.2 === 0.3` est `false` (les décimaux sont approximatifs) : pour de l'argent, compte en **centimes**.
- `NaN === NaN` est `false` : utilise `Number.isNaN(x)`.

TypeScript attrape la plupart de ces erreurs avant même l'exécution : voir [[TS-01-Fondamentaux|Fondamentaux TypeScript]].

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quelles sont les 6 valeurs « fausses » (falsy) en JavaScript ?**

> [!check]- Réponse
> `false`, `0`, `''` (texte vide), `null`, `undefined`, `NaN`.

**2. Quelle est la différence entre `||` et `??` ?**

> [!check]- Réponse
> `||` remplace toute valeur fausse (dont `0` et `''`) ; `??` remplace seulement `null` et `undefined`.

**3. Pourquoi `{ a: 1 } === { a: 1 }` vaut-il `false` ?**

> [!check]- Réponse
> Ce sont deux objets différents en mémoire. `===` compare les références (l'adresse), pas le contenu.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Vrai ou faux ?

Pour chaque ligne, donne le résultat :

```js
'5' == 5
'5' === 5
0 || 'aucune note'
0 ?? 'aucune note'
Boolean('')
Boolean([])
```

> [!tip]- Indice 1
> Pour chaque ligne, demande-toi : y a-t-il une conversion (`==`) ou pas (`===`) ?

> [!tip]- Indice 2
> Pour `||` et `??` : `0` est-il « faux » ? Est-il `null` ou `undefined` ?

> [!success]- Solution
> | Expression | Résultat | Pourquoi |
> |---|---|---|
> | `'5' == 5` | `true` | `==` convertit le texte en nombre |
> | `'5' === 5` | `false` | types différents, pas de conversion |
> | `0 \|\| 'aucune note'` | `'aucune note'` | `0` est « faux » pour `\|\|` |
> | `0 ?? 'aucune note'` | `0` | `??` ne remplace que `null` et `undefined` |
> | `Boolean('')` | `false` | chaîne vide = faux |
> | `Boolean([])` | `true` | un tableau, même vide, est « vrai » |

### Exercice 2 · Corriger le bug

Une note de film peut valoir `0`. Ce code affiche « Non noté » pour un film noté 0. Corrige-le.

```js
function showRating(rating) {
  return rating || 'Non noté';
}
```

> [!tip]- Indice 1
> Quelles valeurs l'opérateur `||` considère-t-il comme absentes ? Est-ce que `0` en fait partie ?

> [!tip]- Indice 2
> Cherche l'opérateur qui ne remplace que `null` et `undefined`.

> [!success]- Solution
> ```js
> function showRating(rating) {
>   return rating ?? 'Non noté';
> }
>
> showRating(0);          // 0
> showRating(undefined);  // "Non noté"
> ```
>
> `||` remplace toutes les valeurs « fausses » (`0`, `''`, `false`), alors que `??` ne remplace que `null` et `undefined`.

### Transfert · Le formulaire de quantité

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Un champ « nombre de places » peut contenir `'0'`, `''` (vide) ou `'3'` (toujours du texte). Écris `parseSeats(input)` qui renvoie le nombre de places (un nombre), ou `1` si le champ est vide. `'0'` doit donner `0`, pas `1`.

> [!tip]- Indice 1
> Le champ contient du **texte** : il faudra le convertir avec `Number(...)`. Mais que donne `Number('')` ?

> [!tip]- Indice 2
> Traite d'abord le cas « vide » avec une comparaison stricte (`input === ''`), puis convertis le reste.

> [!success]- Solution
> ```js
> function parseSeats(input) {
>   if (input === '') return 1;
>   return Number(input);
> }
>
> parseSeats('');    // 1
> parseSeats('0');   // 0
> parseSeats('3');   // 3
> ```
>
> Piège évité : `Number(input) || 1` transformerait `'0'` en `1`, et `Number('')` vaut `0`, pas `null`.

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer ce qu'est la coercition et pourquoi JavaScript la fait
- [ ] **Rappeler** : Citer de mémoire les valeurs falsy et la différence entre `||` et `??`
- [ ] **Utiliser** : Choisir `===` et `??` sans hésiter dans ton code
- [ ] **Résoudre un problème nouveau** : Prédire le résultat d'une comparaison ou d'un `||` sur une valeur inattendue (`0`, `''`, `[]`)
- [ ] **Repérer les erreurs** : Retrouver dans un bug la conversion cachée qui le cause
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand `||` reste le bon choix (quand `0` ou `''` doivent vraiment être remplacés)
