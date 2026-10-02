---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/fetch
aliases:
  - "Fetch API et JSON"
parent: "[[JavaScript]]"
related_theory:
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
  - "[[JS-07-Promises-Async-Await|Promises et Async Await JavaScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API"
---

# Fetch API et JSON

> [!abstract] En bref
> `fetch` permet au navigateur (ou à Node) de **demander des données à un serveur**. **JSON** est le format texte dans lequel ces données voyagent. C'est la base de toute communication entre ton front et une API (TMDB, ton API NestJS).

## JSON : la langue commune

Le front parle JavaScript, le back parle TypeScript, Java ou Python… mais tous savent lire et écrire du **JSON** :

```json
{ "id": 1, "titre": "Inception", "genres": ["SF", "Thriller"], "vu": true }
```

```ts
JSON.stringify(film)   // objet → texte (pour l'envoyer)
JSON.parse(texte)      // texte → objet (pour l'utiliser)
```

## Lire des données (GET)

```ts
const reponse = await fetch('https://api.themoviedb.org/3/movie/popular');
if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
const donnees = await reponse.json();
```

## Envoyer des données (POST)

```ts
const reponse = await fetch('/api/critiques', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',      // « je t'envoie du JSON »
    Authorization: `Bearer ${token}`,        // « voici qui je suis »
  },
  body: JSON.stringify({ filmId: 42, note: 8 }),
});
```

Une requête, c'est : une **méthode** (GET lire, POST créer, PUT/PATCH modifier, DELETE supprimer), une **URL**, des **en-têtes** (infos annexes) et parfois un **corps** (les données). Détails : [[NET-05-HTTP-Approfondi|HTTP]].

## Un petit outil réutilisable

Au lieu de répéter ces lignes partout, on les range dans une fonction :

```ts
async function api<T>(url: string, options: RequestInit = {}): Promise<T> {
  const r = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!r.ok) throw new Error(`Erreur ${r.status} sur ${url}`);
  return r.json();
}

const films = await api<Film[]>('/api/films');
```

En Vue, tu mettras ça dans un fichier `http.ts` ou un composable. En Angular, `HttpClient` fait déjà ce travail (voir [[ANG-09-HTTP-Communication-Serveur|HTTP en Angular]]).

## Déboguer

**Réflexe n°1 : F12 → onglet Réseau (Network).** Tu y vois chaque requête : l'URL, le code de réponse, les en-têtes envoyés, la réponse reçue.

| Code | Signification |
|---|---|
| 200 / 201 | OK / créé |
| 400 | ta requête est mal formée |
| 401 / 403 | pas connecté / pas autorisé |
| 404 | introuvable |
| 500 | erreur côté serveur |

## Pourquoi ça marche

Le réseau ne transporte que du **texte**. JSON est une façon simple d'écrire un objet en texte, que tous les langages savent relire : `JSON.stringify` transforme l'objet en texte pour l'envoyer, `JSON.parse` fait l'inverse à l'arrivée.

`fetch` renvoie une Promise parce que la réponse met du temps à arriver. Il ne lève une erreur **que si la requête n'a pas pu partir ou revenir** (réseau coupé) : une réponse 404 ou 500 est une réponse valide du serveur, d'où la vérification de `ok`.

## Contre-exemple

**Intuition fausse : « si l'API renvoie une erreur, `fetch` passe dans le `catch` ».**

```js
try {
  const res = await fetch('/api/movies/999999');   // 404
  const movie = await res.json();
  console.log(movie.title);   // undefined, ou plantage plus loin
} catch {
  console.log('Erreur');      // jamais affiché
}
```

Le `catch` ne voit que les erreurs réseau. Sans `if (!res.ok) throw …`, la 404 passe inaperçue.

## Pièges

- **`fetch` ne lève pas d'erreur sur une 404 ou 500** : vérifie toujours `reponse.ok`.
- **Oublier `JSON.stringify`** sur le corps : le serveur reçoit `[object Object]`.
- **Les dates arrivent en texte** (`"2026-09-26T10:00:00Z"`) : reconvertis-les avec `new Date(…)`.
- **Erreur CORS** : ce n'est pas un bug de ton front, c'est le serveur qui n'autorise pas ton domaine. Voir [[SEC-07-CORS-Same-Origin|CORS]].
- **Les données reçues ne sont jamais garanties** : valide-les avec [[TS-19-Validation-Runtime-Zod|Zod]].

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. À quoi servent `JSON.stringify` et `JSON.parse` ?**

