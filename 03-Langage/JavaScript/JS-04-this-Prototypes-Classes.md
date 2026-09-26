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

## Pièges

- **Méthode d'objet écrite en fléchée** : là, c'est l'inverse, elle ne voit pas l'objet.
  ```js
  const film = { titre: 'Dune', afficher: () => this.titre };  // ❌ undefined
  ```
  Règle simple : **méthodes** en syntaxe normale, **callbacks** en fléché.
- **Ne jamais modifier les objets natifs** (`Array.prototype.maMethode = …`) : conflits garantis avec les librairies.
