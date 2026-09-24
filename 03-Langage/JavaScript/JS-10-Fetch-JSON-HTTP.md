---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/fetch
aliases:
  - "Fetch API et JSON"
parent: "[[JavaScript]]"
children:
  - "[[ANG-09-HTTP-Communication-Serveur|HTTP & Communication Serveur Angular]]"
  - "[[VUE-15-Appels-API|Appels API Vue.js]]"
related_theory:
  - "[[NET-05-HTTP-Approfondi|HTTP Approfondi]]"
  - "[[JS-07-Promises-Async-Await|Promises et Async Await JavaScript]]"
related_snippets:
  - "[[04_Snippets/js-10-fetch-json-http]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API"
---

# Fetch API et JSON

> [!abstract] Introduction
> `fetch` est l'API native du navigateur (et de Node 18+) pour faire des requêtes HTTP ; JSON est le format texte universel d'échange de données entre front et back.

> [!warning]- Prérequis
> [[JS-07-Promises-Async-Await|Promises et Async Await JavaScript]], [[NET-05-HTTP-Approfondi|HTTP Approfondi]]

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> const reponse = await fetch("https://api.exemple.com/films", {
>   method: "POST",
>   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
>   body: JSON.stringify({ titre: "Dune" }),
> });
> const film = await reponse.json();
> ```
> - `JSON.stringify(obj)` : objet → texte
> - `JSON.parse(texte)` : texte → objet

> [!example]- Analogie
> JSON est une langue commune (l'anglais des machines) : le front écrit en JS, le back en Java/Python/TS, mais tous deux savent lire et écrire du JSON.

> [!question]- Pourquoi l'utiliser ?
> Toute application full stack échange des données front ↔ back. Même si Angular utilise `HttpClient` et Vue souvent `fetch`/axios, comprendre la requête brute aide à déboguer (onglet Network, CORS, en-têtes).

> [!question]- Comment ça marche ?
> Anatomie d'une requête : **méthode** (GET, POST…), **URL**, **en-têtes** (headers), **corps** (body). La réponse : **code de statut**, en-têtes, corps.
> `fetch` ne rejette qu'en cas d'erreur RÉSEAU. Une 404/500 est une réponse « réussie » → vérifier `response.ok`.

> [!question]- Quand l'utiliser ?
> Vue / JS vanilla / Node : `fetch` directement ou encapsulé dans un composable/service. Angular : préférer `HttpClient` (intercepteurs, Observables, tests).

> [!danger]- Quand NE PAS l'utiliser / Limites
> JSON ne sait pas représenter `Date`, `Map`, `undefined`, `BigInt` : les dates voyagent en chaîne ISO et doivent être reconverties. `JSON.parse` ne valide RIEN : les données reçues doivent être validées ([[TS-19-Validation-Runtime-Zod|Validation runtime avec Zod]]).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Endpoint | URL d'une ressource de l'API |
| Header | Métadonnée de la requête/réponse (type, auth…) |
| Body | Contenu de la requête/réponse |
| Sérialiser | Transformer un objet en texte (JSON.stringify) |
| CORS | Règle du navigateur sur les requêtes vers un autre domaine |

---

## Points clés

- Vérifier `response.ok` / `response.status`
- `Content-Type: application/json` pour envoyer du JSON
- Les dates arrivent en chaîne ISO 8601
- Ne jamais faire confiance au JSON reçu : valider
- Onglet Network des DevTools = premier réflexe de débogage

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `JSON.stringify` sur le body → envoie `[object Object]`
> - Oublier `await` sur `response.json()`
> - Croire qu'une erreur CORS est un bug du front (c'est la configuration du serveur, voir [[SEC-07-CORS-Same-Origin|CORS et Same-Origin Policy]])
> - Mettre un token dans l'URL (il finit dans les logs)

---

## Exemple minimal

```javascript
async function api(url, options = {}) {
  const r = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!r.ok) {
    const detail = await r.text();
    throw new Error(`Erreur ${r.status} sur ${url} : ${detail}`);
  }
  return r.status === 204 ? null : r.json();
}
const films = await api("/api/films");
```

> [!note] Ce que j'en retiens
> Un petit wrapper centralise en-têtes, erreurs HTTP et cas 204 : c'est ce que fait `HttpClient` + intercepteurs en Angular.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir lire une requête dans l'onglet Network (timing, preflight OPTIONS, cache)
> - Gérer l'annulation (AbortController), le retry et les timeouts
> - Générer des clients typés depuis une spec OpenAPI

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → [[ANG-09-HTTP-Communication-Serveur|HTTP & Communication Serveur Angular]], [[VUE-15-Appels-API|Appels API Vue.js]]
- À comparer avec → [[ANG-09-HTTP-Communication-Serveur|HTTP & Communication Serveur Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/js-10-fetch-json-http]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `fetch` ne lève-t-il pas d'erreur sur une 404 ?
> - Que devient une `Date` après `JSON.stringify` ?

> [!faq]- Questions d'entretien
> - Que se passe-t-il quand on tape une URL et qu'on appuie sur Entrée ? (voir [[NET-05-HTTP-Approfondi|HTTP Approfondi]])

---

## Tâches

- [ ] #task Appeler une API publique (TMDB, OMDb) avec fetch et afficher le résultat dans la page
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
