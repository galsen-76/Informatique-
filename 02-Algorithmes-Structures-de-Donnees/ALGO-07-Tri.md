---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
tags:
  - algo/tri
aliases:
  - "Algorithmes de Tri"
parent: "[[Algorithmes]]"
children: []
related_theory:
  - "[[ALGO-01-Complexite-Big-O|Complexité Big O]]"
  - "[[ALGO-02-Tableaux-Chaines|Tableaux et Chaînes]]"
related_snippets:
  - "[[04_Snippets/algo-07-tri]]"
related_projects: []
source: "https://visualgo.net/fr/sorting"
---

# Algorithmes de Tri

> [!abstract] Introduction
> Trier est l'opération de base de l'affichage de listes ; comprendre les tris classiques (bulles, insertion, fusion, rapide) et la stabilité permet d'utiliser correctement `sort()` et de réussir les entretiens.

> [!warning]- Prérequis
> [[ALGO-01-Complexite-Big-O|Complexité Big O]]

---

## Théorie

> [!question]- C'est quoi ?
> | Tri | Moyenne | Pire | Stable | Idée |
> |---|---|---|---|---|
> | Bulles | O(n²) | O(n²) | Oui | Échanger les voisins mal ordonnés |
> | Insertion | O(n²) | O(n²) | Oui | Insérer chaque élément à sa place (rapide si presque trié) |
> | Fusion (merge) | O(n log n) | O(n log n) | Oui | Diviser, trier, fusionner |
> | Rapide (quick) | O(n log n) | O(n²) | Non | Pivot, partitionner |
> | `Array.prototype.sort` (V8 : TimSort) | O(n log n) | O(n log n) | Oui | Hybride fusion + insertion |

> [!example]- Analogie
> Le tri par insertion, c'est ranger ses cartes à jouer une par une dans sa main ; le tri fusion, c'est diviser un paquet entre amis, chacun trie son tas, puis on fusionne.

> [!question]- Pourquoi l'utiliser ?
> Utiliser `sort` correctement (comparateur, stabilité, mutation), comprendre O(n log n), et savoir trier côté serveur (SQL ORDER BY + index) plutôt que côté client pour de gros volumes.

> [!question]- Comment ça marche ?
> ```typescript
> films.toSorted((a, b) => a.annee - b.annee);                 // nombres
> films.toSorted((a, b) => a.titre.localeCompare(b.titre, 'fr')); // texte avec accents
> // tri multi-critères (stable) : genre puis note décroissante
> films.toSorted((a, b) => a.genre.localeCompare(b.genre) || b.note - a.note);
> ```

> [!question]- Quand l'utiliser ?
> Côté client pour de petites listes déjà chargées ; côté serveur (SQL) dès qu'il y a pagination.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Trier côté client une page de résultats paginés ne trie que la page, pas l'ensemble.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Stable | Conserve l'ordre des éléments égaux |
| Comparateur | Fonction (a, b) → négatif, 0 ou positif |
| En place | Modifie le tableau d'origine |
| Pivot | Élément de partition du tri rapide |

---

## Points clés

- `sort` sans comparateur trie en texte
- `sort` modifie l'original → `toSorted`
- Tri stable garanti en JS moderne
- Trier côté serveur pour des données paginées

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `[10, 2, 1].sort()` → `[1, 10, 2]`
> - Trier un `computed`/signal en place

---

## Exemple minimal

```typescript
function triFusion(t: number[]): number[] {
  if (t.length <= 1) return t;
  const m = t.length >> 1;
  const g = triFusion(t.slice(0, m)), d = triFusion(t.slice(m));
  const r: number[] = [];
  while (g.length && d.length) r.push(g[0] <= d[0] ? g.shift()! : d.shift()!);
  return [...r, ...g, ...d];
}
```

> [!note] Ce que j'en retiens
> Diviser pour régner : O(n log n) garanti (version pédagogique, `shift` à éviter en production).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Choisir tri client vs serveur selon volume, pagination et index

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Algorithmes]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/algo-07-tri]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Qu'est-ce qu'un tri stable et pourquoi est-ce utile pour un tri multi-critères ?

---

## Tâches

- [ ] #task Visualiser les tris sur visualgo.net et coder insertion + fusion
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
