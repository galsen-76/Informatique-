---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
tags:
  - theorie/fonctionnel
aliases:
  - "Programmation Fonctionnelle"
parent: "[[Théorie Générale]]"
related_theory:
  - "[[PY-12-Fonctionnel-Lambda|Programmation Fonctionnelle Lambda Python]]"
  - "[[JS-05-Objets-Tableaux-Methodes|Objets et Tableaux JavaScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://fr.wikipedia.org/wiki/Programmation_fonctionnelle"
---

# Programmation Fonctionnelle

> [!abstract] En bref
> La programmation **fonctionnelle**, c'est construire son code avec des **fonctions simples et prévisibles** qu'on enchaîne, sans modifier les données existantes. Tu en fais déjà : `map`, `filter`, `reduce`, les `computed`, les opérateurs RxJS. Trois idées suffisent : les **fonctions pures**, l'**immutabilité**, et les **fonctions traitées comme des valeurs**.

## 1. Les fonctions pures

Une fonction **pure** est comme une calculatrice : **même entrée → même résultat**, et elle ne touche à **rien d'autre**.

```ts
// ✅ Pure : dépend seulement de ses paramètres, ne modifie rien
const filterByTitle = (movies: Movie[], text: string) =>
  movies.filter((m) => m.title.toLowerCase().includes(text.toLowerCase()));

// ❌ Impure : dépend d'une variable extérieure et modifie l'extérieur
let count = 0;
function filterAndCount(movies: Movie[]) {
  count++;                                        // effet de bord
  return movies.filter((m) => m.year > minYear);  // dépend de minYear, défini ailleurs
}
```

Pourquoi c'est bien : une fonction pure se **teste** en une ligne, sans rien simuler, et ne crée **jamais** de surprise.

Un **effet de bord**, c'est tout ce qui touche l'extérieur : appel HTTP, modification du DOM, `console.log`, écriture en base. On en a besoin, mais on les **regroupe** à des endroits précis (services, `effect()`, `tap()`).

## 2. L'immutabilité

On ne **modifie** pas une donnée : on en crée une **nouvelle** version.

```ts
const updated = { ...movie, rating: 5 };           // nouvel objet
const withNew = [...movies, newMovie];             // nouveau tableau
const without = movies.filter((m) => m.id !== id); // nouveau tableau
```

C'est ce qui permet aux frameworks de détecter les changements (voir [[TG-02-Memoire-Valeur-Reference|Valeur et référence]]).

## 3. Les fonctions sont des valeurs

Une fonction peut être rangée dans une variable, passée en paramètre ou renvoyée par une autre fonction, **comme un nombre ou un texte**.

```ts
const double = (n: number) => n * 2;    // une fonction rangée dans une variable
[1, 2, 3].map(double);                  // passée en paramètre → [2, 4, 6]

const greaterThan = (min: number) => (n: number) => n > min;  // renvoie une fonction
const isRecent = greaterThan(2020);
isRecent(2024);                          // true
```

Une fonction qui reçoit ou renvoie une fonction s'appelle une fonction **d'ordre supérieur** (`map`, `filter`, `setTimeout`…). `greaterThan` garde `min` en mémoire : c'est une [[JS-03-Fonctions-Scope-Closures|closure]].

## Déclaratif plutôt qu'impératif

```ts
// Impératif : on décrit COMMENT faire, étape par étape
const titles: string[] = [];
for (const m of movies) {
  if (m.year >= 2020) titles.push(m.title.toUpperCase());
}

// Déclaratif : on décrit CE QU'ON VEUT
const titles2 = movies
  .filter((m) => m.year >= 2020)
  .map((m) => m.title.toUpperCase());
```

## Où tu la retrouves

| Outil | Règle fonctionnelle |
|---|---|
| `computed()` (Angular, Vue) | doit être **pur** : un calcul, pas d'appel HTTP |
| `effect()`, `watch` | l'endroit prévu pour les **effets de bord** |
| opérateurs RxJS (`map`, `filter`) | des fonctions enchaînées dans un `pipe` |
| reducers, stores | renvoient un **nouvel** état |

## Pièges

- **Un appel HTTP ou une modification dans un `computed` ou un `map`.**
- **Modifier le tableau reçu** en paramètre (`sort`, `push`) au lieu d'en créer un nouveau.
- **Tout vouloir en fonctionnel** au point de rendre le code illisible pour l'équipe.
