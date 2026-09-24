---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - algo/recherche
aliases:
  - "Recherche Binaire"
parent: "[[Algorithmes]]"
children: []
related_theory:
  - "[[ALGO-07-Tri|Algorithmes de Tri]]"
  - "[[BDD-04-Indexation-Performance|Indexation et Performance SQL]]"
related_snippets:
  - "[[04_Snippets/algo-08-recherche-binaire]]"
related_projects: []
source: "https://leetcode.com/explore/learn/card/binary-search/"
---

# Recherche Binaire

> [!abstract] Introduction
> Sur des données triées, la recherche binaire divise l'intervalle par deux à chaque étape : O(log n) — un million d'éléments en 20 comparaisons. C'est le principe des index de base de données.

> [!warning]- Prérequis
> [[ALGO-07-Tri|Algorithmes de Tri]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> function rechercheBinaire(t: number[], cible: number): number {
>   let g = 0, d = t.length - 1;
>   while (g <= d) {
>     const m = g + ((d - g) >> 1);
>     if (t[m] === cible) return m;
>     if (t[m] < cible) g = m + 1; else d = m - 1;
>   }
>   return -1;
> }
> ```

> [!example]- Analogie
> Deviner un nombre entre 1 et 100 en demandant « plus grand ou plus petit ? » : 7 questions suffisent toujours.

> [!question]- Pourquoi l'utiliser ?
> Comprendre pourquoi un index B-tree accélère les requêtes, et optimiser des recherches dans des listes triées (dates, versions).

> [!question]- Comment ça marche ?
> Précondition : données **triées**. Variantes : trouver la première/dernière occurrence, le premier élément ≥ x (lower bound), recherche sur la réponse (« plus petite capacité qui suffit »).

> [!question]- Quand l'utiliser ?
> Listes triées volumineuses consultées souvent, `git bisect`, bornes de plages.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Si les données changent souvent, maintenir le tri coûte ; une Map (O(1)) est parfois plus simple.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Logarithmique | Croît très lentement avec n |
| Invariant | Propriété vraie à chaque itération |
| Lower bound | Premier élément ≥ cible |

---

## Points clés

- Données triées obligatoires
- O(log n)
- Attention aux bornes (`<=`, `m ± 1`)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Boucle infinie à cause de bornes mal mises à jour

---

## Exemple minimal

```text
1 000 000 éléments → log₂(1 000 000) ≈ 20 comparaisons
```

> [!note] Ce que j'en retiens
> C'est pourquoi un index transforme une requête de plusieurs secondes en quelques millisecondes.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Reconnaître les problèmes de « recherche sur la réponse »

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Algorithmes]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/algo-08-recherche-binaire]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi la recherche binaire exige-t-elle un tableau trié ?

---

## Tâches

- [ ] #task Résoudre « Binary Search » et « First Bad Version » (c'est `git bisect` !)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
