---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
tags:
  - frontend/javascript/moderne
aliases:
  - "JavaScript Moderne ES2015+"
parent: "[[JavaScript]]"
related_theory:
  - "[[JS-05-Objets-Tableaux-Methodes|Objets et Tableaux JavaScript]]"
  - "[[JS-07-Promises-Async-Await|Promises et Async Await JavaScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://github.com/tc39/proposals/blob/main/finished-proposals.md"
---

# JavaScript Moderne ES2015+

> [!abstract] En bref
> JavaScript s'enrichit chaque année. Cette note est un **aide-mémoire** des écritures modernes que tu croiseras dans tout code Angular, Vue ou Node. Pas besoin de tout apprendre d'un coup : reviens-y quand tu tombes sur une syntaxe inconnue.

## Les écritures du quotidien

| Écriture | Ce qu'elle fait | Exemple |
|---|---|---|
| `const` / `let` | déclarer une variable | `const titre = 'Dune'` |
| Fonction fléchée | fonction courte | `const doubler = n => n * 2` |
| Template string | insérer des variables dans un texte | `` `Note : ${note}/10` `` |
| Déstructuration | sortir des champs | `const { titre, annee } = film` |
| Spread `...` | copier / fusionner | `{ ...film, note: 9 }` |
| Paramètre par défaut | valeur si rien n'est passé | `function f(page = 1)` |
| `?.` | lire sans planter si vide | `user?.adresse?.ville` |
| `??` | valeur par défaut si `null`/`undefined` | `note ?? 0` |
| `??=` | assigner seulement si vide | `config.retry ??= 3` |
| `async` / `await` | attendre une Promise | `const r = await fetch(url)` |
| `import` / `export` | modules | `import { x } from './x'` |
| `class` | classes | `class Film { … }` |
| `1_000_000` | séparer les chiffres pour lire | `const budget = 1_500_000` |

## Les méthodes récentes utiles

| Méthode | Ce qu'elle fait |
|---|---|
| `tableau.at(-1)` | dernier élément |
| `toSorted()`, `toReversed()` | trier / inverser **sans modifier** l'original |
| `tableau.with(i, valeur)` | copie avec un élément remplacé |
| `findLast()` | dernier élément qui correspond |
| `Object.groupBy(films, f => f.genre)` | regrouper par catégorie |
| `structuredClone(obj)` | copie complète (même les objets imbriqués) |
| `texte.replaceAll('a', 'b')` | remplacer toutes les occurrences |

## Exemple : avant / après

```js
// Avant
var ville = user && user.adresse && user.adresse.ville ? user.adresse.ville : 'Inconnue';
var dernier = films[films.length - 1];

// Aujourd'hui
const ville = user?.adresse?.ville ?? 'Inconnue';
const dernier = films.at(-1);
```

## À savoir

Ton code moderne est **converti** par les outils de build (TypeScript, Vite) pour fonctionner sur les navigateurs visés. Les **syntaxes** (`?.`, `??`) sont toujours converties. Les **nouvelles méthodes** (`Object.groupBy`, `toSorted`) ne le sont pas : sur de très vieux navigateurs, elles peuvent manquer. En pratique, sur des navigateurs à jour, tout fonctionne.

## Pourquoi ça marche

Chaque nouvelle écriture remplace un **motif répétitif** qu'on écrivait à la main : `?.` remplace la chaîne de `&&`, `??` le test de `null` et `undefined`, `at(-1)` le calcul `length - 1`. Moins de code à écrire, c'est moins d'endroits où se tromper.

Les méthodes « sans modification » (`toSorted`, `with`) répondent au besoin des frameworks : produire une **nouvelle** valeur au lieu de changer l'ancienne (voir [[JS-05-Objets-Tableaux-Methodes|Objets et tableaux]]).

## Contre-exemple

**Intuition fausse : « `?.` protège de toutes les erreurs ».**

```js
const user = { address: null };
user.address?.city;      // undefined ✅
user.adress?.city;       // undefined… alors que c'est une faute de frappe !
```

`?.` évite de planter quand une valeur est **vide**, mais il **cache** aussi les fautes de frappe. TypeScript, lui, signale le mauvais nom de propriété.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Que fait `user?.address?.city ?? 'Inconnue'` ?**

> [!check]- Réponse
> Lit la ville sans planter si `user` ou `address` est vide, et renvoie `'Inconnue'` si le résultat est `null` ou `undefined`.

**2. Comment obtenir le dernier élément d'un tableau en écriture moderne ?**

> [!check]- Réponse
> `tableau.at(-1)`.

**3. Quelle différence entre une nouvelle **syntaxe** et une nouvelle **méthode** pour les vieux navigateurs ?**

> [!check]- Réponse
> Les syntaxes sont converties par les outils de build ; les nouvelles méthodes ne le sont pas et peuvent manquer.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Moderniser ce code

Réécris ce code avec les écritures modernes (déstructuration, fonctions fléchées, template literals, `?.`, `??`) :

```js
function describe(movie) {
  var title = movie.title;
  var director = movie.director && movie.director.name;
  if (director === undefined || director === null) director = 'inconnu';
  return title + ' — réalisé par ' + director;
}
```

> [!tip]- Indice 1
> Commence par la déstructuration des paramètres : `({ title, director })`.

> [!tip]- Indice 2
> Pour le réalisateur : `?.` pour lire sans planter, `??` pour la valeur par défaut.

> [!success]- Solution
> ```js
> const describe = ({ title, director }) =>
>   `${title} — réalisé par ${director?.name ?? 'inconnu'}`;
> ```

### Exercice 2 · Grouper des films

Avec `Object.groupBy` (ES2024), regroupe cette liste par genre. Qu'obtiens-tu ?

```js
const movies = [
  { title: 'Dune', genre: 'SF' },
  { title: 'Heat', genre: 'Policier' },
  { title: 'Alien', genre: 'SF' },
];
```

> [!tip]- Indice 1
> Il existe une méthode récente qui regroupe directement une liste selon une clé.

> [!tip]- Indice 2
> `Object.groupBy(liste, fonction)` : la fonction renvoie la clé de groupe de chaque élément.

> [!success]- Solution
> ```js
> const byGenre = Object.groupBy(movies, (m) => m.genre);
>
> // {
> //   SF: [{ title: 'Dune', ... }, { title: 'Alien', ... }],
> //   Policier: [{ title: 'Heat', ... }]
> // }
> ```

### Transfert · Mettre à jour un élément sans muter

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Écris en une ligne la mise à jour du 3e film d'une liste (index 2) avec la note 5, sans modifier la liste d'origine, avec une méthode récente.

> [!tip]- Indice 1
> Une méthode récente crée une copie avec **un** élément remplacé à un index donné.

> [!tip]- Indice 2
> `liste.with(index, nouvelleValeur)` ; la nouvelle valeur est une copie du film avec la note changée.

> [!success]- Solution
> ```js
> const updated = movies.with(2, { ...movies[2], rating: 5 });
> ```
>
> `movies` reste inchangé ; `updated` est un nouveau tableau.

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer quel problème résolvent `?.`, `??` et `at(-1)`
- [ ] **Rappeler** : Lire sans hésiter un code qui utilise déstructuration, spread et fléchées
- [ ] **Utiliser** : Moderniser un vieux code `var` / `&&` sans modèle
- [ ] **Résoudre un problème nouveau** : Prédire le résultat d'une chaîne `?.` / `??`
- [ ] **Repérer les erreurs** : Repérer une faute de frappe cachée par `?.`
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand une méthode récente peut manquer (très vieux navigateurs)
