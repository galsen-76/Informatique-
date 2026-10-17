---
type: notion
statut: a apprendre
resume: "Un tableau est une rangée de casiers numérotés : aller au casier 42 est immédiat, mais insérer un casier au début oblige à décaler tous les autres."
revu:
sources:
  - "https://leetcode.com/explore/learn/card/array-and-string/"
---
# Tableaux et chaînes

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **tableau** est une rangée de casiers numérotés : aller au casier 42 est **immédiat**, mais insérer un casier **au début** oblige à décaler tous les autres.

## Le problème

**Pourquoi c'est utile ?**
Pour connaître le coût réel des opérations sur les tableaux et le texte, les structures qu'on utilise le plus.

**Qu'est-ce qui se passait sans ça ?**
On écrivait des boucles qui insèrent au début ou cherchent partout sans le savoir, et l'application ralentissait sans raison apparente.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Connaître le coût de chaque opération évite des lenteurs cachées dans tes listes de films, de critiques ou de résultats.

### Ce que coûte chaque opération

| Opération | Coût | Pourquoi |
|---|---|---|
| `tab[i]` | ⚡ O(1) | on va directement au casier |
| `push` / `pop` (à la fin) | ⚡ O(1) | rien à décaler |
| `unshift` / `shift` (au début) | 🐢 O(n) | tout est décalé d'une case |
| `splice` au milieu | 🐢 O(n) | on décale la suite |
| `includes`, `indexOf`, `find` | 🐢 O(n) | on regarde chaque case |
| `sort` | O(n log n) | voir Tri |

**Règle** : ajouter et retirer **à la fin**, c'est gratuit ; **au début**, c'est cher.

### Les chaînes de caractères

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

### Deux techniques classiques

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

Ces techniques reviennent souvent en [[Techniques de résolution d'algorithmes|entretien]].

## 🧪 Exemple

### Dans tes projets

- Les méthodes à connaître par cœur (`map`, `filter`, `reduce`, `find`, `some`…) : [[Objets et tableaux JavaScript|Objets et tableaux]].
- Pour chercher souvent dans une liste : transforme-la en `Map` ou `Set` ([[Tables de hachage Map et Set|Map et Set]]).

## ⚠️ Limites et pièges

- **`shift()` pour vider une file** dans une boucle : lent sur de gros volumes.
- **`+=` sur une chaîne** dans une très longue boucle.
- **Oublier que `sort`, `reverse`, `splice` modifient** le tableau d'origine (préfère `toSorted`, `toReversed`, `toSpliced`).

## 🔗 Liens

- **Prérequis :** [[Complexité Big O]]
- **Voir aussi :** [[Objets et tableaux JavaScript]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://leetcode.com/explore/learn/card/array-and-string/
