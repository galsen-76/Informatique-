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

## Pièges

- **Imports circulaires** : A importe B qui importe A. Résultat : des valeurs `undefined` au démarrage. Déplace le code commun dans un troisième fichier.
- **Chemins à rallonge** (`../../../shared/utils`) : utilise les alias `@/` ou `@shared/` (voir [[ARCH-15-Structure-de-Projet|Structure de projet]]).
