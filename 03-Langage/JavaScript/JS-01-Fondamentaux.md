---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/javascript/fondamentaux
aliases:
  - "Fondamentaux JavaScript"
parent: "[[JavaScript]]"
children:
  - "[[JS-02-Types-Coercition-Egalite|Types et Coercition JavaScript]]"
  - "[[JS-03-Fonctions-Scope-Closures|Fonctions Scope et Closures JavaScript]]"
related_theory:
  - "[[TG-01-Comment-fonctionne-un-programme|Comment fonctionne un programme]]"
related_snippets:
  - "[[04_Snippets/js-01-fondamentaux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide"
---

# Fondamentaux JavaScript

> [!abstract] Introduction
> JavaScript est LE langage exécuté par tous les navigateurs : il rend les pages interactives, et grâce à Node.js il tourne aussi côté serveur. TypeScript, Angular et Vue reposent entièrement sur lui.

> [!warning]- Prérequis
> Aucun — c'est la porte d'entrée. Avoir lu [[TG-01-Comment-fonctionne-un-programme|Comment fonctionne un programme]] aide.

---

## Théorie

> [!question]- C'est quoi ?
> JavaScript (JS) est un langage **interprété / compilé à la volée (JIT)**, **dynamiquement typé** et **mono-thread**. Il suit la norme **ECMAScript** (ES2015 = ES6, puis une version par an : ES2016… ES2025).
> ```javascript
> const titre = "Inception";   // constante (ne peut pas être réassignée)
> let note = 8;                 // variable réassignable
> note = 9;
> console.log(`${titre} : ${note}/10`);
> ```

> [!example]- Analogie
> Si HTML est le squelette d'une page et CSS ses vêtements, JavaScript en est le système nerveux : il réagit aux actions (clic, frappe) et modifie le corps en conséquence.

> [!question]- Pourquoi l'utiliser ?
> - C'est le seul langage compris nativement par les navigateurs.
> - TypeScript n'est QUE du JavaScript + des types : sans bases JS solides, on ne comprend ni les erreurs TS, ni Angular, ni Vue.
> - Avec Node.js, un même langage sert du front au back (full stack JS/TS).

> [!question]- Comment ça marche ?
> 1. Le navigateur télécharge le fichier `.js`.
> 2. Le moteur (V8 dans Chrome/Node, SpiderMonkey dans Firefox) le parse puis le compile à la volée.
> 3. Le code s'exécute sur **un seul thread** ; l'asynchrone est géré par la [[JS-06-Event-Loop|Event Loop JavaScript]].
>
> Déclarations :
> - `const` : liaison non réassignable (mais un objet `const` reste modifiable à l'intérieur !)
> - `let` : variable réassignable, portée de **bloc** `{ }`
> - `var` : ancienne syntaxe, portée de **fonction** + hoisting → à ne plus utiliser

> [!question]- Quand l'utiliser ?
> Tout le temps : chaque ligne de TypeScript que tu écris finit en JavaScript. Écrire du JS "pur" sert surtout pour des scripts rapides, de la config (`vite.config.js`) ou pour comprendre ce que TS produit.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Sans types, les erreurs n'apparaissent qu'à l'exécution. Sur un vrai projet d'équipe, on préfère TypeScript. JS est aussi mono-thread : un calcul lourd bloque toute l'interface (→ Web Workers).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| ECMAScript | La norme officielle qui définit JavaScript |
| Moteur JS | Programme qui exécute le JS (V8, SpiderMonkey) |
| JIT | Just-In-Time : compilation pendant l'exécution |
| Hoisting | « Remontée » des déclarations en haut de leur portée |
| Portée (scope) | Zone du code où une variable est accessible |

---

## Points clés

- `const` par défaut, `let` si réassignation, jamais `var`
- JS est mono-thread : l'asynchrone repose sur l'event loop
- `const` empêche la réassignation, PAS la modification d'un objet
- Point-virgule optionnel (ASI) mais recommandé / géré par Prettier
- Le même langage tourne dans le navigateur ET côté serveur (Node.js)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Utiliser `var` → fuites de portée et bugs dans les boucles
> - Croire que `const tab = []` rend le tableau immuable (`tab.push()` fonctionne)
> - Oublier que les variables non déclarées deviennent globales hors mode strict (`"use strict"`, activé d'office dans les modules ES)
> - Confondre Java et JavaScript : aucun lien à part le nom

---

## Paramètres / Configuration

| Mot-clé | Portée | Réassignable | Hoisting |
|---------|--------|--------------|----------|
| `var` | Fonction | Oui | Oui (vaut `undefined`) |
| `let` | Bloc | Oui | Oui mais « zone morte temporelle » (TDZ) |
| `const` | Bloc | Non | Oui mais TDZ |

---

## Exemple minimal

```javascript
const film = { titre: "Inception", annee: 2010 };
film.annee = 2011;        // ✅ autorisé : on modifie l'objet, pas la liaison
// film = {};             // ❌ TypeError : Assignment to constant variable

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2  (avec var : 3, 3, 3)
}
```

> [!note] Ce que j'en retiens
> `let` crée une nouvelle variable à chaque tour de boucle : c'est pour ça que les callbacks affichent 0, 1, 2. Avec `var`, il n'y a qu'une seule variable partagée.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Connaître la TDZ (Temporal Dead Zone) et savoir l'expliquer
> - Savoir lire la spec ECMAScript / le tableau de compatibilité (caniuse, MDN) pour choisir une cible de build
> - Comprendre qu'un moteur optimise les « formes » d'objets (hidden classes) : ne pas changer la forme d'un objet en boucle chaude

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → [[JS-02-Types-Coercition-Egalite|Types et Coercition JavaScript]], [[JS-03-Fonctions-Scope-Closures|Fonctions Scope et Closures JavaScript]]
- À comparer avec → [[TS-01-Fondamentaux|Fondamentaux TypeScript]], [[PY-01-Fondamentaux|Fondamentaux Python]]

**Pratique :**
- Extrait de code → [[04_Snippets/js-01-fondamentaux]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi la boucle avec `var` affiche-t-elle 3, 3, 3 ?
> - Quelle différence entre « réassigner » et « modifier » une variable `const` ?

> [!faq]- Questions d'entretien
> - Différences entre `var`, `let` et `const` ?
> - Qu'est-ce que le hoisting ?
> - JavaScript est-il compilé ou interprété ?

---

## Tâches

- [ ] #task Refaire l'exemple de la boucle avec `var` puis `let` dans la console du navigateur
- [ ] #task Lire la page MDN « Grammaire et types »
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Quelle version d'ECMAScript cible le build Angular du projet au travail ?
