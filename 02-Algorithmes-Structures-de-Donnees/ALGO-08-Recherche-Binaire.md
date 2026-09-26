---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - algo/recherche
aliases:
  - "Recherche Binaire"
parent: "[[Algorithmes]]"
related_theory:
  - "[[ALGO-07-Tri|Algorithmes de Tri]]"
  - "[[BDD-04-Indexation-Performance|Indexation et Performance SQL]]"
related_projects: []
source: "https://leetcode.com/explore/learn/card/binary-search/"
---

# Recherche Binaire

> [!abstract] En bref
> C'est le jeu du « **plus grand ou plus petit ?** » : pour deviner un nombre entre 1 et 100, tu proposes 50, puis 25 ou 75, et ainsi de suite. À chaque question, tu élimines **la moitié** des possibilités. Résultat : 7 questions suffisent pour 100 nombres, **20** pour un million. Condition : les données doivent être **triées**. C'est le principe qui rend les **index** de base de données si rapides.

## Le code

```ts
function binarySearch(sorted: number[], target: number): number {
  let low = 0;
  let high = sorted.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sorted[mid] === target) return mid;       // trouvé
    if (sorted[mid] < target) low = mid + 1;      // chercher à droite
    else high = mid - 1;                          // chercher à gauche
  }
  return -1;                                      // absent
}
```

```text
Chercher 23 dans [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
 1. milieu = 16 → 23 est plus grand → à droite
 2. milieu = 56 → plus petit → à gauche
 3. milieu = 23 → trouvé ✅   (3 étapes au lieu de 6)
```

## Pourquoi c'est si fort

| Éléments | Parcours un par un | Recherche binaire |
|---|---|---|
| 1 000 | jusqu'à 1 000 | 10 |
| 1 000 000 | jusqu'à 1 000 000 | 20 |
| 1 000 000 000 | jusqu'à 1 000 000 000 | 30 |

C'est la complexité **O(log n)** (voir [[ALGO-01-Complexite-Big-O|Big O]]).

## Là où tu en profites sans le coder

- **Les index de base de données** : PostgreSQL range les valeurs indexées dans un arbre trié et y cherche de cette façon. C'est pour ça qu'un index transforme une requête de plusieurs secondes en quelques millisecondes (voir [[BDD-04-Indexation-Performance|Index]]).
- **`git bisect`** : trouve le commit qui a introduit un bug en coupant l'historique en deux à chaque fois (voir [[GIT-08-Git-Avance|Git avancé]]).
- **Toi-même, en déboguant** : commente la moitié du code, le bug est-il toujours là ? (voir [[METH-05-Resolution-Problemes-Debug|Débogage]]).

## Recherche binaire ou Map ?

| Besoin | Outil |
|---|---|
| trouver un élément exact par sa clé | [[ALGO-04-Tables-de-Hachage-Map-Set\|Map]] : encore plus rapide |
| trouver « le premier ≥ x », une plage (dates entre…) | recherche binaire sur des données triées |

## Pièges

- **Des données non triées** : le résultat est faux, sans erreur.
- **Les bornes** (`<=`, `mid + 1`, `mid - 1`) : une erreur et la boucle ne s'arrête jamais.