> [!check]- Réponse
> `stringify` transforme un objet en texte (pour l'envoyer) ; `parse` transforme un texte JSON en objet.

**2. Quelles sont les 4 parties d'une requête HTTP ?**

> [!check]- Réponse
> La méthode, l'URL, les en-têtes et, parfois, le corps.

**3. Que veulent dire les codes 401, 404 et 500 ?**

> [!check]- Réponse
> 401 : pas connecté ; 404 : introuvable ; 500 : erreur côté serveur.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Gérer une réponse en erreur

Si l’API répond 404, ce code ne signale rien et plante plus loin. Corrige-le pour lever une erreur claire quand le statut n’est pas OK.

```js
async function getMovie(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`);
  return res.json();
}
```

> [!tip]- Indice 1
> Quelle propriété de la réponse indique si le statut est entre 200 et 299 ?

> [!tip]- Indice 2
> Teste-la juste après le `fetch`, avant de lire le JSON.

> [!success]- Solution
> ```js
> async function getMovie(id) {
>   const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`);
>   if (!res.ok) {
>     throw new Error(res.status === 404 ? 'Film introuvable' : `Erreur ${res.status}`);
>   }
>   return res.json();
> }
> ```
>
> `fetch` ne lève **pas** d'erreur sur un 404 ou un 500 : seulement si le réseau échoue. Il faut vérifier `res.ok` soi-même.

### Exercice 2 · Envoyer un JSON

Écris l'appel qui envoie une note `{ movieId: 438631, rating: 4 }` en `POST` à `/api/ratings`, avec le bon en-tête.

> [!tip]- Indice 1
> Trois choses à préciser dans les options de `fetch` : la méthode, un en-tête, le corps.

> [!tip]- Indice 2
> L'en-tête `Content-Type: application/json` annonce du JSON ; le corps passe par `JSON.stringify`.

> [!success]- Solution
> ```js
> const res = await fetch('/api/ratings', {
>   method: 'POST',
>   headers: { 'Content-Type': 'application/json' },
>   body: JSON.stringify({ movieId: 438631, rating: 4 }),
> });
> ```
>
> Deux oublis fréquents : `JSON.stringify` (sinon on envoie `[object Object]`) et l'en-tête `Content-Type`.

### Transfert · Supprimer un favori

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Écris `removeFavorite(movieId, token)` qui envoie une requête `DELETE` à `/api/favorites/<movieId>` avec l'en-tête `Authorization: Bearer <token>`. Elle lève une erreur `Non connecté` si le statut est 401, et une erreur générique pour les autres échecs.

> [!tip]- Indice 1
> Pas de corps ici : seulement la méthode et l'en-tête d'autorisation.

> [!tip]- Indice 2
> Teste d'abord `res.status === 401`, puis `!res.ok`.

> [!success]- Solution
> ```js
> async function removeFavorite(movieId, token) {
>   const res = await fetch(`/api/favorites/${movieId}`, {
>     method: 'DELETE',
>     headers: { Authorization: `Bearer ${token}` },
>   });
>   if (res.status === 401) throw new Error('Non connecté');
>   if (!res.ok) throw new Error(`Erreur ${res.status}`);
> }
> ```

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer pourquoi les données voyagent en JSON et ce que font `stringify` / `parse`
- [ ] **Rappeler** : Dire de mémoire les méthodes HTTP et les codes de statut courants
- [ ] **Utiliser** : Écrire un GET et un POST avec `fetch` sans modèle, avec la vérification de `ok`
- [ ] **Résoudre un problème nouveau** : Prédire ce qui se passe avec une réponse 404 sans vérification
- [ ] **Repérer les erreurs** : Déboguer un appel avec l'onglet Network (URL, statut, en-têtes, réponse)
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand ne pas faire confiance aux données reçues : les valider (Zod)
