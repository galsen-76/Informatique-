---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
aliases:
  - "Fonctions Typées"
tags:
  - frontend/typescript/fonctions
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-01-Fondamentaux|Fondamentaux TypeScript]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/functions.html"
---

# Fonctions Typées

> [!abstract] En bref
> On indique le type de chaque **paramètre** et, souvent, de ce que la fonction **renvoie**. L'éditeur peut alors t'avertir si tu appelles la fonction avec de mauvaises valeurs, et il affiche ce qu'elle attend quand tu tapes son nom.

## La syntaxe

```ts
function prixTTC(prixHT: number, taux: number): number {
  return prixHT * (1 + taux);
}
//               ↑ paramètres typés        ↑ type de retour
```

En fonction fléchée :

```ts
const prixTTC = (prixHT: number, taux: number): number => prixHT * (1 + taux);
```

## Les variantes

```ts
// Paramètre optionnel (?) : toujours après les obligatoires
function saluer(prenom: string, titre?: string) {
  return titre ? `${titre} ${prenom}` : prenom;
}

// Valeur par défaut
function paginer(page: number = 1, taille = 20) { /* … */ }

// Nombre libre de paramètres (rest)
function total(...montants: number[]): number {
  return montants.reduce((s, m) => s + m, 0);
}
total(10, 20, 5);   // 35

// Paramètre objet déstructuré : pratique quand il y a beaucoup d'options
function rechercher({ texte, page = 1 }: { texte: string; page?: number }) { /* … */ }
rechercher({ texte: 'dune' });
```

| Type de retour | Sens |
|---|---|
| `: number`, `: Film` | renvoie cette valeur |
| `: void` | ne renvoie rien |
| `: Promise<Film>` | fonction `async` qui donnera un `Film` |

## Typer une fonction passée en paramètre

```ts
type Comparateur<T> = (a: T, b: T) => number;

function trier<T>(liste: T[], comparer: Comparateur<T>): T[] {
  return liste.toSorted(comparer);
}

trier(films, (a, b) => a.annee - b.annee);
```

## Quand écrire le type de retour ?

- **Fonctions exportées / publiques** : écris-le. Il sert de documentation et te prévient si tu changes le comportement par erreur.
- **Petites fonctions internes et callbacks** : laisse TypeScript le deviner.

## Pièges

- **Paramètre optionnel avant un obligatoire** : interdit.
- **Beaucoup de paramètres du même type** (`creer('Dune', 'Villeneuve', 'SF')`) : facile à inverser. Passe plutôt un objet.
