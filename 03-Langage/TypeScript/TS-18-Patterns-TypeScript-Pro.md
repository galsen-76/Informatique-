---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M03
tags:
  - frontend/typescript/patterns
aliases:
  - "Patterns TypeScript Professionnels"
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-13-Types-Avances|Types Avancés TypeScript]]"
  - "[[TS-07-Union-Intersection|Union & Intersection Types]]"
related_snippets:
  - "[[04_Snippets/ts-18-patterns-typescript-pro]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking"
---

# Patterns TypeScript Professionnels

> [!abstract] Introduction
> Quelques patterns utilisés dans les bases de code sérieuses : vérification d'exhaustivité avec `never`, types « brandés », type `Result`, états d'UI par union discriminée.

> [!warning]- Prérequis
> [[TS-07-Union-Intersection|Union & Intersection Types]], [[TS-09-Type-Narrowing|Type Narrowing]], [[TS-06-Generics|Generics]]

---

## Théorie

> [!question]- C'est quoi ?
> 1. **Exhaustivité** : le compilateur signale un `case` oublié
> 2. **Branded types** : distinguer `UserId` de `FilmId` même si ce sont deux `string`
> 3. **Result<T, E>** : représenter succès/échec sans exceptions
> 4. **État d'UI discriminé** : `idle | loading | success | error`

> [!example]- Analogie
> Ces patterns sont des détrompeurs (comme une prise électrique qui ne rentre que dans le bon sens) : ils rendent les erreurs impossibles à écrire plutôt que de compter sur la vigilance.

> [!question]- Pourquoi l'utiliser ?
> « Rendre les états impossibles impossibles » : moins de `if (data && !loading && !error)`, plus de garanties à la compilation.

> [!question]- Comment ça marche ?
> ```typescript
> type EtatChargement<T> =
>   | { statut: "idle" }
>   | { statut: "loading" }
>   | { statut: "success"; data: T }
>   | { statut: "error"; erreur: string };
>
> function afficher(e: EtatChargement<Film[]>) {
>   switch (e.statut) {
>     case "idle": return "—";
>     case "loading": return "Chargement…";
>     case "success": return `${e.data.length} films`;
>     case "error": return e.erreur;
>     default: { const _exhaustif: never = e; return _exhaustif; }
>   }
> }
> ```
> Si on ajoute `{ statut: "empty" }`, le `default` ne compile plus → on ne peut pas oublier de le gérer.

> [!question]- Quand l'utiliser ?
> États asynchrones d'un composant, machines à états, identifiants métier, fonctions qui peuvent échouer de manière prévisible.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Sur-typer du code simple le rend illisible ; ces patterns se justifient là où une erreur coûte cher.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Exhaustivité | Tous les cas d'une union sont traités |
| Branded type | Type primitif « marqué » pour le distinguer |
| Result | Type union succès/échec explicite |
| État impossible | Combinaison de données qui ne devrait jamais exister |

---

## Points clés

- `never` dans le `default` = filet de sécurité à la compilation
- Union discriminée > plusieurs booléens `isLoading`, `hasError`
- Brands pour ne pas mélanger des ids

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Représenter l'état avec `loading: boolean; error?: string; data?: T` → combinaisons incohérentes possibles

---

## Exemple minimal

```typescript
type Brand<T, B extends string> = T & { readonly __brand: B };
type UserId = Brand<string, "UserId">;
type FilmId = Brand<string, "FilmId">;
const filmId = (s: string) => s as FilmId;

function chargerFilm(id: FilmId) { /* ... */ }
const uid = "u-42" as UserId;
// chargerFilm(uid);  ❌ Erreur : UserId n'est pas FilmId
chargerFilm(filmId("f-7"));  // ✅
```

> [!note] Ce que j'en retiens
> Deux `string` deviennent incompatibles : impossible d'inverser deux identifiants par erreur.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Modéliser des machines à états (XState) typées
> - Combiner Result et RxJS/Signals pour des services robustes

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/ts-18-patterns-typescript-pro]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que se passe-t-il si j'ajoute un nouveau statut à l'union sans modifier le switch ?

---

## Tâches

- [ ] #task Remplacer `isLoading`/`error` d'un composant par une union discriminée
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
