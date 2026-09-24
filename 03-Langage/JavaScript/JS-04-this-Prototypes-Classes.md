---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
tags:
  - frontend/javascript/this-prototypes
aliases:
  - "this et Prototypes JavaScript"
parent: "[[JavaScript]]"
children:
  - "[[TS-05-Classes|Classes TypeScript]]"
related_theory:
  - "[[JS-03-Fonctions-Scope-Closures|Fonctions Scope et Closures JavaScript]]"
related_snippets:
  - "[[04_Snippets/js-04-this-prototypes-classes]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this"
---

# this et Prototypes JavaScript

> [!abstract] Introduction
> `this` désigne l'objet qui « appelle » une fonction et dépend de la façon dont elle est appelée ; les prototypes sont le mécanisme d'héritage réel caché derrière le mot-clé `class`.

> [!warning]- Prérequis
> [[JS-03-Fonctions-Scope-Closures|Fonctions Scope et Closures JavaScript]]

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> const film = {
>   titre: "Inception",
>   afficher() { console.log(this.titre); }
> };
> film.afficher();                 // "Inception" → this = film
> const f = film.afficher;
> f();                             // undefined → this perdu !
> ```
> Chaque objet a un lien caché vers un **prototype** ; si une propriété n'existe pas sur l'objet, JS la cherche sur son prototype, puis le prototype du prototype… (chaîne de prototypes).

> [!example]- Analogie
> `this`, c'est le mot « moi » : sa signification dépend de QUI parle, pas de qui a écrit la phrase. Le prototype, c'est le manuel familial : si tu ne sais pas faire quelque chose, tu regardes dans le manuel de tes parents, puis de tes grands-parents.

> [!question]- Pourquoi l'utiliser ?
> Angular et Vue utilisent des classes/objets partout ; les bugs de `this` perdu (callback, `setTimeout`, handler d'événement) sont parmi les plus fréquents chez les débutants.

> [!question]- Comment ça marche ?
> Règles de `this` (par priorité) :
> 1. `new Fn()` → `this` = le nouvel objet
> 2. `fn.call(obj)` / `apply` / `bind` → `this` = `obj`
> 3. `obj.fn()` → `this` = `obj`
> 4. Appel simple `fn()` → `undefined` (mode strict)
> 5. **Fonction fléchée** → pas de `this` propre, elle prend celui de la portée englobante
>
> `class` est du « sucre syntaxique » au-dessus des prototypes :
> ```javascript
> class Film {
>   constructor(titre) { this.titre = titre; }
>   afficher() { return this.titre; }   // stockée sur Film.prototype
> }
> ```

> [!question]- Quand l'utiliser ?
> Comprendre `this` est indispensable dès qu'on passe une méthode en callback. Manipuler directement `prototype` est rare aujourd'hui (on utilise `class`).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Ne jamais modifier le prototype d'objets natifs (`Array.prototype.maMethode = …`) : conflits avec les librairies et les futures versions du langage.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `this` | Contexte d'appel d'une fonction |
| Prototype | Objet dont un autre objet hérite ses propriétés |
| `bind` | Crée une fonction avec un `this` figé |
| Sucre syntaxique | Syntaxe plus agréable pour un mécanisme existant |

---

## Points clés

- `this` dépend de l'APPEL, pas de la définition (sauf fléchées)
- Les fléchées capturent le `this` extérieur → idéales pour les callbacks dans une classe
- `class` = prototypes avec une syntaxe propre
- Méthodes de classe partagées via le prototype (une seule copie en mémoire)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Passer `this.methode` en callback (`setTimeout(this.maj, 100)`) → `this` perdu ; utiliser `() => this.maj()`
> - Définir une méthode d'objet en fléchée puis utiliser `this` dedans
> - Confondre `__proto__` (lien d'un objet) et `prototype` (propriété d'une fonction constructeur)

---

## Exemple minimal

```javascript
class Minuteur {
  secondes = 0;
  demarrer() {
    setInterval(() => this.secondes++, 1000);   // ✅ fléchée : this = l'instance
    // setInterval(function () { this.secondes++ }, 1000); // ❌ this = undefined
  }
}
```

> [!note] Ce que j'en retiens
> Dans une classe Angular/Vue, utiliser des fonctions fléchées pour les callbacks évite 90 % des bugs de `this`.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir expliquer la chaîne de prototypes avec `Object.getPrototypeOf`
> - Connaître les champs privés natifs `#champ` (vs `private` TypeScript qui n'existe qu'à la compilation)
> - Comprendre le coût mémoire de méthodes fléchées en propriétés de classe (une copie par instance)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → [[TS-05-Classes|Classes TypeScript]]
- À comparer avec → [[PY-05-POO-Classes|POO Classes Python]]

**Pratique :**
- Extrait de code → [[04_Snippets/js-04-this-prototypes-classes]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `const f = film.afficher; f()` perd-il `this` ?
> - Que devient `this` dans une fonction fléchée ?

> [!faq]- Questions d'entretien
> - Expliquez les 4 règles de `this`.
> - Qu'est-ce que l'héritage prototypal ?

---

## Tâches

- [ ] #task Reproduire le bug du `this` perdu dans un `setTimeout` puis le corriger de 3 façons (bind, fléchée, closure)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
