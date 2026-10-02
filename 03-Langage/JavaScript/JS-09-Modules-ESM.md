---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M02
tags:
  - frontend/javascript/modules
aliases:
  - "Modules ES JavaScript"
parent: "[[JavaScript]]"
related_theory:
  - "[[NODE-01-Node-npm|Node.js et npm]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules"
---

# Modules ES JavaScript

> [!abstract] En bref
> Un **module** est un fichier qui choisit ce qu'il partage (`export`) et ce qu'il utilise des autres (`import`). C'est comme ça qu'on découpe un projet en fichiers. Tous tes projets Angular, Vue et NestJS fonctionnent ainsi.

## L'image

Chaque fichier est une **pièce fermée**. `export` ouvre une fenêtre sur ce que tu veux montrer. `import` va regarder par ces fenêtres. Rien d'autre ne sort de la pièce.

## Exporter et importer

```ts
// film.utils.ts
export const NOTE_MAX = 10;
export function formaterNote(note: number) {
  return `${note}/${NOTE_MAX}`;
}
```

```ts
// app.ts
import { formaterNote, NOTE_MAX } from './film.utils';
formaterNote(8);   // '8/10'
```

| Syntaxe | Usage |
|---|---|
| `export function x` / `import { x }` | **export nommé** : à privilégier |
| `export default x` / `import x` | export par défaut : un seul par fichier |
| `import { x as y }` | renommer à l'import |
| `import * as utils` | tout importer dans un objet |

Préfère les exports nommés : l'éditeur les renomme et les retrouve mieux.

## Charger un module à la demande

`import()` avec des parenthèses charge un fichier **seulement quand on en a besoin** :

```ts
bouton.addEventListener('click', async () => {
  const { jsPDF } = await import('jspdf');   // téléchargé seulement au clic
  new jsPDF().text('Rapport', 10, 10).save('rapport.pdf');
});
```

C'est le même mécanisme que le **lazy loading** des routes Angular (`loadComponent`) et Vue (`component: () => import(…)`) : la page d'accueil se charge vite parce que le reste attend.

## Ce qu'il faut savoir

- Un module n'est exécuté **qu'une fois**, même s'il est importé dans dix fichiers.
- Les outils de build (Vite) **suppriment le code jamais importé** : c'est le *tree-shaking*.
- Tu croiseras l'ancienne syntaxe de Node : `const x = require('x')` et `module.exports = …` (CommonJS). Pour du code neuf, utilise `import` / `export`.

## Pourquoi ça marche

Sans modules, tous les fichiers partageraient les **mêmes variables globales** : deux fichiers qui déclarent `config` se marchent dessus. Avec les modules, chaque fichier a sa propre portée : rien ne sort sans `export`.

Comme les `import` sont écrits **en haut du fichier** et ne changent pas, les outils de build peuvent savoir à l'avance qui utilise quoi. C'est ce qui leur permet de supprimer le code jamais importé (*tree-shaking*) et de découper l'application en morceaux chargés à la demande.

## Contre-exemple

**Intuition fausse : « si deux fichiers importent un module, son code s'exécute deux fois ».**

```js
// counter.js
export let count = 0;
export const increment = () => count++;
console.log('counter.js chargé');
```

Importé dans dix fichiers, `counter.js` ne s'exécute **qu'une fois**, et tous partagent le **même** `count`. Un module se comporte comme un objet unique, partagé.

## Pièges

- **Imports circulaires** : A importe B qui importe A. Résultat : des valeurs `undefined` au démarrage. Déplace le code commun dans un troisième fichier.
- **Chemins à rallonge** (`../../../shared/utils`) : utilise les alias `@/` ou `@shared/` (voir [[ARCH-15-Structure-de-Projet|Structure de projet]]).

## Vérifie sans tes notes

Réponds de tête, à voix haute ou par écrit, **avant** d’ouvrir la réponse.

**1. Quelle différence entre un export nommé et un export par défaut ?**

> [!check]- Réponse
> Le nommé s'importe avec son nom exact entre accolades ; le défaut (un seul par fichier) s'importe avec le nom qu'on veut.

