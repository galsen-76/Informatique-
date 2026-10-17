---
type: notion
statut: a apprendre
resume: "C'est le jeu du « plus grand ou plus petit ? » : pour deviner un nombre entre 1 et 100, tu proposes 50, puis 25 ou 75, et ainsi de suite."
revu:
sources:
  - "https://leetcode.com/explore/learn/card/binary-search/"
---
# Recherche binaire

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : C'est le jeu du « **plus grand ou plus petit ?** » : pour deviner un nombre entre 1 et 100, tu proposes 50, puis 25 ou 75, et ainsi de suite.

## Le problème

**Pourquoi c'est utile ?**
Pour trouver un élément dans une liste triée en éliminant la moitié des possibilités à chaque étape.

**Qu'est-ce qui se passait sans ça ?**
On parcourait toute la liste élément par élément, même avec des millions d'éléments déjà triés.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

À chaque question, tu élimines **la moitié** des possibilités. Résultat : 7 questions suffisent pour 100 nombres, **20** pour un million. Condition : les données doivent être **triées**. C'est le principe qui rend les **index** de base de données si rapides.

### Le code

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

### Pourquoi c'est si fort

| Éléments | Parcours un par un | Recherche binaire |
|---|---|---|
| 1 000 | jusqu'à 1 000 | 10 |
| 1 000 000 | jusqu'à 1 000 000 | 20 |
| 1 000 000 000 | jusqu'à 1 000 000 000 | 30 |

C'est la complexité **O(log n)** (voir [[Complexité Big O|Big O]]).

### Là où tu en profites sans le coder

- **Les index de base de données** : PostgreSQL range les valeurs indexées dans un arbre trié et y cherche de cette façon. C'est pour ça qu'un index transforme une requête de plusieurs secondes en quelques millisecondes (voir [[Clés index et performance|Index]]).
- **`git bisect`** : trouve le commit qui a introduit un bug en coupant l'historique en deux à chaque fois (voir [[Git avancé]]).
- **Toi-même, en déboguant** : commente la moitié du code, le bug est-il toujours là ? (voir [[Résolution de problèmes et débogage|Débogage]]).

### Recherche binaire ou Map ?

| Besoin | Outil |
|---|---|
| trouver un élément exact par sa clé | Map : encore plus rapide |
| trouver « le premier ≥ x », une plage (dates entre…) | recherche binaire sur des données triées |

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Des données non triées** : le résultat est faux, sans erreur.
- **Les bornes** (`<=`, `mid + 1`, `mid - 1`) : une erreur et la boucle ne s'arrête jamais.

## 🔗 Liens

- **Prérequis :** [[Complexité Big O]]
- **Voir aussi :** [[Algorithmes de tri]], [[Clés index et performance]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://leetcode.com/explore/learn/card/binary-search/
