---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
tags:
  - frontend/javascript/this-prototypes
aliases:
  - "this et Prototypes JavaScript"
parent: "[[JavaScript]]"
related_theory:
  - "[[JS-03-Fonctions-Scope-Closures|Fonctions Scope et Closures JavaScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this"
---

# this et Prototypes JavaScript

> [!abstract] En bref
> `this` désigne « l'objet qui appelle la fonction ». Sa valeur dépend de **comment** la fonction est appelée, ce qui provoque le bug classique du « `this` perdu ». Une seule parade suffit dans 90 % des cas : **les fonctions fléchées**. Les classes, elles, sont une écriture plus simple d'un mécanisme appelé prototype.

## `this` : le mot « moi »

`this`, c'est comme le mot « moi » : il ne désigne pas celui qui a écrit la phrase, mais **celui qui la prononce**.

```js
const film = {
  titre: 'Inception',
  afficher() { console.log(this.titre); },
};

film.afficher();          // 'Inception' → c'est film qui appelle, this = film

const f = film.afficher;  // on détache la fonction
f();                      // undefined → plus personne n'appelle, this est perdu
```

## Le bug classique : `this` perdu dans un callback

```ts
class Minuteur {
  secondes = 0;

  demarrer() {
    setInterval(function () {
      this.secondes++;          // ❌ this = undefined : c'est setInterval qui appelle
    }, 1000);

    setInterval(() => {
      this.secondes++;          // ✅ la fléchée garde le this de demarrer()
    }, 1000);
  }
}
```

**Règle :** une fonction fléchée n'a pas son propre `this`. Elle utilise celui de l'endroit où elle est écrite. Dans une classe (composant Angular, service), écris tes callbacks en fléché.

Même problème quand tu passes une méthode directement :

```ts
bouton.addEventListener('click', this.ouvrir);        // ❌ this perdu
bouton.addEventListener('click', () => this.ouvrir()); // ✅
```

## Les classes

```ts
class Film {
  constructor(titre, annee) {
    this.titre = titre;
    this.annee = annee;
  }
  resume() {
    return `${this.titre} (${this.annee})`;
  }
}

const dune = new Film('Dune', 2021);
dune.resume();  // 'Dune (2021)'
```

- `constructor` s'exécute à la création avec `new`.
- Les méthodes (`resume`) sont **partagées** par tous les objets créés avec la classe.

### Et les prototypes ?

Derrière `class`, JavaScript utilise des **prototypes** : chaque objet a un lien vers un « parent » où il va chercher ce qu'il n'a pas lui-même. Image : si tu ne sais pas faire quelque chose, tu regardes dans le manuel de tes parents, puis de tes grands-parents.

C'est grâce à ça que `[1, 2].map(…)` fonctionne : `map` n'est pas dans ton tableau, mais dans son parent `Array.prototype`. Tu n'as pas besoin de manipuler les prototypes toi-même : `class` le fait pour toi.

## Pourquoi ça marche

**`this` est décidé à l'appel, pas à l'écriture.** Quand on écrit `film.afficher()`, JavaScript regarde ce qu'il y a **avant le point** (`film`) et le met dans `this`. Si la fonction est appelée seule (`f()`), ou par un autre code (`setInterval`), il n'y a rien avant le point : `this` est perdu.

**La fonction fléchée n'a pas de `this` à elle.** Elle utilise celui de la fonction qui l'entoure, comme n'importe quelle variable. C'est pour ça qu'elle « garde » le `this` de la méthode où elle est écrite.

**Le prototype** : si un objet n'a pas une propriété, JavaScript la cherche chez son parent, puis le parent du parent. Les méthodes d'une classe ne sont donc écrites qu'une fois, et partagées par tous les objets.

## Contre-exemple

**Intuition fausse : « dans une classe, `this` désigne toujours l'objet ».**

```js
class Player {
  name = 'Awa';
  greet() { console.log(this.name); }
}
const p = new Player();
const greet = p.greet;
greet();   // ❌ TypeError : this est undefined
```

Même dans une classe, `this` dépend de **comment** on appelle la méthode. Détachée de l'objet, elle perd son `this`.

## Pièges

- **Méthode d'objet écrite en fléchée** : là, c'est l'inverse, elle ne voit pas l'objet.
  ```js
  const film = { titre: 'Dune', afficher: () => this.titre };  // ❌ undefined
  ```
  Règle simple : **méthodes** en syntaxe normale, **callbacks** en fléché.
