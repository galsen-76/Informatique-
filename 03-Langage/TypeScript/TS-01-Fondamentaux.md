---
created: 2026-09-14
modified: 2026-09-14
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M03
aliases:
  - "Fondamentaux TypeScript"
tags:
  - frontend/typescript/fondamentaux
parent: "[[TypeScript]]"
children:
  - "[[TS-02-Types-Primitifs-Litteraux|Types primitifs et littéraux]]"
  - "[[TS-03-Interfaces-Types|Interfaces et Types]]"
related_theory:
  - "[[JS-01-Fondamentaux|JavaScript - Fondamentaux]]"
related_snippets:
  - "[[04_Snippets/ts-fondamentaux]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.typescriptlang.org/docs/"
---

# Fondamentaux TypeScript

> [!abstract] Introduction
> TypeScript est du JavaScript auquel on ajoute des "types" — des étiquettes qui décrivent la nature attendue de chaque donnée (nombre, texte, objet...) — pour détecter les erreurs avant même d'exécuter le code.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] C'est quoi un "type" ?
> > Un type décrit la NATURE d'une donnée : est-ce un nombre, du texte, une liste, un objet avec certaines propriétés ? En JavaScript classique, une variable peut changer de nature n'importe quand sans prévenir. TypeScript t'oblige (ou te propose) de préciser ce type dès le départ.
>
> TypeScript n'est PAS un nouveau langage indépendant : c'est une **surcouche** de JavaScript. Le code TypeScript est ensuite "transpilé" (converti) en JavaScript classique, que le navigateur peut exécuter — TypeScript n'existe jamais tel quel dans le navigateur final.

> [!question]- Pourquoi l'utiliser ?
> En JavaScript pur, ce genre d'erreur ne se voit qu'à l'exécution :
> ```javascript
> function additionner(a, b) {
>   return a + b;
> }
> additionner(5, "10"); // "510" au lieu d'un calcul — bug silencieux
> ```
> Avec TypeScript, cette erreur est détectée **avant** même de lancer le code, directement dans l'éditeur :
> ```typescript
> function additionner(a: number, b: number): number {
>   return a + b;
> }
> additionner(5, "10"); // ❌ Erreur détectée immédiatement par TypeScript
> ```

> [!question]- Comment ça marche ?
> 1. On écrit du code avec des annotations de type (`: number`, `: string`, etc.)
> 2. L'éditeur (VS Code, etc.) souligne immédiatement les erreurs de type pendant qu'on écrit
> 3. Au moment de build, le **compilateur TypeScript** (`tsc`) vérifie tout le fichier, puis génère du JavaScript classique en retirant toutes les annotations de type (elles n'existent plus dans le fichier final)
>
> > [!note] C'est quoi "compiler" / "transpiler" ?
> > Compiler, c'est transformer un code source en un autre format exécutable. TypeScript "transpile" (compile vers un langage de même niveau) le code TypeScript en JavaScript standard.

> [!question]- Quand l'utiliser ?
> Sur quasiment tout projet JavaScript de taille moyenne à grande — c'est aujourd'hui un standard de fait dans l'écosystème professionnel (Angular l'impose, React et Vue le recommandent fortement).

---

## Points clés

- TypeScript = JavaScript + types, jamais exécuté directement (toujours "transpilé" en JS)
- Les erreurs de type sont détectées **avant** l'exécution, pas seulement pendant
- Le fichier final livré à l'utilisateur est du JavaScript pur — TypeScript est un outil de développement, pas un langage de production
- TypeScript peut souvent **deviner** le type tout seul (inférence de type), sans qu'on ait besoin de l'écrire partout

---

## Paramètres / Configuration

| Concept | Description | Notes |
|-----------|-------------|-------|
| `tsc` | Le compilateur TypeScript en ligne de commande | Transforme `.ts` en `.js` |
| `.ts` | Extension d'un fichier TypeScript | — |
| Inférence de type | TypeScript devine le type sans annotation explicite | Ex : `let x = 5` → TypeScript sait que `x` est un `number` |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Croire que les types protègent à l'exécution : une réponse d'API mal formée passe quand même (voir [[TS-19-Validation-Runtime-Zod|Validation runtime avec Zod]])
> - Ajouter des annotations partout alors que l'inférence suffit (bruit)
> - Désactiver `strict` pour « aller plus vite »

---

## Exemple minimal

```typescript
// Sans annotation explicite : TypeScript déduit le type tout seul (inférence)
let titre = "Inception"; // TypeScript comprend : titre est un string

// Avec annotation explicite
let annee: number = 2010;

// Erreur détectée immédiatement par TypeScript, avant même d'exécuter
titre = 42; // ❌ Erreur : on ne peut pas mettre un nombre dans un string
```

> [!note] Ce que j'en retiens
> Pas besoin d'écrire un type partout — TypeScript devine souvent tout seul grâce à l'inférence. On ajoute des annotations explicites surtout quand ce n'est pas évident (ex : paramètres de fonction, retour d'une fonction complexe).

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Savoir lire les erreurs complexes du compilateur (remonter à la première ligne significative)
> - Configurer `strict` + règles `typescript-eslint` type-aware dans la CI (`tsc --noEmit`)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → [[TS-02-Types-Primitifs-Litteraux|Types primitifs et littéraux]], [[TS-03-Interfaces-Types|Interfaces et Types]]
- À comparer avec → [[JS-01-Fondamentaux|JavaScript - Fondamentaux]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-fondamentaux]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi dit-on que TypeScript « disparaît » à l'exécution ?
> - Qu'est-ce que l'inférence de type ?

> [!faq]- Questions d'entretien
> - Quels avantages apporte TypeScript par rapport à JavaScript ?

---

## Tâches

- [ ] #task Configurer un premier fichier `.ts` et observer le résultat compilé en `.js`
- [ ] #task Volontairement provoquer 3 erreurs de type pour bien lire les messages d'erreur de TypeScript
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? À quel moment exactement le code TypeScript est-il transpilé dans un projet Angular (avant `ng serve`, pendant) ?
