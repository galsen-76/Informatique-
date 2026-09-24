---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
aliases:
  - "Utility Types"
tags:
  - frontend/typescript/utility-types
parent: "[[TypeScript]]"
children:
  - "[[TS-13-Types-Avances|Types avancés Mapped Conditional]]"
related_theory:
  - "[[TS-03-Interfaces-Types|Interfaces et Types]]"
related_snippets:
  - "[[04_Snippets/ts-utility-types]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/utility-types.html"
---

# Utility Types

> [!abstract] Introduction
> Les "utility types" sont des outils prêts à l'emploi, fournis directement par TypeScript, pour transformer un type existant (le rendre optionnel, n'en garder qu'une partie, etc.) sans le réécrire à la main.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] Le problème que ça résout
> > Imagine une interface `Film` avec 5 propriétés. Pour un formulaire de MODIFICATION, on veut peut-être que TOUTES les propriétés soient optionnelles (on ne modifie pas forcément tout). Réécrire une deuxième interface presque identique serait redondant. Les utility types transforment l'interface existante automatiquement.
>
> Les plus utilisés :
> - `Partial<T>` : rend TOUTES les propriétés optionnelles
> - `Required<T>` : rend TOUTES les propriétés obligatoires (inverse de `Partial`)
> - `Pick<T, K>` : ne garde QUE certaines propriétés choisies
> - `Omit<T, K>` : garde TOUT SAUF certaines propriétés choisies
> - `Readonly<T>` : rend TOUTES les propriétés non modifiables

> [!question]- Pourquoi l'utiliser ?
> Sans utility types, chaque variation d'une interface existante devrait être réécrite à la main, avec le risque que les deux versions se désynchronisent si l'interface d'origine change plus tard. Les utility types dérivent automatiquement une nouvelle forme à partir de l'originale — si l'originale change, les versions dérivées suivent automatiquement.

> [!question]- Comment ça marche ?
> ```typescript
> interface Film {
>   id: number;
>   titre: string;
>   annee: number;
>   realisateur: string;
> }
>
> // Toutes les propriétés deviennent optionnelles — utile pour une modification partielle
> type FilmModifiable = Partial<Film>;
> const modification: FilmModifiable = { titre: "Nouveau titre" }; // ✅ valide, le reste est omis
>
> // Ne garde que "titre" et "annee"
> type FilmResume = Pick<Film, "titre" | "annee">;
> const resume: FilmResume = { titre: "Inception", annee: 2010 };
>
> // Garde tout SAUF "id"
> type NouveauFilm = Omit<Film, "id">;
> const nouveauFilm: NouveauFilm = { titre: "Interstellar", annee: 2014, realisateur: "Nolan" };
> ```
>
> > [!note] Comment lire `Pick<Film, "titre" | "annee">`
> > `Pick<Type, Clés>` prend un type source (`Film`) et une liste de noms de propriétés à garder (`"titre" | "annee"`), et retourne un nouveau type contenant UNIQUEMENT ces propriétés-là.

> [!question]- Quand l'utiliser ?
> - `Partial<T>` : formulaires de modification, mises à jour partielles d'un objet
> - `Pick<T, K>` : créer un type "résumé" avec seulement certaines infos utiles
> - `Omit<T, K>` : créer un objet sans une propriété précise (ex : sans l'`id` avant sa création en base de données)
> - `Readonly<T>` : protéger un objet entier contre toute modification accidentelle

---

## Points clés

- Tous les utility types se basent sur un type EXISTANT — ils ne créent rien depuis zéro
- `Partial` / `Required` / `Readonly` s'appliquent à TOUTES les propriétés d'un coup
- `Pick` / `Omit` sélectionnent des propriétés précises par leur nom
- Si le type d'origine change, tous les types dérivés avec ces utility types se mettent à jour automatiquement — pas de duplication à maintenir

---

## Paramètres / Configuration

| Utility Type | Description | Notes |
|-----------|-------------|-------|
| `Partial<T>` | Toutes les propriétés deviennent optionnelles | — |
| `Required<T>` | Toutes les propriétés deviennent obligatoires | Inverse de `Partial` |
| `Readonly<T>` | Toutes les propriétés deviennent non modifiables | — |
| `Pick<T, K>` | Ne garde que les propriétés listées dans `K` | — |
| `Omit<T, K>` | Garde tout sauf les propriétés listées dans `K` | — |
| `Record<K, T>` | Crée un objet avec des clés de type `K` et valeurs de type `T` | Utile pour des dictionnaires |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `Partial<T>` sur un objet d'entrée d'API → tout devient optionnel, y compris ce qui est obligatoire côté métier
> - `Omit` avec une clé mal orthographiée ne produit pas d'erreur (clé inexistante ignorée)

---

## Exemple minimal

```typescript
interface Film {
  id: number;
  titre: string;
  annee: number;
}

function modifierFilm(id: number, changements: Partial<Omit<Film, "id">>) {
  console.log(`Film ${id} modifié avec :`, changements);
}

modifierFilm(1, { titre: "Nouveau titre" }); // ✅ valide, annee omise, id impossible à changer
```

> [!note] Ce que j'en retiens
> `Partial<Omit<Film, "id">>` combine deux utility types : `Omit` retire d'abord `id` (qu'on ne devrait jamais pouvoir modifier), puis `Partial` rend le reste optionnel (on peut modifier juste le titre, ou juste l'année, ou les deux).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Connaître aussi `Record`, `Exclude`, `Extract`, `NonNullable`, `ReturnType`, `Parameters`, `Awaited`
> - `Readonly<T>` n'est pas profond : écrire un `DeepReadonly<T>` si nécessaire

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → [[TS-13-Types-Avances|Types avancés Mapped Conditional]]
- À comparer avec → [[TS-03-Interfaces-Types|Interfaces et Types]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-utility-types]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Comment créer le type d'un formulaire de modification où l'`id` est interdit et tout le reste optionnel ?

---

## Tâches

- [ ] #task Créer un type `FilmModification` avec `Partial` et `Omit` pour le formulaire d'édition de CinéTrack
- [ ] #task Explorer `Record<K, T>` sur un cas concret (ex : dictionnaire de films par catégorie)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Quels sont les utility types les plus utilisés concrètement en entreprise, au-delà de `Partial`/`Pick`/`Omit` ?
