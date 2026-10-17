---
type: notion
statut: a apprendre
resume: "TypeScript, c'est JavaScript + des types."
revu:
sources:
  - "https://www.typescriptlang.org/docs/"
---
# Fondamentaux TypeScript

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : TypeScript, c'est **JavaScript + des types**.

## Le problème

**Pourquoi c'est utile ?**
Pour ajouter des types à JavaScript et repérer les erreurs pendant qu'on tape.

**Qu'est-ce qui se passait sans ça ?**
En JavaScript pur, les fautes de frappe et les mauvais types n'apparaissaient qu'à l'exécution.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Un type est une étiquette qui dit « cette variable contient un nombre », « cet objet a un titre et une année ». Grâce à ces étiquettes, l'éditeur te signale les erreurs **pendant que tu tapes**, avant même de lancer l'application. C'est le langage de tous tes projets.

### Le problème que ça résout

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

### Comment ça marche

1. Tu écris du `.ts` avec des types (`: number`, `: string`…).
2. L'éditeur vérifie en continu et souligne les erreurs.
3. Au moment du build, TypeScript **retire tous les types** et produit du JavaScript normal. Le navigateur ne voit jamais de TypeScript.

Conséquence importante : **les types n'existent pas à l'exécution.** Ils te protègent de tes propres erreurs, mais pas d'une API qui renvoie des données inattendues. Pour ça, voir [[Validation runtime avec Zod|Zod]].

### Le vocabulaire utile

| Mot | Sens |
|---|---|
| Type | la nature d'une donnée : texte, nombre, objet avec telle forme |
| Annotation | le `: number` que tu écris |
| Inférence | TypeScript devine le type sans annotation |
| Compiler / transpiler | transformer le TypeScript en JavaScript |
| `tsc` | le compilateur TypeScript en ligne de commande |
| Mode strict | réglage qui rend TypeScript plus exigeant (à toujours activer) |

## 🧪 Exemple

### Écrire des types… ou pas

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

## ⚠️ Limites et pièges

- **Désactiver le mode strict** pour « aller plus vite » : tu perds l'essentiel des protections. Voir [[Configuration tsconfig|tsconfig]].
- **Utiliser `any`** pour faire taire une erreur : ça désactive la vérification. Cherche plutôt le bon type.
- **Annoter tout, partout** : si TypeScript devine déjà, l'annotation n'ajoute que du bruit.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Trouver les erreurs

Quelles lignes TypeScript signale-t-il en rouge, et pourquoi ?

```ts
let title = 'Dune';
title = 2021;

function double(n: number) {
  return n * 2;
}
double('4');

const movie = { title: 'Dune', year: 2021 };
movie.rating;
```

> [!success]- Solution
> - `title = 2021` : `title` a été **inféré** comme `string` à la première ligne, on ne peut pas y mettre un nombre.
> - `double('4')` : le paramètre attend un `number`, pas un `string`.
> - `movie.rating` : la propriété `rating` n'existe pas sur l'objet.
>
> Trois erreurs trouvées **avant** d'exécuter le code : c'est tout l'intérêt de TypeScript.

#### Exercice 2 · Après la compilation

Que reste-t-il de ce code une fois transformé en JavaScript ? Qu'en déduis-tu pour les données d'une API ?

```ts
interface Movie { title: string; year: number }
const movie: Movie = await fetch('/api/movies/1').then((r) => r.json());
```

> [!success]- Solution
> ```js
> const movie = await fetch('/api/movies/1').then((r) => r.json());
> ```
>
> L'interface et le `: Movie` **disparaissent**. TypeScript fait confiance à l'annotation mais ne vérifie rien à l'exécution : si l'API renvoie autre chose, rien ne le signale. Pour vérifier vraiment, il faut un schéma de validation comme Zod.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Fondamentaux JavaScript]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.typescriptlang.org/docs/
