---
type: concept
domain: javascript
module: "[[Module 05 - JavaScript]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Variables et types en JavaScript]]"
parents:
  - "[[JavaScript]]"
related:
  - "[[JSON]]"
  - "[[Méthodes de tableau (map, filter, reduce)]]"
next_review: 
method: []
tags:
  - concept
  - javascript
---
# Tableau et objet JavaScript

> [!info] En une phrase
> Le tableau range des valeurs dans l'ordre ([1, 2, 3]) ; l'objet associe des clés à des valeurs ({ nom: "a", taille: 12 }).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
```js
const fichiers = ["a.txt", "b.png"];        // tableau (Array) : indices 0, 1, …
fichiers.push("c.csv");                      // ajoute à la fin
fichiers.length;                             // 3

const tache = { id: 12, nom: "Chantier", fini: false };   // objet
tache.nom;          // "Chantier"
tache["fini"];      // false
tache.labels = ["voiture"];   // ajoute une clé
```
**Déstructuration** : `const { id, nom } = tache;` et `const [premier] = fichiers;`
**Copie avec étalement** (*spread*) : `const copie = { ...tache, fini: true };` et `[...fichiers, "d.txt"]`.

### Pourquoi ça existe
Presque toutes les données manipulées sont des listes d'objets : une réponse d'API, des annotations, des tâches.

### Le problème résolu
Regrouper des informations liées sous un seul nom et les parcourir facilement.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
T[Tableau] --> O1[Objet 1]
  T --> O2[Objet 2]
  O1 --> K[clé : valeur]
```

### Exemple concret
```js
const annotations = [
  { label: "voiture", x: 10, y: 20 },
  { label: "piéton",  x: 50, y: 80 },
];
for (const a of annotations) {
  console.log(`${a.label} en (${a.x}, ${a.y})`);
}
const { label } = annotations[0];
```
C'est l'équivalent de la [[Liste et dictionnaire|liste et du dictionnaire]] Python, et c'est exactement la forme du [[JSON]].

### Cas d'utilisation
- Lire une réponse d'API
- L'état d'un composant React
- Les options passées à une fonction

> [!warning] À ne pas confondre
> Copier un objet avec `=` ne copie pas : `const b = a` désigne **le même** objet ; modifier `b` modifie `a`. Pour une copie, `{ ...a }` (copie superficielle) ou `structuredClone(a)`.

## 3 · Pratiquer
- Écris un tableau de 3 tâches (id, nom, fini) et affiche les noms avec `for…of`
- Crée une copie d'une tâche avec `fini: true` sans modifier l'originale

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Variables et types en JavaScript]]
- **Complémentaires** : [[JSON]] · [[Méthodes de tableau (map, filter, reduce)]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
