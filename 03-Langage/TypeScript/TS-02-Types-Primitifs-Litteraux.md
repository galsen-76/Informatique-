---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
aliases:
  - "Types Primitifs et Littéraux"
tags:
  - frontend/typescript/types-primitifs
parent: "[[TypeScript]]"
children:
  - "[[TS-07-Union-Intersection|Union et Intersection Types]]"
related_theory:
  - "[[TS-01-Fondamentaux|Fondamentaux TypeScript]]"
related_snippets:
  - "[[04_Snippets/ts-types-primitifs]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"
---

# Types Primitifs et Littéraux

> [!abstract] Introduction
> Les types primitifs sont les briques de base de TypeScript (nombre, texte, booléen...), et les types littéraux permettent d'être encore plus précis en limitant une variable à des valeurs exactes précises.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi "primitif" ?
> > Primitif = de base, élémentaire — les types les plus simples, qui ne contiennent qu'UNE seule valeur (pas une structure complexe comme un objet).
>
> Les types primitifs de base :
> - `string` : du texte (`"Inception"`)
> - `number` : des nombres (`42`, `3.14`)
> - `boolean` : vrai ou faux (`true` / `false`)
> - `null` : absence volontaire de valeur
> - `undefined` : valeur non définie (pas encore assignée)
> - `bigint` : entiers arbitrairement grands (`10n`)
> - `symbol` : identifiant unique (`Symbol('id')`), rare au quotidien
>
> Les **types littéraux** permettent de restreindre une variable à des valeurs PRÉCISES, pas juste "un texte quelconque" :
> ```typescript
> let statut: "en-cours" | "termine" | "annule";
> ```

> [!question]- Pourquoi l'utiliser ?
> Sans types littéraux, on pourrait écrire n'importe quel texte dans une variable censée représenter un statut fixe, avec le risque d'une faute de frappe (`"termine"` vs `"terminée"` vs `"Terminé"`). Les types littéraux empêchent ce genre d'erreur en n'acceptant QUE les valeurs listées.

> [!question]- Comment ça marche ?
> ```typescript
> let titre: string = "Inception";
> let annee: number = 2010;
> let estFavori: boolean = true;
>
> // Type littéral : seules ces 3 valeurs exactes sont acceptées
> let statut: "en-cours" | "termine" | "annule" = "en-cours";
>
> statut = "terminee"; // ❌ Erreur : "terminee" n'est pas une valeur autorisée
> statut = "termine";  // ✅ Valide
> ```
>
> > [!note] Pourquoi le `|` entre les valeurs ?
> > Le symbole `|` (appelé "pipe") signifie "ou" en TypeScript. `"en-cours" | "termine" | "annule"` veut dire "cette variable doit être SOIT l'une, SOIT l'autre de ces valeurs exactes".
>
> **Types spéciaux à connaître :**
> - `any` : désactive complètement la vérification de type pour cette variable (à éviter autant que possible — perd tout l'intérêt de TypeScript)
> - `unknown` : comme `any`, mais oblige à vérifier le type avant de pouvoir l'utiliser (plus sûr)
> - `void` : utilisé pour une fonction qui ne retourne rien
> - `never` : utilisé pour une fonction qui ne se termine jamais normalement (boucle infinie, ou qui lève systématiquement une erreur)

> [!question]- Quand l'utiliser ?
> - Types primitifs de base : partout, pour toute donnée simple
> - Types littéraux : dès qu'une variable ne peut prendre qu'un nombre limité de valeurs précises connues à l'avance (statuts, rôles, catégories fixes)
> - Éviter `any` autant que possible — préférer `unknown` si le type est vraiment inconnu

---

## Points clés

- `string`, `number`, `boolean`, `null`, `undefined` sont les types primitifs de base
- Les types littéraux (`"a" | "b" | "c"`) restreignent une variable à des valeurs exactes
- `any` désactive la vérification de type — à utiliser en dernier recours seulement
- `unknown` est une alternative plus sûre à `any` : force à vérifier le type avant utilisation
- `void` = "ne retourne rien", `never` = "ne se termine jamais normalement"

---

## Paramètres / Configuration

| Type | Description | Notes |
|-----------|-------------|-------|
| `string` | Texte | `"texte"` ou `'texte'` |
| `number` | Nombre (entier ou décimal) | Pas de distinction int/float comme dans d'autres langages |
| `boolean` | Vrai ou faux | `true` / `false` |
| `any` | Désactive la vérification de type | À éviter |
| `unknown` | Type inconnu mais sécurisé | Oblige une vérification avant usage |
| `"a" \| "b"` | Type littéral (valeurs exactes autorisées) | Utile pour des statuts fixes |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Utiliser les types objets `String`, `Number`, `Boolean` (majuscule) au lieu de `string`, `number`, `boolean`
> - Écrire `any` pour faire taire une erreur au lieu de comprendre le type attendu
> - Oublier que `let x = 'a'` a le type `string` alors que `const x = 'a'` a le type littéral `'a'`

---

## Exemple minimal

```typescript
type StatutFilm = "a-voir" | "vu" | "abandonne";

function changerStatut(statut: StatutFilm) {
  console.log("Nouveau statut :", statut);
}

changerStatut("vu");        // ✅ valide
changerStatut("en pause");  // ❌ Erreur : valeur non autorisée
```

> [!note] Ce que j'en retiens
> `type StatutFilm = ...` crée un alias réutilisable pour ce type littéral, plutôt que de le réécrire à chaque fois. Toute fonction qui utilise `StatutFilm` bénéficie automatiquement de cette restriction.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Dériver les types littéraux d'une constante avec `as const` (voir [[TS-16-Assertions-satisfies-unknown|Assertions satisfies et unknown]])
> - Activer `noImplicitAny` et bannir `any` via ESLint

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → [[TS-07-Union-Intersection|Union et Intersection Types]]
- À comparer avec → [[TS-08-Enums|Enums]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-types-primitifs]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence entre `any` et `unknown` ?
> - Pourquoi `const` et `let` n'infèrent-ils pas le même type ?

> [!faq]- Questions d'entretien
> - Différence entre `null` et `undefined` en TypeScript avec `strictNullChecks` ?

---

## Tâches

- [ ] #task Créer un type littéral `StatutFilm` pour CinéTrack (à-voir, vu, abandonné)
- [ ] #task Remplacer tous les usages de `any` restants dans le projet CinéTrack par un type précis
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Dans quels cas précis choisir un type littéral plutôt qu'un `enum` (voir note dédiée) ?
