---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - algo/hash
aliases:
  - "Tables de Hachage Map et Set"
parent: "[[Algorithmes]]"
children: []
related_theory:
  - "[[ALGO-01-Complexite-Big-O|Complexité Big O]]"
  - "[[BDD-07-Redis-Cle-Valeur|Redis Cache Clé-Valeur]]"
related_snippets:
  - "[[04_Snippets/algo-04-tables-de-hachage-map-set]]"
related_projects: []
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map"
---

# Tables de Hachage Map et Set

> [!abstract] Introduction
> Une table de hachage associe des clés à des valeurs avec un accès en temps constant moyen O(1) ; en JS ce sont `Map`, `Set` et les objets — l'outil n°1 pour accélérer un algorithme.

> [!warning]- Prérequis
> [[ALGO-01-Complexite-Big-O|Complexité Big O]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> const films = new Map<number, Film>();       // id → film
> films.set(42, dune); films.get(42); films.has(42); films.delete(42);
> const vus = new Set<number>([1, 2, 3]);      // valeurs uniques
> vus.has(2);                                  // O(1)
> ```

> [!example]- Analogie
> Un vestiaire avec tickets : ton ticket (clé) donne directement le bon crochet (valeur), sans parcourir tous les manteaux.

> [!question]- Pourquoi l'utiliser ?
> Transformer des recherches O(n) en O(1) : index par id, comptage d'occurrences, dédoublonnage, cache.

> [!question]- Comment ça marche ?
> Une fonction de hachage transforme la clé en position ; les collisions sont gérées en interne. `Map` vs objet : `Map` accepte n'importe quel type de clé, conserve l'ordre d'insertion, a `.size`, et est plus performante pour des ajouts/suppressions fréquents.

> [!question]- Quand l'utiliser ?
> Index de données par identifiant, comptages, dédoublonnage, mémoïsation, regroupements.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Pas d'ordre de tri ; mémoire supplémentaire ; les objets comme clés d'une `Map` sont comparés par référence.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Hachage | Transformation d'une clé en position |
| Collision | Deux clés pour la même position |
| Mémoïsation | Mise en cache de résultats de fonction |

---

## Points clés

- Recherche/insert/suppression O(1) en moyenne
- `Set` pour l'unicité et l'appartenance
- `Map` quand les clés ne sont pas des chaînes
- Normaliser l'état (dictionnaire par id) dans les stores

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Utiliser un objet `{}` avec des clés venant de l'utilisateur (`__proto__`) → préférer `Map`
> - `new Map([[{a:1}, 'x']]).get({a:1})` → undefined (référence différente)

---

## Exemple minimal

```typescript
function compterParGenre(films: Film[]): Map<string, number> {
  const compte = new Map<string, number>();
  for (const f of films) compte.set(f.genre, (compte.get(f.genre) ?? 0) + 1);
  return compte;
}
```

> [!note] Ce que j'en retiens
> Un seul parcours, un compteur par clé : O(n).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Normaliser un store (entités par id + liste d'ids) comme NgRx Entity / Pinia

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Algorithmes]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/algo-04-tables-de-hachage-map-set]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `Map.get` est-il O(1) alors que `Array.find` est O(n) ?

---

## Tâches

- [ ] #task Résoudre « Two Sum » avec une Map et « Group Anagrams »
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