- **Ne jamais modifier les objets natifs** (`Array.prototype.maMethode = …`) : conflits garantis avec les librairies.

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Comment JavaScript décide-t-il de la valeur de `this` ?**

> [!check]- Réponse
> Selon la façon dont la fonction est appelée : c'est l'objet placé avant le point au moment de l'appel.

**2. Pourquoi une fonction fléchée règle-t-elle le « `this` perdu » dans un callback ?**

> [!check]- Réponse
> Elle n'a pas de `this` propre : elle utilise celui de la fonction qui l'entoure.

**3. Où JavaScript trouve-t-il `map` quand on écrit `[1, 2].map(...)` ?**

> [!check]- Réponse
> Dans le prototype du tableau, `Array.prototype`, que tous les tableaux partagent.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Le `this` perdu

Pourquoi ce code affiche-t-il `undefined` au bout d'une seconde ? Corrige-le.

```js
class Timer {
  label = 'Chargement';
  start() {
    setTimeout(function () {
      console.log(this.label);
    }, 1000);
  }
}
new Timer().start();
```

> [!tip]- Indice 1
> Qui appelle la fonction passée à `setTimeout` ? Est-ce l'objet `Timer` ?

> [!tip]- Indice 2
> Quel type de fonction garde le `this` de l'endroit où elle est écrite ?

> [!success]- Solution
> Une `function` classique a son propre `this`, qui n'est plus l'objet `Timer` quand `setTimeout` l'appelle.
>
> Correction avec une fonction fléchée, qui garde le `this` de l'endroit où elle est écrite :
>
> ```js
> start() {
>   setTimeout(() => {
>     console.log(this.label);   // "Chargement"
>   }, 1000);
> }
> ```

### Exercice 2 · Écrire une classe

Crée une classe `Movie` avec `title` et `ratings` (tableau vide au départ), une méthode `addRating(value)` qui refuse une note hors de 1 à 5 (avec `throw`), et un getter `average`.

> [!tip]- Indice 1
> Le constructeur reçoit le titre et prépare un tableau vide pour les notes.

> [!tip]- Indice 2
> Pour la moyenne : `reduce` pour la somme, puis division par le nombre de notes. Pense au cas « aucune note ».

> [!success]- Solution
> ```js
> class Movie {
>   constructor(title) {
>     this.title = title;
>     this.ratings = [];
>   }
>
>   addRating(value) {
>     if (value < 1 || value > 5) throw new Error('Note entre 1 et 5');
>     this.ratings.push(value);
>   }
>
>   get average() {
>     if (this.ratings.length === 0) return 0;
>     return this.ratings.reduce((sum, r) => sum + r, 0) / this.ratings.length;
>   }
> }
>
> const dune = new Movie('Dune');
> dune.addRating(5);
> dune.addRating(4);
> dune.average;   // 4.5
> ```

### Transfert · Le compte à rebours

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Écris une classe `Countdown` avec une propriété `seconds = 10` et une méthode `start()` qui retire 1 à `seconds` chaque seconde (avec `setInterval`) et s'arrête à 0 (`clearInterval`). Le code doit fonctionner du premier coup, sans `this` perdu.

> [!tip]- Indice 1
> Le callback de `setInterval` doit lire et modifier `this.seconds` : quel type de fonction utiliser ?

> [!tip]- Indice 2
> Garde l'identifiant renvoyé par `setInterval` dans une variable pour pouvoir l'arrêter.

> [!success]- Solution
> ```js
> class Countdown {
>   seconds = 10;
>
>   start() {
>     const id = setInterval(() => {
>       this.seconds--;
>       console.log(this.seconds);
>       if (this.seconds === 0) clearInterval(id);
>     }, 1000);
>   }
> }
>
> new Countdown().start();
> ```

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer comment la valeur de `this` est choisie, avec l'image du mot « moi »
- [ ] **Rappeler** : Dire de mémoire la règle : méthodes en syntaxe normale, callbacks en fléché
- [ ] **Utiliser** : Écrire une classe avec constructeur, méthode et getter sans modèle
- [ ] **Résoudre un problème nouveau** : Prédire la valeur de `this` dans une méthode détachée ou un callback
- [ ] **Repérer les erreurs** : Corriger un `this` perdu dans un code Angular ou un `setInterval`
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand ne pas utiliser une fléchée : comme méthode d'un objet littéral
