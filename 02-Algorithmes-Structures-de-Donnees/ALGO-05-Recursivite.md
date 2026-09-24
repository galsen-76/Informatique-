---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - algo/recursivite
aliases:
  - "Récursivité"
parent: "[[Algorithmes]]"
children: []
related_theory:
  - "[[ALGO-06-Arbres-Graphes|Arbres et Graphes]]"
  - "[[ALGO-03-Piles-Files-Listes-Chainees|Piles Files et Listes Chaînées]]"
related_snippets:
  - "[[04_Snippets/algo-05-recursivite]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Glossary/Recursion"
---

# Récursivité

> [!abstract] Introduction
> Une fonction récursive s'appelle elle-même sur un sous-problème plus petit jusqu'à un cas de base ; idéale pour les structures arborescentes (menus, commentaires imbriqués, DOM, JSON).

> [!warning]- Prérequis
> [[ALGO-03-Piles-Files-Listes-Chainees|Piles Files et Listes Chaînées]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> function factorielle(n: number): number {
>   if (n <= 1) return 1;            // cas de base
>   return n * factorielle(n - 1);    // appel récursif sur un problème plus petit
> }
> ```

> [!example]- Analogie
> Des poupées russes : pour compter les poupées, tu ouvres la première et tu comptes celles à l'intérieur de la même façon, jusqu'à la plus petite qui ne s'ouvre pas.

> [!question]- Pourquoi l'utiliser ?
> Certaines données sont naturellement récursives : un menu contient des sous-menus, un commentaire des réponses, un dossier des sous-dossiers.

> [!question]- Comment ça marche ?
> Deux ingrédients obligatoires : un **cas de base** (arrêt) et un **pas récursif** qui rapproche du cas de base. Chaque appel occupe une place sur la pile d'appels.
> Composant récursif : un composant Angular/Vue peut s'utiliser lui-même (arbre de commentaires).

> [!question]- Quand l'utiliser ?
> Arbres, parcours de structures imbriquées, diviser pour régner (tri fusion), backtracking.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Profondeur trop grande → « Maximum call stack size exceeded ». Recalculs exponentiels sans mémoïsation (Fibonacci naïf).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Cas de base | Condition d'arrêt |
| Appel récursif | La fonction s'appelle elle-même |
| Stack overflow | Pile d'appels dépassée |
| Mémoïsation | Cache des résultats déjà calculés |

---

## Points clés

- Toujours un cas de base atteignable
- Chaque appel consomme de la pile
- Mémoïser les sous-problèmes répétés

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier le cas de base → boucle infinie puis crash
> - Fibonacci récursif naïf en O(2ⁿ)

---

## Exemple minimal

```typescript
interface Commentaire { id: number; texte: string; reponses: Commentaire[] }
function compter(c: Commentaire): number {
  return 1 + c.reponses.reduce((s, r) => s + compter(r), 0);
}
```
```vue
<!-- CommentaireArbre.vue : composant récursif -->
<template>
  <li>{{ c.texte }}
    <ul v-if="c.reponses.length"><CommentaireArbre v-for="r in c.reponses" :key="r.id" :c="r" /></ul>
  </li>
</template>
```

> [!note] Ce que j'en retiens
> La structure des données dicte la structure du code (et des composants).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Transformer une récursion en itération avec une pile explicite

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Algorithmes]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/algo-05-recursivite]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quels sont les deux ingrédients d'une fonction récursive correcte ?

---

## Tâches

- [ ] #task Afficher un arbre de catégories récursif en Angular et en Vue
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
