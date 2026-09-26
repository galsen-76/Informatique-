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

## Pièges

- **`fetch` ne plante pas sur une erreur 404 ou 500** : il faut vérifier `reponse.ok` toi-même.
- **`forEach` avec `async` n'attend rien** : utilise `for (const x of liste) { await … }` ou `Promise.all(liste.map(…))`.
- **Oublier `await`** : tu obtiens une Promise au lieu de la valeur (`Promise { <pending> }` dans la console).
- **Une erreur jamais attrapée** fait planter un serveur Node : mets toujours un `try/catch` quelque part.

> [!note] Promise ou Observable ?
> Une Promise donne **une seule** valeur et ne s'annule pas. Angular utilise plutôt des **Observables** (RxJS), qui peuvent donner plusieurs valeurs dans le temps et s'annuler : voir [[ANG-08-RxJS|RxJS]].
