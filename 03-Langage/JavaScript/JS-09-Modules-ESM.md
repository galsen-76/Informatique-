---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/modules
aliases:
  - "Modules ES JavaScript"
parent: "[[JavaScript]]"
children:
  - "[[TS-11-Modules|Modules TypeScript]]"
related_theory:
  - "[[NODE-01-Node-npm|Node.js et npm]]"
related_snippets:
  - "[[04_Snippets/js-09-modules-esm]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules"
---

# Modules ES JavaScript

> [!abstract] Introduction
> Les modules ES (`import`/`export`) découpent le code en fichiers isolés ; c'est le standard du navigateur, de Node moderne, de TypeScript, Angular et Vue — l'ancien système CommonJS (`require`) subsiste dans Node.

> [!warning]- Prérequis
> [[JS-01-Fondamentaux|Fondamentaux JavaScript]]

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> // math.js
> export const PI = 3.14159;
> export function aire(r) { return PI * r * r; }
> export default class Cercle {}
> // app.js
> import Cercle, { aire, PI as pi } from "./math.js";
> ```
> Deux systèmes :
> - **ESM** (ECMAScript Modules) : `import`/`export`, statique, standard
> - **CommonJS** (CJS) : `require()`/`module.exports`, historique de Node

> [!example]- Analogie
> Chaque module est une pièce fermée à clé ; `export` perce une fenêtre sur ce qu'on veut montrer, `import` va regarder par ces fenêtres. Rien d'autre ne fuit.

> [!question]- Pourquoi l'utiliser ?
> Isolation (pas de variables globales), réutilisation, et surtout **tree-shaking** : comme les imports ESM sont statiques, le bundler (Vite, esbuild) retire le code jamais importé.

> [!question]- Comment ça marche ?
> - Chaque fichier module a sa propre portée et est en mode strict
> - Un module n'est évalué qu'UNE fois, même importé 10 fois (singleton de fait)
> - `import()` dynamique renvoie une Promise → base du lazy loading (`loadComponent` Angular, routes Vue)
> - Dans `package.json`, `"type": "module"` rend les `.js` ESM dans Node

> [!question]- Quand l'utiliser ?
> Toujours ESM pour du nouveau code. CommonJS seulement pour de vieux outils/configs Node.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Mélanger ESM et CJS dans Node crée des erreurs (`ERR_REQUIRE_ESM`, `__dirname is not defined`). Les imports circulaires (A importe B qui importe A) donnent des valeurs `undefined` au démarrage.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| ESM | Système de modules standard `import`/`export` |
| CommonJS | Ancien système Node `require` |
| Tree-shaking | Suppression du code non utilisé au build |
| Import dynamique | `import()` qui charge un module à la demande |
| Barrel file | Fichier `index.ts` qui ré-exporte d'autres modules |

---

## Points clés

- Exports nommés recommandés (meilleur refactoring et autocomplétion)
- Un module est exécuté une seule fois
- `import()` dynamique = lazy loading
- ESM est statique → tree-shaking possible

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Imports circulaires entre services/modèles
> - Barrel files géants (`index.ts` qui ré-exporte tout) → casse le tree-shaking et ralentit les builds/tests
> - Oublier l'extension `.js` dans les imports ESM natifs Node

---

## Exemple minimal

```javascript
// Chargement à la demande d'une librairie lourde
bouton.addEventListener("click", async () => {
  const { jsPDF } = await import("jspdf");   // téléchargée uniquement au clic
  new jsPDF().text("Rapport", 10, 10).save("rapport.pdf");
});
```

> [!note] Ce que j'en retiens
> `import()` dynamique permet de ne pas alourdir le chargement initial : c'est le même mécanisme que le lazy loading des routes.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Comprendre la résolution de modules (`moduleResolution: bundler` dans tsconfig)
> - Configurer les `exports` d'un `package.json` de librairie (dual ESM/CJS)
> - Détecter les imports circulaires (madge, ESLint `import/no-cycle`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → [[TS-11-Modules|Modules TypeScript]]
- À comparer avec → [[PY-06-Modules-Packages|Modules et Packages Python]]

**Pratique :**
- Extrait de code → [[04_Snippets/js-09-modules-esm]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi le tree-shaking nécessite-t-il des imports statiques ?
> - Que se passe-t-il si deux fichiers importent le même module ?

> [!faq]- Questions d'entretien
> - Différence entre ESM et CommonJS ?

---

## Tâches

- [ ] #task Créer un mini-projet Node en `"type": "module"` avec 3 modules
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
