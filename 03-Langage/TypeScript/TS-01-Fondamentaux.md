---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
aliases:
  - "Fondamentaux TypeScript"
tags:
  - frontend/typescript/fondamentaux
parent: "[[TypeScript]]"
related_theory:
  - "[[JS-01-Fondamentaux|JavaScript - Fondamentaux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/"
---

# Fondamentaux TypeScript

> [!abstract] En bref
> TypeScript, c'est **JavaScript + des types**. Un type est une étiquette qui dit « cette variable contient un nombre », « cet objet a un titre et une année ». Grâce à ces étiquettes, l'éditeur te signale les erreurs **pendant que tu tapes**, avant même de lancer l'application. C'est le langage de tous tes projets.

## Le problème que ça résout

```js
// JavaScript : aucune alerte, le bug passe
function additionner(a, b) { return a + b; }
additionner(5, '10');   // '510' au lieu de 15
```

```ts
// TypeScript : l'erreur est soulignée en rouge tout de suite
function additionner(a: number, b: number): number { return a + b; }
additionner(5, '10');   // ❌ '10' n'est pas un number
```

## Comment ça marche

1. Tu écris du `.ts` avec des types (`: number`, `: string`…).
2. L'éditeur vérifie en continu et souligne les erreurs.
3. Au moment du build, TypeScript **retire tous les types** et produit du JavaScript normal. Le navigateur ne voit jamais de TypeScript.

Conséquence importante : **les types n'existent pas à l'exécution.** Ils te protègent de tes propres erreurs, mais pas d'une API qui renvoie des données inattendues. Pour ça, voir [[TS-19-Validation-Runtime-Zod|Zod]].

## Écrire des types… ou pas

TypeScript **devine** souvent le type tout seul : c'est l'**inférence**.

```ts
let titre = 'Inception';   // TypeScript sait que c'est un string
titre = 42;                // ❌ erreur

let annee: number;          // pas de valeur de départ → on précise le type
```

**Règle pratique :**
- Laisse TypeScript deviner pour les variables.
- Écris les types pour les **paramètres de fonctions** et les **objets** (avec une `interface`).

```ts
interface Film {
  titre: string;
  annee: number;
}

function afficher(film: Film) {
  return `${film.titre} (${film.annee})`;
}
```

## Le vocabulaire utile

| Mot | Sens |
|---|---|
| Type | la nature d'une donnée : texte, nombre, objet avec telle forme |
| Annotation | le `: number` que tu écris |
| Inférence | TypeScript devine le type sans annotation |
| Compiler / transpiler | transformer le TypeScript en JavaScript |
| `tsc` | le compilateur TypeScript en ligne de commande |
| Mode strict | réglage qui rend TypeScript plus exigeant (à toujours activer) |

## Pièges

- **Désactiver le mode strict** pour « aller plus vite » : tu perds l'essentiel des protections. Voir [[TS-12-Configuration-tsconfig|tsconfig]].
- **Utiliser `any`** pour faire taire une erreur : ça désactive la vérification. Cherche plutôt le bon type.
- **Annoter tout, partout** : si TypeScript devine déjà, l'annotation n'ajoute que du bruit.
