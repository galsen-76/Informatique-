---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - theorie/typage
aliases:
  - "Typage Statique et Dynamique"
parent: "[[Théorie Générale]]"
related_theory:
  - "[[TS-01-Fondamentaux|Fondamentaux TypeScript]]"
  - "[[PY-16-Typage-Type-Hints|Typage et Type Hints Python]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://fr.wikipedia.org/wiki/Typage_(informatique)"
---

# Typage Statique et Dynamique

> [!abstract] En bref
> Un **type** dit ce qu'une variable contient (un nombre, un texte, un film…). Avec un typage **statique** (TypeScript, Java), les erreurs de type sont repérées **avant** de lancer le programme, dans l'éditeur. Avec un typage **dynamique** (JavaScript, Python), on les découvre **en l'exécutant**, parfois chez l'utilisateur. C'est comme vérifier les bagages à l'enregistrement plutôt qu'à l'arrivée.

## Statique ou dynamique

```js
// JavaScript : aucune alerte, ça plante à l'exécution
function price(movie) {
  return movie.price.toFixed(2);
}
price({ title: 'Dune' });   // 💥 TypeError: Cannot read properties of undefined
```

```ts
// TypeScript : l'éditeur souligne l'erreur avant même de lancer
function price(movie: { price: number }) {
  return movie.price.toFixed(2);
}
price({ title: 'Dune' });   // ❌ erreur : la propriété 'price' est manquante
```

| | Statique | Dynamique |
|---|---|---|
| Erreurs de type trouvées | **en écrivant le code** | **en l'exécutant** |
| Autocomplétion | précise | approximative |
| Exemples | TypeScript, Java, C#, Go | JavaScript, Python, PHP |

## Fort ou faible : un autre axe

Un langage **faible** convertit tout seul les types quand ils ne collent pas. Un langage **fort** refuse.

```js
'5' + 1    // JavaScript : '51' (le nombre devient du texte)
'5' * 2    // JavaScript : 10  (le texte devient un nombre)
```

```python
'5' + 1    # Python : erreur, on ne mélange pas texte et nombre
```

JavaScript est **dynamique et faible**, d'où ses surprises (voir [[JS-02-Types-Coercition-Egalite|Types et coercition]]). TypeScript ajoute la vérification statique par-dessus.

## TypeScript regarde la forme, pas le nom

En Java, deux classes identiques mais de noms différents sont incompatibles (typage **nominal**). En TypeScript, si la **forme** correspond, c'est bon (typage **structurel**) :

```ts
interface HasTitle { title: string }

class Book {
  constructor(public title: string, public author: string) {}
}

const item: HasTitle = new Book('Dune', 'Herbert');   // ✅ il a un title : ça suffit
const other: HasTitle = { title: 'Alien' };           // ✅ un simple objet aussi
```

## L'inférence : pas besoin de tout annoter

```ts
const year = 2024;                       // TypeScript sait que c'est un number
const titles = movies.map((m) => m.title); // il sait que c'est un string[]
```

Annote surtout les **paramètres** de fonctions et les données qui viennent de l'**extérieur**.

## Pièges

- **Croire que les types existent à l'exécution** : ils sont effacés (voir [[TG-01-Comment-fonctionne-un-programme|Comment fonctionne un programme]]). `instanceof MonInterface` est impossible.
- **Mettre `any` partout** : tu retombes en JavaScript sans filet. Préfère `unknown` puis vérifie.

## Exercices

### Exercice 1 · Statique ou à l'exécution ?

Pour chaque erreur, dis si TypeScript la détecte **avant** l'exécution ou si elle n'apparaît **qu'à** l'exécution :
1. appeler `movie.titel` au lieu de `movie.title` sur un objet typé `Movie` ;
2. l'API renvoie `{ name: 'Dune' }` au lieu de `{ title: 'Dune' }` ;
3. passer `'2021'` à une fonction qui attend un `number` ;
4. diviser par zéro.

> [!success]- Solution
> 1. **Avant** : la propriété n'existe pas sur le type.
> 2. **À l'exécution** : TypeScript ne voit pas les données réelles (d'où Zod).
> 3. **Avant** : mauvais type d'argument.
> 4. **À l'exécution** : c'est une valeur, pas un type (en JavaScript, ça donne `Infinity`).

### Exercice 2 · Typage structurel

Ce code compile-t-il ? Pourquoi ?

```ts
interface HasId { id: number }

class User {
  constructor(public id: number, public email: string) {}
}

function logId(item: HasId) {
  console.log(item.id);
}

logId(new User(1, 'a@b.fr'));
logId({ id: 2 });
```

> [!success]- Solution
> **Oui, les deux appels compilent.** TypeScript est **structurel** : il vérifie la **forme** de l'objet, pas son nom. `User` possède un `id: number`, et l'objet littéral aussi : ils conviennent à `HasId`, sans `implements`.
