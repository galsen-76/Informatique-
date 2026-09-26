---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - algo/complexite
aliases:
  - "Complexité Big O"
parent: "[[Algorithmes]]"
related_theory:
  - "[[JS-05-Objets-Tableaux-Methodes|Objets et Tableaux JavaScript]]"
related_projects: []
source: "https://www.bigocheatsheet.com/"
---

# Complexité Big O

> [!abstract] En bref
> La **complexité** répond à une question simple : **si j'ai 10 fois plus de données, mon code sera-t-il 10 fois plus lent ? 100 fois ? Pas plus lent ?** La notation **Big O** (`O(n)`, `O(n²)`…) donne cette réponse. Utile au quotidien : un filtre mal écrit passe inaperçu avec 100 films et fige l'écran avec 50 000.

## L'idée avec une image

Chercher un mot dans un dictionnaire :
- page par page depuis le début → si le dictionnaire double, le temps double : **O(n)** ;
- ouvrir au milieu, puis couper en deux à chaque fois → doubler le dictionnaire ajoute **une seule** étape : **O(log n)**.

## Les complexités à connaître

| Notation | Nom | Avec 1 000 éléments | Exemple |
|---|---|---|---|
| **O(1)** | constant | 1 opération | `tab[i]`, `map.get(k)`, `set.has(x)` |
| **O(log n)** | logarithmique | ~10 | recherche dans une liste triée, index de base de données |
| **O(n)** | linéaire | 1 000 | une boucle, `find`, `includes`, `filter` |
| **O(n log n)** | quasi linéaire | ~10 000 | `sort` |
| **O(n²)** | quadratique | 1 000 000 | **deux boucles imbriquées** sur les mêmes données |

Plus c'est haut dans le tableau, mieux c'est.

## Les 2 règles de calcul

1. **On garde le terme le plus gros** : `O(n² + n)` → `O(n²)`.
2. **On ignore les constantes** : `O(3n)` → `O(n)`.

On raisonne sur le **pire cas**.

## Le piège n°1 : la boucle cachée

`includes`, `find`, `indexOf`, `filter` **sont des boucles**. Dans un `map`, ça fait deux boucles imbriquées :

```ts
// ❌ O(n × m) : pour chaque film, on parcourt tous les favoris
const withFavorite = movies.map((m) => ({ ...m, favorite: favoriteIds.includes(m.id) }));

// ✅ O(n + m) : on crée un Set une fois, puis chaque vérification est instantanée
const favorites = new Set(favoriteIds);
const withFavorite2 = movies.map((m) => ({ ...m, favorite: favorites.has(m.id) }));
```

Avec 10 000 films et 1 000 favoris : 10 millions d'opérations contre 11 000.

## Autre exemple

```ts
// Y a-t-il des doublons ? O(n) au lieu de deux boucles
const hasDuplicates = (ids: number[]) => new Set(ids).size !== ids.length;
```

## Quand s'en soucier

- ✅ Dès qu'une liste **peut grossir** : catalogue, commentaires, résultats de recherche.
- ✅ Dans un `computed` ou un template qui se recalcule souvent.
- ❌ Pour 20 éléments fixes : la lisibilité compte plus. En cas de doute, **mesure**.

## Pièges

- **`includes` / `find` dans une boucle** : O(n²) caché.
- **`array.shift()` dans une boucle** : chaque appel décale tout le tableau.
- **Optimiser trop tôt** du code qui traite 10 éléments.
