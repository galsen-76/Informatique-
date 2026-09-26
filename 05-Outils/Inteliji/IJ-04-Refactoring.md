---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Refactoring dans IntelliJ"
tags:
  - outils/intellij/refactoring
parent: "[[IntelliJ IDEA]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/refactoring-source-code.html"
---

# Refactoring IntelliJ

> [!abstract] En bref
> **Refactoriser**, c'est améliorer la structure du code (renommer, découper, déplacer) **sans changer ce qu'il fait**. IntelliJ le fait en toute sécurité : il met à jour **tous** les usages dans le projet, y compris les imports et les templates. Bien plus fiable qu'un rechercher-remplacer.

## Les refactorings du quotidien

| Besoin | Raccourci | Exemple |
|---|---|---|
| **Renommer** | `Shift+F6` | `data` → `movies` partout, fichiers compris |
| **Extraire une variable** | `Ctrl+Alt+V` | une expression longue → une variable bien nommée |
| **Extraire une fonction** | `Ctrl+Alt+M` | 15 lignes → `filterByGenre()` |
| **Extraire une constante** | `Ctrl+Alt+C` | `300` → `SEARCH_DEBOUNCE_MS` |
| **Remplacer par la valeur** (inline) | `Ctrl+Alt+N` | l'inverse d'extraire |
| **Changer la signature** | `Ctrl+F6` | ajouter un paramètre, changer l'ordre, partout |
| **Déplacer** | `F6` | un fichier vers `shared/`, imports mis à jour |
| **Tous les refactorings** | `Ctrl+Alt+Shift+T` | le menu complet |

## Exemple : extraire une fonction

```ts
// Avant : la page fait tout
const visibles = this.movies().filter(m =>
  (!this.genre() || m.genres.includes(this.genre()!)) &&
  m.title.toLowerCase().includes(this.search().toLowerCase()),
);
```

Sélectionne l'expression → `Ctrl+Alt+M` → nomme-la `filterMovies` :

```ts
// Après : une fonction pure, testable
const visibles = filterMovies(this.movies(), this.genre(), this.search());

function filterMovies(movies: Movie[], genre: string | null, search: string) {
  return movies.filter(m =>
    (!genre || m.genres.includes(genre)) &&
    m.title.toLowerCase().includes(search.toLowerCase()),
  );
}
```

Tu peux ensuite la déplacer (`F6`) dans `movie.utils.ts` et lui écrire un test.

## Les petites actions `Alt+Entrée`

Sur une ligne, `Alt+Entrée` propose des transformations adaptées : ajouter un import, convertir en fonction fléchée, ajouter le type de retour, inverser un `if`, transformer une concaténation en template string…

## La méthode sûre

1. **Des tests qui passent** avant de commencer (ou au moins l'application qui marche).
2. **Un refactoring à la fois**, en le faisant avec l'outil, pas à la main.
3. **Relancer** tests et application.
4. **Commiter séparément** : `refactor: extrait filterMovies` dans son propre commit, jamais mélangé à une nouvelle fonctionnalité.

Pourquoi et quand refactoriser : [[ARCH-10-Clean-Code|Clean code]].

## Pièges

- **Rechercher-remplacer** pour renommer : touche aussi des textes qui n'ont rien à voir, et rate les imports.
- **Refactoriser et ajouter une fonctionnalité en même temps** : si ça casse, impossible de savoir pourquoi.
- **Renommer un champ qui vient de l'API** : l'outil met à jour ton code, pas le serveur. Passe par le mapper.
