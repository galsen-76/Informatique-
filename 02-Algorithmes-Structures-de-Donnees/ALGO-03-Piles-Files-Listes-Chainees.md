---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - algo/piles-files
aliases:
  - "Piles Files et Listes Chaînées"
parent: "[[Algorithmes]]"
related_theory:
  - "[[ALGO-02-Tableaux-Chaines|Tableaux et Chaînes]]"
  - "[[JS-06-Event-Loop|Event Loop JavaScript]]"
related_projects: []
source: "https://www.geeksforgeeks.org/stack-data-structure/"
---

# Piles Files et Listes Chaînées

> [!abstract] En bref
> Une **pile** : on retire **le dernier** posé (une pile d'assiettes). Une **file** : on retire **le premier** arrivé (la queue à la boulangerie). Tu les utilises sans le savoir : la pile d'appels de tes erreurs, le bouton « Retour » du navigateur, l'annuler / rétablir, les files de tâches de l'event loop. Une **liste chaînée** relie des éléments un par un, surtout utile à comprendre pour les entretiens.

## Pile et file

| | Pile (*stack*) | File (*queue*) |
|---|---|---|
| Règle | **dernier** entré, premier sorti (LIFO) | **premier** entré, premier sorti (FIFO) |
| Image | pile d'assiettes | file d'attente |
| En JS | `push` + `pop` | `push` + `shift` (ou un index de tête) |
| Exemples | pile d'appels, annuler, retour arrière | [[JS-06-Event-Loop\|event loop]], file de jobs (BullMQ), impressions |

```text
Pile :  push(A) push(B) push(C)  → pop() donne C
File :  push(A) push(B) push(C)  → shift() donne A
```

## Exemple : annuler / rétablir

Deux piles suffisent :

```ts
class History<T> {
  private undoStack: T[] = [];
  private redoStack: T[] = [];

  do(state: T) {
    this.undoStack.push(state);
    this.redoStack = [];               // une nouvelle action efface le « rétablir »
  }
  undo(): T | undefined {
    const s = this.undoStack.pop();
    if (s !== undefined) this.redoStack.push(s);
    return s;
  }
  redo(): T | undefined {
    const s = this.redoStack.pop();
    if (s !== undefined) this.undoStack.push(s);
    return s;
  }
}
```

## Exemple : parenthèses bien fermées

Le dernier ouvert doit être le premier fermé : c'est exactement une pile.

```ts
function isBalanced(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if ('([{'.includes(c)) stack.push(c);
    else if (c in pairs && stack.pop() !== pairs[c]) return false;
  }
  return stack.length === 0;
}
isBalanced('{ a: [1, 2] }'); // true
```

## La pile d'appels, dans tes erreurs

Quand une erreur s'affiche avec une liste de fonctions (*stack trace*), c'est la **pile d'appels** : la fonction du haut est la dernière appelée, celle où ça a cassé.

```text
TypeError: Cannot read properties of undefined (reading 'title')
    at MovieCard.render      ← ici
    at MovieGrid.render
    at MoviesPage.render
```

## La liste chaînée

Chaque élément contient sa valeur **et** un lien vers le suivant.

```text
[Dune] → [Alien] → [Heat] → null
```

| | Tableau | Liste chaînée |
|---|---|---|
| Aller au 500ᵉ élément | ⚡ immédiat | 🐢 500 sauts |
| Insérer au début | 🐢 tout décaler | ⚡ changer un lien |

En JavaScript, on s'en sert rarement directement, mais c'est un classique d'entretien.

## Pièges

- **Oublier le cas vide** : `pop()` sur une pile vide renvoie `undefined`.
- **Une grosse file avec `shift()`** : chaque retrait décale tout le tableau ; garde plutôt un index de tête.
