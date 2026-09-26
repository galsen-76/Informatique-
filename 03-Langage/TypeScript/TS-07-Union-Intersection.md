---
created: 2026-09-14
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Union & Intersection Types"
tags:
  - frontend/typescript/union-intersection
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types"
---

# Union & Intersection Types

> [!abstract] En bref
> Une **union** (`A | B`) veut dire « ceci **ou** cela ». Une **intersection** (`A & B`) veut dire « ceci **et** cela à la fois ». L'union est l'outil le plus utile de TypeScript pour décrire les différents états d'une donnée.

## Union : l'un ou l'autre

```ts
let id: string | number;
id = 'abc';   // ✅
id = 42;      // ✅
id = true;    // ❌
```

Avec une union, TypeScript ne te laisse utiliser que ce qui est **commun** aux deux, tant que tu n'as pas vérifié lequel c'est :

```ts
function afficher(id: string | number) {
  id.toUpperCase();                   // ❌ n'existe pas sur number
  if (typeof id === 'string') {
    id.toUpperCase();                 // ✅ ici c'est forcément un string
  }
}
```

Cette vérification s'appelle le **narrowing** : voir [[TS-09-Type-Narrowing|Type Narrowing]].

## L'union « avec étiquette » : l'outil star

On donne à chaque cas un champ commun (souvent `status` ou `type`) qui dit de quel cas il s'agit :

```ts
type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; films: Film[] };

function afficher(etat: LoadState) {
  switch (etat.status) {
    case 'loading': return 'Chargement…';
    case 'error':   return `Erreur : ${etat.message}`;       // message existe ici
    case 'success': return `${etat.films.length} films`;     // films existe ici
  }
}
```

**Pourquoi c'est génial :** impossible d'avoir `films` pendant le chargement, ou d'oublier le cas d'erreur. Avec trois booléens séparés (`loading`, `error`, `data`), rien n'empêche des combinaisons absurdes comme « en chargement ET en erreur ».

Tu utiliseras ce modèle pour chaque appel API de tes projets.

## Intersection : tout à la fois

```ts
type AvecId = { id: number };
type AvecDates = { createdAt: Date; updatedAt: Date };

type FilmEnBase = Film & AvecId & AvecDates;   // doit avoir TOUS les champs
```

Utile pour assembler des morceaux réutilisables. Pour un objet simple, `interface … extends` fait la même chose.

## Pour s'en souvenir

- `|` ressemble à un **aiguillage** : un chemin **ou** l'autre.
- `&` se lit « **et** » : tout ensemble.

## Pièges

- **Lire un champ qui n'existe que dans un cas** sans avoir vérifié le cas : erreur TypeScript (et c'est tant mieux).
- **Intersection impossible** (`string & number`) : donne le type `never`, qui ne peut contenir aucune valeur.
