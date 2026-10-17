---
type: notion
statut: a apprendre
resume: "La programmation fonctionnelle, c'est construire son code avec des fonctions simples et prévisibles qu'on enchaîne, sans modifier les données existantes."
revu:
sources:
  - "https://fr.wikipedia.org/wiki/Programmation_fonctionnelle"
---
# Programmation fonctionnelle

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : La programmation **fonctionnelle**, c'est construire son code avec des **fonctions simples et prévisibles** qu'on enchaîne, sans modifier les données existantes.

## Le problème

**Pourquoi c'est utile ?**
Pour construire le code avec des fonctions simples et prévisibles, sans modifier les données existantes.

**Qu'est-ce qui se passait sans ça ?**
Des données modifiées de partout : un bug pouvait venir de n'importe où, et le code était difficile à tester.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Tu en fais déjà : `map`, `filter`, `reduce`, les `computed`, les opérateurs RxJS. Trois idées suffisent : les **fonctions pures**, l'**immutabilité**, et les **fonctions traitées comme des valeurs**.

### 1. Les fonctions pures

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

### 2. L'immutabilité

On ne **modifie** pas une donnée : on en crée une **nouvelle** version.

```ts
const updated = { ...movie, rating: 5 };           // nouvel objet
const withNew = [...movies, newMovie];             // nouveau tableau
const without = movies.filter((m) => m.id !== id); // nouveau tableau
```

C'est ce qui permet aux frameworks de détecter les changements (voir [[Mémoire valeur et référence|Valeur et référence]]).

### 3. Les fonctions sont des valeurs

Une fonction peut être rangée dans une variable, passée en paramètre ou renvoyée par une autre fonction, **comme un nombre ou un texte**.

```ts
const double = (n: number) => n * 2;    // une fonction rangée dans une variable
[1, 2, 3].map(double);                  // passée en paramètre → [2, 4, 6]

const greaterThan = (min: number) => (n: number) => n > min;  // renvoie une fonction
const isRecent = greaterThan(2020);
isRecent(2024);                          // true
```

Une fonction qui reçoit ou renvoie une fonction s'appelle une fonction **d'ordre supérieur** (`map`, `filter`, `setTimeout`…). `greaterThan` garde `min` en mémoire : c'est une [[Fonctions portée et closures JavaScript|closure]].

### Où tu la retrouves

| Outil | Règle fonctionnelle |
|---|---|
| `computed()` (Angular, Vue) | doit être **pur** : un calcul, pas d'appel HTTP |
| `effect()`, `watch` | l'endroit prévu pour les **effets de bord** |
| opérateurs RxJS (`map`, `filter`) | des fonctions enchaînées dans un `pipe` |
| reducers, stores | renvoient un **nouvel** état |

## 🧪 Exemple

### Déclaratif plutôt qu'impératif

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

## ⚠️ Limites et pièges

- **Un appel HTTP ou une modification dans un `computed` ou un `map`.**
- **Modifier le tableau reçu** en paramètre (`sort`, `push`) au lieu d'en créer un nouveau.
- **Tout vouloir en fonctionnel** au point de rendre le code illisible pour l'équipe.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Pure ou pas ?

Lesquelles de ces fonctions sont pures ? Pourquoi ?

```ts
const add = (a: number, b: number) => a + b;

let total = 0;
const addToTotal = (n: number) => { total += n; return total; };

const now = () => new Date();

const sortTitles = (titles: string[]) => titles.sort();
```

> [!success]- Solution
> - `add` : **pure** (même entrée → même sortie, ne touche à rien).
> - `addToTotal` : **impure** (modifie une variable extérieure).
> - `now` : **impure** (renvoie un résultat différent à chaque appel).
> - `sortTitles` : **impure** (`sort` modifie le tableau reçu). Version pure : `(titles) => titles.toSorted()`.

#### Exercice 2 · Une fonction qui fabrique des fonctions

Écris `minRating(min)` qui renvoie une fonction de filtrage, pour écrire `movies.filter(minRating(4))`.

> [!success]- Solution
> ```ts
> const minRating = (min: number) => (movie: Movie) => movie.rating >= min;
>
> movies.filter(minRating(4));
> movies.filter(minRating(4.5));
> ```
>
> `minRating(4)` renvoie une fonction qui se souvient de `min` (closure) : c'est une fonction d'ordre supérieur.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Lambda et programmation fonctionnelle Python]], [[Objets et tableaux JavaScript]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://fr.wikipedia.org/wiki/Programmation_fonctionnelle
