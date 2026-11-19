---
type: concept
domain: javascript
module: "[[Module 05 - JavaScript]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[JavaScript]]"
  - "[[Variables et types en Python]]"
parents:
  - "[[JavaScript]]"
related:
  - "[[Tableau et objet JavaScript]]"
next_review: 
method: []
tags:
  - concept
  - javascript
---
# Variables et types en JavaScript

> [!info] En une phrase
> On déclare une valeur avec const (ne sera pas réaffectée) ou let (pourra changer) ; les types de base sont nombre, chaîne, booléen, null, undefined, objet.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```js
const nom = "export";      // chaîne (string)
let total = 0;              // nombre (number) : entiers et décimaux
const actif = true;         // booléen (boolean)
let resultat = null;        // « pas de valeur » volontaire
let x;                      // undefined : déclaré, jamais rempli
```
- **`const`** par défaut ; **`let`** si la variable doit être réaffectée. **`var`** est l'ancienne façon : à éviter.
- `typeof total` donne le type.
- Gabarit de chaîne avec des **backticks** : `` `Total : ${total} fichiers` ``.
- Comparaison : toujours **`===`** et **`!==`** (stricts). `==` convertit les types et donne des surprises (`"0" == 0` vaut `true`).

### Pourquoi ça existe
Nommer les valeurs pour les réutiliser, et dire clairement si elles changent.

### Le problème résolu
`const` empêche de réaffecter par erreur ; `===` évite les conversions cachées qui créent des bugs.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
V[Valeur] --> Q{Change ?}
  Q -->|non| C[const]
  Q -->|oui| L[let]
```

### Exemple concret
```js
const fichiers = 3;
let message = `Il y a ${fichiers} fichiers`;
if (fichiers === 0) {
  message = "Rien à zipper";
}
console.log(message, typeof fichiers); // Il y a 3 fichiers number
```
Les **valeurs « fausses »** (*falsy*) : `false`, `0`, `""`, `null`, `undefined`, `NaN`. Tout le reste est « vrai » dans un `if`.

### Cas d'utilisation
- Toute ligne de code JS
- Lire des paramètres et des réponses d'API
- Les conditions des composants React

> [!warning] À ne pas confondre
> `const` ne rend pas l'objet **figé** : `const liste = []` puis `liste.push(1)` fonctionne ; seule la réaffectation `liste = …` est interdite. Et `null` (vide volontaire) n'est pas `undefined` (jamais rempli).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine des étiquettes `const` et `let` posées sur des valeurs (nombre, texte, booléen, objet). Montre ce qu'on peut changer et ce qu'on ne peut pas.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   C[const liste] --> T[Tableau]
>   T --> P[push interdit]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Variables et types en JavaScript » et je l'intègre ici avec `![[Schéma - Variables et types en JavaScript.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[JavaScript]] · [[Variables et types en Python]]
- **Complémentaires** : [[Tableau et objet JavaScript]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
