---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
tags:
  - theorie/lisibilite
aliases:
  - "Lisibilité et Nommage du Code"
parent: "[[Théorie Générale]]"
related_theory:
  - "[[ARCH-10-Clean-Code|Clean Code]]"
  - "[[TEST-07-Code-Review|Code Review]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://martinfowler.com/bliki/TwoHardThings.html"
---

# Lisibilité et Nommage du Code

> [!abstract] En bref
> Un code est **lu bien plus souvent qu'il n'est écrit** : par tes collègues, par le relecteur de ta MR, et par toi dans 3 mois. Bien nommer et garder un code simple est la première compétence d'un développeur pro. Un bon nom vaut mieux qu'un commentaire : un code bien nommé ressemble à une cuisine où chaque bocal porte une étiquette.

## Avant / après

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

## Les règles de nommage

| Élément | Règle | ✅ | ❌ |
|---|---|---|---|
| Variable | ce qu'elle **contient** | `unseenMovies` | `data2`, `tmp`, `list` |
| Booléen | une **question** | `isFavorite`, `canEdit`, `hasError` | `favorite`, `flag` |
| Fonction | un **verbe** d'action | `loadMovies()`, `toggleFavorite()` | `movies()`, `handle()` |
| Tableau | au **pluriel** | `movies` | `movieList`, `arr` |
| Constante | ce que vaut le nombre | `SEARCH_DELAY_MS = 300` | `300` perdu dans le code |

Pas d'abréviation obscure : `movieService`, pas `mvSvc`. Et une **seule langue** dans le code (l'anglais, comme les frameworks).

## Les règles de structure

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

## Les commentaires

- Commente le **pourquoi**, pas le **quoi** (le code dit déjà quoi).
- Un commentaire qui explique un nom obscur → **renomme** plutôt.
- Voir [[METH-04-Documentation-Technique|Documentation technique]].

## Les outils qui aident

- **ESLint** et **Prettier** : style et erreurs courantes corrigés automatiquement (voir [[TEST-08-Qualite-Lint-SonarQube|Qualité et lint]]).
- **Renommer** avec l'IDE (`Maj + F6` dans IntelliJ) : tous les usages sont mis à jour (voir [[IJ-04-Refactoring|Refactoring]]).
- **La relecture** de MR : si le relecteur pose une question, le code n'était pas assez clair (voir [[TEST-07-Code-Review|Code review]]).

## Pièges

- **Être astucieux** : une ligne géniale mais illisible coûte plus cher que trois lignes claires.
- **Des noms qui mentent** : `getMovies()` qui modifie aussi la base.
- **Mélanger français et anglais** dans les noms.
