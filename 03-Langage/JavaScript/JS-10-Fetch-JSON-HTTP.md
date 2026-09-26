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

## Pièges

- **`fetch` ne lève pas d'erreur sur une 404 ou 500** : vérifie toujours `reponse.ok`.
- **Oublier `JSON.stringify`** sur le corps : le serveur reçoit `[object Object]`.
- **Les dates arrivent en texte** (`"2026-09-26T10:00:00Z"`) : reconvertis-les avec `new Date(…)`.
- **Erreur CORS** : ce n'est pas un bug de ton front, c'est le serveur qui n'autorise pas ton domaine. Voir [[SEC-07-CORS-Same-Origin|CORS]].
- **Les données reçues ne sont jamais garanties** : valide-les avec [[TS-19-Validation-Runtime-Zod|Zod]].
