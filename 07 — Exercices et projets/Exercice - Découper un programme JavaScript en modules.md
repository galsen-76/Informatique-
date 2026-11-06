---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Portée et closure]]"
  - "[[Module JavaScript (import et export)]]"
tags:
  - exercice
---
# Exercice — Découper un programme JavaScript en modules

> [!info] Objectif
> Organiser un petit programme en plusieurs fichiers et utiliser une closure pour garder un état privé.
> Notions : [[Portée et closure]] · [[Module JavaScript (import et export)]]

## Consignes
- [ ] Crée un dossier avec `npm init -y` et ajoute `"type": "module"` dans `package.json`
- [ ] Dans `format.js`, exporte (nommé) `formaterTaille(octets)` qui renvoie « 1.2 Ko » ou « 3.4 Mo »
- [ ] Dans `compteur.js`, exporte par défaut `creerCompteur(depart)` qui renvoie un objet `{ suivant, valeur }` utilisant une variable privée
- [ ] Dans `index.js`, importe les deux, crée deux compteurs indépendants et affiche des tailles formatées
- [ ] Essaie d'accéder à la variable privée depuis `index.js` : explique l'erreur
- [ ] Retire `"type": "module"` et lis l'erreur obtenue, puis remets-le

> [!question]- Indice
> La variable privée est déclarée avec `let` dans `creerCompteur` ; les fonctions renvoyées la voient grâce à la closure, l'extérieur non.

> [!question]- Solution
> ```js
> // format.js
> export function formaterTaille(o) {
>   if (o < 1024 * 1024) return `${(o / 1024).toFixed(1)} Ko`;
>   return `${(o / 1024 / 1024).toFixed(1)} Mo`;
> }
> // compteur.js
> export default function creerCompteur(depart = 0) {
>   let n = depart;
>   return { suivant: () => ++n, valeur: () => n };
> }
> // index.js
> import creerCompteur from "./compteur.js";
> import { formaterTaille } from "./format.js";
> const a = creerCompteur(), b = creerCompteur(10);
> a.suivant(); a.suivant(); b.suivant();
> console.log(a.valeur(), b.valeur(), formaterTaille(1500), formaterTaille(5_000_000));
> ```
> Sans `"type": "module"` : *Cannot use import statement outside a module*.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
