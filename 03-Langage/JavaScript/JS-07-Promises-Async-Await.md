---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/async
aliases:
  - "Promises et Async Await JavaScript"
parent: "[[JavaScript]]"
related_theory:
  - "[[JS-06-Event-Loop|Event Loop JavaScript]]"
  - "[[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises"
---

# Promises et Async Await JavaScript

> [!abstract] En bref
> Une **Promise** est une valeur qui arrivera **plus tard** (la réponse d'une API, par exemple). `async` / `await` permet d'écrire ce code d'attente comme du code normal, de haut en bas. Tu t'en sers pour chaque appel réseau.

## L'image : le bipeur du fast-food

Tu commandes, on te donne un **bipeur** tout de suite : c'est la Promise. Tu vas t'asseoir. Il sonne quand ta commande est **prête** (réussite) ou **annulée** (échec).

Une Promise a donc 3 états :

| État | Signification |
|---|---|
| `pending` | en attente |
| `fulfilled` | réussie, avec une valeur |
| `rejected` | échouée, avec une erreur |

## `async` / `await` : la façon moderne

```ts
async function chargerFilm(id: number) {
  const reponse = await fetch(`/api/films/${id}`);   // attend la réponse
  if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
  return reponse.json();                              // attend et lit le JSON
}
```

- `await` = « attends le résultat avant de passer à la ligne suivante ».
- `await` ne marche **que dans une fonction `async`**.
- Une fonction `async` renvoie **toujours** une Promise : celui qui l'appelle doit aussi faire `await`.

### Gérer les erreurs

```ts
try {
  const film = await chargerFilm(42);
  console.log(film.titre);
} catch (erreur) {
  console.error('Impossible de charger le film', erreur);
}
```

## Plusieurs appels en même temps

Si deux appels ne dépendent pas l'un de l'autre, lance-les **ensemble** :

```ts
// ❌ lent : le 2e attend la fin du 1er
const profil = await chargerProfil();
const favoris = await chargerFavoris();

// ✅ rapide : les deux partent en même temps
const [profil, favoris] = await Promise.all([chargerProfil(), chargerFavoris()]);
```

| Outil | Termine quand… |
|---|---|
| `Promise.all([...])` | toutes ont réussi (échoue dès qu'une échoue) |
| `Promise.allSettled([...])` | toutes sont finies, réussies ou non |

## L'ancienne syntaxe `.then()`

Tu la verras dans du code existant. C'est la même chose :

```ts
fetch('/api/films')
  .then(r => r.json())
  .then(films => console.log(films))
  .catch(err => console.error(err));
```

## Pourquoi ça marche

Une Promise est un **objet qui représente un résultat futur**. Au lieu de bloquer en attendant, la fonction renvoie tout de suite cet objet ; le résultat le remplira plus tard.

`await` met **en pause la fonction `async`**, laisse le reste du programme tourner (voir [[JS-06-Event-Loop|Event Loop]]), puis reprend quand la Promise est terminée. Si la Promise échoue, `await` **lève l'erreur** à cet endroit : c'est pour ça qu'un simple `try / catch` suffit à la gérer.

## Contre-exemple

**Intuition fausse : « `await` dans un `forEach` attend chaque élément ».**

```js
ids.forEach(async (id) => {
  await saveRating(id);
});
console.log('Tout est enregistré');   // s'affiche AVANT la fin des enregistrements
```

`forEach` n'attend pas les fonctions `async` qu'on lui donne. Utilise `for (const id of ids) { await … }` (l'un après l'autre) ou `await Promise.all(ids.map(...))` (tous ensemble).

## Pièges

- **`fetch` ne plante pas sur une erreur 404 ou 500** : il faut vérifier `reponse.ok` toi-même.
- **`forEach` avec `async` n'attend rien** : utilise `for (const x of liste) { await … }` ou `Promise.all(liste.map(…))`.
- **Oublier `await`** : tu obtiens une Promise au lieu de la valeur (`Promise { <pending> }` dans la console).
- **Une erreur jamais attrapée** fait planter un serveur Node : mets toujours un `try/catch` quelque part.

> [!note] Promise ou Observable ?
> Une Promise donne **une seule** valeur et ne s'annule pas. Angular utilise plutôt des **Observables** (RxJS), qui peuvent donner plusieurs valeurs dans le temps et s'annuler : voir [[ANG-08-RxJS|RxJS]].

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quels sont les 3 états d'une Promise ?**

> [!check]- Réponse
> `pending` (en attente), `fulfilled` (réussie, avec une valeur), `rejected` (échouée, avec une erreur).

**2. Que renvoie toujours une fonction `async` ?**

> [!check]- Réponse
> Une Promise.

**3. Quand utiliser `Promise.all` ?**

> [!check]- Réponse
> Quand plusieurs appels ne dépendent pas l'un de l'autre : ils partent en même temps.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Réécrire avec async / await

Réécris ce code avec `async` / `await` et un `try / catch` :

```js
function loadMovie(id) {
  return fetch(`/api/movies/${id}`)
    .then((res) => res.json())
    .then((movie) => console.log(movie.title))
    .catch((err) => console.error('Échec', err));
}
```

> [!tip]- Indice 1
> Chaque `.then(x => ...)` devient une ligne `const x = await ...`.

> [!tip]- Indice 2
> Le `.catch` devient un bloc `try { } catch (err) { }` autour des `await`.

> [!success]- Solution
> ```js
> async function loadMovie(id) {
>   try {
>     const res = await fetch(`/api/movies/${id}`);
>     const movie = await res.json();
>     console.log(movie.title);
>   } catch (err) {
>     console.error('Échec', err);
>   }
> }
> ```

### Exercice 2 · Charger deux choses en même temps

`loadMovie(id)` et `loadCredits(id)` prennent chacune 1 seconde et ne dépendent pas l'une de l'autre. Écris `loadPage(id)` qui renvoie `{ movie, credits }` en environ **1 seconde** au lieu de 2.

> [!tip]- Indice 1
> Les deux appels doivent **partir** avant qu'on attende le résultat.

> [!tip]- Indice 2
> Quelle fonction prend un tableau de Promises et attend qu'elles soient toutes terminées ?

> [!success]- Solution
> ```js
> async function loadPage(id) {
>   const [movie, credits] = await Promise.all([loadMovie(id), loadCredits(id)]);
>   return { movie, credits };
> }
> ```
>
> Les deux appels sont lancés **avant** d'attendre, donc ils voyagent en même temps. Si l'un échoue, `Promise.all` échoue aussi (à attraper avec `try / catch`).

### Transfert · Réessayer en cas d'échec

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Écris `withRetry(fn, attempts)` qui appelle la fonction asynchrone `fn`. Si elle échoue, on réessaie, jusqu'à `attempts` fois au total. Si tous les essais échouent, on lève la dernière erreur.

> [!tip]- Indice 1
> Une boucle `for` de 1 à `attempts`, avec un `try / catch` à l'intérieur.

> [!tip]- Indice 2
> Dans le `try`, un `return await fn()` sort de la fonction dès que ça marche. Dans le `catch`, garde l'erreur et continue la boucle.

> [!success]- Solution
> ```js
> async function withRetry(fn, attempts) {
>   let lastError;
>   for (let i = 1; i <= attempts; i++) {
>     try {
>       return await fn();
>     } catch (err) {
>       lastError = err;
>     }
>   }
>   throw lastError;
> }
>
> const movie = await withRetry(() => loadMovie(42), 3);
> ```

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer ce qu'est une Promise avec l'image du bipeur
- [ ] **Rappeler** : Dire de mémoire les 3 états et ce que renvoie une fonction `async`
- [ ] **Utiliser** : Écrire un appel `fetch` avec `await`, vérification de `ok` et `try / catch` sans modèle
- [ ] **Résoudre un problème nouveau** : Prédire le comportement d'un `await` oublié ou d'un `forEach` async
- [ ] **Repérer les erreurs** : Transformer des appels séquentiels en appels parallèles avec `Promise.all`
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand une Promise ne suffit pas : plusieurs valeurs dans le temps ou annulation → Observable
