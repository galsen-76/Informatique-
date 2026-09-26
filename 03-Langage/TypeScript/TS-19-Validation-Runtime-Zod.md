---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frontend/typescript/zod
aliases:
  - "Validation runtime avec Zod"
parent: "[[TypeScript]]"
related_theory:
  - "[[TS-16-Assertions-satisfies-unknown|Assertions satisfies et unknown]]"
  - "[[NEST-05-DTO-Validation-Pipes|DTO et Validation NestJS]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://zod.dev"
---

# Validation runtime avec Zod

> [!abstract] En bref
> Les types TypeScript **disparaissent** quand le code tourne. Ils ne peuvent donc pas vérifier ce qu'envoie une API ou ce que tape un utilisateur. **Zod** fait cette vérification pendant l'exécution, et en déduit le type TypeScript : tu écris la règle **une seule fois**.

## Le problème

```ts
const film = (await r.json()) as Film;   // TypeScript te croit
film.titre.toUpperCase();                // 💥 si l'API a renvoyé { title: … } au lieu de { titre: … }
```

Le bug apparaît loin de sa cause, parfois des écrans plus tard.

## La solution : un schéma

```ts
import { z } from 'zod';

export const FilmSchema = z.object({
  id: z.number(),
  titre: z.string().min(1),
  annee: z.number().int().min(1888),
  note: z.number().min(0).max(10).nullable(),
});

export type Film = z.infer<typeof FilmSchema>;   // le type est déduit du schéma
```

```ts
const film = FilmSchema.parse(await r.json());   // lève une erreur claire si la forme est fausse
```

Ou sans lever d'erreur :

```ts
const resultat = FilmSchema.safeParse(donnees);
if (!resultat.success) {
  console.error(resultat.error.issues);   // liste des champs invalides
} else {
  resultat.data.titre;                    // ✅ typé Film
}
```

## Les briques

| Zod | Vérifie |
|---|---|
| `z.string()`, `.min(3)`, `.email()`, `.url()` | texte |
| `z.number()`, `.int()`, `.positive()` | nombre |
| `z.boolean()` | booléen |
| `z.enum(['vue', 'angular'])` | une valeur parmi une liste |
| `z.array(FilmSchema)` | une liste |
| `.optional()` / `.nullable()` | peut être absent / `null` |
| `z.coerce.number()` | convertit (utile pour les formulaires et les URL) |
| `.default('fr')` | valeur par défaut |

## Où l'utiliser dans tes projets

- **Réponses d'API** (TMDB, ton API) : valider avant de stocker.
- **Formulaire de contact** du Portfolio : le même schéma valide le formulaire (VeeValidate + Zod) et donne le type.
  ```ts
  export const ContactSchema = z.object({
    nom: z.string().min(2, 'Au moins 2 caractères'),
    email: z.string().email('E-mail invalide'),
    message: z.string().min(20, 'Au moins 20 caractères'),
  });
  ```
- **Variables d'environnement** : vérifier au démarrage que `VITE_API_URL` existe.
- **Back-end NestJS** : on utilise plutôt `class-validator` sur les DTO (voir [[NEST-05-DTO-Validation-Pipes|DTO et validation]]), mais Zod fonctionne aussi.

## Pièges

- **Valider partout, tout le temps** : valide aux **frontières** (ce qui entre dans l'app), pas entre tes propres fonctions.
- **Écrire le type à la main à côté du schéma** : ils finiront par diverger. Utilise `z.infer`.
