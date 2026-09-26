---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - methodologie/documentation
aliases:
  - "Documentation Technique"
parent: "[[Méthodologie]]"
related_theory:
  - "[[CONC-08-ADR-Architecture-Decision-Records|Architecture Decision Records ADR]]"
  - "[[NEST-12-OpenAPI-Swagger|OpenAPI et Swagger NestJS]]"
related_projects: []
source: "https://diataxis.fr/"
---

# Documentation Technique

> [!abstract] En bref
> Une bonne documentation permet à quelqu'un (toi dans 6 mois, un collègue, un recruteur) de **lancer, comprendre et modifier** ton projet sans te poser de question. Pas besoin d'écrire beaucoup : un **bon README**, une doc d'API générée, quelques commentaires sur le **pourquoi**. Pour un projet de portfolio, le README est ta **vitrine**.

## Le README : la pièce maîtresse

Test simple : quelqu'un qui découvre ton dépôt peut-il lancer le projet **en 5 minutes** ?

```markdown
# CinéTrack API

API de critiques de films : recherche (via TMDB), favoris, notes et critiques.

![Capture d'écran](docs/screenshot.png)

## Stack
NestJS · Prisma · PostgreSQL · Redis · Docker

## Démarrer
cp .env.example .env
docker compose up -d
npm install
npm run start:dev          # → http://localhost:3000/api/docs

## Scripts
| Commande        | Rôle                    |
| npm run test    | tests unitaires         |
| npm run test:e2e| tests d'intégration     |
| npm run lint    | vérification du code    |

## Architecture
Voir docs/architecture.md et les décisions dans docs/adr/.
```

Pour un projet de portfolio, ajoute : une **capture d'écran**, le **lien de la démo** en ligne, et ce que tu as appris ou trouvé difficile.

## Les autres documentations

| Quoi | Pour qui | Comment |
|---|---|---|
| **README** | tout le monde | écrit à la main, dans le dépôt |
| **Doc de l'API** | les développeurs front | générée par [[NEST-12-OpenAPI-Swagger\|Swagger]] depuis le code |
| **Décisions** | l'équipe future | [[CONC-08-ADR-Architecture-Decision-Records\|ADR]] |
| **Schémas** | tout le monde | Mermaid dans les fichiers Markdown |
| **Commentaires** | qui lit le code | seulement pour le **pourquoi** |

## Les commentaires utiles

```ts
// ❌ Paraphrase le code
// incrémente i
i++;

// ✅ Explique le pourquoi
// TMDB limite à 40 requêtes / 10 s : on met en cache 24 h pour rester sous la limite
await this.cache.set(key, movie, 86_400);
```

Pour une fonction publique pas évidente, un commentaire **TSDoc** s'affiche au survol dans l'éditeur :

```ts
/**
 * Calcule la note moyenne d'un film.
 * @returns la moyenne arrondie au dixième, ou 0 si aucune note
 */
averageRating(ratings: number[]): number { … }
```

## Les règles

- **Dans le dépôt**, à côté du code (pas dans un wiki que personne n'ouvre).
- **Mise à jour dans la même MR** que le code qu'elle décrit.
- **Générée** quand c'est possible (Swagger, types).

## Pièges

- **Un README vide** ou resté celui généré par le CLI.
- **Une doc fausse** : pire que pas de doc.
- **Des commentaires qui répètent le code.**
