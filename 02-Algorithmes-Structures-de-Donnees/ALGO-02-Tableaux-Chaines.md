---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - algo/tableaux
aliases:
  - "Tableaux et Chaînes"
parent: "[[Algorithmes]]"
related_theory:
  - "[[ALGO-01-Complexite-Big-O|Complexité Big O]]"
  - "[[JS-05-Objets-Tableaux-Methodes|Objets et Tableaux JavaScript]]"
related_projects: []
source: "https://leetcode.com/explore/learn/card/array-and-string/"
---

# Tableaux et Chaînes

> [!abstract] En bref
> Un **tableau** est une rangée de casiers numérotés : aller au casier 42 est **immédiat**, mais insérer un casier **au début** oblige à décaler tous les autres. Connaître le coût de chaque opération évite des lenteurs cachées dans tes listes de films, de critiques ou de résultats.

## Ce que coûte chaque opération

| Opération | Coût | Pourquoi |
|---|---|---|
| `tab[i]` | ⚡ O(1) | on va directement au casier |
| `push` / `pop` (à la fin) | ⚡ O(1) | rien à décaler |
| `unshift` / `shift` (au début) | 🐢 O(n) | tout est décalé d'une case |
| `splice` au milieu | 🐢 O(n) | on décale la suite |
| `includes`, `indexOf`, `find` | 🐢 O(n) | on regarde chaque case |
| `sort` | O(n log n) | voir [[ALGO-07-Tri\|Tri]] |

**Règle** : ajouter et retirer **à la fin**, c'est gratuit ; **au début**, c'est cher.

## Les chaînes de caractères

Une chaîne est **immuable** : on ne la modifie jamais, chaque opération en crée une **nouvelle**.

```ts
let s = 'Dune';
s[0] = 'L';          // ignoré, s vaut toujours 'Dune'
s = 'L' + s.slice(1); // nouvelle chaîne : 'Lune'
```

Pour construire un gros texte dans une boucle, remplis un tableau puis fais `join` :

```ts
const lines: string[] = [];
for (const m of movies) lines.push(`${m.title};${m.year}`);
const csv = lines.join('\n');
```

## Deux techniques classiques

**Deux pointeurs** : un curseur au début, un à la fin, qui se rapprochent.

```ts
function isPalindrome(s: string): boolean {
  const t = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = t.length - 1;
  while (left < right) {
    if (t[left++] !== t[right--]) return false;
  }
  return true;
}
isPalindrome('Engage le jeu que je le gagne'); // true
```

**Fenêtre glissante** : une portion du tableau qui avance, sans tout recalculer. Exemple : la meilleure moyenne de notes sur 7 jours consécutifs, en retirant le jour qui sort et en ajoutant celui qui entre.

Ces techniques reviennent souvent en [[ALGO-09-Techniques-Resolution|entretien]].

## Dans tes projets

- Les méthodes à connaître par cœur (`map`, `filter`, `reduce`, `find`, `some`…) : [[JS-05-Objets-Tableaux-Methodes|Objets et tableaux]].
- Pour chercher souvent dans une liste : transforme-la en `Map` ou `Set` ([[ALGO-04-Tables-de-Hachage-Map-Set|Map et Set]]).

## Pièges

- **`shift()` pour vider une file** dans une boucle : lent sur de gros volumes.
- **`+=` sur une chaîne** dans une très longue boucle.
- **Oublier que `sort`, `reverse`, `splice` modifient** le tableau d'origine (préfère `toSorted`, `toReversed`, `toSpliced`).
