---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - algo/recursivite
aliases:
  - "Récursivité"
parent: "[[Algorithmes]]"
related_theory:
  - "[[ALGO-06-Arbres-Graphes|Arbres et Graphes]]"
  - "[[ALGO-03-Piles-Files-Listes-Chainees|Piles Files et Listes Chaînées]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Glossary/Recursion"
---

# Récursivité

> [!abstract] En bref
> Une fonction **récursive** s'appelle **elle-même** sur un morceau plus petit du problème, jusqu'à un cas simple où elle s'arrête. Comme des **poupées russes** : pour compter les poupées, tu ouvres la première et tu comptes de la même façon celles qui sont dedans. Très utile dès que les données sont **imbriquées** : commentaires avec réponses, menus avec sous-menus, dossiers.

## Les 2 ingrédients obligatoires

```ts
function countdown(n: number): void {
  if (n === 0) {              // 1. le cas d'arrêt
    console.log('Décollage !');
    return;
  }
  console.log(n);
  countdown(n - 1);           // 2. l'appel sur un problème plus petit
}
countdown(3);   // 3, 2, 1, Décollage !
```

1. **Un cas d'arrêt** (cas de base) : sinon, elle s'appelle à l'infini.
2. **Un appel qui se rapproche** du cas d'arrêt : `n - 1`, un sous-dossier, une réponse.

## Le cas concret : des commentaires imbriqués

```ts
interface Comment {
  id: number;
  text: string;
  replies: Comment[];
}

// Nombre total de messages dans un fil : le commentaire + toutes ses réponses (et leurs réponses…)
function countMessages(c: Comment): number {
  return 1 + c.replies.reduce((sum, reply) => sum + countMessages(reply), 0);
}
```

Pas besoin de savoir à l'avance combien de niveaux il y a.

## Un composant qui s'utilise lui-même

```vue
<!-- CommentTree.vue -->
<script setup lang="ts">
defineProps<{ comment: Comment }>();
</script>

<template>
  <li>
    {{ comment.text }}
    <ul v-if="comment.replies.length">
      <CommentTree v-for="r in comment.replies" :key="r.id" :comment="r" />
    </ul>
  </li>
</template>
```

Même principe en Angular : le composant se met dans son propre template. La **forme des données** dicte la forme du code.

## Ce qui se passe en mémoire

Chaque appel s'empile sur la [[ALGO-03-Piles-Files-Listes-Chainees|pile d'appels]] en attendant le résultat du suivant. Trop d'appels (des dizaines de milliers) → erreur **« Maximum call stack size exceeded »**.

## Récursif ou boucle ?

| Données | Choix |
|---|---|
| une liste simple | une **boucle** (plus simple) |
| un arbre, des données imbriquées | la **récursivité** (bien plus naturel) |
| une très grande profondeur | une boucle avec une pile explicite |

## Pièges

- **Oublier le cas d'arrêt** → boucle infinie, puis plantage.
- **Recalculer mille fois la même chose** : le Fibonacci récursif naïf explose. Garde les résultats déjà calculés en mémoire (*mémoïsation*, avec une `Map`).
- **Un appel qui ne rapproche pas du cas d'arrêt** (oublier le `- 1`).
