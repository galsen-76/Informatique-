---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/typescript/zod
aliases:
  - "Validation runtime avec Zod"
parent: "[[TypeScript]]"
children: []
related_theory:
  - "[[TS-16-Assertions-satisfies-unknown|Assertions satisfies et unknown]]"
  - "[[NEST-05-DTO-Validation-Pipes|DTO et Validation NestJS]]"
related_snippets:
  - "[[04_Snippets/ts-19-validation-runtime-zod]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://zod.dev"
---

# Validation runtime avec Zod

> [!abstract] Introduction
> Les types TypeScript disparaissent à l'exécution ; Zod (ou Valibot, class-validator) valide réellement les données entrantes ET en déduit les types — une seule source de vérité.

> [!warning]- Prérequis
> [[TS-16-Assertions-satisfies-unknown|Assertions satisfies et unknown]]

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> import { z } from "zod";
> const FilmSchema = z.object({
>   id: z.number().int().positive(),
>   titre: z.string().min(1),
>   annee: z.number().int().min(1888),
>   genres: z.array(z.string()).default([]),
> });
> type Film = z.infer<typeof FilmSchema>;     // type déduit du schéma
> const film = FilmSchema.parse(await r.json()); // lève une erreur si invalide
> ```

> [!example]- Analogie
> TypeScript est le plan d'architecte ; Zod est le contrôleur qui vérifie sur le chantier que ce qui est livré correspond au plan.

> [!question]- Pourquoi l'utiliser ?
> Une API peut changer, renvoyer `null`, un nombre en chaîne… Sans validation, l'erreur éclate loin de sa cause. Avec Zod, elle éclate à la frontière, avec un message clair.

> [!question]- Comment ça marche ?
> - `parse()` lève une erreur ; `safeParse()` renvoie `{ success, data | error }`
> - `z.infer` génère le type
> - Transformations : `z.coerce.date()`, `.transform()`
> - Réutilisable côté front ET back (package partagé dans un monorepo)

> [!question]- Quand l'utiliser ?
> Réponses d'API, variables d'environnement, formulaires (VeeValidate, Angular via validateurs custom), données de localStorage, payloads côté serveur.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Coût à l'exécution et au bundle (Valibot est plus léger). Côté NestJS, l'écosystème standard est `class-validator` (mais Zod est possible).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Schéma | Description exécutable de la forme attendue |
| Parse | Valider et convertir une donnée |
| Coercition | Conversion de type contrôlée (`"12"` → 12) |

---

## Points clés

- Valider aux frontières, faire confiance aux types à l'intérieur
- `z.infer` évite de dupliquer interface + validation
- `safeParse` pour gérer l'erreur sans try/catch

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Définir une interface ET un schéma séparément qui divergent
> - Valider à chaque rendu au lieu d'une fois à la réception

---

## Exemple minimal

```typescript
const EnvSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_MODE: z.enum(["dev", "prod"]).default("dev"),
});
export const env = EnvSchema.parse(import.meta.env);  // crash immédiat si mal configuré
```

> [!note] Ce que j'en retiens
> Mieux vaut planter au démarrage avec un message clair qu'avoir une URL `undefined` en production.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Partager les schémas entre front et back (monorepo, package `@app/contracts`)
> - Générer des schémas depuis OpenAPI (ou l'inverse)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[TypeScript]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[VUE-14-Formulaires-Validation|Formulaires et Validation Vue.js]]

**Pratique :**
- Extrait de code → [[04_Snippets/ts-19-validation-runtime-zod]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi les types TypeScript ne suffisent-ils pas à valider une réponse d'API ?

---

## Tâches

- [ ] #task Valider la réponse de l'API TMDB dans CinéTrack avec Zod
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
