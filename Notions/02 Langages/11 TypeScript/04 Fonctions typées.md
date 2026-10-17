---
type: notion
statut: a apprendre
resume: "On indique le type de chaque paramètre et, souvent, de ce que la fonction renvoie."
revu:
sources:
  - "https://www.typescriptlang.org/docs/handbook/2/functions.html"
---
# Fonctions typées

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : On indique le type de chaque **paramètre** et, souvent, de ce que la fonction **renvoie**.

## Le problème

**Pourquoi c'est utile ?**
Pour indiquer ce qu'une fonction attend et ce qu'elle renvoie.

**Qu'est-ce qui se passait sans ça ?**
On appelait une fonction avec des paramètres dans le mauvais ordre ou du mauvais type, et le bug sortait bien plus loin.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

L'éditeur peut alors t'avertir si tu appelles la fonction avec de mauvaises valeurs, et il affiche ce qu'elle attend quand tu tapes son nom.

### La syntaxe

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

### Typer une fonction passée en paramètre

```ts
type Comparateur<T> = (a: T, b: T) => number;

function trier<T>(liste: T[], comparer: Comparateur<T>): T[] {
  return liste.toSorted(comparer);
}

trier(films, (a, b) => a.annee - b.annee);
```

### Quand écrire le type de retour ?

- **Fonctions exportées / publiques** : écris-le. Il sert de documentation et te prévient si tu changes le comportement par erreur.
- **Petites fonctions internes et callbacks** : laisse TypeScript le deviner.

## 🧪 Exemple

### Les variantes

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

## ⚠️ Limites et pièges

- **Paramètre optionnel avant un obligatoire** : interdit.
- **Beaucoup de paramètres du même type** (`creer('Dune', 'Villeneuve', 'SF')`) : facile à inverser. Passe plutôt un objet.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Typer une fonction

Type complètement cette fonction : `limit` est optionnel et vaut 10 par défaut, la fonction renvoie un tableau de titres.

```js
function topTitles(movies, limit = 10) {
  return movies.toSorted((a, b) => b.vote_average - a.vote_average).slice(0, limit).map((m) => m.title);
}
```

> [!success]- Solution
> ```ts
> function topTitles(movies: Movie[], limit = 10): string[] {
>   return movies
>     .toSorted((a, b) => b.vote_average - a.vote_average)
>     .slice(0, limit)
>     .map((m) => m.title);
> }
> ```
>
> `limit = 10` suffit : TypeScript déduit `number` et le rend optionnel.

#### Exercice 2 · Une fonction en paramètre

Écris `filterMovies(movies, predicate)` où `predicate` est une fonction qui reçoit un `Movie` et renvoie un booléen. Utilise-la pour garder les films notés plus de 7.

> [!success]- Solution
> ```ts
> function filterMovies(movies: Movie[], predicate: (movie: Movie) => boolean): Movie[] {
>   return movies.filter(predicate);
> }
>
> const good = filterMovies(movies, (m) => m.vote_average > 7);
> ```

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux TypeScript|Fondamentaux TypeScript]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://www.typescriptlang.org/docs/handbook/2/functions.html
