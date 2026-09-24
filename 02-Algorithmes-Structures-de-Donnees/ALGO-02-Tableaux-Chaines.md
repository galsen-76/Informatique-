---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - algo/tableaux
aliases:
  - "Tableaux et Chaînes"
parent: "[[Algorithmes]]"
children: []
related_theory:
  - "[[ALGO-01-Complexite-Big-O|Complexité Big O]]"
  - "[[JS-05-Objets-Tableaux-Methodes|Objets et Tableaux JavaScript]]"
related_snippets:
  - "[[04_Snippets/algo-02-tableaux-chaines]]"
related_projects: []
source: "https://leetcode.com/explore/learn/card/array-and-string/"
---

# Tableaux et Chaînes

> [!abstract] Introduction
> Les tableaux (éléments contigus indexés) et les chaînes de caractères sont les structures les plus utilisées ; connaître le coût de leurs opérations évite des lenteurs cachées.

> [!warning]- Prérequis
> [[ALGO-01-Complexite-Big-O|Complexité Big O]]

---

## Théorie

> [!question]- C'est quoi ?
> | Opération (tableau JS) | Coût |
> |---|---|
> | Accès `t[i]` | O(1) |
> | `push` / `pop` (fin) | O(1) amorti |
> | `unshift` / `shift` (début) | O(n) |
> | `splice` au milieu | O(n) |
> | `includes` / `indexOf` / `find` | O(n) |
> | `sort` | O(n log n) |
> Les chaînes sont **immuables** en JS : chaque concaténation crée une nouvelle chaîne.

> [!example]- Analogie
> Un tableau est une rangée de casiers numérotés : accéder au casier 42 est immédiat, mais insérer un casier au début oblige à décaler tous les autres.

> [!question]- Pourquoi l'utiliser ?
> Les listes affichées, filtrées et triées sont le quotidien d'un développeur front.

> [!question]- Comment ça marche ?
> Techniques classiques :
> - **Deux pointeurs** : parcourir depuis les deux extrémités (palindrome, somme de paires triées)
> - **Fenêtre glissante** : sous-tableau de taille variable (plus longue sous-chaîne sans répétition)
> - **Préfixes cumulés** : sommes de plages en O(1) après un pré-calcul O(n)

> [!question]- Quand l'utiliser ?
> Traitement de listes, recherche de texte, validation de formats.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pour des insertions/suppressions fréquentes au début : file (deque) ou liste chaînée.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Index | Position d'un élément |
| Contigu | Stocké côte à côte en mémoire |
| Immuable | Qui ne peut être modifié après création |
| Fenêtre glissante | Sous-ensemble qui avance sur les données |

---

## Points clés

- Fin de tableau rapide, début lent
- Chaînes immuables → `join` pour construire beaucoup de texte
- Deux pointeurs et fenêtre glissante = patterns de base

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `shift()` dans une boucle de traitement de file
> - Construire une grosse chaîne par `+=` dans une boucle très longue

---

## Exemple minimal

```typescript
function estPalindrome(s: string): boolean {
  const t = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let g = 0, d = t.length - 1;
  while (g < d) if (t[g++] !== t[d--]) return false;
  return true;
}
estPalindrome("Engage le jeu que je le gagne"); // true
```

> [!note] Ce que j'en retiens
> Deux pointeurs : O(n) en temps, O(1) en mémoire supplémentaire.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir choisir la bonne structure selon les opérations dominantes

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Algorithmes]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/algo-02-tableaux-chaines]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `unshift` est-il O(n) ?

---

## Tâches

- [ ] #task Résoudre « Two Sum », « Valid Palindrome », « Longest Substring Without Repeating Characters »
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
