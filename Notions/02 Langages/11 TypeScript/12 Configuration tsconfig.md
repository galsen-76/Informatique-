---
type: notion
statut: a apprendre
resume: "tsconfig.json est le fichier de réglages de TypeScript : quels fichiers vérifier, à quel point être strict, vers quelle version de JavaScript convertir."
revu:
sources:
  - "https://www.typescriptlang.org/tsconfig"
---
# Configuration tsconfig

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : `tsconfig.json` est le **fichier de réglages** de TypeScript : quels fichiers vérifier, à quel point être strict, vers quelle version de JavaScript convertir.

## Le problème

**Pourquoi c'est utile ?**
Pour régler TypeScript : quels fichiers vérifier, à quel point être strict, vers quelle version de JavaScript compiler.

**Qu'est-ce qui se passait sans ça ?**
Sans réglage strict, TypeScript laissait passer les null et les any, et on croyait être protégé alors qu'on ne l'était pas.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Angular CLI et Vue le génèrent pour toi. Tu dois surtout savoir **lire** les options importantes et ne **jamais désactiver le mode strict**.

### Les options qui comptent

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

| Option | Ce qu'elle fait | Réglage conseillé |
|---|---|---|
| `strict` | active toutes les vérifications importantes (dont `null` / `undefined`) | **`true`, toujours** |
| `target` | version de JavaScript produite | laisse la valeur générée |
| `module` / `moduleResolution` | comment les `import` sont compris | laisse la valeur générée |
| `noUncheckedIndexedAccess` | `liste[0]` peut être `undefined` → t'oblige à vérifier | `true` (très utile) |
| `paths` | les alias `@/…` | selon ton projet |
| `include` / `exclude` | les fichiers vérifiés | laisse la valeur générée |

## 🧪 Exemple

### Ce que `strict` t'apporte

```ts
function longueur(texte: string | null) {
  return texte.length;          // ❌ avec strict : texte peut être null
}

let x;                          // ❌ avec strict : type implicite any interdit
```

Sans `strict`, ces deux lignes passent… et plantent à l'exécution.

## ⚠️ Limites et pièges

- **Mettre `strict: false`** pour faire disparaître des erreurs : tu caches des bugs.
- **Modifier `target` ou `module` au hasard** : ces réglages doivent correspondre à l'outil de build. Laisse ceux générés par Angular CLI, Vite ou Nest CLI.
- **Plusieurs `tsconfig`** (`tsconfig.app.json`, `tsconfig.spec.json`) : c'est normal, un pour l'app et un pour les tests. Ils héritent du principal avec `extends`.

## 🏋️ S'entraîner

### Vérifier tout le projet

L'éditeur vérifie le fichier ouvert. Pour vérifier **tout le projet** d'un coup (et dans la CI) :

```bash
npx tsc --noEmit        # projet TypeScript / NestJS / Angular
npx vue-tsc --noEmit    # projet Vue (vérifie aussi les .vue)
```

`--noEmit` = vérifier seulement, sans produire de fichiers.

### Exercices

#### Exercice 1 · Ce que `strict` détecte

Avec `"strict": true`, quelles erreurs apparaissent dans ce code ?

```ts
function greet(name) {
  return 'Bonjour ' + name.toUpperCase();
}

const movie = movies.find((m) => m.id === 1);
console.log(movie.title);
```

> [!success]- Solution
> - `name` a implicitement le type `any` (**noImplicitAny**) : il faut écrire `name: string`.
> - `movie` peut être `undefined` (`find` ne trouve peut-être rien) (**strictNullChecks**) : il faut `movie?.title` ou un `if (movie)`.

#### Exercice 2 · Vérifier sans compiler

Quelle commande lance la vérification de types de tout le projet sans produire de fichiers ? Pourquoi est-elle utile en CI ?

> [!success]- Solution
> ```bash
> npx tsc --noEmit
> ```
>
> Vite et esbuild **retirent** les types sans les vérifier : un projet peut se construire avec des erreurs de type. Lancer `tsc --noEmit` en CI bloque la MR si une erreur de type existe.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux TypeScript|Fondamentaux TypeScript]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.typescriptlang.org/tsconfig
