---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Avancé
month: M03
aliases:
  - "Types Avancés TypeScript"
  - "Types Avancés (Mapped, Conditional, Template Literal)"
tags:
  - frontend/typescript/types-avances
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-06-Generics|Generics]]"
  - "[[TS-10-Utility-Types|Utility Types]]"
related_snippets:
  - "[[04_Snippets/ts-types-avances]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html"
---

# Types Avancés (Mapped, Conditional, Template Literal)

> [!abstract] Introduction
> Ce sont des outils pour CRÉER de nouveaux types automatiquement à partir de types existants, en appliquant une transformation systématique — comme fabriquer une nouvelle interface où chaque propriété change de nature, sans les réécrire une par une.

---

## Théorie

> [!question]- C'est quoi ?
> Trois outils avancés :
> 1. **Mapped Types** : transformer chaque propriété d'un type existant selon une règle
> 2. **Conditional Types** : choisir un type différent selon une condition (comme un `if` mais pour des types)
> 3. **Template Literal Types** : construire des types textuels à partir de morceaux combinés
>
> > [!note] Pourquoi "avancé" ?
> > Ces concepts ne sont pas utilisés au quotidien par un développeur débutant — ils servent surtout à créer des outils réutilisables (comme les utility types `Partial`, `Pick`, qui sont en réalité fabriqués avec des Mapped Types en interne).

> [!question]- Pourquoi l'utiliser ?
> Ces outils permettent d'éviter d'écrire manuellement des dizaines de types très similaires, en générant automatiquement des variations d'un type de base selon des règles précises.

> [!question]- Comment ça marche ?
> **Mapped Type — transformer chaque propriété :**
> ```typescript
> type ToutesOptionnelles<T> = {
>   [Cle in keyof T]?: T[Cle];
> };
>
> interface Film { titre: string; annee: number; }
> type FilmPartiel = ToutesOptionnelles<Film>; // équivalent de Partial<Film>
> ```
> > [!note] Comment lire `[Cle in keyof T]`
> > `keyof T` récupère la liste de TOUS les noms de propriétés du type `T` (ex : `"titre" | "annee"`). `[Cle in ...]` dit "pour chaque nom de propriété possible, fais ceci" — c'est une boucle, mais au niveau des TYPES, pas des valeurs.
>
> **Conditional Type — un "if" pour les types :**
> ```typescript
> type EstString<T> = T extends string ? "oui" : "non";
>
> type Test1 = EstString<string>; // "oui"
> type Test2 = EstString<number>; // "non"
> ```
> > [!note] Comment lire `T extends string ? "oui" : "non"`
> > Exactement comme un opérateur ternaire classique (`condition ? siVrai : siFaux`), mais appliqué à un TYPE : "si `T` correspond à `string`, alors le résultat est `"oui"`, sinon `"non"`".
>
> **Template Literal Type — construire un type texte à partir de morceaux :**
> ```typescript
> type Langue = "fr" | "en";
> type CleTraduction = `titre_${Langue}`; // "titre_fr" | "titre_en"
> ```
> > [!note] Ce que ça permet
> > Générer automatiquement toutes les combinaisons possibles de textes, plutôt que de les lister une par une à la main — très utile pour des clés de traduction, des noms d'événements, etc.

> [!question]- Quand l'utiliser ?
> - Rarement au quotidien pour un débutant/intermédiaire — surtout utile pour comprendre COMMENT fonctionnent les utility types déjà fournis par TypeScript
> - Utile si on doit créer ses propres outils de type réutilisables sur un projet avancé

---

## Points clés

- Mapped Types = transformer chaque propriété d'un type selon une règle, via `[Cle in keyof T]`
- Conditional Types = un `if` au niveau des types, avec `T extends X ? A : B`
- Template Literal Types = construire des types textuels en combinant des morceaux, comme des template strings JavaScript mais pour les types
- Les utility types vus précédemment (`Partial`, `Pick`, `Omit`) sont en réalité construits avec ces outils avancés en interne

---

## Paramètres / Configuration

| Concept | Syntaxe | Notes |
|-----------|-------------|-------|
| Mapped Type | `{ [K in keyof T]: ... }` | Transforme chaque propriété |
| Conditional Type | `T extends X ? A : B` | "if" au niveau des types |
| Template Literal Type | `` `prefix_${T}` `` | Combine des textes au niveau des types |
| `keyof T` | Récupère les noms de propriétés d'un type | Utilisé dans les Mapped Types |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Types avancés illisibles dans du code métier → réserver aux utilitaires partagés
> - Types récursifs trop profonds qui ralentissent l'éditeur

---

## Exemple minimal

```typescript
interface Film {
  titre: string;
  annee: number;
}

// Mapped Type custom : rend toutes les propriétés en lecture seule
type FilmProtege<T> = {
  readonly [Cle in keyof T]: T[Cle];
};

const film: FilmProtege<Film> = { titre: "Inception", annee: 2010 };
film.titre = "Autre titre"; // ❌ Erreur : readonly
```

> [!note] Ce que j'en retiens
> Ce Mapped Type custom fait exactement ce que fait `Readonly<Film>` fourni par TypeScript — comprendre cette mécanique aide à savoir ce qui se passe "sous le capot" des utility types déjà connus.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - `infer` dans les types conditionnels (`type Elt<T> = T extends (infer U)[] ? U : never`)
> - Remapper des clés avec `as` dans un mapped type (ex. générer automatiquement des getters `getTitre`, `getAnnee`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun sous-thème identifié pour l'instant)
- À comparer avec → [[TS-10-Utility-Types|Utility Types]], [[TS-06-Generics|Generics]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-types-avances]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Réécrire `Partial<T>` et `Pick<T, K>` de tête.

---

## Tâches

- [ ] #task Recréer `Partial<T>` et `Readonly<T>` soi-même avec un Mapped Type, pour bien comprendre leur fonctionnement interne
- [ ] #task Créer un Template Literal Type pour générer des clés de traduction dans CinéTrack (`titre_fr`, `titre_en`)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? À quelle fréquence ces concepts avancés sont-ils réellement utilisés dans du code Angular d'entreprise, ou est-ce surtout théorique ?
