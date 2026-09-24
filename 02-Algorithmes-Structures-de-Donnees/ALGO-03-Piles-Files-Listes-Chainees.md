---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - algo/piles-files
aliases:
  - "Piles Files et Listes Chaînées"
parent: "[[Algorithmes]]"
children: []
related_theory:
  - "[[ALGO-02-Tableaux-Chaines|Tableaux et Chaînes]]"
  - "[[JS-06-Event-Loop|Event Loop JavaScript]]"
related_snippets:
  - "[[04_Snippets/algo-03-piles-files-listes-chainees]]"
related_projects: []
source: "https://www.geeksforgeeks.org/stack-data-structure/"
---

# Piles Files et Listes Chaînées

> [!abstract] Introduction
> Une pile (LIFO) retire le dernier élément ajouté, une file (FIFO) le premier ; une liste chaînée relie des nœuds par des pointeurs. On les retrouve partout : pile d'appels, historique, event loop, queues de jobs.

> [!warning]- Prérequis
> [[ALGO-02-Tableaux-Chaines|Tableaux et Chaînes]]

---

## Théorie

> [!question]- C'est quoi ?
> - **Pile (stack, LIFO)** : `push`, `pop` — pile d'assiettes
> - **File (queue, FIFO)** : `enqueue`, `dequeue` — file d'attente
> - **Liste chaînée** : chaque nœud contient une valeur et un lien vers le suivant ; insertion O(1) si on a le nœud, accès O(n)

> [!example]- Analogie
> Pile : une pile d'assiettes (on prend celle du dessus). File : la queue à la boulangerie (premier arrivé, premier servi).

> [!question]- Pourquoi l'utiliser ?
> Reconnaître ces structures aide à comprendre la pile d'appels (stack trace), les files de l'event loop, l'historique du navigateur (undo/redo), les files de messages (BullMQ).

> [!question]- Comment ça marche ?
> ```typescript
> // Undo / Redo avec deux piles
> class Historique<T> {
>   private annuler: T[] = [];
>   private refaire: T[] = [];
>   faire(etat: T) { this.annuler.push(etat); this.refaire = []; }
>   undo(): T | undefined { const e = this.annuler.pop(); if (e !== undefined) this.refaire.push(e); return e; }
>   redo(): T | undefined { const e = this.refaire.pop(); if (e !== undefined) this.annuler.push(e); return e; }
> }
> ```

> [!question]- Quand l'utiliser ?
> Pile : parenthèses équilibrées, undo, parcours en profondeur. File : traitement dans l'ordre, parcours en largeur, tampons.

> [!danger]- Quand NE PAS l'utiliser / Limites
> En JS, une file basée sur `shift()` est O(n) par retrait → utiliser un index de tête ou une vraie deque pour de gros volumes.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| LIFO | Last In First Out |
| FIFO | First In First Out |
| Nœud | Élément d'une liste chaînée |
| Pointeur | Référence vers un autre nœud |

---

## Points clés

- Pile = LIFO, file = FIFO
- Pile d'appels = pile ; event loop = files
- Liste chaînée : insertion rapide, accès lent

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier le cas de la pile vide

---

## Exemple minimal

```typescript
function parenthesesEquilibrees(s: string): boolean {
  const pile: string[] = [];
  const paires: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if ('([{'.includes(c)) pile.push(c);
    else if (c in paires && pile.pop() !== paires[c]) return false;
  }
  return pile.length === 0;
}
```

> [!note] Ce que j'en retiens
> Le dernier ouvert doit être le premier fermé : c'est exactement une pile.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Implémenter une file circulaire ou une deque efficace

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Algorithmes]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/algo-03-piles-files-listes-chainees]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle structure pour un historique « annuler » ?

---

## Tâches

- [ ] #task Résoudre « Valid Parentheses » et « Implement Queue using Stacks »
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
