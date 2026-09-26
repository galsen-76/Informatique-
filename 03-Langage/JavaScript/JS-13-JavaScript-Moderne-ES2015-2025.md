---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M02
tags:
  - frontend/javascript/moderne
aliases:
  - "JavaScript Moderne ES2015+"
parent: "[[JavaScript]]"
related_theory:
  - "[[JS-05-Objets-Tableaux-Methodes|Objets et Tableaux JavaScript]]"
  - "[[JS-07-Promises-Async-Await|Promises et Async Await JavaScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://github.com/tc39/proposals/blob/main/finished-proposals.md"
---

# JavaScript Moderne ES2015+

> [!abstract] En bref
> JavaScript s'enrichit chaque année. Cette note est un **aide-mémoire** des écritures modernes que tu croiseras dans tout code Angular, Vue ou Node. Pas besoin de tout apprendre d'un coup : reviens-y quand tu tombes sur une syntaxe inconnue.

## Les écritures du quotidien

| Écriture | Ce qu'elle fait | Exemple |
|---|---|---|
| `const` / `let` | déclarer une variable | `const titre = 'Dune'` |
| Fonction fléchée | fonction courte | `const doubler = n => n * 2` |
| Template string | insérer des variables dans un texte | `` `Note : ${note}/10` `` |
| Déstructuration | sortir des champs | `const { titre, annee } = film` |
| Spread `...` | copier / fusionner | `{ ...film, note: 9 }` |
| Paramètre par défaut | valeur si rien n'est passé | `function f(page = 1)` |
| `?.` | lire sans planter si vide | `user?.adresse?.ville` |
| `??` | valeur par défaut si `null`/`undefined` | `note ?? 0` |
| `??=` | assigner seulement si vide | `config.retry ??= 3` |
| `async` / `await` | attendre une Promise | `const r = await fetch(url)` |
| `import` / `export` | modules | `import { x } from './x'` |
| `class` | classes | `class Film { … }` |
| `1_000_000` | séparer les chiffres pour lire | `const budget = 1_500_000` |

## Les méthodes récentes utiles

| Méthode | Ce qu'elle fait |
|---|---|
| `tableau.at(-1)` | dernier élément |
| `toSorted()`, `toReversed()` | trier / inverser **sans modifier** l'original |
| `tableau.with(i, valeur)` | copie avec un élément remplacé |
| `findLast()` | dernier élément qui correspond |
| `Object.groupBy(films, f => f.genre)` | regrouper par catégorie |
| `structuredClone(obj)` | copie complète (même les objets imbriqués) |
| `texte.replaceAll('a', 'b')` | remplacer toutes les occurrences |

## Exemple : avant / après

```js
// Avant
var ville = user && user.adresse && user.adresse.ville ? user.adresse.ville : 'Inconnue';
var dernier = films[films.length - 1];

// Aujourd'hui
const ville = user?.adresse?.ville ?? 'Inconnue';
const dernier = films.at(-1);
```

## À savoir

Ton code moderne est **converti** par les outils de build (TypeScript, Vite) pour fonctionner sur les navigateurs visés. Les **syntaxes** (`?.`, `??`) sont toujours converties. Les **nouvelles méthodes** (`Object.groupBy`, `toSorted`) ne le sont pas : sur de très vieux navigateurs, elles peuvent manquer. En pratique, sur des navigateurs à jour, tout fonctionne.
