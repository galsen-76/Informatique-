---
type: notion
statut: a apprendre
resume: "Un code est lu bien plus souvent qu'il n'est écrit : par tes collègues, par le relecteur de ta MR, et par toi dans 3 mois."
revu:
sources:
  - "https://martinfowler.com/bliki/TwoHardThings.html"
---
# Lisibilité et nommage du code

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un code est **lu bien plus souvent qu'il n'est écrit** : par tes collègues, par le relecteur de ta MR, et par toi dans 3 mois.

## Le problème

**Pourquoi c'est utile ?**
Pour écrire un code que les autres (et toi dans 3 mois) comprennent du premier coup.

**Qu'est-ce qui se passait sans ça ?**
Des variables x, data2, tmp : relire ou relire une MR prenait des heures, et les bugs se cachaient dans le flou.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Bien nommer et garder un code simple est la première compétence d'un développeur pro. Un bon nom vaut mieux qu'un commentaire : un code bien nommé ressemble à une cuisine où chaque bocal porte une étiquette.

### Avant / après

```ts
// ❌ Que fait cette fonction ?
function f(u) {
  if (u) {
    if (u.a) {
      return u.r === 'admin';
    }
  }
  return false;
}

// ✅ Le nom raconte l'intention, pas d'imbrication
function isActiveAdmin(user?: User): boolean {
  if (!user?.active) return false;
  return user.role === 'admin';
}
```

### Les règles de nommage

| Élément | Règle | ✅ | ❌ |
|---|---|---|---|
| Variable | ce qu'elle **contient** | `unseenMovies` | `data2`, `tmp`, `list` |
| Booléen | une **question** | `isFavorite`, `canEdit`, `hasError` | `favorite`, `flag` |
| Fonction | un **verbe** d'action | `loadMovies()`, `toggleFavorite()` | `movies()`, `handle()` |
| Tableau | au **pluriel** | `movies` | `movieList`, `arr` |
| Constante | ce que vaut le nombre | `SEARCH_DELAY_MS = 300` | `300` perdu dans le code |

Pas d'abréviation obscure : `movieService`, pas `mvSvc`. Et une **seule langue** dans le code (l'anglais, comme les frameworks).

### Les commentaires

- Commente le **pourquoi**, pas le **quoi** (le code dit déjà quoi).
- Un commentaire qui explique un nom obscur → **renomme** plutôt.
- Voir [[Documentation technique]].

### Les outils qui aident

- **ESLint** et **Prettier** : style et erreurs courantes corrigés automatiquement (voir [[Qualité lint et SonarQube|Qualité et lint]]).
- **Renommer** avec l'IDE (`Maj + F6` dans IntelliJ) : tous les usages sont mis à jour (voir [[Refactoring IntelliJ|Refactoring]]).
- **La relecture** de MR : si le relecteur pose une question, le code n'était pas assez clair (voir [[Code review]]).

## 🧪 Exemple

### Les règles de structure

**Sortir tôt plutôt qu'imbriquer** (*guard clauses*) :

```ts
// ❌ pyramide
if (user) {
  if (movie) {
    if (!alreadyFavorite) {
      addFavorite();
    }
  }
}

// ✅ on élimine les cas un par un
if (!user || !movie) return;
if (alreadyFavorite) return;
addFavorite();
```

**Une fonction fait une seule chose** : si son nom contient « et » (`loadAndDisplayAndSave`), découpe-la.

**Pas de nombre magique** :

```ts
// ❌ debounceTime(300)          pourquoi 300 ?
// ✅ debounceTime(SEARCH_DELAY_MS)
```

## ⚠️ Limites et pièges

- **Être astucieux** : une ligne géniale mais illisible coûte plus cher que trois lignes claires.
- **Des noms qui mentent** : `getMovies()` qui modifie aussi la base.
- **Mélanger français et anglais** dans les noms.

## 🏋️ S'entraîner

### Exercices

#### Exercice 1 · Renommer

Donne de meilleurs noms :

```ts
const d = await getData();
const flag = user.role === 'admin';
const arr2 = movies.filter((x) => x.r > 4);
function handle() { /* ajoute ou retire un favori */ }
setTimeout(refresh, 86400000);
```

> [!success]- Solution
> ```ts
> const popularMovies = await loadPopularMovies();
> const isAdmin = user.role === 'admin';
> const topRatedMovies = movies.filter((movie) => movie.rating > 4);
> function toggleFavorite() { /* … */ }
>
> const ONE_DAY_MS = 24 * 60 * 60 * 1000;
> setTimeout(refresh, ONE_DAY_MS);
> ```

#### Exercice 2 · Aplatir la pyramide

Réécris cette fonction avec des retours anticipés.

```ts
function canReview(user?: User, movie?: Movie): boolean {
  if (user) {
    if (user.verified) {
      if (movie) {
        return !movie.reviewedBy.includes(user.id);
      }
    }
  }
  return false;
}
```

> [!success]- Solution
> ```ts
> function canReview(user?: User, movie?: Movie): boolean {
>   if (!user?.verified) return false;
>   if (!movie) return false;
>   return !movie.reviewedBy.includes(user.id);
> }
> ```

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Clean code]], [[Code review]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://martinfowler.com/bliki/TwoHardThings.html
