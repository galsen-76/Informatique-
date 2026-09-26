---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - architecture/clean-code
aliases:
  - "Clean Code"
parent: "[[Architecture Logicielle]]"
related_theory:
  - "[[TG-08-Lisibilite-Nommage|Lisibilité et Nommage du Code]]"
  - "[[TEST-07-Code-Review|Code Review]]"
related_projects: []
source: "https://refactoring.guru/fr/refactoring/smells"
---

# Clean Code

> [!abstract] En bref
> Du code « propre », c'est du code **facile à lire et à modifier** par quelqu'un d'autre (ou par toi dans six mois). On lit le code dix fois plus qu'on ne l'écrit. Quelques règles simples font l'essentiel : des **noms clairs**, des **fonctions courtes** qui font **une seule chose**, et **pas de duplication** inutile.

## 1. Des noms qui disent tout

| ❌ | ✅ |
|---|---|
| `data`, `list`, `tmp` | `popularMovies`, `favoriteIds` |
| `d` | `releaseDate` |
| `handle()` | `addToFavorites()` |
| `flag` | `isLoading`, `hasError` |
| `getData2()` | `fetchMovieDetails()` |

- Variables : des **noms** (`movies`). Fonctions : des **verbes** (`loadMovies`). Booléens : `is…`, `has…`, `can…`.
- Si tu as besoin d'un commentaire pour expliquer une variable, renomme-la.

Voir aussi [[TG-08-Lisibilite-Nommage|Lisibilité et nommage]].

## 2. Des fonctions courtes, une seule responsabilité

```ts
// ❌ une fonction qui fait tout
async function handleSubmit() {
  if (!form.email || !form.email.includes('@')) { /* … */ }
  const res = await fetch('/api/contact', { /* … */ });
  if (!res.ok) { /* … */ }
  toast.show('Envoyé');
  form.reset();
  analytics.track('contact');
}

// ✅ chaque étape a un nom
async function handleSubmit() {
  if (!isValid(form)) return showErrors();
  await contactApi.send(form.values);
  notifySuccess();
  form.reset();
}
```

Repère : si tu dois faire défiler pour lire une fonction, ou si son nom contient « et », découpe-la.

## 3. Sortir tôt plutôt qu'imbriquer

```ts
// ❌ la pyramide
function canEdit(user, review) {
  if (user) {
    if (review) {
      if (review.userId === user.id || user.role === 'ADMIN') {
        return true;
      }
    }
  }
  return false;
}

// ✅ les cas particuliers d'abord
function canEdit(user: User | null, review: Review | null) {
  if (!user || !review) return false;
  return review.userId === user.id || user.role === 'ADMIN';
}
```

## 4. Pas de nombres magiques

```ts
setTimeout(search, 300);                 // ❌ pourquoi 300 ?
const SEARCH_DEBOUNCE_MS = 300;          // ✅
```

## 5. Les commentaires : le pourquoi, pas le quoi

```ts
// ❌ incrémente i
i++;

// ✅ TMDB limite à 40 requêtes / 10 s : on regroupe les appels
```

## 6. DRY… sans excès

**DRY** (*Don't Repeat Yourself*) : ne pas dupliquer une **règle**. Mais deux morceaux de code qui se ressemblent par hasard ne doivent pas forcément être fusionnés. Règle pratique : attends la **troisième** répétition avant de factoriser.

## 7. Laisser le code un peu plus propre qu'on l'a trouvé

Tu touches un fichier ? Améliore un nom, supprime un code mort. Petit à petit, sans grande refonte (et dans un commit `refactor:` séparé).

## Pièges

- **Du code « malin »** (une ligne incompréhensible) au lieu de trois lignes claires.
- **Du code commenté « au cas où »** : Git garde l'historique, supprime-le.
- **Des abstractions prématurées** : une interface pour une seule implémentation, trois couches pour une route.
