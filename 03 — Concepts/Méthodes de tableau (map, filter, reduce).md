---
type: concept
domain: javascript
module: "[[Module 05 - JavaScript]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Tableau et objet JavaScript]]"
  - "[[Fonction fléchée et callback]]"
parents:
  - "[[Tableau et objet JavaScript]]"
related:
  - "[[Boucle (for, while)]]"
next_review: 
method: []
tags:
  - concept
  - javascript
---
# Méthodes de tableau (map, filter, reduce)

> [!info] En une phrase
> map transforme chaque élément, filter garde ceux qui passent un test, find cherche le premier, reduce combine tout en une valeur.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| Méthode | Renvoie | Exemple |
| --- | --- | --- |
| `map(f)` | un nouveau tableau transformé | `noms = taches.map(t => t.nom)` |
| `filter(f)` | les éléments pour lesquels `f` est vrai | `finies = taches.filter(t => t.fini)` |
| `find(f)` | le premier élément trouvé (ou `undefined`) | `taches.find(t => t.id === 12)` |
| `some(f)` / `every(f)` | `true` / `false` | `taches.some(t => !t.fini)` |
| `reduce(f, depart)` | une seule valeur | `total = tailles.reduce((s, x) => s + x, 0)` |
| `sort(f)` | le tableau trié (**modifie l'original**) | `tailles.sort((a, b) => a - b)` |
| `includes(x)` | `true` / `false` | `[".png", ".jpg"].includes(ext)` |

Elles **ne modifient pas** le tableau d'origine (sauf `sort`, `push`, `splice`, `reverse`).

### Pourquoi ça existe
Ces opérations reviennent tout le temps : on les écrit en une ligne lisible au lieu d'une boucle avec un tableau temporaire.

### Le problème résolu
Code plus court, plus clair et moins de bugs d'indice.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
T[Tableau] --> F[filter]
  F --> M[map]
  M --> R[reduce]
  R --> V[Valeur]
```

### Exemple concret
```js
const fichiers = [
  { nom: "a.png", taille: 120 },
  { nom: "b.txt", taille: 5 },
  { nom: "c.png", taille: 300 },
];
const totalPng = fichiers
  .filter((f) => f.nom.endsWith(".png"))
  .map((f) => f.taille)
  .reduce((somme, t) => somme + t, 0);
console.log(totalPng); // 420
```

### Cas d'utilisation
- Afficher une liste en React (`items.map(...)`)
- Filtrer des annotations par label
- Calculer un total ou un maximum

> [!warning] À ne pas confondre
> `map` (renvoie un tableau) et `forEach` (renvoie `undefined`, juste pour agir). Et `sort` sans fonction trie en **texte** : `[10, 9, 1].sort()` donne `[1, 10, 9]`.

## 3 · Pratiquer
- À partir d'une liste de tâches, obtiens les noms des tâches non finies, triés
- Calcule la taille moyenne de fichiers avec `reduce`

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Tableau et objet JavaScript]] · [[Fonction fléchée et callback]]
- **Complémentaires** : [[Boucle (for, while)]]
- **Utilisé par** : [[React]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand j'ai réussi **tous les exercices** qui l'utilisent (statut `reussi` dans l'exercice).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
