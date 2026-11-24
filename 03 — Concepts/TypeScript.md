---
type: concept
module: "[[Module 06 - TypeScript]]"
related:
  - "[[Type et interface TypeScript]]"
  - "[[Compilation TypeScript (tsc et tsconfig)]]"
tags:
  - concept
  - typescript
---
# TypeScript

> [!info] En une phrase
> TypeScript est du JavaScript avec des types : le compilateur vérifie le code avant l'exécution, puis le transforme en JavaScript normal.

## 1 · Comprendre
### Définition
On ajoute des **annotations de type** au JavaScript :
```ts
function aire(largeur: number, hauteur: number): number {
  return largeur * hauteur;
}
aire(3, "4");   // ❌ erreur AVANT d'exécuter : "4" n'est pas un number
```
Le navigateur et Node ne comprennent pas TypeScript : le compilateur `tsc` (ou un outil comme Vite) **retire les types** et produit du `.js`. Les types n'existent donc **qu'au moment du développement**.
Beaucoup de types sont **inférés** : `const n = 3` est déjà un `number`, inutile de l'écrire.

### Pourquoi ça existe
En JavaScript, les erreurs de type (propriété mal écrite, mauvais argument) n'apparaissent qu'à l'exécution, parfois en production.

### Le problème résolu
Détecter ces erreurs dans l'éditeur, avoir l'autocomplétion, et pouvoir modifier un gros projet sans peur. Angular est écrit en TypeScript ; la plupart des projets React aussi.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
TS[Code .ts] --> C[tsc vérifie]
  C -->|erreur| E[Éditeur]
  C -->|ok| JS[Code .js]
  JS --> X[Exécution]
```

### Exemple concret
```ts
const taches: string[] = ["a", "b"];
let compteur = 0;            // inféré : number
compteur = "trois";          // ❌ Type 'string' is not assignable to type 'number'

function saluer(nom?: string) {   // ? = paramètre optionnel
  return `Bonjour ${nom ?? "toi"}`;
}
```
Pour essayer sans rien installer : le *TypeScript Playground* sur typescriptlang.org.

### Cas d'utilisation
- Angular (obligatoire)
- React et Vue (très courant)
- Backend Node avec Express ou NestJS

> [!warning] À ne pas confondre
> TypeScript ne vérifie **rien à l'exécution** : une réponse d'API annoncée `Tache` peut contenir n'importe quoi. Pour vérifier les données venant de l'extérieur, il faut une [[Validation des données]].

## 3 · Relier
- **Prérequis** : [[JavaScript]] · [[Variables et types]]
- **Complémentaires** : [[Type et interface TypeScript]] · [[Compilation TypeScript (tsc et tsconfig)]]
- **Utilisé par** : [[Angular]] · [[React]]