**2. À quoi sert `import()` avec des parenthèses ?**

> [!check]- Réponse
> À charger un module seulement au moment où on en a besoin (lazy loading).

**3. Qu'est-ce que le tree-shaking ?**

> [!check]- Réponse
> La suppression, au build, du code qui n'est jamais importé.

## Exercices

> [!info] Comment t’entraîner
> 1. Cherche seul, sans regarder la note.
> 2. Bloqué ? Ouvre l’**indice 1**, puis l’**indice 2**.
> 3. Seulement ensuite, la **solution**.
> 4. Referme tout et **refais l’exercice sans regarder**.

### Exercice 1 · Découper en modules

Tu as tout dans `main.js`. Déplace la fonction `formatYear` dans un fichier `utils.js` et importe-la. Écris les deux fichiers.

```js
// main.js
function formatYear(year) {
  return year ? `(${year})` : '';
}
console.log(formatYear(2021));
```

> [!tip]- Indice 1
> Il faut `export` devant la fonction dans `utils.js`.

> [!tip]- Indice 2
> L'import se fait avec des accolades et un chemin relatif qui commence par `./`.

> [!success]- Solution
> ```js
> // utils.js
> export function formatYear(year) {
>   return year ? `(${year})` : '';
> }
> ```
>
> ```js
> // main.js
> import { formatYear } from './utils.js';
> console.log(formatYear(2021));
> ```
>
> Dans le HTML : `<script type="module" src="main.js"></script>`.

### Exercice 2 · Export nommé ou par défaut

Quelle est la différence entre ces deux imports ? Lequel est préférable et pourquoi ?

```js
import MovieCard from './movie-card.js';
import { MovieCard } from './movie-card.js';
```

> [!tip]- Indice 1
> Un nom entre accolades doit-il correspondre exactement à celui de l'export ?

> [!tip]- Indice 2
> Avec un export par défaut, qui choisit le nom à l'import ?

> [!success]- Solution
> - Le premier importe l'**export par défaut** (`export default`) : on peut lui donner **n'importe quel nom** à l'import.
> - Le second importe un **export nommé** (`export class MovieCard`) : le nom doit être **exactement** le même.
>
> Les exports **nommés** sont préférables : l'éditeur les retrouve et les renomme partout, et le nom reste cohérent dans tout le projet.

### Transfert · Charger à la demande

Un problème différent : il vérifie que tu as compris le principe, pas seulement l’exemple.

Un bouton « Exporter en PDF » utilise une grosse librairie `pdf-lib`. Réécris ce code pour que la librairie ne soit téléchargée qu'au clic.

```js
import { PDFDocument } from 'pdf-lib';

exportButton.addEventListener('click', async () => {
  const doc = await PDFDocument.create();
});
```

> [!tip]- Indice 1
> Il faut retirer l'`import` du haut du fichier et le déplacer dans l'écouteur.

> [!tip]- Indice 2
> `import()` renvoie une Promise qui contient tous les exports du module.

> [!success]- Solution
> ```js
> exportButton.addEventListener('click', async () => {
>   const { PDFDocument } = await import('pdf-lib');
>   const doc = await PDFDocument.create();
> });
> ```
>
> La librairie n'est plus dans le fichier principal : la page se charge plus vite.

## Je maîtrise quand…

Coche quand tu sais le faire **sans aide**. Une notion n’est maîtrisée que si les 6 cases sont cochées (voir [[Methode-du-coach|Méthode du coach]]).

- [ ] **Expliquer** : Expliquer à quoi servent les modules avec l'image des pièces fermées
- [ ] **Rappeler** : Dire de mémoire les syntaxes d'export et d'import, nommé et par défaut
- [ ] **Utiliser** : Découper un fichier en modules sans modèle
- [ ] **Résoudre un problème nouveau** : Prédire qu'un module n'est exécuté qu'une fois et partagé
- [ ] **Repérer les erreurs** : Repérer un import circulaire ou un chemin à rallonge
- [ ] **Savoir quand ne pas l’utiliser** : Savoir quand utiliser l'import dynamique (lourd et rarement utilisé) et quand non
