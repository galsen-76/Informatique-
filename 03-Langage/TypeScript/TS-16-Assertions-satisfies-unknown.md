---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/typescript/assertions
aliases:
  - "Assertions satisfies et unknown"
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-09-Type-Narrowing|Type Narrowing]]"
  - "[[TS-02-Types-Primitifs-Litteraux|Types Primitifs et Littéraux]]"
related_snippets:
  - "[[04_Snippets/ts-16-assertions-satisfies-unknown]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html"
---

# Assertions satisfies et unknown

> [!abstract] Introduction
> `as` force TypeScript à croire un type (dangereux), `satisfies` vérifie qu'une valeur respecte un type SANS perdre sa précision, et `unknown` oblige à vérifier avant d'utiliser — trois outils à distinguer absolument.

> [!warning]- Prérequis
> [[TS-09-Type-Narrowing|Type Narrowing]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> const a = JSON.parse(texte) as Film;          // "fais-moi confiance" → aucune vérification
> const b: unknown = JSON.parse(texte);         // "je ne sais pas" → vérifier avant usage
> const routes = { accueil: "/", films: "/films" } satisfies Record<string, string>;
> routes.films;                                  // type conservé : "/films" connu, autocomplétion OK
> const x = valeur!;                             // non-null assertion : "ce n'est pas null"
> ```

> [!example]- Analogie
> `as`, c'est dire au douanier « pas besoin d'ouvrir, c'est des livres » ; `satisfies`, c'est passer la valise au scanner tout en gardant son contenu intact ; `unknown`, c'est une valise sans étiquette qu'on DOIT ouvrir avant de s'en servir.

> [!question]- Pourquoi l'utiliser ?
> Les données qui viennent de l'extérieur (API, localStorage, formulaire) ne sont pas garanties. `as` masque les erreurs ; `unknown` + narrowing ou validation les révèle.

> [!question]- Comment ça marche ?
> | Outil | Vérifie ? | Effet |
> |---|---|---|
> | `as Type` | Non (seulement compatibilité grossière) | Change le type vu par TS |
> | `!` | Non | Retire `null`/`undefined` |
> | `satisfies Type` | Oui | Vérifie sans élargir le type inféré |
> | `unknown` | — | Force un narrowing avant usage |
> | `as const` | — | Littéraux et `readonly` profonds |

> [!question]- Quand l'utiliser ?
> - `unknown` : toute donnée externe, `catch (e)`
> - `satisfies` : objets de configuration, tables de correspondance
> - `as const` : listes de valeurs fixes (`["fr","en"] as const`)
> - `as` : en dernier recours, après une validation que TS ne sait pas voir

> [!danger]- Quand NE PAS l'utiliser / Limites
> `as unknown as X` (double cast) contourne tout : c'est un signal d'alarme en revue de code.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Assertion de type | Affirmer un type au compilateur sans preuve |
| `satisfies` | Vérification de conformité sans perte de précision |
| `as const` | Rend une valeur littérale et readonly |
| Non-null assertion | Opérateur `!` qui retire null/undefined |

---

## Points clés

- Préférer `unknown` à `any` pour les données inconnues
- `satisfies` = vérification + inférence conservée
- `!` et `as` sont des promesses : si tu te trompes, bug à l'exécution
- `as const` pour dériver des types depuis des valeurs

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - `this.form.value as Film` alors que certains champs peuvent être null
> - `element!` sur un `@ViewChild` lu avant `ngAfterViewInit`
> - `catch (e) { e.message }` → `e` est `unknown` en mode strict

---

## Exemple minimal

```typescript
const LANGUES = ["fr", "en", "es"] as const;
type Langue = typeof LANGUES[number];          // "fr" | "en" | "es"

function estLangue(v: unknown): v is Langue {
  return typeof v === "string" && (LANGUES as readonly string[]).includes(v);
}
const choix: unknown = localStorage.getItem("langue");
const langue: Langue = estLangue(choix) ? choix : "fr";
```

> [!note] Ce que j'en retiens
> Une seule source de vérité (le tableau) donne le type ET la validation à l'exécution.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Bannir `any` via ESLint (`@typescript-eslint/no-explicit-any`, `no-unsafe-*`)
> - Valider aux frontières (API, stockage) avec Zod puis faire confiance aux types à l'intérieur

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[TS-19-Validation-Runtime-Zod|Validation runtime avec Zod]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-16-assertions-satisfies-unknown]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelle différence concrète entre `x as Film` et `x satisfies Film` ?

> [!faq]- Questions d'entretien
> - Différence entre `any` et `unknown` ?

---

## Tâches

- [ ] #task Chercher tous les `as` d'un projet et justifier ou supprimer chacun
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
