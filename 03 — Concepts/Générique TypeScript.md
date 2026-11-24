---
type: concept
module: "[[Module 06 - TypeScript]]"
related: []
tags:
  - concept
  - typescript
---
# Générique TypeScript

> [!info] En une phrase
> Un générique est un type paramétré (Array<T>, Promise<T>) : on écrit une fonction ou un type une fois, et il fonctionne avec n'importe quel type en gardant la vérification.

## 1 · Comprendre
### Définition
```ts
function premier<T>(liste: T[]): T | undefined {
  return liste[0];
}
const n = premier([1, 2, 3]);        // T = number, n: number | undefined
const s = premier(["a", "b"]);       // T = string

interface ReponsePage<T> {
  page: number;
  total: number;
  resultats: T[];
}
const r: ReponsePage<Tache> = await charger();
```
Tu en utilises déjà : `string[]` est `Array<string>`, une fonction async renvoie `Promise<T>`, `useState<number>(0)` en React.
**Contrainte** : `<T extends { id: number }>` exige que T ait un `id`.

### Pourquoi ça existe
Sans générique, il faudrait écrire une version par type, ou utiliser `any` et perdre la vérification.

### Le problème résolu
Écrire du code réutilisable (listes, réponses paginées, caches) qui reste typé.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
G[premier T] --> A[number]
  G --> B[string]
  G --> C[Tache]
```

### Exemple concret
```ts
function parId<T extends { id: number }>(liste: T[], id: number): T | undefined {
  return liste.find((x) => x.id === id);
}
async function getJson<T>(url: string): Promise<T> {
  const rep = await fetch(url);
  if (!rep.ok) throw new Error(String(rep.status));
  return rep.json() as Promise<T>;
}
const taches = await getJson<Tache[]>("/api/taches");
```

### Cas d'utilisation
- Fonctions d'appel d'API
- Hooks et services typés en React / Angular
- Structures de données réutilisables

> [!warning] À ne pas confondre
> `getJson<Tache[]>` ne **vérifie pas** que le serveur renvoie bien des tâches : c'est une promesse que tu fais au compilateur.

## 3 · Relier
- **Prérequis** : [[Type et interface TypeScript]] · [[Fonction fléchée et callback]]
