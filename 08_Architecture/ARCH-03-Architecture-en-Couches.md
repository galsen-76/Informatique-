---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
aliases:
  - "Architecture en Couches (Layered)"
tags:
  - cs/architecture/couches
parent: "[[Architecture Logicielle]]"
related_theory:
  - "[[ARCH-01-Fondamentaux|Fondamentaux Architecture]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://en.wikipedia.org/wiki/Multitier_architecture"
---

# Architecture en Couches

> [!abstract] En bref
> L'architecture la plus répandue : l'application est découpée en **couches** empilées, chacune avec un rôle précis, et chaque couche ne parle **qu'à celle du dessous**. Une requête descend (controller → service → accès aux données → base), la réponse remonte. C'est l'organisation de CinéTrack-API.

## Le schéma

![[Architecture_backend.png]]

> Requête HTTP → controller (reçoit la requête, vérifie la sécurité) → service métier → repository / DAO → base de données, puis réponse en sens inverse.

## Les couches

| Couche | Rôle | Dans NestJS | Ne fait PAS |
|---|---|---|---|
| **Présentation** (controller) | recevoir la requête, valider, répondre | `movies.controller.ts` + DTO | de règle métier |
| **Métier** (service) | appliquer les règles : droits, calculs, vérifications | `movies.service.ts` | de HTTP, de SQL |
| **Accès aux données** (repository) | lire et écrire en base | Prisma, ou `movies.repository.ts` | de règle métier |
| **Données** | stocker | PostgreSQL | |

Image : au restaurant, le **serveur** prend la commande (controller), le **cuisinier** prépare selon la recette (service), le **magasinier** va chercher les ingrédients (repository), la **réserve** les stocke (base).

## Pourquoi c'est utile

- **Changer une couche sans toucher aux autres** : passer de Prisma à du SQL brut ne modifie que le repository.
- **Tester chaque couche seule** : le service se teste avec un faux repository.
- **Savoir où chercher** : un bug de droits est dans le service, un bug de validation dans le DTO.

## Exemple : « publier une critique »

```ts
// Présentation : reçoit, valide (DTO), délègue
@Post()
create(@Body() dto: CreateReviewDto, @CurrentUser() user: AuthUser) {
  return this.reviews.create(dto, user.id);
}

// Métier : les règles
async create(dto: CreateReviewDto, userId: number) {
  await this.movies.ensureExists(dto.movieId);                 // le film existe ?
  const already = await this.repo.findByUserAndMovie(userId, dto.movieId);
  if (already) throw new ConflictException('Critique déjà écrite pour ce film');
  return this.repo.create({ ...dto, userId });
}

// Accès aux données : seulement Prisma
findByUserAndMovie(userId: number, movieId: number) {
  return this.prisma.review.findUnique({ where: { userId_movieId: { userId, movieId } } });
}
```

## Et côté front ?

La même idée existe : **pages** (présentation) → **stores / composables** (état, logique) → **api + mapper** (accès aux données). Voir [[ARCH-14-Architecture-Frontend|Architecture front-end]] et [[ARCH-15-Structure-de-Projet|Structure de projet]].

## Pièges

- **Un controller qui appelle Prisma directement** en sautant le service : la logique finit éparpillée.
- **Un service « passe-plat »** qui ne fait que rappeler le repository : acceptable au début, mais ne crée pas de couches vides par principe.
- **Une couche du bas qui appelle une couche du haut** (le repository qui lance une exception HTTP) : les dépendances ne vont que vers le bas.
