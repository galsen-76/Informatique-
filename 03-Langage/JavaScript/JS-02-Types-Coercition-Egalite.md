---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/javascript/types
aliases:
  - "Types et Coercition JavaScript"
parent: "[[JavaScript]]"
children:
  - "[[TS-09-Type-Narrowing|Type Narrowing]]"
related_theory:
  - "[[JS-01-Fondamentaux|Fondamentaux JavaScript]]"
related_snippets:
  - "[[04_Snippets/js-02-types-coercition-egalite]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Data_structures"
---

# Types et Coercition JavaScript

> [!abstract] Introduction
> JavaScript a 7 types primitifs + les objets, et convertit parfois les valeurs automatiquement (coercition) — source de bugs célèbres que TypeScript aide à éviter.

> [!warning]- Prérequis
> [[JS-01-Fondamentaux|Fondamentaux JavaScript]]

---

## Théorie

> [!question]- C'est quoi ?
> **Primitifs** (immuables, copiés par valeur) : `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`.
> **Objets** (copiés par référence) : `{}`, tableaux, fonctions, `Date`, `Map`…
> ```javascript
> typeof "a"        // "string"
> typeof 42         // "number"
> typeof null       // "object"  ← bug historique du langage !
> typeof []         // "object"  → utiliser Array.isArray()
> typeof (() => {}) // "function"
> ```

> [!example]- Analogie
> La coercition, c'est un traducteur trop zélé : tu lui donnes `"5" + 1` et au lieu de te signaler que tu mélanges des langues, il invente une traduction (`"51"`).

> [!question]- Pourquoi l'utiliser ?
> Comprendre les types et la coercition évite des bugs silencieux (`"10" > "9"` est `false` car comparaison de texte) et explique les décisions de TypeScript (`strictNullChecks`, `unknown`…).

> [!question]- Comment ça marche ?
> **Coercition implicite** :
> ```javascript
> "5" + 1    // "51"  (+ avec une string → concaténation)
> "5" - 1    // 4     (- force la conversion en nombre)
> [] + {}    // "[object Object]"
> ```
> **Valeurs « falsy »** (fausses dans un `if`) : `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. Tout le reste est « truthy » (y compris `"0"`, `[]`, `{}`).
>
> **Égalité** :
> - `===` stricte : même type ET même valeur → **toujours l'utiliser**
> - `==` lâche : convertit avant de comparer (`0 == ""` → `true`)
>
> **Opérateurs modernes** :
> - `??` (nullish) : valeur par défaut seulement si `null`/`undefined`
> - `?.` (optional chaining) : accès sûr `film?.realisateur?.nom`

> [!question]- Quand l'utiliser ?
> À chaque condition, comparaison ou valeur par défaut. Préférer `??` à `||` quand `0` ou `""` sont des valeurs valides.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour les objets, `===` compare les RÉFÉRENCES, pas le contenu : `{a:1} === {a:1}` est `false`. Pour comparer un contenu il faut une comparaison profonde (ou comparer des identifiants).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Primitif | Valeur simple, immuable, copiée par valeur |
| Référence | Adresse d'un objet en mémoire ; copier un objet copie l'adresse |
| Coercition | Conversion automatique d'un type vers un autre |
| Falsy | Valeur considérée comme fausse dans un test |
| Nullish | `null` ou `undefined` |

---

## Points clés

- 7 primitifs : string, number, bigint, boolean, undefined, null, symbol
- Toujours `===` / `!==`
- `typeof null === "object"` est un bug historique — tester `x === null`
- `??` ne remplace que `null`/`undefined`, `||` remplace toute valeur falsy
- Les objets sont comparés par référence

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `const quantite = saisie || 10` → si l'utilisateur saisit `0`, on obtient 10 (utiliser `??`)
> - `0.1 + 0.2 === 0.3` est `false` (flottants IEEE 754) → arrondir ou travailler en centimes
> - `NaN === NaN` est `false` → utiliser `Number.isNaN()`
> - `parseInt("08abc")` renvoie 8 sans erreur → valider les entrées

---

## Exemple minimal

```javascript
function prixTTC(prixHT, tva) {
  const taux = tva ?? 0.2;           // 0 reste 0, seul null/undefined → 0.2
  return Math.round(prixHT * (1 + taux) * 100) / 100;
}
prixTTC(100, 0);    // 100  (avec || on aurait 120 !)
prixTTC(100);       // 120
```

> [!note] Ce que j'en retiens
> `??` respecte les valeurs « fausses mais valides » comme `0`. C'est un réflexe à avoir pour tous les paramètres numériques.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Connaître `Object.is()` (gère `NaN` et `-0`)
> - Savoir pourquoi on stocke les montants en entiers (centimes) ou avec une lib décimale
> - Comprendre `structuredClone()` pour la copie profonde

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → [[TS-09-Type-Narrowing|Type Narrowing]]
- À comparer avec → [[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]

**Pratique :**
- Extrait de code → [[04_Snippets/js-02-types-coercition-egalite]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `[] == false` est `true` mais `if ([])` entre dans le bloc ?
> - Quelle différence entre `??` et `||` ?

> [!faq]- Questions d'entretien
> - Quelle différence entre `==` et `===` ?
> - Citez les valeurs falsy.
> - Différence entre `null` et `undefined` ?

---

## Tâches

- [ ] #task Tester dans la console 10 coercitions surprenantes et les expliquer
- [ ] #task Remplacer les `||` par `??` là où c'est pertinent dans un projet
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
