---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M07
aliases:
  - "Conception d'API REST"
tags:
  - cs/architecture/api-rest
parent: "[[Architecture Logicielle]]"
related_theory:
  - "[[ANG-09-HTTP-Communication-Serveur|HTTP et Communication Serveur]]"
  - "[[ARCH-03-Architecture-en-Couches|Architecture en Couches]]"
related_projects:
  - "[[02_Projects/app-planification-sprints]]"
source: "https://restfulapi.net/"
---

# Design d'API REST

> [!abstract] En bref
> Une API **REST** organise les URL autour des **ressources** (les choses : films, critiques) et utilise les **méthodes HTTP** pour les actions (GET lire, POST créer…). Une API bien conçue se devine : quand on connaît `/movies`, on sait déjà écrire `/movies/42/reviews`. Voici les conventions pour CinéTrack-API.

## Les URL : des noms, au pluriel

| Action | Méthode + URL | Réponse |
|---|---|---|
| lister les films | `GET /movies?page=2&genre=sf` | 200 + liste paginée |
| un film | `GET /movies/27205` | 200 ou 404 |
| les critiques d'un film | `GET /movies/27205/reviews` | 200 |
| créer une critique | `POST /reviews` | **201** + la critique |
| modifier une critique | `PATCH /reviews/812` | 200 |
| supprimer | `DELETE /reviews/812` | **204** |
| mes favoris | `GET /me/favorites` | 200 |
| ajouter un favori | `PUT /me/favorites/27205` | 204 (répétable sans doublon) |

| ✅ | ❌ |
|---|---|
| `GET /movies` | `GET /getMovies` |
| `POST /reviews` | `POST /createReview` |
| `DELETE /reviews/812` | `GET /deleteReview?id=812` |
| `/movies/27205/reviews` | `/movie/27205/review` (singulier) |

**Le verbe est dans la méthode HTTP, pas dans l'URL.**

## Les listes : pagination, filtres, tri

```http
GET /movies?page=2&limit=20&genre=sf&sort=-rating
```

```json
{
  "items": [ … ],
  "page": 2,
  "limit": 20,
  "total": 348,
  "totalPages": 18
}
```

`sort=-rating` : le `-` veut dire décroissant.

## Les erreurs : un format unique

```json
{
  "statusCode": 400,
  "message": ["rating must not be greater than 10"],
  "error": "Bad Request"
}
```

Et les bons codes : 400 données invalides, 401 non connecté, 403 interdit, 404 introuvable, 409 conflit (voir [[NET-05-HTTP-Approfondi|HTTP]]).

## Les bonnes pratiques

| Pratique | Pourquoi |
|---|---|
| **JSON en camelCase** (`releaseYear`) | cohérent avec TypeScript |
| **Dates en ISO 8601** (`2026-09-26T10:00:00Z`) | format universel |
| **Ne renvoyer que l'utile** | pas de mot de passe haché, pas de champs internes |
| **Documenter avec OpenAPI** | voir [[NEST-12-OpenAPI-Swagger\|Swagger]] |
| **Versionner** si des clients externes dépendent de l'API | `/v1/movies`, pour pouvoir faire évoluer sans casser |
| **Idempotence** des PUT / DELETE | pouvoir réessayer sans effet de plus |

## Quand REST ne suffit pas

| Besoin | Alternative |
|---|---|
| le front veut choisir exactement les champs, beaucoup d'écrans différents | GraphQL |
| appels entre microservices, très performants | gRPC |
| temps réel | WebSocket, SSE (voir [[NET-10-WebSockets-SSE\|WebSockets]]) |

Pour tes projets, **REST** est le bon choix.

## Pièges

- **Des URL avec des verbes** (`/getAllMovies`).
- **Toujours répondre 200**, même en cas d'erreur.
- **Renvoyer directement les objets de la base** : l'API expose ta structure interne et des champs sensibles.
- **Pas de pagination** : `GET /reviews` qui renvoie 50 000 lignes.
