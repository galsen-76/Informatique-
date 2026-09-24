---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/async
aliases:
  - "Promises et Async Await JavaScript"
parent: "[[JavaScript]]"
children:
  - "[[TS-15-Async-Promises|Async/Await & Promises Typées]]"
related_theory:
  - "[[JS-06-Event-Loop|Event Loop JavaScript]]"
  - "[[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]"
related_snippets:
  - "[[04_Snippets/js-07-promises-async-await]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises"
---

# Promises et Async Await JavaScript

> [!abstract] Introduction
> Une Promise représente une valeur future (réussite ou échec) ; `async`/`await` permet d'écrire ce code asynchrone de façon linéaire et lisible.

> [!warning]- Prérequis
> [[JS-06-Event-Loop|Event Loop JavaScript]]

---

## Théorie

> [!question]- C'est quoi ?
> Une Promise a 3 états : `pending` → `fulfilled` (valeur) ou `rejected` (erreur). Une fois réglée, elle ne change plus.
> ```javascript
> const p = fetch("/api/films");          // Promise<Response>
> p.then(r => r.json()).then(films => console.log(films)).catch(console.error);
> ```

> [!example]- Analogie
> Le bipeur d'un fast-food : on te le donne tout de suite (la Promise), tu vaques à tes occupations, il sonne quand la commande est prête (fulfilled) ou si elle est annulée (rejected).

> [!question]- Pourquoi l'utiliser ?
> Remplacer les callbacks imbriqués (« callback hell ») par un code séquentiel lisible, avec une gestion d'erreurs centralisée (`try/catch`).

> [!question]- Comment ça marche ?
> ```javascript
> async function chargerFilm(id) {
>   const reponse = await fetch(`/api/films/${id}`);
>   if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
>   return reponse.json();                 // une fonction async renvoie toujours une Promise
> }
> ```
> Combinateurs :
> | Méthode | Résout quand… | Rejette quand… |
> |---|---|---|
> | `Promise.all` | toutes réussissent | la 1re échoue |
> | `Promise.allSettled` | toutes terminées | jamais |
> | `Promise.race` | la 1re se règle | la 1re se règle en échec |
> | `Promise.any` | la 1re réussit | toutes échouent |

> [!question]- Quand l'utiliser ?
> Une opération unique asynchrone (requête, lecture fichier, timer). Pour un FLUX de valeurs dans le temps ou de l'annulation, RxJS (Angular) est plus adapté.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Une Promise n'est pas annulable nativement (utiliser `AbortController` avec fetch) et ne produit qu'UNE valeur. Elle démarre immédiatement à sa création (« eager »), contrairement à un Observable (« lazy »).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Pending / Fulfilled / Rejected | En attente / Réussie / Échouée |
| `await` | Suspend la fonction async jusqu'au règlement de la Promise |
| Callback hell | Callbacks imbriqués en pyramide |
| `AbortController` | Permet d'annuler un fetch |

---

## Points clés

- `async` → la fonction renvoie toujours une Promise
- `await` seulement dans une fonction async (ou au top-level d'un module ES)
- `fetch` ne rejette PAS sur une erreur HTTP 404/500 : vérifier `response.ok`
- `Promise.all` pour paralléliser des appels indépendants
- Toujours gérer les rejets (`catch` / `try...catch`)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `await` dans une boucle `for` pour des appels indépendants → séquentiel et lent (utiliser `Promise.all`)
> - `forEach(async …)` n'attend rien : utiliser `for...of` ou `Promise.all(tab.map(...))`
> - Oublier `return` dans un `.then()` → la chaîne reçoit `undefined`
> - Promise rejetée non gérée → `UnhandledPromiseRejection` (plante Node)

---

## Exemple minimal

```javascript
async function chargerTableauDeBord(userId) {
  const controleur = new AbortController();
  setTimeout(() => controleur.abort(), 5000);            // timeout 5 s
  try {
    const [profil, favoris] = await Promise.all([
      fetch(`/api/users/${userId}`, { signal: controleur.signal }).then(r => r.json()),
      fetch(`/api/users/${userId}/favoris`, { signal: controleur.signal }).then(r => r.json()),
    ]);
    return { profil, favoris };
  } catch (e) {
    console.error("Chargement impossible", e);
    throw e;
  }
}
```

> [!note] Ce que j'en retiens
> Deux requêtes indépendantes → `Promise.all` (en parallèle) ; `AbortController` pour ne pas attendre indéfiniment.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir convertir Promise ↔ Observable (`from()`, `firstValueFrom()`)
> - Gérer retry avec backoff exponentiel
> - Limiter la concurrence (p-limit) quand on lance 1000 requêtes

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → [[TS-15-Async-Promises|Async/Await & Promises Typées]]
- À comparer avec → [[ANG-08-RxJS|Programmation Réactive RxJS Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/js-07-promises-async-await]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `fetch` ne passe-t-il pas dans le `catch` sur une 404 ?
> - Quand utiliser `allSettled` plutôt que `all` ?

> [!faq]- Questions d'entretien
> - Différence entre Promise et Observable ?
> - Comment exécuter 3 appels en parallèle et attendre le résultat ?

---

## Tâches

- [ ] #task Réécrire une chaîne `.then()` en async/await
- [ ] #task Mesurer la différence de temps entre `await` en boucle et `Promise.all`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
