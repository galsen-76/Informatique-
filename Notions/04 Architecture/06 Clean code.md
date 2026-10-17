---
type: notion
statut: a apprendre
resume: "Du code « propre », c'est du code facile à lire et à modifier par quelqu'un d'autre (ou par toi dans six mois)."
revu:
sources:
  - "https://refactoring.guru/fr/refactoring/smells"
---
# Clean code

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Du code « propre », c'est du code **facile à lire et à modifier** par quelqu'un d'autre (ou par toi dans six mois).

## Le problème

**Pourquoi c'est utile ?**
Pour écrire du code facile à lire et à modifier par quelqu'un d'autre.

**Qu'est-ce qui se passait sans ça ?**
Des fonctions de 300 lignes, des noms obscurs : chaque modification était risquée.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

On lit le code dix fois plus qu'on ne l'écrit. Quelques règles simples font l'essentiel : des **noms clairs**, des **fonctions courtes** qui font **une seule chose**, et **pas de duplication** inutile.

### 1. Des noms qui disent tout

| ❌ | ✅ |
|---|---|
| `data`, `list`, `tmp` | `popularMovies`, `favoriteIds` |
| `d` | `releaseDate` |
| `handle()` | `addToFavorites()` |
| `flag` | `isLoading`, `hasError` |
| `getData2()` | `fetchMovieDetails()` |

- Variables : des **noms** (`movies`). Fonctions : des **verbes** (`loadMovies`). Booléens : `is…`, `has…`, `can…`.
- Si tu as besoin d'un commentaire pour expliquer une variable, renomme-la.

Voir aussi [[08 Lisibilité et nommage du code|Lisibilité et nommage]].

### 2. Des fonctions courtes, une seule responsabilité

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

### 3. Sortir tôt plutôt qu'imbriquer

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

### 4. Pas de nombres magiques

```ts
setTimeout(search, 300);                 // ❌ pourquoi 300 ?
const SEARCH_DEBOUNCE_MS = 300;          // ✅
```

### 5. Les commentaires : le pourquoi, pas le quoi

```ts
// ❌ incrémente i
i++;

// ✅ TMDB limite à 40 requêtes / 10 s : on regroupe les appels
```

### 6. DRY… sans excès

**DRY** (*Don't Repeat Yourself*) : ne pas dupliquer une **règle**. Mais deux morceaux de code qui se ressemblent par hasard ne doivent pas forcément être fusionnés. Règle pratique : attends la **troisième** répétition avant de factoriser.

### 7. Laisser le code un peu plus propre qu'on l'a trouvé

Tu touches un fichier ? Améliore un nom, supprime un code mort. Petit à petit, sans grande refonte (et dans un commit `refactor:` séparé).

## 🧪 Exemple

> À compléter avec un exemple tiré de ton travail.

## ⚠️ Limites et pièges

- **Du code « malin »** (une ligne incompréhensible) au lieu de trois lignes claires.
- **Du code commenté « au cas où »** : Git garde l'historique, supprime-le.
- **Des abstractions prématurées** : une interface pour une seule implémentation, trois couches pour une route.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux de l'architecture logicielle|Fondamentaux de l'architecture logicielle]]
- **Voir aussi :** [[08 Lisibilité et nommage du code|Lisibilité et nommage du code]], [[08 Code review|Code review]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://refactoring.guru/fr/refactoring/smells
