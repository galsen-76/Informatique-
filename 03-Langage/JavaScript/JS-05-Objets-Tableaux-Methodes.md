---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - frontend/javascript/objets-tableaux
aliases:
  - "Objets et Tableaux JavaScript"
parent: "[[JavaScript]]"
children:
  - "[[TG-06-Programmation-Fonctionnelle|Programmation Fonctionnelle]]"
related_theory:
  - "[[JS-02-Types-Coercition-Egalite|Types et Coercition JavaScript]]"
related_snippets:
  - "[[04_Snippets/js-05-objets-tableaux-methodes]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array"
---

# Objets et Tableaux JavaScript

> [!abstract] Introduction
> Objets et tableaux sont les structures de données de base de JS ; leurs méthodes (`map`, `filter`, `reduce`…) et la déstructuration/spread sont utilisées dans CHAQUE composant Angular ou Vue.

> [!warning]- Prérequis
> [[JS-02-Types-Coercition-Egalite|Types et Coercition JavaScript]]

---

## Théorie

> [!question]- C'est quoi ?
> ```javascript
> const film = { id: 1, titre: "Inception", genres: ["SF", "Thriller"] };
> const films = [film, { id: 2, titre: "Dune", genres: ["SF"] }];
> ```
> Outils modernes :
> - **Déstructuration** : `const { titre, annee = 2010 } = film;` / `const [premier, ...reste] = films;`
> - **Spread** `...` : copie superficielle `const copie = { ...film, titre: "Autre" };`
> - **Méthodes de tableau** : `map`, `filter`, `find`, `some`, `every`, `reduce`, `sort`, `includes`, `flatMap`

> [!example]- Analogie
> `map` est une chaîne de montage (chaque pièce entre, une pièce transformée sort), `filter` un tamis, `reduce` un entonnoir qui combine tout en un seul résultat.

> [!question]- Pourquoi l'utiliser ?
> Les frameworks réactifs demandent de créer de NOUVELLES données plutôt que de modifier les anciennes (immutabilité) : `map`/`filter`/spread le font naturellement, alors que `push`/`splice` modifient l'original.

> [!question]- Comment ça marche ?
> | Méthode | Retourne | Modifie l'original ? |
> |---|---|---|
> | `map(fn)` | Nouveau tableau transformé | Non |
> | `filter(fn)` | Nouveau tableau filtré | Non |
> | `find(fn)` | Premier élément ou `undefined` | Non |
> | `reduce(fn, init)` | Une valeur accumulée | Non |
> | `sort(fn)` | Le même tableau trié | **Oui** → préférer `toSorted()` (ES2023) |
> | `push/pop/splice` | … | **Oui** |

> [!question]- Quand l'utiliser ?
> Dès qu'on transforme une liste pour l'affichage (liste de films filtrés, total d'un panier, regroupement par catégorie).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Le spread fait une copie **superficielle** : les objets imbriqués restent partagés. Pour une copie profonde : `structuredClone(obj)`.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Déstructuration | Extraire des propriétés dans des variables |
| Spread | Étaler un tableau/objet dans un autre |
| Immutabilité | Ne jamais modifier une donnée, en créer une nouvelle |
| Copie superficielle | Copie du premier niveau seulement |

---

## Points clés

- `map`/`filter`/`reduce` ne modifient pas l'original
- `sort`, `reverse`, `splice`, `push` MODIFIENT l'original
- Spread = copie superficielle ; `structuredClone` = profonde
- `Object.keys/values/entries` pour parcourir un objet
- `Map`/`Set` quand les clés ne sont pas des chaînes ou pour l'unicité

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `films.sort()` dans un getter/computed → modifie l'état source (utiliser `[...films].sort()` ou `toSorted()`)
> - `sort()` sans comparateur trie en texte : `[10, 9, 1].sort()` → `[1, 10, 9]`
> - Oublier la valeur initiale de `reduce` sur un tableau vide → TypeError
> - Modifier un objet imbriqué d'une copie spread et changer l'original sans le savoir

---

## Exemple minimal

```javascript
const films = [
  { titre: "Inception", genre: "SF", note: 9 },
  { titre: "Dune", genre: "SF", note: 8 },
  { titre: "Heat", genre: "Polar", note: 8 },
];
const titresSF = films.filter(f => f.genre === "SF").map(f => f.titre);
const moyenne = films.reduce((s, f) => s + f.note, 0) / films.length;
const parGenre = Object.groupBy(films, f => f.genre); // ES2024
const trie = films.toSorted((a, b) => b.note - a.note);
```

> [!note] Ce que j'en retiens
> Chaîner `filter` puis `map` est lisible et ne touche jamais aux données d'origine — parfait pour un `computed()`.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Connaître la complexité : `find`/`includes` = O(n), `Set.has` = O(1) → voir [[ALGO-01-Complexite-Big-O|Complexité Big O]]
> - Utiliser `Object.groupBy`, `toSorted`, `toSpliced`, `with`, `at` (API immuables récentes)
> - Savoir quand une boucle `for...of` simple est plus lisible qu'un `reduce` illisible

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[JavaScript]]
- Sous-sujets → [[TG-06-Programmation-Fonctionnelle|Programmation Fonctionnelle]]
- À comparer avec → [[PY-02-Structures-de-donnees|Structures de données Python]], [[PY-09-Comprehensions|Comprehensions Python]]

**Pratique :**
- Extrait de code → [[04_Snippets/js-05-objets-tableaux-methodes]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelles méthodes de tableau modifient l'original ?
> - Pourquoi le spread ne suffit-il pas pour un objet imbriqué ?

> [!faq]- Questions d'entretien
> - Différence entre `map` et `forEach` ?
> - Comment copier profondément un objet ?

---

## Tâches

- [ ] #task Réécrire 5 boucles `for` d'un projet avec `map`/`filter`/`reduce`
- [ ] #task Implémenter `groupBy` avec `reduce`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
