---
type: concept
domain: javascript
module: "[[Module 05 - JavaScript]]"
status: a-decouvrir
level: avance
niveau: 6
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Asynchrone et Promesse]]"
parents:
  - "[[Asynchrone et Promesse]]"
related:
  - "[[Node.js]]"
  - "[[Processus]]"
next_review: 
tags:
  - concept
  - javascript
---
# Boucle d'événements

> [!info] En une phrase
> Le mécanisme qui permet à JavaScript, qui n'a qu'un seul fil d'exécution, de gérer beaucoup d'opérations en attente : il exécute une tâche, puis la suivante dans la file.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
JavaScript a **une seule pile d'appels**. Les opérations lentes (réseau, minuterie, disque) sont confiées au navigateur ou à Node. Quand elles finissent, leur callback est mis dans une **file d'attente**. La **boucle d'événements** prend le callback suivant dès que la pile est vide.
- Les **microtâches** (Promesses) passent avant les **tâches** (`setTimeout`, événements).
- Une longue boucle de calcul **bloque tout** : plus de clics, plus d'affichage.

### Pourquoi ça existe
Avoir de la concurrence (beaucoup de choses en attente à la fois) sans la complexité des fils multiples.

### Le problème résolu
Comprendre pourquoi le code asynchrone s'exécute « plus tard » et pourquoi un calcul lourd fige la page ou le serveur Node.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
P[Pile d'appels] --> V{Vide ?}
  V -->|oui| Mi[Microtâches]
  Mi --> T[Tâche suivante]
  T --> P
```

### Exemple concret
```js
console.log("A");
setTimeout(() => console.log("tâche"), 0);
Promise.resolve().then(() => console.log("microtâche"));
console.log("B");
// A, B, microtâche, tâche
```
Un serveur [[Node.js]] gère des milliers de connexions avec ce seul fil, tant qu'aucune requête ne fait de gros calcul synchrone.

### Cas d'utilisation
- Comprendre l'ordre d'exécution
- Diagnostiquer une page qui gèle
- Comprendre les performances de Node.js

> [!warning] À ne pas confondre
> **Asynchrone** n'est pas **parallèle** : rien ne s'exécute en même temps dans ton code JS, les attentes se recouvrent seulement.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine la pile d'appels, la file des tâches et la boucle. Suis un `console.log`, un `setTimeout(…, 0)` et un `fetch` dans l'ordre où ils s'affichent.

> [!example] 🔄 Change de contexte
> Redessine la même boucle pour un serveur Node qui reçoit trois requêtes en même temps. Qu'est-ce qui attend où ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Boucle d'événements » et je l'intègre ici avec `![[Schéma - Boucle d'événements.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Asynchrone et Promesse]]
- **Complémentaires** : [[Node.js]] · [[Processus]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
