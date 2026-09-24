---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Async/Await & Promises Typées"
tags:
  - frontend/typescript/async-promises
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]]"
  - "[[TS-06-Generics|Generics]]"
related_snippets:
  - "[[04_Snippets/ts-promises-async]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/functions.html#promises"
---

# Async/Await & Promises Typées

> [!abstract] Introduction
> Une `Promise` est un objet qui représente une valeur qui arrivera plus tard (par exemple, le résultat d'une requête réseau), et `async`/`await` est une syntaxe qui permet d'écrire du code asynchrone comme s'il était synchrone, plus facile à lire.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Rappel — synchrone vs asynchrone
> > Voir [[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]] pour la base : une opération asynchrone (comme une requête réseau) ne bloque pas le programme, son résultat arrive plus tard.
>
> Une **Promise** représente précisément CE résultat futur. Elle peut être dans 3 états :
> - **En attente** (pending) : le résultat n'est pas encore arrivé
> - **Résolue** (fulfilled) : le résultat est arrivé avec succès
> - **Rejetée** (rejected) : une erreur s'est produite
>
> ```typescript
> function obtenirFilms(): Promise<string[]> {
>   return fetch('/api/films').then(reponse => reponse.json());
> }
> ```
> > [!note] Comment lire `Promise<string[]>`
> > Ça veut dire "cette fonction retourne une Promise qui, une fois résolue, contiendra un tableau de textes (`string[]`)". Le type entre `< >` précise ce que contiendra la valeur une fois qu'elle sera enfin arrivée.

> [!question]- Pourquoi l'utiliser ?
> Avant les Promises, on gérait l'asynchrone avec des "callbacks" (fonctions passées en paramètre, appelées plus tard) qui devenaient vite illisibles quand plusieurs opérations asynchrones s'enchaînaient (on appelle ça le "callback hell" — l'enfer des callbacks, du code en pyramide difficile à suivre). Les Promises, puis `async`/`await`, rendent ce code beaucoup plus lisible.

> [!question]- Comment ça marche ?
> **Avec `.then()` (l'ancienne façon) :**
> ```typescript
> obtenirFilms().then(films => {
>   console.log(films);
> }).catch(erreur => {
>   console.error(erreur);
> });
> ```
>
> **Avec `async`/`await` (plus lisible) :**
> ```typescript
> async function afficherFilms() {
>   try {
>     const films: string[] = await obtenirFilms();
>     console.log(films);
>   } catch (erreur) {
>     console.error(erreur);
>   }
> }
> ```
>
> > [!note] Ce que fait `await`
> > `await` met en pause l'exécution de CETTE fonction (mais pas de tout le programme) jusqu'à ce que la Promise soit résolue, puis continue avec la valeur obtenue — comme si le code était synchrone, sans avoir à écrire `.then()`.
>
> > [!note] Pourquoi `async` devant la fonction ?
> > `await` ne peut être utilisé qu'À L'INTÉRIEUR d'une fonction marquée `async`. Cette fonction retourne elle-même TOUJOURS une Promise, même si on ne l'écrit pas explicitement.
>
> **Créer sa propre Promise :**
> ```typescript
> function attendre(ms: number): Promise<void> {
>   return new Promise(resolve => setTimeout(resolve, ms));
> }
>
> async function exemple() {
>   console.log("Début");
>   await attendre(1000);
>   console.log("1 seconde plus tard");
> }
> ```

> [!question]- Quand l'utiliser ?
> - `async`/`await` : quasiment toujours préféré à `.then()` pour sa lisibilité, surtout avec plusieurs étapes asynchrones enchaînées
> - `.then()` : reste utile pour des chaînes très courtes ou dans du code fonctionnel

---

## Points clés

- `Promise<T>` représente une valeur future de type `T`
- `async` devant une fonction en fait automatiquement une fonction qui retourne une Promise
- `await` (utilisable seulement dans une fonction `async`) attend le résultat sans bloquer le reste du programme
- Toujours entourer un `await` d'un `try/catch` pour gérer les erreurs proprement
- En Angular, `HttpClient` retourne des `Observable` (RxJS) plutôt que des `Promise` par défaut, mais on peut convertir l'un en l'autre si besoin

---

## Paramètres / Configuration

| Syntaxe | Description | Notes |
|-----------|-------------|-------|
| `Promise<T>` | Type d'une valeur future de type `T` | — |
| `async function` | Fonction qui retourne toujours une Promise | — |
| `await expression` | Attend la résolution d'une Promise | Utilisable seulement dans une fonction `async` |
| `try { } catch (e) { }` | Gestion d'erreur autour d'un `await` | — |
| `Promise.all([...])` | Attend PLUSIEURS Promises en parallèle | Plus rapide que les attendre une par une |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `catch (erreur)` : avec `strict`, `erreur` est de type `unknown` → vérifier `erreur instanceof Error` avant `erreur.message`
> - `await` en boucle pour des appels indépendants → `Promise.all`
> - Promesse non attendue (floating promise) → règle ESLint `@typescript-eslint/no-floating-promises`

---

## Exemple minimal

```typescript
interface Film {
  titre: string;
}

async function obtenirFilm(id: number): Promise<Film> {
  const reponse = await fetch(`/api/films/${id}`);
  const film: Film = await reponse.json();
  return film;
}

async function afficherFilm() {
  try {
    const film = await obtenirFilm(1);
    console.log(film.titre);
  } catch (erreur) {
    console.error("Impossible de charger le film :", erreur);
  }
}
```

> [!note] Ce que j'en retiens
> Deux `await` s'enchaînent naturellement, comme des instructions synchrones classiques — bien plus lisible que d'imbriquer plusieurs `.then()` les uns dans les autres.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - `Awaited<T>`, `Promise.allSettled`, annulation avec `AbortController`
> - Conversion `firstValueFrom(obs$)` / `from(promise)` entre RxJS et Promises

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun sous-thème identifié pour l'instant)
- À comparer avec → [[TG-04-Synchrone-vs-Asynchrone|Synchrone vs Asynchrone]], [[ANG-08-RxJS|Programmation Reactive RxJS]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-promises-async]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `erreur` est-il `unknown` dans un `catch` ?

> [!faq]- Questions d'entretien
> - Promise ou Observable dans un projet Angular ?

---

## Tâches

- [ ] #task Convertir un appel `.then()` existant de CinéTrack en syntaxe `async`/`await`
- [ ] #task Tester `Promise.all()` pour charger plusieurs films en parallèle
- [ ] #task Comprendre la conversion entre `Promise` et `Observable` (RxJS) dans un contexte Angular
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Dans un projet Angular, vaut-il mieux systématiquement utiliser `Observable` (RxJS) plutôt que `Promise`, même pour une simple requête unique ?
